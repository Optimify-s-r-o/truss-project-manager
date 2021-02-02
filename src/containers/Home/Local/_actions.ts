import { createAction, createAsyncAction } from 'typesafe-actions';
import { Credentials } from '../Cloud/_types';
import { Error } from '../../../sagas/_sagas';
import { UserData } from '../../Portal/Accounts/_types';
import { UserInfo } from '../../../types/_types';

export const localUsers = createAsyncAction(
	"LOCAL_USERS_REQUEST",
	"LOCAL_USERS_SUCCESS",
	"LOCAL_USERS_FAILURE"
)<void, UserData[], Error>();

export const loginLocal = createAsyncAction(
	"LOGIN_LOCAL_REQUEST",
	"LOGIN_LOCAL_SUCCESS",
	"LOGIN_LOCAL_FAILURE"
)<Credentials, UserInfo, Error>();

export const setLocal = createAction("SET_LOCAL")<boolean>();
