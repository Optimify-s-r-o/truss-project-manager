import { CustomerStateType } from '../../../types/_types';
import { getType } from 'typesafe-actions';
import {
	clearAres,
	clearCustomerAction,
	createCustomerAction,
	customerActionType,
	deleteCustomerAction,
	getAllCustomersSimplifiedAction,
	getCustomerByIdAction,
	loadCompanyDataFromAres,
	updateCustomerAction,
} from "./_actions";

const initialState: CustomerStateType = {
	error: null,
	pending: false,
	customer: null,
	newCustomer: null,
	ares: null,
	customersSimplified: null,
	customers: null,
	aresPending: false,
};

export default (
	state: CustomerStateType = initialState,
	action: customerActionType
): CustomerStateType => {
	switch (action.type) {
		case getType(clearCustomerAction):
		case getType(clearAres):
			return initialState;
		case getType(getAllCustomersSimplifiedAction.request):
		case getType(getCustomerByIdAction.request):
		case getType(createCustomerAction.request):
		case getType(updateCustomerAction.request):
		case getType(deleteCustomerAction.request):
			return {
				...state,
				error: null,
				pending: true,
			};
		case getType(loadCompanyDataFromAres.request):
			return {
				...state,
				error: null,
				aresPending: true,
			};
		case getType(getCustomerByIdAction.success):
			return {
				...initialState,
				pending: false,
				customer: action.payload,
			};
		case getType(loadCompanyDataFromAres.success):
			return {
				...state,
				error: null,
				aresPending: false,
				ares: action.payload,
			};
		case getType(getAllCustomersSimplifiedAction.success):
			return {
				...state,
				error: null,
				pending: false,
				customersSimplified: action.payload,
			};
		case getType(updateCustomerAction.success):
		case getType(deleteCustomerAction.success):
			return {
				...state,
				error: null,
				pending: false,
			};
		case getType(createCustomerAction.success):
			return {
				...state,
				error: null,
				pending: false,
				newCustomer: action.payload,
			};
		case getType(getAllCustomersSimplifiedAction.failure):
		case getType(getCustomerByIdAction.failure):
		case getType(createCustomerAction.failure):
		case getType(updateCustomerAction.failure):
		case getType(deleteCustomerAction.failure):
		case getType(loadCompanyDataFromAres.failure):
			return {
				...state,
				error: action.payload.ErrorMessage,
				pending: false,
			};
		default:
			return state;
	}
};
