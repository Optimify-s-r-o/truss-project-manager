import { getType } from 'typesafe-actions';
import { login, loginType, setCloud } from './Cloud/_actions';
import { LoginStateType } from './Cloud/_types';
import { resetPassword } from './LostPassword/_actions';

const initialState: LoginStateType = {
	error: null,
	pending: false,
	token: "",
	cloud: true,
	local: false,
	organizationId: "",
	username: "",
	role: "",
	validUntil: "",
	users: null,
	loadingUsers: false,
};

export const AuthReducer = (
	state: LoginStateType = initialState,
	action: loginType
): LoginStateType => {
	switch (action.type) {
		case getType(login.request):
			return {
				...state,
				error: null,
				pending: true,
				cloud: true,
			};
		case getType(setCloud):
			return {
				...state,
				cloud: action.payload,
			};
		case getType(login.success):
			return {
				...state,
				pending: false,
				token: action.payload.Token,
				organizationId: action.payload.OrganizationId,
				username: action.payload.Username,
				role: action.payload.Role,
				validUntil: action.payload.ValidUntil,
			};

		case getType(login.failure):
			return {
				...state,
				error: action.payload.ErrorMessage,
				pending: false,
			};

		case getType(resetPassword.request):
			return {
				...state,
				error: null,
				pending: true,
			};
		case getType(resetPassword.success):
			return {
				...state,
				error: null,
				pending: false,
			};
		case getType(resetPassword.failure):
			return {
				...state,
				pending: false,
				error: action.payload.ErrorMessage,
			};
		default:
			return state;
	}
};
