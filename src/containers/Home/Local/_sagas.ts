import Cookies from 'universal-cookie';
import { ApiURL } from '../../../constants/api';
import {
  call,
  delay,
  put,
  select,
  takeLatest
  } from 'redux-saga/effects';
import { clearNotificationAction } from '../../../components/Toast/_actions';
import { Error, fetchSaga } from '../../../sagas/_sagas';
import { getType } from 'typesafe-actions';
import { lang, t } from '../../../translation/i18n';
import { localUsers, loginLocal } from './_actions';
import { Method } from '../../../constants/enum';
import { notificationAction } from '../../../components/Toast/_actions';
import { push } from 'connected-react-router';
import { Routes } from '../../../constants/routes';
import { Status } from '../../../components/Toast/_types';
import { translationPath } from '../../../utils/getPath';
import { usersAction } from '../../Portal/_actions';

function* localLoginActionSaga(
	action: ReturnType<typeof loginLocal.request>
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
			yield put(loginLocal.failure(errorResponseData));
			return;
		}
		yield put(loginLocal.success(response));
		yield put(
			usersAction.request({
				action: usersAction,
				method: Method.GET,
				url: ApiURL.USERS,
			})
		);

		yield put(push(Routes.PORTAL));
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(clearNotificationAction());
		yield put(loginLocal.failure(err));
	}
}

function* localUsersActionSaga(
	action: ReturnType<typeof localUsers.request>
): Generator {
	const cloud = yield select((state: any) => state.AuthReducer.cloud);
	if (cloud) {
		return;
	}
	try {
		// @ts-ignore
		const { errorResponseData, response, success } = yield call(
			fetchSaga,
			ApiURL.USERS_LOCAL,
			"GET"
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
			yield delay(2000);
			yield put(localUsers.request());
			return;
		}
		yield put(localUsers.success(response));
	} catch (err) {
		yield delay(2500);
		yield put(localUsers.request());
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(clearNotificationAction());
		yield put(localUsers.failure(err));
	}
}

export function* watchlocalUsers() {
	yield takeLatest(getType(localUsers.request), localUsersActionSaga);
}

export function* watchlocalLogin() {
	yield takeLatest(getType(loginLocal.request), localLoginActionSaga);
}
