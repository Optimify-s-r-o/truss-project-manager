import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';
import { deleteProject } from '../../Project/_actions';
import { duplicateJob, projectUpdate } from './General/_actions';
import { Error } from '../../../../sagas/_sagas';
import { Project } from '../../../../types/_types';
import { Quotations } from '../../Quotations/_types';
import { SelectedProjectsRequest } from '../Projects/_types';
import { updateSelectedJob } from '../Job/_actions';
import {
	ProjectFile,
	ProjectFileRequest,
	ProjectLog,
	ProjectLogsRequest,
	ProjectUploadFileRequest,
	QuotationCalculate,
} from "./_types";

export const getSelectedProject = createAsyncAction(
	"PROJECT_VIEW_REQUEST",
	"PROJECT_VIEW_SUCCESS",
	"PROJECT_VIEW_FAILURE"
)<SelectedProjectsRequest, Project, Error>();

export const getProjectFiles = createAsyncAction(
	"PROJECT_FILE_REQUEST",
	"PROJECT_FILE_SUCCESS",
	"PROJECT_FILE_FAILURE"
)<ProjectFileRequest, ProjectFile[], Error>();

export const getProjectLogs = createAsyncAction(
	"PROJECT_LOGS_REQUEST",
	"PROJECT_LOGS_SUCCESS",
	"PROJECT_LOGS_FAILURE"
)<ProjectLogsRequest, ProjectLog[], Error>();

export const uploadProjectFile = createAsyncAction(
	"PROJECT_FILE_UPLOAD_REQUEST",
	"PROJECT_FILE_UPLOAD_SUCCESS",
	"PROJECT_FILE_UPLOAD_FAILURE"
)<ProjectUploadFileRequest, void, Error>();

export const calculateProject = createAsyncAction(
	"PROJECT_CALCULATE_REQUEST",
	"PROJECT_CALCULATE_SUCCESS",
	"PROJECT_CALCULATE_FAILURE"
)<QuotationCalculate, Quotations, Error>();

export const setProject = createAction("SET_PROJECT")<Project>();

export type projectViewActionType = ActionType<
	| typeof getSelectedProject
	| typeof duplicateJob
	| typeof getProjectFiles
	| typeof projectUpdate
	| typeof getProjectLogs
	| typeof calculateProject
	| typeof updateSelectedJob
	| typeof deleteProject
	| typeof uploadProjectFile
	| typeof setProject
>;
