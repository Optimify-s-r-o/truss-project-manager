import { CustomersStateType } from './_types';
import { getType } from 'typesafe-actions';
import {
	customerListActionType,
	filterCustomers,
	filterCustomersEvidence,
	filterCustomersLegal,
	filterCustomersPerson,
	getCustomers,
	getCustomersEvidence,
	getCustomersLegal,
	getCustomersPerson,
} from "./_actions";

const initialState: CustomersStateType = {
	error: null,
	pending: false,
	customers: null,
	legal: null,
	person: null,
	evidence: null,
	all: null,
	customerPending: false,
	pageSize: null,
	firstRecordOnPage: null,
	lastRecordOnPage: null,
	currentPage: null,
	totalPages: null,
	totalRecords: null,
	isFiltered: false,
	recordsBeforeFilter: null,
};

export default (
	state: CustomersStateType = initialState,
	action: customerListActionType
): CustomersStateType => {
	switch (action.type) {
		case getType(getCustomers.request):
			return {
				...initialState,
				error: null,
				pageSize: null,
				firstRecordOnPage: null,
				lastRecordOnPage: null,
				currentPage: null,
				totalPages: null,
				totalRecords: null,
				pending: true,
			};
		case getType(filterCustomers.request):
			return {
				...initialState,
				error: null,
				pending: true,
			};
		case getType(getCustomers.success):
			return {
				...state,
				pending: false,
				customers: action.payload,
			};
		case getType(filterCustomers.success):
			return {
				...state,
				pending: false,
				customers: action.payload,
			};
		case getType(getCustomers.failure):
		case getType(filterCustomers.failure):
			return {
				...initialState,
				error: action.payload.ErrorMessage,
				pending: false,
			};
		case getType(getCustomersPerson.request):
		case getType(filterCustomersPerson.request):
			return {
				...state,
				error: null,
				pending: true,
			};
		case getType(getCustomersPerson.success):
		case getType(filterCustomersPerson.success):
			return {
				...state,
				pending: false,
				person: action.payload,
			};
		case getType(getCustomersPerson.failure):
		case getType(filterCustomersPerson.failure):
			return {
				...state,
				error: action.payload.ErrorMessage,
				pending: false,
			};
		case getType(getCustomersLegal.request):
		case getType(filterCustomersLegal.request):
			return {
				...state,
				error: null,
				pending: true,
			};
		case getType(getCustomersLegal.success):
		case getType(filterCustomersLegal.success):
			return {
				...state,
				pending: false,
				legal: action.payload,
			};
		case getType(getCustomersLegal.failure):
		case getType(filterCustomersLegal.failure):
			return {
				...state,
				error: action.payload.ErrorMessage,
				pending: false,
			};
		case getType(getCustomersEvidence.request):
		case getType(filterCustomersEvidence.request):
			return {
				...state,
				error: null,
				pending: true,
			};
		case getType(getCustomersEvidence.success):
		case getType(filterCustomersEvidence.success):
			return {
				...state,
				pending: false,
				evidence: action.payload,
			};
		case getType(getCustomersEvidence.failure):
		case getType(filterCustomersEvidence.failure):
			return {
				...state,
				error: action.payload.ErrorMessage,
				pending: false,
			};
		default:
			return state;
	}
};
