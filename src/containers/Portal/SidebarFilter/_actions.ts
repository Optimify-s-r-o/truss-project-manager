import { ActionType, createAsyncAction } from 'typesafe-actions';
import { CustomersAll } from '../Lists/Customers/_types';
import {
	Data,
	JobType,
	Page,
	Project,
	Truss
	} from '../../../types/_types';
import { Error } from '../../../sagas/_sagas';
import { FilteredData } from './_types';

export const filterEntities = createAsyncAction(
	"FILTER_REQUEST",
	"FILTER_SUCCESS",
	"FILTER_FAILURE"
)<any, FilteredData, Error>();

export const getCustomers = createAsyncAction(
	"FILTERED_CUSTOMERS_REQUEST",
	"FILTERED_CUSTOMERS_SUCCESS",
	"FILTERED_CUSTOMERS_FAILURE"
)<Page, Data<CustomersAll>, Error>();

export const getProjects = createAsyncAction(
	"FILTERED_PROJECTS_REQUEST",
	"FILTERED_PROJECTS_SUCCESS",
	"FILTERED_PROJECTS_FAILURE"
)<Page, Data<Project>, Error>();

export const getJobs = createAsyncAction(
	"FILTERED_JOBS_REQUEST",
	"FILTERED_JOBS_SUCCESS",
	"FILTERED_JOBS_FAILURE"
)<Page, Data<JobType>, Error>();

export const getTrusses = createAsyncAction(
	"FILTERED_TRUSSES_REQUEST",
	"FILTERED_TRUSSES_SUCCESS",
	"FILTERED_TRUSSES_FAILURE"
)<Page, Data<Truss>, Error>();

export type FilterActionType = ActionType<
	| typeof filterEntities
	| typeof getCustomers
	| typeof getProjects
	| typeof getJobs
	| typeof getTrusses
>;
