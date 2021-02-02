import { ActionType, createAsyncAction } from 'typesafe-actions';
import { Error } from '../../../../sagas/_sagas';
import { Evidence, EvidenceCustomerRequest } from './_types';
import { Fetch } from '../../../../types/_types';

export const saveEvidenceCustomer = createAsyncAction(
	"SAVE_EVIDENCE_CUSTOMER_REQUEST",
	"SAVE_EVIDENCE_CUSTOMER_SUCCESS",
	"SAVE_EVIDENCE_CUSTOMER_FAILURE"
)<EvidenceCustomerRequest, void, Error>();

export const getEvidenceCustomer = createAsyncAction(
	"GET_EVIDENCE_CUSTOMER_REQUEST",
	"GET_EVIDENCE_CUSTOMER_SUCCESS",
	"GET_EVIDENCE_CUSTOMER_FAILURE"
)<Fetch, Evidence, Error>();

export type evidenceCustomerType = ActionType<
	typeof saveEvidenceCustomer | typeof getEvidenceCustomer
>;
