import { ApiURL } from '../../../../../constants/api';
import { call, put, takeLatest } from 'redux-saga/effects';
import { Error, fetchSaga } from '../../../../../sagas/_sagas';
import { getType } from 'typesafe-actions';
import { lang, t } from '../../../../../translation/i18n';
import { makeFormData } from '../../../../../utils/makeFormData';
import { Method } from '../../../../../constants/enum';
import { notificationAction } from '../../../../../components/Toast/_actions';
import { Status } from '../../../../../components/Toast/_types';
import { translationPath } from '../../../../../utils/getPath';
import {
	deleteModel,
	editModelPutAction,
	modelsGetAction,
	publishModelPostAction,
} from "./_actions";

function* viewerGetActionSaga(
	action: ReturnType<typeof modelsGetAction.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success } = yield call(
			fetchSaga,
			ApiURL.VIEWER,
			Method.GET,
			{
				param: action.payload,
			}
		);

		if (!success) {
			yield put(modelsGetAction.failure(errorResponseData));
			return;
		}

		yield put(modelsGetAction.success(response));
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(modelsGetAction.failure(err));
	}
}

function* publishModelPostActionSaga(
	action: ReturnType<typeof publishModelPostAction.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success } = yield call(
			fetchSaga,
			ApiURL.PUBLISH_MODEL,
			Method.POST,
			{
				bodyJSON: { Id: action.payload },
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
			yield put(publishModelPostAction.failure(errorResponseData));
			return;
		}
		yield put(modelsGetAction.request(action.payload));
		yield put(publishModelPostAction.success(response));
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(publishModelPostAction.failure(err));
	}
}

function* editModelPutActionSaga(
	action: ReturnType<typeof editModelPutAction.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success } = yield call(
			fetchSaga,
			ApiURL.QUOTATIONS_SECTIONS,
			Method.PUT,
			{
				param: action.payload.Id,
				bodyFormData: makeFormData(action.payload),
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
			yield put(editModelPutAction.failure(errorResponseData));
			return;
		}
		yield put(modelsGetAction.request(action.payload.Id));
		yield put(editModelPutAction.success(response));
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(editModelPutAction.failure(err));
	}
}

function* modelDeleteActionSaga(
	action: ReturnType<typeof deleteModel.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success } = yield call(
			fetchSaga,
			ApiURL.VIEWER,
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
			yield put(deleteModel.failure(errorResponseData));
			return;
		}
		yield put(deleteModel.success(response));
		yield put(modelsGetAction.request(action.payload));
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(deleteModel.failure(err));
	}
}

export function* watchViewerGetAction() {
	yield takeLatest(getType(modelsGetAction.request), viewerGetActionSaga);
}

export function* watchPublishModelPostAction() {
	yield takeLatest(
		getType(publishModelPostAction.request),
		publishModelPostActionSaga
	);
}

export function* watchEditModelPutAction() {
	yield takeLatest(getType(editModelPutAction.request), editModelPutActionSaga);
}

export function* watchDeleteModelAction() {
	yield takeLatest(getType(deleteModel.request), modelDeleteActionSaga);
}
