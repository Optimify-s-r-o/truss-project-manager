import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';
import { Credentials } from './_types';
import { Error } from '../../../sagas/_sagas';
import { localUsers, loginLocal, setLocal } from '../Local/_actions';
import { resetPassword } from '../LostPassword/_actions';
import { UserInfo } from '../../../types/_types';

export const login = createAsyncAction(
	"LOGIN_REQUEST",
	"LOGIN_SUCCESS",
	"LOGIN_FAILURE"
)<Credentials, UserInfo, Error>();

export const setCloud = createAction("SET_CLOOUD")<boolean>();

export type loginType = ActionType<
	| typeof login
	| typeof setCloud
	| typeof localUsers
	| typeof loginLocal
	| typeof setLocal
	| typeof resetPassword
>;
