import { ActionType, createAction, createAsyncAction } from "typesafe-actions";
import { Error } from "../../../../sagas/_sagas";
import { JobRootObject } from "../../../../types/_types";
import { JobsSelectedRequest } from "../Job/_types";

export const getSelectedJobs = createAsyncAction(
	"JOB_MULTIPLE_REQUEST",
	"JOB_MULTIPLE_SUCCESS",
	"JOB_MULTIPLE_FAILURE"
)<JobsSelectedRequest, JobRootObject, Error>();

export const clearSelectedJobs = createAction("JOB_MULTIPLE/CLEAR")();

export type selectedJobsType = ActionType<
	typeof getSelectedJobs | typeof clearSelectedJobs
>;
