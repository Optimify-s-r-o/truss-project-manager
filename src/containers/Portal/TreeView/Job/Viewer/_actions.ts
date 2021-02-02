import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';
import { Error } from '../../../../../sagas/_sagas';
import { Viewer, ViewerRequest } from './_types';

export const uploadModelPostAction = createAsyncAction(
	"UPLOAD_MODEL_POST_REQUEST",
	"UPLOAD_MODEL_POST_SUCCESS",
	"UPLOAD_MODEL_POST_FAILURE"
)<ViewerRequest, void, Error>();

export const editModelPutAction = createAsyncAction(
	"EDIT_MODEL_PUT_REQUEST",
	"EDIT_MODEL_PUT_SUCCESS",
	"EDIT_MODEL_PUT_FAILURE"
)<ViewerRequest, void, Error>();

export const modelsGetAction = createAsyncAction(
	"MODELS_GET_ACTION_REQUEST",
	"MODELS_GET_ACTION_SUCCESS",
	"MODELS_GET_ACTION_FAILURE"
)<string, Viewer, Error>();

export const deleteModel = createAsyncAction(
	"DELETE_MODEL_REQUEST",
	"DELETE_MODEL_SUCCESS",
	"DELETE_MODEL_FAILURE"
)<string, void, Error>();

export const clearModels = createAction("CLEAR_MODELS")();

export type selectedJobType = ActionType<
	| typeof clearModels
	| typeof deleteModel
	| typeof modelsGetAction
	| typeof editModelPutAction
	| typeof uploadModelPostAction
>;
