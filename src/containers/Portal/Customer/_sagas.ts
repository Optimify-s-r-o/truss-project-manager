import { ApiURL } from '../../../constants/api';
import { call, put, takeLatest } from 'redux-saga/effects';
import { deleteCustomer } from '../Lists/Customers/_actions';
import { Error, fetchSaga } from '../../../sagas/_sagas';
import { getCustomers } from './../SidebarFilter/_actions';
import { getType } from 'typesafe-actions';
import { lang, t } from '../../../translation/i18n';
import { Method } from '../../../constants/enum';
import { notificationAction } from '../../../components/Toast/_actions';
import { push } from 'connected-react-router';
import { Routes } from 'src/constants/routes';
import { Status } from '../../../components/Toast/_types';
import { translationPath } from '../../../utils/getPath';
import {
	createCustomerAction,
	getAllCustomersSimplifiedAction,
	getCustomerByIdAction,
	loadCompanyDataFromAres,
	updateCustomerAction,
} from "./_actions";

function* getDataFromAresActionSaga(
	action: ReturnType<typeof loadCompanyDataFromAres.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success } = yield call(
			fetchSaga,
			ApiURL.ARES,
			Method.GET,
			{
				param: action.payload,
			}
		);

		if (!success) {
			yield put(loadCompanyDataFromAres.failure(errorResponseData));
			return;
		}

		yield put(loadCompanyDataFromAres.success(response));
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(loadCompanyDataFromAres.failure(err));
	}
}

function* getCustomersSimplifiedActionSaga(
	action: ReturnType<typeof getAllCustomersSimplifiedAction.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success } = yield call(
			fetchSaga,
			ApiURL.CUSTOMERS_ALL,
			Method.GET
		);

		if (!success) {
			yield put(getAllCustomersSimplifiedAction.failure(errorResponseData));
			return;
		}

		yield put(getAllCustomersSimplifiedAction.success(response));
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(getAllCustomersSimplifiedAction.failure(err));
	}
}

function* getCustomerByIdActionSaga(
	action: ReturnType<typeof getCustomerByIdAction.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success } = yield call(
			fetchSaga,
			ApiURL.CUSTOMERS,
			Method.GET,
			{
				param: action.payload,
			}
		);

		if (!success) {
			yield put(getCustomerByIdAction.failure(errorResponseData));
			return;
		}

		yield put(getCustomerByIdAction.success(response));
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(getCustomerByIdAction.failure(err));
	}
}

function* createCustomerActionSaga(
	action: ReturnType<typeof createCustomerAction.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success, statusText } = yield call(
			fetchSaga,
			ApiURL.CUSTOMERS,
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
			yield put(createCustomerAction.failure(errorResponseData));
			return;
		}
		if (action.payload.Redirect) {
			yield put(push(Routes.CUSTOMER_ALL));
		}
		yield put(
			getCustomers.request({ Page: 0, PageSize: 25, Sort: "", Paginate: true })
		);
		yield put(createCustomerAction.success(response));
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(createCustomerAction.failure(err));
	}
}

function* updateCustomerActionSaga(
	action: ReturnType<typeof updateCustomerAction.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success, statusText } = yield call(
			fetchSaga,
			ApiURL.CUSTOMERS,
			Method.PUT,
			{
				bodyJSON: action.payload,
				param: action.payload.Id,
			}
		);

		if (!success) {
			yield put(
				notificationAction({
					code: Status.ERROR,
					message: t(translationPath(lang.common[statusText])),
				})
			);
			yield put(updateCustomerAction.failure(errorResponseData));
			return;
		}

		yield put(updateCustomerAction.success(response));
		yield put(getCustomers.request({ Page: 0, PageSize: 25, Sort: "" }));
		yield put(push(Routes.CUSTOMER_ALL));
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(updateCustomerAction.failure(err));
	}
}

function* removeCustomerActionSaga(
	action: ReturnType<typeof deleteCustomer.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success, statusText } = yield call(
			fetchSaga,
			ApiURL.CUSTOMERS,
			Method.DELETE,
			{
				param: action.payload.id,
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
			yield put(deleteCustomer.failure(errorResponseData));
			return;
		}

		yield put(deleteCustomer.success(response));
		yield put(getCustomers.request(action.payload.requiredPage));
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(deleteCustomer.failure(err));
	}
}

export function* watchAresGetAction() {
	yield takeLatest(
		getType(loadCompanyDataFromAres.request),
		getDataFromAresActionSaga
	);
}

export function* watchGetCustomerSimplifiedAction() {
	yield takeLatest(
		getType(getAllCustomersSimplifiedAction.request),
		getCustomersSimplifiedActionSaga
	);
}

export function* watchGetCustomerByIdAction() {
	yield takeLatest(
		getType(getCustomerByIdAction.request),
		getCustomerByIdActionSaga
	);
}
export function* watchCreateCustomerAction() {
	yield takeLatest(
		getType(createCustomerAction.request),
		createCustomerActionSaga
	);
}

export function* watchUpdateCustomerAction() {
	yield takeLatest(
		getType(updateCustomerAction.request),
		updateCustomerActionSaga
	);
}

export function* watchRemoveCustomerAction() {
	yield takeLatest(getType(deleteCustomer.request), removeCustomerActionSaga);
}
