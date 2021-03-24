import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';
import { Error } from '../../../../../sagas/_sagas';
import { IProjectDuplicate, ProjectFileRequest } from '../_types';
import { Project } from '../../../../../types/_types';

export const projectUpdate = createAsyncAction(
	"UPDATE_PROJECT_REQUEST",
	"UPDATE_PROJECT_SUCCESS",
	"UPDATE_PROJECT_FAILURE"
)<Project, Project, Error>();

export const duplicateJob = createAsyncAction(
	"DUPLICATE_JOB_REQUEST",
	"DUPLICATE_JOB_SUCCESS",
	"DUPLICATE_JOB_FAILURE"
)<IProjectDuplicate, void, Error>();

export const deleteFile = createAsyncAction(
	"DELETE_FILE_REQUEST",
	"DELETE_FILE_SUCCESS",
	"DELETE_FILE_FAILURE"
)<ProjectFileRequest, void, Error>();

export const setLoading = createAction("HUB_LOADING")<boolean>();

export type projectUpdateActionType = ActionType<
	typeof projectUpdate | typeof setLoading
>;
