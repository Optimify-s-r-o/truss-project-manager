import { getType } from 'typesafe-actions';
import { SettingsType, TreeType } from '../../types/_types';
import {
	setFolders,
	SettingActionnType,
	settings,
	settingsFilter,
	treeType,
} from "./_actions";

const initialState: SettingsType = {
	settings: null,
	filter: null,
	activeTree: TreeType.PROJECT,
	folders: null,
};

export default (
	state: SettingsType = initialState,
	action: SettingActionnType
): SettingsType => {
	switch (action.type) {
		case getType(settings.request):
			return {
				...state,
			};
		case getType(settings.success):
			return {
				...state,
				settings: action.payload,
			};

		case getType(settings.failure):
			return {
				...state,
			};
		case getType(settingsFilter.request):
			return {
				...state,
			};
		case getType(settingsFilter.success):
			return {
				...state,
				filter: action.payload,
			};

		case getType(settingsFilter.failure):
			return {
				...state,
			};
		case getType(treeType):
			return {
				...state,
				activeTree: action.payload,
			};
		case getType(setFolders):
			return {
				...state,
				folders: action.payload,
			};
		default:
			return state;
	}
};
