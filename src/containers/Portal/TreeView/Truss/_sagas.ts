import { ApiURL } from '../../../../constants/api';
import { calculateTruss, getTruss, trussImage } from './_actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import { lang, t } from '../../../../translation/i18n';
import { Method } from '../../../../constants/enum';
import { Quotations } from '../../Quotations/_types';
import { quotationSelectionGetAction } from '../../Quotations/_actions';
import { Status } from '../../../../components/Toast/_types';
import { translationPath } from '../../../../utils/getPath';
import {
	clearNotificationAction,
	notificationAction,
} from "../../../../components/Toast/_actions";
import {
	Error,
	fetchSaga,
	FetchSagaReponseType,
	WildCards,
} from "../../../../sagas/_sagas";

function* TrussImageSaga(
	action: ReturnType<typeof trussImage.request>
): Generator {
	try {
		const data: FetchSagaReponseType = yield call(
			fetchSaga,
			ApiURL.TRUSS_IMAGE,
			"GET",
			{
				param: action.payload,
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

			yield put(trussImage.failure(data.errorResponse));
			yield put(clearNotificationAction());
			return;
		}
		var urlCreator = window.URL || window.webkitURL;
		var imageUrl = urlCreator.createObjectURL(data.response);
		yield put(trussImage.success(imageUrl));
		yield put(clearNotificationAction());
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(clearNotificationAction());
		yield put(trussImage.failure(err));
	}
}

export function* watchTrussImage() {
	yield takeLatest(getType(trussImage.request), TrussImageSaga);
}

function* calculateJobQuotationActionSaga(
	action: ReturnType<typeof calculateTruss.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success, statusText } = yield call(
			fetchSaga,
			ApiURL.TRUSS_QUOTATIONS_CALCULATE,
			Method.POST,
			{
				bodyJSON: {
					entityId: action.payload.entityId,
					templateId: action.payload.templateId,
					recursiveRecreate: action.payload.recursiveRecreate,
				},
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
			yield put(calculateTruss.failure(errorResponseData));
			return;
		}
		yield put(quotationSelectionGetAction.success(response as Quotations));
		yield put(calculateTruss.success(response));
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(calculateTruss.failure(err));
	}
}

export function* watchCalculateTrussQuotationAction() {
	yield takeLatest(
		getType(calculateTruss.request),
		calculateJobQuotationActionSaga
	);
}

function* getTrussesActionSaga(
	action: ReturnType<typeof getTruss.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success, statusText } = yield call(
			fetchSaga,
			ApiURL.TRUSSES,
			Method.GET,
			{
				urlWildCards: action.payload as WildCards,
			}
		);

		if (!success) {
			yield put(getTruss.failure(errorResponseData));
			return;
		}

		yield put(getTruss.success(response));
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(getTruss.failure(err));
	}
}

export function* watchGetTrussesGetAction() {
	yield takeLatest(getType(getTruss.request), getTrussesActionSaga);
}
