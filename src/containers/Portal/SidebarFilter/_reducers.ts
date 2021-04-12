import { FilterType } from './_types';
import { getType } from 'typesafe-actions';
import {
	clearFilteredData,
	FilterActionType,
	filterEntities,
	getCustomers,
	getJobs,
	getProjects,
	getTrusses,
	setActive,
	setActiveFilterContent,
	showFilter,
} from "./_actions";

const initialState: FilterType = {
	trusses: null,
	jobs: null,
	projects: null,
	customers: null,
	error: null,
	pending: false,
	activeFilterContent: null,
	activeFilter: false,
	showFilter: false,
	filterPending: false,
};

export default (
	state: FilterType = initialState,
	action: FilterActionType
): FilterType => {
	switch (action.type) {
		case getType(clearFilteredData):
			return {
				...initialState,
			};
		case getType(setActiveFilterContent):
			return {
				...state,
				activeFilterContent: action.payload,
			};
		case getType(setActive):
			return {
				...state,
				activeFilter: action.payload,
			};
		case getType(showFilter):
			return {
				...state,
				showFilter: action.payload,
			};
		case getType(getCustomers.request):
		case getType(getProjects.request):
		case getType(getJobs.request):
		case getType(getTrusses.request):
			return {
				...state,
				pending: true,
			};
		case getType(getCustomers.success):
			return {
				...state,
				customers: action.payload,
				pending: false,
			};
		case getType(getProjects.success):
			return {
				...state,
				projects: action.payload,
				pending: false,
			};
		case getType(getJobs.success):
			return {
				...state,
				jobs: action.payload,
				pending: false,
			};
		case getType(getTrusses.success):
			return {
				...state,
				trusses: action.payload,
				pending: false,
			};
		case getType(filterEntities.request):
			return {
				...state,
				filterPending: true,
			};
		case getType(filterEntities.success):
			return {
				...state,
				filterPending: false,
			};
		case getType(getCustomers.failure):
		case getType(getProjects.failure):
		case getType(getJobs.failure):
		case getType(getTrusses.failure):
		case getType(filterEntities.failure):
			return {
				...state,
				pending: false,
				filterPending: false,
				error: action.payload.ErrorMessage,
			};

		default:
			return state;
	}
};
