import {call, put, select, takeLatest} from 'redux-saga/effects';
import {getType} from 'typesafe-actions';

import {notificationAction} from '../../../../components/Toast/_actions';
import {Status} from '../../../../components/Toast/_types';
import {ApiURL} from '../../../../constants/api';
import {fetchSaga} from '../../../../sagas/_sagas';
import {lang, t} from '../../../../translation/i18n';
import {translationPath} from '../../../../utils/getPath';
import {createBackup} from './_actions';
import {Method} from "../../../../constants/enum";
import {BackupProject} from "./_types";

function* createBackupActionSaga(
    action: ReturnType<typeof createBackup.request>
): Generator {
    try {
        // @ts-ignore
        const {errorResponseData, response, success, statusText} = yield call(
            fetchSaga,
            ApiURL.PROJECTS_SIMPLIFIED,
            Method.GET,
        );

        if (!success) {
            yield put(createBackup.failure(errorResponseData));
            return;
        }

        if (!response.Projects) return;

        const token = yield select((state: any) => state.AuthReducer.token);

        yield createBackupFS(response?.Projects, action.payload.directory, token as string);


        yield put(createBackup.success(response));
    } catch (err) {
        yield put(
            notificationAction({
                code: Status.ERROR,
                message: t(translationPath(lang.common.errorMessage)),
            })
        );
        yield put(createBackup.failure(err));
    }
}

const createBackupFS = async (projects: BackupProject[], directory: string, token: string) =>{
    if(!directory) return;

    await removeOldBackupAsync(directory)
    const backup = "\\Backup\\";

    for (const project of projects) {
        const projectDir = `${directory}${backup}${project?.Name}`;
        await createDirectoryAsync(projectDir);

        for (const job of project.Jobs) {
            const jobDir = `${projectDir}\\${job?.Name}`;
            await createDirectoryAsync(jobDir);
            await downloadJobTrussFileAsync(jobDir, job?.Id, token);
        }
    }
}

const downloadJobTrussFileAsync = async (directory: string, id: string, token: string) =>{
    const url = `${process.env.REACT_APP_BACKEND_API}/api/v1/jobs/${id}/download-link`;
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    //TODO KARLOS VEMOLA
    console.log(response.json());
}

const createDirectoryAsync = async (directory: string) => {
    if (!directory) return;

    const fs = window.require("fs");

    return fs.mkdirSync(directory, {recursive: true})
}

const removeOldBackupAsync = async (path: string) => {
    if (!path) return;

    const fs = window.require("fs");

    return fs.rmSync(`${path}\\Backup`, {recursive: true, force: true});
}

export function* watchBackupAction() {
    yield takeLatest(getType(createBackup.request), createBackupActionSaga);
}

