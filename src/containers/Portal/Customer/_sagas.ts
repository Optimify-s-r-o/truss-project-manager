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
import { Routes } from './../../../constants/routes';
import { Status } from '../../../components/Toast/_types';
import { translationPath } from '../../../utils/getPath';
import { updateCustomerAction } from './_actions';

function* updateCustomersActionSaga(
	action: ReturnType<typeof updateCustomerAction.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success, statusText } = yield call(
			fetchSaga,
			ApiURL.CUSTOMERS,
			Method.PUT,
			{
				bodyJSON: {
					Evidence: action.payload.Evidence,
					Company: action.payload.Company,
					Person: action.payload.Person,
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
			yield put(updateCustomerAction.failure(errorResponseData));
			return;
		}

		yield put(updateCustomerAction.success(response));
		yield put(getCustomers.request({ Paginate: false }));
		if (action.payload.Redirect) {
			yield put(push(Routes.CUSTOMER_ALL));
		}
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

export function* watchUpdateCustomerAction() {
	yield takeLatest(
		getType(updateCustomerAction.request),
		updateCustomersActionSaga
	);
}

export function* watchRemoveCustomerAction() {
	yield takeLatest(getType(deleteCustomer.request), removeCustomerActionSaga);
}
