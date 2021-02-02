import { ApiURL } from '../../constants/api';
import { call, put, takeLatest } from 'redux-saga/effects';
import { download, fileChangeRootPath, FileOperation } from './_actions';
import { extractFirstText, getExtension } from './_service';
import { fetchSaga, FetchSagaReponseType } from '../_sagas';
import { getType } from 'typesafe-actions';
import { lang, t } from '../../translation/i18n';
import { Method } from '../../constants/enum';
import { notificationAction } from '../../components/Toast/_actions';
import { settings } from '../../containers/Portal/_actions';
import { Status } from '../../components/Toast/_types';
import { translationPath } from '../../utils/getPath';

function* downloadFileActionSaga(
	action: ReturnType<typeof download.request>
): Generator {
	try {
		const data: FetchSagaReponseType = yield call(
			fetchSaga,
			ApiURL.FILES,
			"GET",
			{ param: encodeURIComponent(action.payload.id) }
		);
		const temp = window.require("temp"),
			fs = window.require("fs");
		if (data.response && action.payload.type == FileOperation.OPEN) {
			const contentDisposition = data.headers.get("Content-Disposition");
			const decoded_disposition = decodeURIComponent(contentDisposition);
			const fileName = extractFirstText(decoded_disposition);
			yield temp.mkdir("trussEdit", (_err, dirPath) => {
				try {
					var blob = new Blob([data.response as any], {
						type: "octet/stream",
					});
					const reader = new FileReader();
					reader.onloadend = () => {
						fs.writeFile(
							dirPath + fileName,
							new Uint8Array(reader.result as any),
							(err) => {
								if (err) {
									alert("An error ocurred creating the file " + err.message);
								} else {
									console.log("The file has been successfully saved");
									const { shell } = window.require("electron");
									shell.openPath(dirPath + fileName);
								}
							}
						);
					};
					reader.readAsArrayBuffer(blob);
				} catch (e) {
					alert("Failed to save the file !");
				}
			});
			return;
		}

		if (data.response) {
			if (action.payload.path) {
				try {
					var blob = new Blob([data.response as any], {
						type: "octet/stream",
					});
					const reader = new FileReader();
					reader.onloadend = () => {
						console.log(reader.result);
						fs.writeFile(
							action.payload.path,
							new Uint8Array(reader.result as any),
							(err) => {
								if (err) {
									alert("An error ocurred creating the file " + err.message);
								} else {
									console.log("The file has been successfully saved");
								}
							}
						);
					};
					reader.readAsArrayBuffer(blob);
				} catch (e) {
					alert("Failed to save the file !");
				}
			}
		}

		yield put(download.success(data.response as string));
	} catch (error) {
		console.log(error);
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: "Soubor nebylo možné stáhnou.",
			})
		);
		yield put(download.failure(error));
	}
}

export function* watchDownloadFile() {
	yield takeLatest(getType(download.request), downloadFileActionSaga);
}

function* fileChangeRootPathSaga(
	action: ReturnType<typeof fileChangeRootPath.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success, statusText } = yield call(
			fetchSaga,
			ApiURL.FILES_CHANGE_ROOTPATH,
			"POST",
			{
				bodyJSON: {
					folderPath: action.payload,
					moveOriginal: true,
				},
			}
		);

		if (!success || errorResponseData) {
			yield put(fileChangeRootPath.failure(errorResponseData));
			yield put(
				notificationAction({
					code: Status.ERROR,
					message: t(translationPath(lang.common[statusText])),
				})
			);
			return;
		}

		if (success && response) {
			yield put(fileChangeRootPath.success());
			yield put(
				settings.request({
					action: settings,
					method: Method.GET,
					url: ApiURL.SETTINGS,
				})
			);
		}
	} catch (error) {
		console.log(error);
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(fileChangeRootPath.failure(error));
	}
}

export function* watchFileChangeRootPath() {
	yield takeLatest(getType(fileChangeRootPath.request), fileChangeRootPathSaga);
}
