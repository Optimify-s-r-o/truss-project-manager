import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';
import { Customer } from '../../../types/_types';
import { CustomerFetch } from './_types';
import { Error } from '../../../sagas/_sagas';

export const customerAction = createAsyncAction(
	"CUSTOMER_REQUEST",
	"CUSTOMER_SUCCESS",
	"CUSTOMER_FAILURE"
)<CustomerFetch, Customer, Error>();

export const updateCustomerAction = createAsyncAction(
	"CUSTOMER_UPDATE_REQUEST",
	"CUSTOMER_UPDATE_SUCCESS",
	"CUSTOMER_UPDATE_FAILURE"
)<Customer, Customer, Error>();

export const clearCustomerAction = createAction("CUSTOMER/CLEAR")();

export const clearEvidenceAction = createAction("CUSTOMER/CLEAR")();

export type customerActionType = ActionType<
	| typeof customerAction
	| typeof clearCustomerAction
	| typeof updateCustomerAction
	| typeof clearEvidenceAction
>;
