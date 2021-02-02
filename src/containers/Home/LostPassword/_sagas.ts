import { ApiURL } from '../../../constants/api';
import { call, put, takeLatest } from 'redux-saga/effects';
import { Error, fetchSaga } from '../../../sagas/_sagas';
import { getType } from 'typesafe-actions';
import { lang, t } from '../../../translation/i18n';
import { push } from 'connected-react-router';
import { resetPassword } from './_actions';
import { Routes } from '../../../constants/routes';
import { Status } from '../../../components/Toast/_types';
import { translationPath } from '../../../utils/getPath';
import {
	clearNotificationAction,
	notificationAction,
} from "../../../components/Toast/_actions";

function* resetPasswordSaga(
	action: ReturnType<typeof resetPassword.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success } = yield call(
			fetchSaga,
			ApiURL.USER_RESET,
			"POST",
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
			yield put(clearNotificationAction());
			yield put(resetPassword.failure(errorResponseData));
			return;
		}
		yield put(
			notificationAction({
				code: Status.SUCCESS,
				message: t(translationPath(lang.common.passwordResetSuccessful)),
			})
		);
		yield put(resetPassword.success(response));
		yield put(push(Routes.HOME));
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(clearNotificationAction());
		yield put(resetPassword.failure(err));
	}
}

export function* watchResetPassword() {
	yield takeLatest(getType(resetPassword.request), resetPasswordSaga);
}
