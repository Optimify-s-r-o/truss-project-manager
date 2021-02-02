import { ActionType, createAsyncAction } from 'typesafe-actions';
import { Error } from '../../../../sagas/_sagas';
import {
	Company,
	Customer,
	Evidence,
	Fetch,
	Person,
} from "../../../../types/_types";
import {
	CustomersEvidenceFilterRequest,
	CustomersLegalFilterRequest,
	CustomersPersonFilterRequest,
	DeleteRequest,
	FilterRequest,
} from "./_types";

export const getCustomers = createAsyncAction(
	"CUSTOMER_LIST_REQUEST",
	"CUSTOMER_LIST_SUCCESS",
	"CUSTOMER_LIST_FAILURE"
)<Fetch, Customer[], Error>();

export const deleteCustomer = createAsyncAction(
	"DELETE_CUSTOMER_REQUEST",
	"DELETE_CUSTOMER_SUCCESS",
	"DELETE_CUSTOMER_FAILURE"
)<DeleteRequest, void, Error>();

export const filterCustomers = createAsyncAction(
	"FILTER_CUSTOMER_REQUEST",
	"FILTER_CUSTOMER_SUCCESS",
	"FILTER_CUSTOMER_FAILURE"
)<FilterRequest, Customer[], Error>();

export const getCustomersPerson = createAsyncAction(
	"CUSTOMERS_PERSON_REQUEST",
	"CUSTOMERS_PERSON_SUCCESS",
	"CUSTOMERS_PERSON_FAILURE"
)<Fetch, Person[], Error>();

export const filterCustomersPerson = createAsyncAction(
	"CUSTOMERS_PERSON_FILTER_REQUEST",
	"CUSTOMERS_PERSON_FILTER_SUCCESS",
	"CUSTOMERS_PERSON_FILTER_FAILURE"
)<CustomersPersonFilterRequest, Person[], Error>();

export const getCustomersLegal = createAsyncAction(
	"CUSTOMERS_LEGAL_REQUEST",
	"CUSTOMERS_LEGAL_SUCCESS",
	"CUSTOMERS_LEGAL_FAILURE"
)<Fetch, Company[], Error>();

export const filterCustomersLegal = createAsyncAction(
	"CUSTOMERS_LEGAL_FILTER_REQUEST",
	"CUSTOMERS_LEGAL_FILTER_SUCCESS",
	"CUSTOMERS_LEGAL_FILTER_FAILURE"
)<CustomersLegalFilterRequest, Company[], Error>();

export const getCustomersEvidence = createAsyncAction(
	"CUSTOMERS_EVIDENCE_REQUEST",
	"CUSTOMERS_EVIDENCE_SUCCESS",
	"CUSTOMERS_EVIDENCE_FAILURE"
)<Fetch, Evidence[], Error>();

export const filterCustomersEvidence = createAsyncAction(
	"CUSTOMERS_EVIDENCE_FILTER_REQUEST",
	"CUSTOMERS_EVIDENCE_FILTER_SUCCESS",
	"CUSTOMERS_EVIDENCE_FILTER_FAILURE"
)<CustomersEvidenceFilterRequest, Evidence[], Error>();

export type customerListActionType = ActionType<
	| typeof getCustomers
	| typeof filterCustomers
	| typeof deleteCustomer
	| typeof filterCustomersPerson
	| typeof getCustomersPerson
	| typeof getCustomersLegal
	| typeof filterCustomersLegal
	| typeof getCustomersEvidence
	| typeof filterCustomersEvidence
>;
