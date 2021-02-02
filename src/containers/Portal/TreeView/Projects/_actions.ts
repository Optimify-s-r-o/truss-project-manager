import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';
import { Error } from '../../../../sagas/_sagas';
import { JobRootObject } from '../../../../types/_types';
import { SelectedProjectsRequest } from './_types';

export const getSelectedProjects = createAsyncAction(
	"PROJECT_MULTIPLE_REQUEST",
	"PROJECT_MULTIPLE_SUCCESS",
	"PROJECT_MULTIPLE_FAILURE"
)<SelectedProjectsRequest, JobRootObject, Error>();

export const clearSelectedProjects = createAction("PROJECT_MULTIPLE/CLEAR")();

export type selectedProjectsType = ActionType<
	typeof getSelectedProjects | typeof clearSelectedProjects
>;
