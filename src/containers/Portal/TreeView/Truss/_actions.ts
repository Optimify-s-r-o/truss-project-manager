import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';
import { Error } from '../../../../sagas/_sagas';
import { Page } from './../../../../types/_types';
import { QuotationCalculate } from '../Project/_types';
import { Quotations } from '../../Quotations/_types';
import { Truss } from './_types';

export const getTruss = createAsyncAction(
	"TRUSS_REQUEST",
	"TRUSS_SUCCESS",
	"TRUSS_FAILURE"
)<Page, Truss, Error>();

export const trussImage = createAsyncAction(
	"TRUSS_IMAGE_REQUEST",
	"TRUSS_IMAGE_SUCCESS",
	"TRUSS_IMAGE_FAILURE"
)<string, string, Error>();

export const calculateTruss = createAsyncAction(
	"TRUSS_CALCULATE_REQUEST",
	"TRUSS_CALCULATE_SUCCESS",
	"TRUSS_CALCULATE_FAILURE"
)<QuotationCalculate, Quotations, Error>();

export const setTruss = createAction("SET_TRUSS")<Truss>();

export type trussType = ActionType<
	typeof getTruss | typeof trussImage | typeof calculateTruss | typeof setTruss
>;
