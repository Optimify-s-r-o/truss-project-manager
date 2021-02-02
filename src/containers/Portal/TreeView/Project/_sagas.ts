import { ApiURL } from '../../../../constants/api';
import { calculateProject } from './_actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import { Error, fetchSaga } from '../../../../sagas/_sagas';
import { getType } from 'typesafe-actions';
import { lang, t } from '../../../../translation/i18n';
import { Method } from '../../../../constants/enum';
import { notificationAction } from '../../../../components/Toast/_actions';
import { Quotations } from '../../Quotations/_types';
import { quotationSelectionGetAction } from '../../Quotations/_actions';
import { Status } from '../../../../components/Toast/_types';
import { translationPath } from '../../../../utils/getPath';

function* calculateProjectQuotationActionSaga(
	action: ReturnType<typeof calculateProject.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success } = yield call(
			fetchSaga,
			ApiURL.PROJECT_QUOTATIONS_CALCULATE,
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
			yield put(calculateProject.failure(errorResponseData));
			return;
		}
		yield put(quotationSelectionGetAction.success(response as Quotations));
		yield put(calculateProject.success(response));
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(calculateProject.failure(err));
	}
}

export function* watchCalculateProjectQuotationAction() {
	yield takeLatest(
		getType(calculateProject.request),
		calculateProjectQuotationActionSaga
	);
}
