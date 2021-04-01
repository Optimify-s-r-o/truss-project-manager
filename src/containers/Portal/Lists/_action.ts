import { ActionType, createAsyncAction } from 'typesafe-actions';
import { Error } from '../../../sagas/_sagas';
import { HeaderSettings, PutHeaderSettings } from './_types';

export const getHeaderSettings = createAsyncAction(
	"GET_HEADER_SETTING_REQUEST",
	"GET_HEADER_SETTING_SUCCESS",
	"GET_HEADER_SETTING_FAILURE"
)<string, HeaderSettings, Error>();

export const putHeaderSettings = createAsyncAction(
	"PU_HEADER_SETTING_REQUEST",
	"PUT_HEADER_SETTING_SUCCESS",
	"PUT_HEADER_SETTING_FAILURE"
)<PutHeaderSettings, HeaderSettings, Error>();

export type HeaderSettingsType = ActionType<
	typeof putHeaderSettings | typeof getHeaderSettings
>;
