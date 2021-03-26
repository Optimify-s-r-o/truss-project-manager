import { ApiURL } from '../../../constants/api';
import { call, put, takeLatest } from 'redux-saga/effects';
import { Error, fetchSaga } from '../../../sagas/_sagas';
import { getType } from 'typesafe-actions';
import { lang, t } from '../../../translation/i18n';
import { login } from './_actions';
import { push } from 'connected-react-router';
import { Routes } from '../../../constants/routes';
import { Status } from '../../../components/Toast/_types';
import { translationPath } from '../../../utils/getPath';
import {
	clearNotificationAction,
	notificationAction,
} from "../../../components/Toast/_actions";

function* cloudLoginActionSaga(
	action: ReturnType<typeof login.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success } = yield call(
			fetchSaga,
			ApiURL.USER_LOGIN,
			"POST",
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
			yield put(clearNotificationAction());
			yield put(login.failure(errorResponseData));
			return;
		}
		yield put(login.success(response));
		yield put(push(Routes.PORTAL));
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(clearNotificationAction());
		yield put(login.failure(err));
	}
}

export function* watchCloudLogin() {
	yield takeLatest(getType(login.request), cloudLoginActionSaga);
}
