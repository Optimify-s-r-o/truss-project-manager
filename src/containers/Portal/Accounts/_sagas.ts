import { ApiURL } from '../../../constants/api';
import { call, put, takeLatest } from 'redux-saga/effects';
import { deleteUser, usersAction } from './_actions';
import { Error, fetchSaga, WildCards } from '../../../sagas/_sagas';
import { getType } from 'typesafe-actions';
import { lang, t } from '../../../translation/i18n';
import { Method } from '../../../constants/enum';
import { notificationAction } from '../../../components/Toast/_actions';
import { Status } from '../../../components/Toast/_types';
import { translationPath } from '../../../utils/getPath';

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

		yield put(usersAction.request({ Page: 0, PageSize: 25, Sort: "" }));
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
