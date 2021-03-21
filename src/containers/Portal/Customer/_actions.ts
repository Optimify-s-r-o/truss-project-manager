import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';
import { CreateCustomer, Customer, CustomerSimplified } from './_types';
import { Data, Page } from '../../../types/_types';
import { Error } from '../../../sagas/_sagas';

export const getAllCustomersSimplifiedAction = createAsyncAction(
	"GET_ALL_CUSTOMERS_REQUEST",
	"GET_ALL_CUSTOMERS_SUCCESS",
	"GET_ALL_CUSTOMERS_FAILURE"
)<Page, Data<CustomerSimplified>, Error>();

export const getCustomerByIdAction = createAsyncAction(
	"GET_CUSTOMER_BY_ID_REQUEST",
	"GET_CUSTOMER_BY_ID_SUCCESS",
	"GET_CUSTOMER_BY_ID_FAILURE"
)<string, Customer, Error>();

export const createCustomerAction = createAsyncAction(
	"CREATE_CUSTOMER_REQUEST",
	"CREATE_CUSTOMER_SUCCESS",
	"CREATE_CUSTOMER_FAILURE"
)<CreateCustomer, Customer, Error>();

export const updateCustomerAction = createAsyncAction(
	"UPDATE_CUSTOMER_REQUEST",
	"UPDATE_CUSTOMER_SUCCESS",
	"UPDATE_CUSTOMER_FAILURE"
)<Customer, Customer, Error>();

export const deleteCustomerAction = createAsyncAction(
	"DELETE_CUSTOMER_REQUEST",
	"DELETE_CUSTOMER_SUCCESS",
	"DELETE_CUSTOMER_FAILURE"
)<string, Customer, Error>();

export const clearCustomerAction = createAction("CUSTOMER/CLEAR")();

export const loadCompanyDataFromAres = createAsyncAction(
	"LOAD_COMPANY_DATA_FROM_ARES_REQUEST",
	"LOAD_COMPANY_DATA_FROM_ARES_SUCCESS",
	"LOAD_COMPANY_DATA_FROM_ARES_FAILURE"
)<string, Customer, Error>();

export const clearAres = createAction("CLEAR_ARES")();

export type customerActionType = ActionType<
	| typeof getAllCustomersSimplifiedAction
	| typeof getCustomerByIdAction
	| typeof createCustomerAction
	| typeof updateCustomerAction
	| typeof deleteCustomerAction
	| typeof clearCustomerAction
	| typeof loadCompanyDataFromAres
	| typeof clearAres
>;
