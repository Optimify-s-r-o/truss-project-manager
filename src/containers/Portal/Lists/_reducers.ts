import { getType } from 'typesafe-actions';
import { HeaderSettingsStateType } from './_types';
import {
	getHeaderSettings,
	HeaderSettingsType,
	putHeaderSettings,
	resetHeaderSettings,
	setDisabledColumnSelector,
	setSort,
	setSortOrder,
} from "./_action";

const initialState: HeaderSettingsStateType = {
	error: null,
	pending: false,
	sort: [],
	sortOrder: [],
	headers: [],
	disabled: [],
};

export const HeaderSettingsReducer = (
	state: HeaderSettingsStateType = initialState,
	action: HeaderSettingsType
): HeaderSettingsStateType => {
	switch (action.type) {
		case getType(setDisabledColumnSelector):
			return {
				...state,
				disabled: action.payload,
			};
		case getType(setSort):
			return {
				...state,
				sort: action.payload,
			};
		case getType(setSortOrder):
			return {
				...state,
				sortOrder: action.payload,
			};
		case getType(getHeaderSettings.request):
		case getType(resetHeaderSettings.request):
			return {
				...initialState,
				sort: [],
				sortOrder: [],
				headers: null,
				disabled: null,
				pending: true,
			};
		case getType(putHeaderSettings.request):
			return {
				...state,
				pending: true,
			};
		case getType(getHeaderSettings.success):
		case getType(resetHeaderSettings.success):
			return {
				...state,
				sort: action.payload.Sorts,
				sortOrder: action.payload.SortOrder,
				headers: action.payload.Headers,
				pending: false,
			};
		case getType(putHeaderSettings.success):
			return {
				...state,
				pending: false,
			};
		case getType(getHeaderSettings.failure):
		case getType(putHeaderSettings.failure):
		case getType(resetHeaderSettings.failure):
			return {
				...state,
				error: action.payload.ErrorMessage,
				pending: false,
			};
		default:
			return state;
	}
};
