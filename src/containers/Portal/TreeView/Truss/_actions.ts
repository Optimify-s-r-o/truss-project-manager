import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';
import { Error } from '../../../../sagas/_sagas';
import { Material, Truss, TrussQuotationInfo } from './_types';
import { Page } from './../../../../types/_types';
import { QuotationCalculate } from '../Project/_types';
import { Quotations } from '../../Quotations/_types';

export const getTruss = createAsyncAction(
	"TRUSS_REQUEST",
	"TRUSS_SUCCESS",
	"TRUSS_FAILURE"
)<Page, Truss, Error>();

export const getTrussMaterials = createAsyncAction(
	"GET_TRUSS_MATERIAL_REQUEST",
	"GET_TRUSS_MATERIAL_SUCCESS",
	"GET_TRUSS_MATERIAL_FAILURE"
)<string, Material, Error>();

export const getTrussQuotations = createAsyncAction(
	"GET_TRUSS_QUOTATIONS_REQUEST",
	"GET_TRUSS_QUOTATIONS_SUCCESS",
	"GET_TRUSS_QUOTATIONS_FAILURE"
)<string, TrussQuotationInfo, Error>();

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
	| typeof getTruss
	| typeof trussImage
	| typeof calculateTruss
	| typeof setTruss
	| typeof getTrussMaterials
	| typeof getTrussQuotations
>;
