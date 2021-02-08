import { ApiURL } from '../../../../constants/api';
import { call, put, takeLatest } from 'redux-saga/effects';
import { Error, fetchSaga } from '../../../../sagas/_sagas';
import { getOrganization, updateOrganization } from './_actions';
import { getType } from 'typesafe-actions';
import { lang, t } from '../../../../translation/i18n';
import { Method } from '../../../../constants/enum';
import { Status } from '../../../../components/Toast/_types';
import { translationPath } from '../../../../utils/getPath';
import {
	clearNotificationAction,
	notificationAction,
} from "../../../../components/Toast/_actions";

function* getOrganizationSaga(
	action: ReturnType<typeof getOrganization.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success, statusText } = yield call(
			fetchSaga,
			ApiURL.CLIENT_GET,
			Method.GET
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
			yield put(getOrganization.failure(errorResponseData));
			yield put(clearNotificationAction());
			return;
		}
		yield put(getOrganization.success(response));
		yield put(clearNotificationAction());
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(clearNotificationAction());
		yield put(getOrganization.failure(err));
	}
}

export function* watchGetOrganization() {
	yield takeLatest(getType(getOrganization.request), getOrganizationSaga);
}

function* updateOrganizationSaga(
	action: ReturnType<typeof updateOrganization.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success } = yield call(
			fetchSaga,
			ApiURL.CLIENTS_PUT,
			Method.PUT,
			{
				bodyJSON: action.payload,
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
			yield put(updateOrganization.failure(errorResponseData));
			yield put(clearNotificationAction());
			return;
		}

		yield put(updateOrganization.success(response));
		yield put(getOrganization.request());
		yield put(clearNotificationAction());
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(clearNotificationAction());
		yield put(updateOrganization.failure(err));
	}
}

export function* watchUpdateOrganization() {
	yield takeLatest(getType(updateOrganization.request), updateOrganizationSaga);
}
