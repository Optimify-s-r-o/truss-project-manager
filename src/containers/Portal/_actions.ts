import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';
import { Error } from '../../sagas/_sagas';
import {
	Fetch,
	FilterSettings,
	Folder,
	Settings,
	TreeType,
} from "../../types/_types";

export const settings = createAsyncAction(
	"SETTING_REQUEST",
	"SETTING_SUCCESS",
	"SETTING_FAILURE"
)<Fetch, Settings, Error>();

export const settingsFilter = createAsyncAction(
	"SETTINGS_FILTER_REQUEST",
	"SETTINGS_FILTER_SUCCESS",
	"SETTING_FILTER_FAILURE"
)<Fetch, FilterSettings, Error>();

export const treeType = createAction("TREE_TYPE")<TreeType>();
export const setFolders = createAction("SET_FOLDERS")<Folder>();
export const setTrussFilesPath = createAction("SET_TRUSS_FILES_PATH")<string>();

export type SettingActionnType = ActionType<
	| typeof settings
	| typeof settingsFilter
	| typeof treeType
	| typeof setFolders
	| typeof setTrussFilesPath
>;
