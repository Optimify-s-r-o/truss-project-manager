import { call, put, select, takeLatest } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';

import { notificationAction } from '../../../../components/Toast/_actions';
import { Status } from '../../../../components/Toast/_types';
import { ApiURL } from '../../../../constants/api';
import { Method } from '../../../../constants/enum';
import { fetchSaga } from '../../../../sagas/_sagas';
import { lang, t } from '../../../../translation/i18n';
import { translationPath } from '../../../../utils/getPath';
import { createBackup, setBackupDownloadingText } from './_actions';

function* createBackupActionSaga(
  action: ReturnType<typeof createBackup.request>
): Generator {
  let errorResponseData, response, success;

  try {
    // @ts-ignore
    const res: any = yield call(
      fetchSaga,
      ApiURL.PROJECTS_SIMPLIFIED,
      Method.GET
    );
    errorResponseData = res?.errorResponseData;
    response = res?.response;
    success = res?.success;
  } catch (err) {
    yield put(
      notificationAction({
        code: Status.ERROR,
        message: t(translationPath(lang.backup.errorMessage)),
      })
    );
    yield put(createBackup.failure(err));
    return;
  }

  if (!success) {
    yield put(
      notificationAction({
        code: Status.ERROR,
        message: t(translationPath(lang.backup.errorMessage)),
      })
    );
    yield put(createBackup.failure(errorResponseData));
    return;
  }

  if (!response?.Projects) return;

  const token = yield select((state: any) => state.AuthReducer.token);

  const directory = action.payload.directory;

  if (!directory) return;

  yield removeOldBackupAsync(directory);

  const backup = '\\Backup\\';

  for (const [index, project] of response?.Projects.entries()) {
    yield put(
      setBackupDownloadingText(
        t(translationPath(lang.settings.backupProgress), {
          projectName: project.Name,
          index,
          total: response.Projects?.length,
        })
      )
    );

    const projectDir = `${directory}${backup}${project?.CreatedAt?.substring(
      0,
      4
    )}\\${project?.Name}`;
    yield createDirectoryAsync(projectDir);
    yield downloadProjectFilesAsync(
      `${projectDir}\\Files`,
      project?.Id,
      token as string
    );

    for (const job of project.Jobs) {
      const jobDir = `${projectDir}\\${job?.Name}`;
      yield createDirectoryAsync(jobDir);
      yield downloadJobTrussFileAsync(
        `${jobDir}\\${job?.Name}.tr3`,
        job?.Id,
        token as string
      );
    }
  }

  yield put(createBackup.success(response));
}

const downloadProjectFilesAsync = async (
  directory: string,
  id: string,
  token: string
) => {
  if (!directory) return;

  const fs = window.require('fs');

  await fs.mkdirSync(directory, { recursive: true });

  const apiUrl = `${process.env.REACT_APP_BACKEND_API}/api/v1/projects/files/${id}`;

  const response = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data: any = await response.json();

  if (!response?.ok || !data?.Files) return;

  for (const file of data?.Files) {
    await downloadProjectFileAsync(
      `${directory}\\${file?.Name}`,
      file?.Path,
      token
    );
  }
};

const downloadProjectFileAsync = async (
  filePath: string,
  fileApiPath: string,
  token: string
) => {
  const apiUrl = `${
    process.env.REACT_APP_BACKEND_API
  }/api/v1/files/${encodeURIComponent(fileApiPath)}`;

  const response = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response?.ok) return;

  const blob = await response.blob();

  await saveBlobToFile(blob, filePath);
};

const downloadJobTrussFileAsync = async (
  path: string,
  id: string,
  token: string
) => {
  const apiUrl = `${process.env.REACT_APP_BACKEND_API}/api/v1/jobs/${id}/download-link`;

  const response = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data: any = await response.json();

  if (!response?.ok || !data?.Url) return;

  const trussFileResponse = await fetch(data?.Url);

  if (!trussFileResponse?.ok) return;

  const blob = await trussFileResponse.blob();

  await saveBlobToFile(blob, path);
};

const saveBlobToFile = async (blob: Blob, path: string) => {
  const fs = window.require('fs');

  const fileData = new Int8Array(await blob.arrayBuffer());

  await fs.writeFileSync(path, fileData);
};

const createDirectoryAsync = async (directory: string) => {
  if (!directory) return;

  const fs = window.require('fs');

  return fs.mkdirSync(directory, { recursive: true });
};

const removeOldBackupAsync = async (path: string) => {
  if (!path) return;

  const fs = window.require('fs');

  return fs.rmSync(`${path}\\Backup`, { recursive: true, force: true });
};

export function* watchBackupAction() {
  yield takeLatest(getType(createBackup.request), createBackupActionSaga);
}
