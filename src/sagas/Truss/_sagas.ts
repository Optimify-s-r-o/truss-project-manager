import { ApiURL } from '../../constants/api';
import {
	call,
	put,
	select,
	takeLatest
	} from 'redux-saga/effects';
import { createTruss, editTruss, OpenTrussOption } from './_actions';
import { Error, fetchSaga } from '../_sagas';
import { getType } from 'typesafe-actions';
import { lang, t } from '../../translation/i18n';
import { Method } from '../../constants/enum';
import { notificationAction } from '../../components/Toast/_actions';
import { Status } from '../../components/Toast/_types';
import { translationPath } from '../../utils/getPath';
import { TrussExe } from '../../types/_types';
import { trussFileExist } from './utils';

function* createTrussSaga(
	action: ReturnType<typeof createTruss.request>
): Generator {
	var temp = window.require("temp"),
		fs = window.require("fs"),
		path = window.require("path"),
		toBuffer = window.require("blob-to-buffer"),
		exec = window.require("child_process").exec;

	try {
		//Truss file not exists or is not executable file
		if (!trussFileExist(action.payload.trussExe)) {
			yield put(
				notificationAction({
					code: Status.WARNING,
					message: t(translationPath(lang.truss.trussFileNotExist)),
				})
			);
			return;
		}

		const api = process.env.REACT_APP_BACKEND_API;
		const token = yield select((state: any) => state.AuthReducer.token);

		let inputPath: any = null;
		let jobId: string = action.payload.jobId;

		// @ts-ignore
		const { errorResponseData, response, success } = yield call(
			fetchSaga,
			ApiURL.PROJECT_JOB,
			"POST",
			{
				bodyJSON: {
					Json: null,
					Name: action.payload.jobName,
					Id: action.payload.projectId,
				},
			}
		);
		if (!success) {
			yield put(
				notificationAction({
					code: Status.ERROR,
					message: t(translationPath(lang.truss.openFailed)),
				})
			);
			return;
		}

		yield put(
			notificationAction({
				code: Status.INFO,
				message: t(translationPath(lang.truss.opening)),
			})
		);
		yield (jobId = response as string);
		yield temp.mkdir("trussNew", (_err, dirPath) => {
			inputPath =
				action.payload.fileType && action.payload.fileType === TrussExe.TRUSS_2D
					? path.join(dirPath, "untitled.tr2")
					: path.join(dirPath, "untitled.tr3");

			toBuffer(new Blob(), function (err, buffer) {
				if (err) console.log(err);

				fs.writeFile(inputPath, buffer, function (err, data) {
					if (err) console.log(err);

					const command = `"${action.payload.trussExe}" "${inputPath}" -e "${OpenTrussOption.NEWJOB}" -url "${api}" -job "${jobId}" -token "${token}"`;
					console.log(command);

					exec(command, (err, stdout, _stderr) => {
						if (err) {
							put(
								notificationAction({
									code: Status.ERROR,
									message: t(translationPath(lang.truss.exeFailedToOpen)),
								})
							);
							return;
						}

						console.log(stdout);
					});
				});
			});
		});
		yield put(createTruss.success());
	} catch (error) {
		console.log(error);
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.truss.openFailed)),
			})
		);
		yield put(createTruss.failure(error));
	}
}

function* editTrussSaga(
	action: ReturnType<typeof editTruss.request>
): Generator {
	if (!trussFileExist(action.payload.trussExe)) {
		yield put(
			notificationAction({
				code: Status.WARNING,
				message: t(translationPath(lang.truss.trussFileNotExist)),
			})
		);
		return;
	}

	try {
		yield put(
			notificationAction({
				code: Status.INFO,
				message: t(translationPath(lang.truss.downloadingTrussFile)),
			})
		);

		// @ts-ignore
		const { errorResponseData, response, success } = yield call(
			fetchSaga,
			ApiURL.JOB_DOWNLOAD_LINK,
			Method.POST,
			{
				bodyJSON: { Id: action.payload.jobId },
			}
		);

		if (!success) {
			yield put(
				notificationAction({
					code: Status.ERROR,
					message: t(
						translationPath(
							lang.common[(errorResponseData as Error).ErrorMessage]
						)
					),
				})
			);
			return;
		}

		const documents = yield select(
			(state: any) => state.SettingsReducer.folders.documents
		);

		const token = yield select((state: any) => state.AuthReducer.token);
		const trussPath = `${documents}\\Truss Project Manager\\${action.payload.projectName}\\${action.payload.jobName}.tr3`;

		const trussResponse: any = yield call(fetch, response.Url);

		if (trussResponse.ok) {
			const blob: any = yield call([trussResponse, trussResponse.blob]);
			yield put(
				notificationAction({
					code: Status.INFO,
					message: t(translationPath(lang.truss.opening)),
				})
			);
			try {
				const fs = window.require("fs");
				const reader = new FileReader();
				reader.onloadend = () => {
					fs.mkdir(
						`${documents}\\Truss Project Manager\\${action.payload.projectName}\\`,
						{ recursive: true },
						(err) => {
							if (err) throw err;
							fs.writeFile(
								trussPath,
								new Uint8Array(reader.result as any),
								(err) => {
									if (err) {
										alert("An error ocurred creating the file " + err.message);
									} else {
										const command = `"${action.payload.trussExe}" "${trussPath}" -e "${OpenTrussOption.EDITJOB}" -url "${process.env.REACT_APP_BACKEND_API}" -job "${action.payload.jobId}" -token "${token}"`;
										console.log(command);
										const exec = window.require("child_process").exec;
										exec(command, (err, stdout, _stderr) => {
											if (err) {
												notificationAction({
													code: Status.ERROR,
													message: t(
														translationPath(lang.truss.exeFailedToOpen)
													),
												});
												return;
											}
											console.log(stdout);
										});
									}
								}
							);
						}
					);
				};
				reader.readAsArrayBuffer(blob);
			} catch (e) {
				console.log(e);
				yield put(
					notificationAction({
						code: Status.ERROR,
						message: t(translationPath(lang.truss.openFailed)),
					})
				);
			}
			return;
		}
		yield put(editTruss.success());
	} catch (error) {
		console.log(error);
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.truss.openFailed)),
			})
		);
		yield put(editTruss.failure(error));
	}
}

export function* watchCreateTruss() {
	yield takeLatest(getType(createTruss.request), createTrussSaga);
}

export function* watchEditTruss() {
	yield takeLatest(getType(editTruss.request), editTrussSaga);
}
