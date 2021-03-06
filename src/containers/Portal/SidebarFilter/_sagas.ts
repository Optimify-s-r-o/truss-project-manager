import { ApiURL } from '../../../constants/api';
import {
	call,
	put,
	select,
	takeLatest
	} from 'redux-saga/effects';
import { Error, fetchSaga, WildCards } from '../../../sagas/_sagas';
import { getType } from 'typesafe-actions';
import { lang, t } from '../../../translation/i18n';
import { Method } from '../../../constants/enum';
import { notificationAction } from '../../../components/Toast/_actions';
import { Routes } from 'src/constants/routes';
import { Status } from '../../../components/Toast/_types';
import { translationPath } from '../../../utils/getPath';
import {
	filterEntities,
	getCustomers,
	getJobs,
	getProjects,
	getTrusses,
} from "./_actions";

function* getCustomersActionSaga(
	action: ReturnType<typeof getCustomers.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success, statusText } = yield call(
			fetchSaga,
			ApiURL.CUSTOMERS,
			Method.GET,
			{
				urlWildCards: action.payload as WildCards,
			}
		);

		if (!success) {
			yield put(getCustomers.failure(errorResponseData));
			return;
		}

		yield put(getCustomers.success(response));
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(getCustomers.failure(err));
	}
}

function* getProjectsActionSaga(
	action: ReturnType<typeof getProjects.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success, statusText } = yield call(
			fetchSaga,
			ApiURL.PROJECTS,
			Method.GET,
			{
				urlWildCards: action.payload as WildCards,
			}
		);

		if (!success) {
			yield put(getProjects.failure(errorResponseData));
			return;
		}

		yield put(getProjects.success(response));
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(getProjects.failure(err));
	}
}

function* getJobsActionSaga(
	action: ReturnType<typeof getJobs.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success, statusText } = yield call(
			fetchSaga,
			ApiURL.JOBS,
			Method.GET,
			{
				urlWildCards: action.payload as WildCards,
			}
		);

		if (!success) {
			yield put(getJobs.failure(errorResponseData));
			return;
		}

		yield put(getJobs.success(response));
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(getJobs.failure(err));
	}
}

function* getTrussesActionSaga(
	action: ReturnType<typeof getTrusses.request>
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

function* filterEntitiesActionSaga(
	action: ReturnType<typeof filterEntities.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success, statusText } = yield call(
			fetchSaga,
			ApiURL.FILTER,
			Method.POST,
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
			yield put(filterEntities.failure(errorResponseData));
			return;
		}

		yield put(filterEntities.success(response));
		if (action.payload?.location?.pathname === Routes.FILTER_PROJECT) {
			const currentPage = yield select(
				(state: any) => state.FilterReducer.projects?.CurrentPage
			);
			const pageSize = yield select(
				(state: any) => state.FilterReducer.projects?.PageSize
			);
			yield put(
				getProjects.request({
					PageSize: pageSize,
					Page: (currentPage as number) - 1,
				})
			);
		} else if (action.payload?.location?.pathname === Routes.FILTER_JOB) {
			const currentPage = yield select(
				(state: any) => state.FilterReducer.jobs?.CurrentPage
			);
			const pageSize = yield select(
				(state: any) => state.FilterReducer.jobs?.PageSize
			);
			yield put(
				getJobs.request({
					PageSize: pageSize,
					Page: (currentPage as number) - 1,
				})
			);
		} else if (action.payload?.location?.pathname === Routes.FILTER_TRUSS) {
			const currentPage = yield select(
				(state: any) => state.FilterReducer.trusses?.CurrentPage
			);
			const pageSize = yield select(
				(state: any) => state.FilterReducer.trusses?.PageSize
			);
			yield put(
				getTrusses.request({
					PageSize: pageSize,
					Page: (currentPage as number) - 1,
				})
			);
		} else if (action.payload?.location?.pathname === Routes.CUSTOMER_ALL) {
			const currentPage = yield select(
				(state: any) => state.FilterReducer.customers?.CurrentPage
			);
			const pageSize = yield select(
				(state: any) => state.FilterReducer.customers?.PageSize
			);
			yield put(
				getCustomers.request({
					PageSize: pageSize,
					Page: (currentPage as number) - 1,
				})
			);
		}
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(filterEntities.failure(err));
	}
}

export function* watchFilterEntitiesAction() {
	yield takeLatest(getType(filterEntities.request), filterEntitiesActionSaga);
}

export function* watchGetCustomersAction() {
	yield takeLatest(getType(getCustomers.request), getCustomersActionSaga);
}

export function* watchGetProjectsAction() {
	yield takeLatest(getType(getProjects.request), getProjectsActionSaga);
}

export function* watchGetJobsAction() {
	yield takeLatest(getType(getJobs.request), getJobsActionSaga);
}

export function* watchGetTrussesAction() {
	yield takeLatest(getType(getTrusses.request), getTrussesActionSaga);
}
