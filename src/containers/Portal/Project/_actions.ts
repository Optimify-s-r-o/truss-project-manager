import { ActionType, createAsyncAction } from 'typesafe-actions';
import { Error } from '../../../sagas/_sagas';
import {
	createfromJson,
	DeleteProject,
	Project,
	ProjectRequest,
} from "./_types";

export const createProject = createAsyncAction(
	"PROJECT_REQUEST",
	"PROJECT_SUCCESS",
	"PROJECT_FAILURE"
)<ProjectRequest, Project, Error>();

export const createProjectWithJson = createAsyncAction(
	"PROJECT_FROM_JSON_REQUEST",
	"PROJECT_FROM_JSON_SUCCESS",
	"PROJECT_FROM_JSON_FAILURE"
)<createfromJson, string, Error>();

export const deleteProject = createAsyncAction(
	"DELETE_PROJECT_REQUEST",
	"DELETE_PROJECT_SUCCESS",
	"DELETE_PROJECT_FAILURE"
)<DeleteProject, void, Error>();

export type projectType = ActionType<
	typeof createProject | typeof createProjectWithJson | typeof deleteProject
>;
