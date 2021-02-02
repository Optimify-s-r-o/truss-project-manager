import { deleteProject } from '../../Project/_actions';
import { duplicateJob, projectUpdate } from './General/_actions';
import { getType } from 'typesafe-actions';
import { ProjectStateType } from '../../../../types/_types';
import { updateSelectedJob } from '../Job/_actions';
import {
	calculateProject,
	getProjectFiles,
	getProjectLogs,
	getSelectedProject,
	projectViewActionType,
	setProject,
	uploadProjectFile,
} from "./_actions";

const initialState: ProjectStateType = {
	error: null,
	pending: false,
	project: null,
	logs: null,
	files: null,
	filesPending: false,
	projectPending: false,
	duplicatePending: false,
	duplicateId: null,
	quotationCalculating: false,
	quotations: null,
	filesUploading: false,
};

export default (
	state: ProjectStateType = initialState,
	action: projectViewActionType
): ProjectStateType => {
	switch (action.type) {
		case getType(setProject):
			return {
				...state,
				project: action.payload,
			};
		case getType(getSelectedProject.request):
			return {
				...state,
				error: null,
				pending: true,
			};
		case getType(uploadProjectFile.request):
			return {
				...state,
				error: null,
				filesUploading: true,
			};
		case getType(uploadProjectFile.success):
			return {
				...state,
				error: null,
				filesUploading: false,
			};
		case getType(projectUpdate.request):
			return {
				...state,
				projectPending: false,
			};
		case getType(getSelectedProject.success):
			return {
				...state,
				pending: false,
				projectPending: false,
				project: action.payload,
			};
		case getType(getSelectedProject.failure):
			return {
				...state,
				error: action.payload.ErrorMessage,
				pending: false,
				projectPending: false,
			};
		case getType(getProjectFiles.success):
			return {
				...state,
				files: action.payload,
			};
		case getType(getProjectLogs.request):
			return {
				...state,
			};
		case getType(getProjectLogs.success):
			return {
				...state,
				logs: action.payload,
			};
		case getType(getProjectLogs.failure):
			return {
				...state,
			};
		case getType(calculateProject.request):
			return {
				...state,
				quotationCalculating: true,
			};
		case getType(calculateProject.success):
			return {
				...state,
				quotationCalculating: false,
				quotations: action.payload,
			};
		case getType(updateSelectedJob.request):
			return {
				...state,
			};
		case getType(updateSelectedJob.success):
			return {
				...state,
				pending: true,
			};
		case getType(deleteProject.request):
			return {
				...state,
				pending: true,
			};
		case getType(projectUpdate.success):
		case getType(deleteProject.success):
			return {
				...state,
				pending: false,
			};
		case getType(duplicateJob.request):
			return {
				...state,
				duplicatePending: true,
				duplicateId: action.payload.param as string,
			};
		case getType(duplicateJob.success):
			return {
				...state,
				duplicatePending: false,
			};
		case getType(updateSelectedJob.failure):
		case getType(duplicateJob.failure):
		case getType(projectUpdate.failure):
		case getType(deleteProject.failure):
		case getType(calculateProject.failure):
		case getType(uploadProjectFile.failure):
			return {
				...state,
				duplicatePending: false,
				pending: false,
				quotationCalculating: false,
				filesUploading: false,
			};
		default:
			return state;
	}
};
