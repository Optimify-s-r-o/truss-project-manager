import { ApiURL } from '../../../constants/api';
import { call, put, takeLatest } from 'redux-saga/effects';
import { Error, fetchSaga } from '../../../sagas/_sagas';
import { getType } from 'typesafe-actions';
import { lang, t } from '../../../translation/i18n';
import { Method } from 'src/constants/enum';
import { Status } from '../../../components/Toast/_types';
import { translationPath } from '../../../utils/getPath';
import {
	clearNotificationAction,
	notificationAction,
} from "../../../components/Toast/_actions";
import {
	addToSelectionAction,
	removeFromSelectionAction,
	resetSelectionAction,
} from "./_actions";

function* addToSelectionSaga(
	action: ReturnType<typeof addToSelectionAction.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success, statusText } = yield call(
			fetchSaga,
			ApiURL.SELECTION_ADD,
			Method.POST,
			{
				urlWildCards: { selections: action.payload },
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
			yield put(addToSelectionAction.failure(errorResponseData));
			return;
		}
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);

		yield put(addToSelectionAction.failure(err));
	}
	yield put(clearNotificationAction());
}

function* removeFromSelectionSaga(
	action: ReturnType<typeof removeFromSelectionAction.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success, statusText } = yield call(
			fetchSaga,
			ApiURL.SELECTION_REMOVE,
			Method.POST,
			{
				urlWildCards: { selections: action.payload },
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
			yield put(removeFromSelectionAction.failure(errorResponseData));
			return;
		}
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);

		yield put(removeFromSelectionAction.failure(err));
	}
	yield put(clearNotificationAction());
}

function* resetSelectionSaga(
	action: ReturnType<typeof resetSelectionAction.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success, statusText } = yield call(
			fetchSaga,
			ApiURL.SELECTION_RESET,
			Method.POST
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
			yield put(resetSelectionAction.failure(errorResponseData));
			return;
		}
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);

		yield put(resetSelectionAction.failure(err));
	}
	yield put(clearNotificationAction());
}

export function* watchResetSelection() {
	yield takeLatest(getType(resetSelectionAction.request), resetSelectionSaga);
}

export function* watchAddToSelection() {
	yield takeLatest(getType(addToSelectionAction.request), addToSelectionSaga);
}

export function* watchRemoveFromSelection() {
	yield takeLatest(
		getType(removeFromSelectionAction.request),
		removeFromSelectionSaga
	);
}
