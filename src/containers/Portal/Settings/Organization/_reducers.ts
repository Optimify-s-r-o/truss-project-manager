import { getType } from 'typesafe-actions';
import { OrganizationState } from './_types';
import {
	getOrganization,
	OrganizationAction,
	updateOrganization,
} from "./_actions";

const initialState: OrganizationState = {
	error: null,
	organization: null,
	pending: false,
};

export const OrganizationReducer = (
	state: OrganizationState = initialState,
	action: OrganizationAction
): OrganizationState => {
	switch (action.type) {
		case getType(getOrganization.request):
			return {
				...state,
			};

		case getType(updateOrganization.request):
			return {
				...state,
				pending: true,
			};
		case getType(getOrganization.success):
			return {
				...state,
				organization: action.payload,
			};
		case getType(updateOrganization.success):
			return {
				...state,
				organization: action.payload,
				pending: false,
			};
		case getType(getOrganization.failure):
		case getType(updateOrganization.failure):
			return {
				...state,
				error: action.payload.ErrorMessage,
				pending: false,
			};

		default:
			return state;
	}
};
