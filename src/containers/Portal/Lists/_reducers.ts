import { getType } from 'typesafe-actions';
import { HeaderSettingsStateType } from './_types';
import {
	getHeaderSettings,
	HeaderSettingsType,
	putHeaderSettings,
} from "./_action";

const initialState: HeaderSettingsStateType = {
	error: null,
	pending: false,
	sort: [],
	sortOrder: [],
	headers: [],
};

export const HeaderSettingsReducer = (
	state: HeaderSettingsStateType = initialState,
	action: HeaderSettingsType
): HeaderSettingsStateType => {
	switch (action.type) {
		case getType(getHeaderSettings.request):
			return {
				...initialState,
				pending: true,
			};
		case getType(putHeaderSettings.request):
			return {
				...state,
				pending: true,
			};
		case getType(getHeaderSettings.success):
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
			return {
				...state,
				error: action.payload.ErrorMessage,
				pending: false,
			};
		default:
			return state;
	}
};
