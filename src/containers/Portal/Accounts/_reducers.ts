import { getType } from 'typesafe-actions';
import { UsersType } from './_types';
import {
	changeLocalPasswordAction,
	editUser,
	getEditedUser,
	getUserByUsername,
	usersAction,
	UsersActionType,
	usersWithPaginationAction,
} from "./_actions";

const initialState: UsersType = {
	users: null,
	user: null,
	usersWithPagination: null,
	error: null,
	pending: null,
	edit: null,
};

export default (
	state: UsersType = initialState,
	action: UsersActionType
): UsersType => {
	switch (action.type) {
		case getType(usersAction.request):
		case getType(usersWithPaginationAction.request):
		case getType(getUserByUsername.request):
		case getType(getUserByUsername.request):
			return {
				...state,
			};
		case getType(usersAction.success):
			return {
				...state,
				users: action.payload,
			};
		case getType(usersWithPaginationAction.success):
			return {
				...state,
				pending: false,
				usersWithPagination: action.payload,
			};
		case getType(getUserByUsername.success):
			return {
				...state,
				user: action.payload,
			};
		case getType(editUser.request):
			return {
				...state,
				pending: true,
			};
		case getType(editUser.success):
			return {
				...state,
				pending: false,
			};
		case getType(changeLocalPasswordAction.request):
			return {
				...state,
				pending: true,
			};
		case getType(changeLocalPasswordAction.success):
			return {
				...state,
				pending: false,
			};
		case getType(changeLocalPasswordAction.failure):
		case getType(usersAction.failure):
		case getType(editUser.failure):
		case getType(getUserByUsername.failure):
		case getType(usersWithPaginationAction.failure):
			return {
				...state,
				pending: false,
			};
		case getType(getEditedUser):
			return {
				...state,
				edit: action.payload,
			};
		default:
			return state;
	}
};
