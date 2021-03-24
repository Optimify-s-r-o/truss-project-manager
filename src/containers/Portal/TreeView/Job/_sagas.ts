import { ApiURL } from '../../../../constants/api';
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
} from "../../../../sagas/_sagas";
import {
	calculateJob,
	getJobMaterials,
	getJobQuotations,
	getTrusses,
	jobImage,
	jobImageByName,
	updateSelectedJob,
} from "./_actions";

function* JobImageSaga(action: ReturnType<typeof jobImage.request>): Generator {
	try {
		const data: FetchSagaReponseType = yield call(
			fetchSaga,
			ApiURL.JOB_IMAGE,
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

			yield put(jobImage.failure(data.errorResponse));
			yield put(clearNotificationAction());
			return;
		}
		yield put(jobImage.success(window.URL.createObjectURL(data.response)));
		yield put(clearNotificationAction());
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(clearNotificationAction());
		yield put(jobImage.failure(err));
	}
}

export function* watchJobImage() {
	yield takeLatest(getType(jobImage.request), JobImageSaga);
}

function* JobImageByNameSaga(
	action: ReturnType<typeof jobImageByName.request>
): Generator {
	try {
		const data: FetchSagaReponseType = yield call(
			fetchSaga,
			ApiURL.JOB_IMAGE,
			"GET",
			{
				paramObject: action.payload,
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

			yield put(jobImageByName.failure(data.errorResponse));
			yield put(clearNotificationAction());
			return;
		}
		var urlCreator = window.URL || window.webkitURL;

		var imageUrl = urlCreator.createObjectURL(data.response);
		yield put(jobImageByName.success(imageUrl));
		yield put(clearNotificationAction());
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(clearNotificationAction());
		yield put(jobImageByName.failure(err));
	}
}

export function* watchJobImageByName() {
	yield takeLatest(getType(jobImageByName.request), JobImageByNameSaga);
}

function* calculateJobQuotationActionSaga(
	action: ReturnType<typeof calculateJob.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success, statusText } = yield call(
			fetchSaga,
			ApiURL.JOB_QUOTATIONS_CALCULATE,
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
			yield put(calculateJob.failure(errorResponseData));
			return;
		}
		yield put(quotationSelectionGetAction.success(response as Quotations));
		yield put(calculateJob.success(response));
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(calculateJob.failure(err));
	}
}

function* getJobTrussesActionSaga(
	action: ReturnType<typeof getTrusses.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success } = yield call(
			fetchSaga,
			ApiURL.JOB_TRUSSES,
			Method.GET,
			{
				param:
					action.payload.jobId +
					(action.payload.templateId ? "/" + action.payload.templateId : ""),
			}
		);

		if (!success) {
			yield put(getTrusses.failure(errorResponseData));
			return;
		}

		yield put(getTrusses.success(response));
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(getTrusses.failure(err));
	}
}

function* getJobQuotationsActionSaga(
	action: ReturnType<typeof getJobQuotations.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success } = yield call(
			fetchSaga,
			ApiURL.JOBS + "/" + action.payload + "/quotations",
			Method.GET
		);

		if (!success) {
			yield put(getTrusses.failure(errorResponseData));
			return;
		}

		yield put(getJobQuotations.success(response));
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(getJobQuotations.failure(err));
	}
}

function* getJobMaterialsActionSaga(
	action: ReturnType<typeof getJobMaterials.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success } = yield call(
			fetchSaga,
			ApiURL.JOBS + "/" + action.payload + "/material",
			Method.GET
		);

		if (!success) {
			yield put(getJobMaterials.failure(errorResponseData));
			return;
		}

		yield put(getJobMaterials.success(response));
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(getJobMaterials.failure(err));
	}
}

function* updateJobActionSaga(
	action: ReturnType<typeof updateSelectedJob.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success, statusText } = yield call(
			fetchSaga,
			ApiURL.JOBS,
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
			yield put(updateSelectedJob.failure(errorResponseData));
			return;
		}

		yield put(updateSelectedJob.success(response));

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
		yield put(updateSelectedJob.failure(err));
	}
}

export function* watchJobUpdateAction() {
	yield takeLatest(getType(updateSelectedJob.request), updateJobActionSaga);
}

export function* watchGetJobMaterialsAction() {
	yield takeLatest(getType(getJobMaterials.request), getJobMaterialsActionSaga);
}

export function* watchGetJobQuotationsAction() {
	yield takeLatest(
		getType(getJobQuotations.request),
		getJobQuotationsActionSaga
	);
}

export function* watchGetJobTrussesAction() {
	yield takeLatest(getType(getTrusses.request), getJobTrussesActionSaga);
}

export function* watchCalculateJobQuotationAction() {
	yield takeLatest(
		getType(calculateJob.request),
		calculateJobQuotationActionSaga
	);
}
