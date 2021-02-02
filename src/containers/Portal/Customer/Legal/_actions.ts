import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';
import { Company, Fetch } from '../../../../types/_types';
import { CustomerRootObject, IArest } from './_types';
import { Error } from '../../../../sagas/_sagas';

export const arest = createAsyncAction(
	"LOAD_DATA_REQUEST",
	"LOAD_DATA_SUCCESS",
	"LOAD_DATA_FAILURE"
)<IArest, Company, Error>();

export const clearArest = createAction("CLEAR_AREST")();
export const clearLegal = createAction("CLEAR_LEGAL")();

export const SaveLegalCustomerAction = createAsyncAction(
	"SAVE_LEGAL_PERSON_REQUEST",
	"SAVE_LEGAL_PERSON_SUCCESS",
	"SAVE_LEGAL_PERSON_FAILURE"
)<CustomerRootObject, void, Error>();

export const getLegalPersonById = createAsyncAction(
	"GET_LEGAL_PERSON_BY_ID_REQUEST",
	"GET_LEGAL_PERSON_BY_ID_SUCCESS",
	"GET_LEGAL_PERSON_BY_ID_FAILURE"
)<Fetch, Company, Error>();

export type legalPersonType = ActionType<
	| typeof arest
	| typeof SaveLegalCustomerAction
	| typeof clearArest
	| typeof clearLegal
	| typeof getLegalPersonById
>;
