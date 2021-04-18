import { ApiURL } from '../../../constants/api';
import { call, put, takeLatest } from 'redux-saga/effects';
import { createProject, createProjectWithJson } from './_actions';
import { createTruss } from '../../../sagas/Truss/_actions';
import { Error, fetchSaga, FetchSagaReponseType } from '../../../sagas/_sagas';
import { getFiltersSettings } from '../../../sagas/Fetch/actions';
import { getType } from 'typesafe-actions';
import { lang, t } from '../../../translation/i18n';
import { makeFormData } from '../../../utils/makeFormData';
import { push } from 'connected-react-router';
import { Routes } from '../../../constants/routes';
import { settingsFilter } from '../_actions';
import { Status } from '../../../components/Toast/_types';
import { translationPath } from '../../../utils/getPath';
import { TrussExe } from '../../../types/_types';
import {
	clearNotificationAction,
	notificationAction,
} from "../../../components/Toast/_actions";

function* projectSaveSaga(
	action: ReturnType<typeof createProject.request>
): Generator {
	try {
		const project = action.payload;
		delete project.callback;
		// @ts-ignore
		const { errorResponseData, response, success, statusText } = yield call(
			fetchSaga,
			ApiURL.PROJECTS,
			"POST",
			{
				bodyFormData: makeFormData(project),
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
			yield put(createProject.failure(errorResponseData));
			yield put(clearNotificationAction());
			return;
		}

		if (typeof response == "object") {
			yield put(push(Routes.TREE_LINK_PROJECT + (response as any).Id));
		}
		yield put(createProject.success(response as any));
		if (action.payload.openTruss3D && action.payload.trussExe) {
			yield put(
				createTruss.request({
					projectId: response.Id,
					jobName: response.Name,
					trussExe: action.payload.trussExe,
					fileType: TrussExe.TRUSS_3D,
				})
			);
		} else if (action.payload.openTruss2D && action.payload.trussExe) {
			yield put(
				createTruss.request({
					projectId: response.Id,
					jobName: response.Name,
					trussExe: action.payload.trussExe,
					fileType: TrussExe.TRUSS_2D,
				})
			);
		}

		yield put(settingsFilter.request(getFiltersSettings()));
		yield put(
			notificationAction({
				code: Status.SUCCESS,
				message: t(translationPath(lang.common.successMessageProject)),
			})
		);
		yield put(clearNotificationAction());
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessageProject)),
			})
		);
		yield put(clearNotificationAction());
		yield put(createProject.failure(err));
	}
}

export function* watchProjectSave() {
	yield takeLatest(getType(createProject.request), projectSaveSaga);
}

function* projectFromJsonSaga(
	action: ReturnType<typeof createProjectWithJson.request>
): Generator {
	try {
		const data: FetchSagaReponseType | undefined = yield call(
			fetchSaga,
			ApiURL.PROJECT_JSON,
			"POST",
			{
				bodyFormData: makeFormData(action.payload),
			}
		);

		if (!data.success) {
			yield put(
				notificationAction({
					code: Status.ERROR,
					message: t(
						translationPath(
							lang.common[(data.errorResponseData as Error).ErrorMessage]
						)
					),
				})
			);
			yield put(createProjectWithJson.failure(data.errorResponse));
			yield put(clearNotificationAction());
			return;
		}
		if (data.response) {
			yield put(push(Routes.TREE_LINK_PROJECT + (data.response as any).Id));
		}

		yield put(createProjectWithJson.success(data.response as string));
		yield put(settingsFilter.request(getFiltersSettings()));
		yield put(
			notificationAction({
				code: Status.SUCCESS,
				message: t(translationPath(lang.common.successMessageProject)),
			})
		);
		yield put(clearNotificationAction());
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessageProject)),
			})
		);
		yield put(clearNotificationAction());
		yield put(createProjectWithJson.failure(err));
	}
}

export function* watchProjectFromJsonSave() {
	yield takeLatest(getType(createProjectWithJson.request), projectFromJsonSaga);
}
