import lang from '../../translation/lang';
import { ApiURL } from '../../constants/api';
import {
	call,
	put,
	select,
	takeLatest
	} from 'redux-saga/effects';
import { createJobFromTrussFile } from './_actions';
import { fetchSaga } from '../_sagas';
import { getType } from 'typesafe-actions';
import { notificationAction } from '../../components/Toast/_actions';
import { OpenTrussOption } from '../Truss/_actions';
import { Status } from '../../components/Toast/_types';
import { t } from '../../translation/i18n';
import { translationPath } from '../../utils/getPath';
import { TrussExe } from '../../types/_types';

function* createJobFromTrussFileSaga(
	action: ReturnType<typeof createJobFromTrussFile.request>
): Generator {
	try {
		if (action.payload.fileType === TrussExe.NONE) {
			yield put(
				notificationAction({
					code: Status.ERROR,
					message: t(translationPath(lang.truss.openFailed)),
				})
			);
			return;
		}
		const local = yield select((state: any) => state.AuthReducer.local);
		const api = local
			? process.env.REACT_APP_API_URL_LOCAL
			: process.env.REACT_APP_BACKEND_API;
		const token = yield select((state: any) => state.AuthReducer.token);

		let jobId: string = null;

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
		const command = `"${action.payload.trussExe}" "${action.payload.path.replaceAll('/', '\\')}" -e ${OpenTrussOption.EDITJOB} -url "${api}" -job "${jobId}" -token "${token}"`;
		console.log(command);
		var exec = window.require("child_process").exec;
		exec(command, (err, stdout, _stderr) => {
			if (err) {
				put(
					notificationAction({
						code: Status.ERROR,
						message: t(translationPath(lang.truss.openFailed)),
					})
				);
				return;
			}

			console.log(stdout);
		});

		yield put(createJobFromTrussFile.success());
	} catch (error) {
		console.log(error);
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.truss.openFailed)),
			})
		);
		yield put(createJobFromTrussFile.failure(error));
	}
}

export function* watchCreateJobFromTrussFileSaga() {
	yield takeLatest(
		getType(createJobFromTrussFile.request),
		createJobFromTrussFileSaga
	);
}
