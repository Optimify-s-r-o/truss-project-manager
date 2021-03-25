import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';
import { Error } from '../../../../sagas/_sagas';
import { JobType } from 'src/types/_types';
import { QuotationCalculate } from '../Project/_types';
import { Quotations } from '../../Quotations/_types';
import {
	CopyJob,
	DeleteJob,
	DownloadLink,
	GetTrusses,
	JobRootObject,
	JobsSelectedRequest,
	JobTrusses,
	Materials,
	ProjectNameJobName,
	QuotationsInfo,
	RequestDownloadLink,
	Unlock,
} from "./_types";

export const selectedJob = createAsyncAction(
	"JOB_REQUEST",
	"JOB_SUCCESS",
	"JOB_FAILURE"
)<JobsSelectedRequest, JobRootObject, Error>();

export const copyJob = createAsyncAction(
	"COPY_JOB_REQUEST",
	"COPY_JOB_SUCCESS",
	"COPY_JOB_FAILURE"
)<CopyJob, void, Error>();

export const downloadJob = createAsyncAction(
	"DOWNLOAD_JOB_REQUEST",
	"DOWNLOAD_JOB_SUCCESS",
	"DOWNLOAD_JOB_FAILURE"
)<RequestDownloadLink, DownloadLink, Error>();

export const getJobMaterials = createAsyncAction(
	"GET_JOB_MATERIAL_REQUEST",
	"GET_JOB_MATERIAL_SUCCESS",
	"GET_JOB_MATERIAL_FAILURE"
)<string, Materials, Error>();

export const getJobQuotations = createAsyncAction(
	"GET_JOB_QUOTATIONS_REQUEST",
	"GET_JOB_QUOTATIONS_SUCCESS",
	"GET_JOB_QUOTATIONS_FAILURE"
)<string, QuotationsInfo, Error>();

export const getTrusses = createAsyncAction(
	"JOB_TRUSSES_REQUEST",
	"JOB_TRUSSES_SUCCESS",
	"JOB_TRUSSES_FAILURE"
)<GetTrusses, JobTrusses, Error>();

export const unlockJob = createAsyncAction(
	"UNLOCK_JOB_REQUEST",
	"UNLOCK_JOB_SUCCESS",
	"UNLOCK_JOB_FAILURE"
)<Unlock, void, Error>();

export const updateSelectedJob = createAsyncAction(
	"JOB_UPDATE_REQUEST",
	"JOB_UPDATE_SUCCESS",
	"JOB_UPDATE_FAILURE"
)<JobType, JobRootObject, Error>();

export const deleteJob = createAsyncAction(
	"JOB_DELETE_REQUEST",
	"JOB_DELETE_SUCCESS",
	"JOB_DELETE_FAILURE"
)<DeleteJob, void, Error>();

export const jobImage = createAsyncAction(
	"JOB_IMAGE_REQUEST",
	"JOB_IMAGE_SUCCESS",
	"JOB_IMAGE_FAILURE"
)<string, string, Error>();

export const jobImageByName = createAsyncAction(
	"JOB_IMAGE_BY_NAME_REQUEST",
	"OB_IMAGE_BY_NAME_SUCCESS",
	"OB_IMAGE_BY_NAME_FAILURE"
)<ProjectNameJobName, string, Error>();

export const calculateJob = createAsyncAction(
	"JOB_CALCULATE_REQUEST",
	"JOB_CALCULATE_SUCCESS",
	"JOB_CALCULATE_FAILURE"
)<QuotationCalculate, Quotations, Error>();

export const setJob = createAction("SET_JOB")<JobRootObject>();

export type selectedJobType = ActionType<
	| typeof selectedJob
	| typeof updateSelectedJob
	| typeof jobImage
	| typeof deleteJob
	| typeof unlockJob
	| typeof jobImageByName
	| typeof setJob
	| typeof calculateJob
	| typeof getTrusses
	| typeof getJobMaterials
	| typeof getJobQuotations
	| typeof copyJob
	| typeof downloadJob
>;
