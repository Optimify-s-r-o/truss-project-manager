import { getType } from 'typesafe-actions';
import { HubStateType } from './_types';
import {
	HubActionType,
	setHubCustomer,
	setHubJob,
	setHubProject,
	setHubSettings,
	setHubTree,
	setHubTruss,
} from "./_actions";

const initialState: HubStateType = {
	error: null,
	pending: false,
	tree: null,
	project: null,
	job: null,
	truss: null,
	customer: null,
	settings: null,
};

export const HubReducer = (
	state: HubStateType = initialState,
	action: HubActionType
): HubStateType => {
	switch (action.type) {
		case getType(setHubTree):
			return {
				...state,
				tree: action.payload,
			};
		case getType(setHubCustomer):
			return {
				...state,
				customer: action.payload,
			};
		case getType(setHubSettings):
			return {
				...state,
				settings: action.payload,
			};
		case getType(setHubProject):
			return {
				...state,
				project: action.payload,
			};
		case getType(setHubJob):
			return {
				...state,
				job: action.payload,
			};
		case getType(setHubTruss):
			return {
				...state,
				truss: action.payload,
			};
		default:
			return state;
	}
};
