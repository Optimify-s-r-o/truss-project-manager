import { ApiURL } from '../../../../constants/api';
import { calculateProject } from './_actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import { duplicateJob, projectUpdate } from './General/_actions';
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

function* updateProjectActionSaga(
	action: ReturnType<typeof projectUpdate.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success, statusText } = yield call(
			fetchSaga,
			ApiURL.PROJECTS,
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
			yield put(projectUpdate.failure(errorResponseData));
			return;
		}

		yield put(projectUpdate.success(response));

		if (action.payload.callback) {
			action.payload.callback();
		}
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(projectUpdate.failure(err));
	}
}

function* duplicateJobActionSaga(
	action: ReturnType<typeof duplicateJob.request>
): Generator {
	yield put(
		notificationAction({
			code: Status.INFO,
			message: t(translationPath(lang.common.duplicating)),
		})
	);
	try {
		// @ts-ignore
		const { errorResponseData, response, success, statusText } = yield call(
			fetchSaga,
			ApiURL.JOB_DUPLICATE,
			Method.POST,
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
			yield put(duplicateJob.failure(errorResponseData));
			return;
		}

		yield put(duplicateJob.success(response));
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(duplicateJob.failure(err));
	}
}
export function* watchDuplicateAction() {
	yield takeLatest(getType(duplicateJob.request), duplicateJobActionSaga);
}

export function* watchProjectUpdateAction() {
	yield takeLatest(getType(projectUpdate.request), updateProjectActionSaga);
}

export function* watchCalculateProjectQuotationAction() {
	yield takeLatest(
		getType(calculateProject.request),
		calculateProjectQuotationActionSaga
	);
}
