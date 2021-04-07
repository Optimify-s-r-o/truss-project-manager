import { ApiURL } from '../../../constants/api';
import { call, put, takeLatest } from 'redux-saga/effects';
import { Error, fetchSaga, WildCards } from '../../../sagas/_sagas';
import { getType } from 'typesafe-actions';
import { lang, t } from '../../../translation/i18n';
import { Method } from '../../../constants/enum';
import { notificationAction } from '../../../components/Toast/_actions';
import { push } from 'connected-react-router';
import { Routes } from './../../../constants/routes';
import { Status } from '../../../components/Toast/_types';
import { translationPath } from '../../../utils/getPath';
import {
	deleteUser,
	editUser,
	usersAction,
	usersWithPaginationAction,
} from "./_actions";

function* getUsersActionSaga(
	action: ReturnType<typeof usersAction.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success, statusText } = yield call(
			fetchSaga,
			ApiURL.USERS,
			Method.GET,
			{
				urlWildCards: action.payload as WildCards,
			}
		);

		if (!success) {
			yield put(usersAction.failure(errorResponseData));
			return;
		}

		yield put(usersAction.success(response));
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(usersAction.failure(err));
	}
}

function* getUsersWithPaginationActionSaga(
	action: ReturnType<typeof usersWithPaginationAction.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success, statusText } = yield call(
			fetchSaga,
			ApiURL.USERS,
			Method.GET,
			{
				urlWildCards: action.payload as WildCards,
			}
		);

		if (!success) {
			yield put(usersWithPaginationAction.failure(errorResponseData));
			return;
		}

		yield put(usersWithPaginationAction.success(response));
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(usersWithPaginationAction.failure(err));
	}
}

function* editUserActionSaga(
	action: ReturnType<typeof editUser.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success, statusText } = yield call(
			fetchSaga,
			ApiURL.USERS,
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
			yield put(editUser.failure(errorResponseData));
			return;
		}
		yield put(push(Routes.USERS));
		yield put(
			usersWithPaginationAction.request({
				Page: 0,
				PageSize: 25,
				Paginate: true,
			})
		);
		yield put(
			usersAction.request({
				Paginate: false,
			})
		);
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(editUser.failure(err));
	}
}

function* removeUserActionSaga(
	action: ReturnType<typeof deleteUser.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success, statusText } = yield call(
			fetchSaga,
			ApiURL.USERS,
			Method.DELETE,
			{
				param: action.payload,
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
			yield put(deleteUser.failure(errorResponseData));
			return;
		}

		yield put(
			usersWithPaginationAction.request({
				Page: 0,
				PageSize: 25,
				Paginate: true,
			})
		);
		yield put(
			usersAction.request({
				Paginate: false,
			})
		);
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(deleteUser.failure(err));
	}
}

export function* watchRemoveUsersAction() {
	yield takeLatest(getType(deleteUser.request), removeUserActionSaga);
}

export function* watchGetUsersAction() {
	yield takeLatest(getType(usersAction.request), getUsersActionSaga);
}

export function* watchEditUserAction() {
	yield takeLatest(getType(editUser.request), editUserActionSaga);
}

export function* watchGetUsersWithPaginationAction() {
	yield takeLatest(
		getType(usersWithPaginationAction.request),
		getUsersWithPaginationActionSaga
	);
}
