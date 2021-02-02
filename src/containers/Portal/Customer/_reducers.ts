import { CustomerStateType } from '../../../types/_types';
import { getType } from 'typesafe-actions';
import {
	clearCustomerAction,
	clearEvidenceAction,
	customerAction,
	customerActionType,
	updateCustomerAction,
} from "./_actions";

const initialState: CustomerStateType = {
	error: null,
	pending: false,
	customer: null,
	createdEvidence: null,
	updatingCustomer: false,
};

export default (
	state: CustomerStateType = initialState,
	action: customerActionType
): CustomerStateType => {
	switch (action.type) {
		case getType(clearCustomerAction):
			return initialState;
		case getType(clearEvidenceAction):
			return { ...state, createdEvidence: null };
		case getType(customerAction.request):
			return {
				...state,
				error: null,
				pending: true,
			};
		case getType(updateCustomerAction.request):
			return {
				...state,
				error: null,
				updatingCustomer: true,
			};
		case getType(customerAction.success):
			return {
				...initialState,
				pending: false,
				customer: action.payload,
			};
		case getType(updateCustomerAction.success):
			return {
				...state,
				error: null,
				createdEvidence: action.payload?.Evidence,
				updatingCustomer: false,
			};
		case getType(customerAction.failure):
		case getType(updateCustomerAction.failure):
			return {
				...state,
				error: action.payload.ErrorMessage,
				pending: false,
				updatingCustomer: false,
			};
		default:
			return state;
	}
};
