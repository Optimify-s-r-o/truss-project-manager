import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';
import { ChangePassword, UserData } from './_types';
import { Data, Fetch } from '../../../types/_types';
import { Error } from '../../../sagas/_sagas';
import { Page } from './../../../types/_types';

export const usersAction = createAsyncAction(
	"USERS_REQUEST",
	"USERS_SUCCESS",
	"USERS_FAILURE"
)<Page, UserData, Error>();

export const usersWithPaginationAction = createAsyncAction(
	"USERS_WITH_PAGINATION_REQUEST",
	"USERS_WITH_PAGINATION_SUCCESS",
	"USERS_WITH_PAGINATION_FAILURE"
)<Page, Data<UserData>, Error>();

export const changeLocalPasswordAction = createAsyncAction(
	"LOCAL_USER_NEW_PASSWORD_SUCCESS",
	"LOCAL_USER_NEW_PASSWORD_REQUEST",
	"LOCAL_USER_NEW_PASSWORD_FAILURE"
)<ChangePassword, void, Error>();

export const editUser = createAsyncAction(
	"EDIT_USER_REQUEST",
	"EDIT_USER_SUCCESS",
	"EDIT_USER_FAILURE"
)<UserData, void, Error>();

export const deleteUser = createAsyncAction(
	"DELETE_USER_REQUEST",
	"DELETE_USER_SUCCESS",
	"DELETE_USER_FAILURE"
)<string, void, Error>();

export const getUserByUsername = createAsyncAction(
	"GET_USER_BY_USERNAME_REQUEST",
	"GET_USER_BY_USERNAME_SUCCESS",
	"GET_USER_BY_USERNAME_FAILURE"
)<Fetch, UserData, Error>();

export const getEditedUser = createAction("EDIT_USER")<UserData>();

export type UsersActionType = ActionType<
	| typeof usersAction
	| typeof editUser
	| typeof getEditedUser
	| typeof usersWithPaginationAction
	| typeof deleteUser
	| typeof changeLocalPasswordAction
	| typeof getUserByUsername
>;
