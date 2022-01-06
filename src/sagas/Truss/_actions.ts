import { createAsyncAction } from 'typesafe-actions';

import { TrussExe } from '../../types/_types';

export const createTruss = createAsyncAction(
	"CREATE_TRUSS_REQUEST",
	"CREATE_TRUSS_SUCCESS",
	"CREATE_TRUSS_FAILURE"
)<OpenTruss, void, Error>();

export const editTruss = createAsyncAction(
	"EDIT_TRUSS_REQUEST",
	"EDIT_TRUSS_SUCCESS",
	"EDIT_TRUSS_FAILURE"
)<EditTruss, void, Error>();

export interface OpenTruss {
	jobId?: string;
	jobName: string;
	projectId?: string;
	projectName?: string;
	trussExe?: string;
	fileType?: TrussExe;
}

export interface EditTruss {
	jobId: string;
	jobName: string;
	projectId?: string;
	projectName: string;
	trussExe: string;
	fileType?: TrussExe;
}


export enum OpenTrussOption {
	NEWJOB = "newJob",
	EDITJOB = "editJob",
	IMPORTJOB = "importJob"
}
