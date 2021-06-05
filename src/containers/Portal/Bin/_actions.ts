import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';
import {
	Bin,
	BinRequest,
	BinRestore,
	DeleteRequest
	} from './_types';
import { Data } from '../../../types/_types';
import { Error } from '../../../sagas/_sagas';

export const getBinAction = createAsyncAction(
	"GET_BIN_REQUEST",
	"GET_BIN_SUCCESS",
	"GET_BIN_FAILURE"
)<BinRequest, Data<Bin>, Error>();

export const clearBinReducer = createAction("CLEAR_BIN")();

export const refreshFromBinAction = createAsyncAction(
	"REFRESH_FROM_BIN_REQUEST",
	"REFRESH_FROM_BIN_SUCCESS",
	"REFRESH_FROM_BIN_FAILURE"
)<BinRestore, Data<Bin>, Error>();

export const deleteEntity = createAsyncAction(
	"DELETE_ENTITY_FROM_BIN_REQUEST",
	"DELETE_ENTITY_FROM_BIN_SUCCESS",
	"DELETE_ENTITY_FROM_BIN_FAILURE"
)<DeleteRequest, void, Error>();

export type binActionType = ActionType<
	| typeof getBinAction
	| typeof refreshFromBinAction
	| typeof deleteEntity
	| typeof clearBinReducer
>;
