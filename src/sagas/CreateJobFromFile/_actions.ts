import { createAsyncAction } from 'typesafe-actions';
import { CreateJobFromTrussFile } from './_types';

export const createJobFromTrussFile = createAsyncAction(
	"CREATE_JOB_FROM_TRUSS_FILE_REQUEST",
	"CREATE_JOB_FROM_TRUSS_FILE_SUCCESS",
	"CREATE_JOB_FROM_TRUSS_FILE_FAILURE"
)<CreateJobFromTrussFile, void, Error>();
