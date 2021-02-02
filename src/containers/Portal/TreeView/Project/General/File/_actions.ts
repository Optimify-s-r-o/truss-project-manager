import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';
import { Error } from '../../../../../../sagas/_sagas';
import { IAddJsonToProject } from './_types';

export const clearJson = createAction("@common/CLEAR_JSON_FILE")();

export const addJsonToProject = createAsyncAction(
	"INSERT_JSON_REQUEST",
	"INSERT_JSON_SUCCESS",
	"INSERT_JSON_FAILURE"
)<IAddJsonToProject, void, Error>();

export type insertJsonType = ActionType<
	typeof addJsonToProject | typeof clearJson
>;
