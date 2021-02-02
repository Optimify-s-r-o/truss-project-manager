import { ActionType, createAction } from 'typesafe-actions';

export const setHubTree = createAction("SET_HUB_TREE")<any>();
export const setHubCustomer = createAction("SET_HUB_CUSTOMER")<any>();
export const setHubProject = createAction("SET_HUB_PROJECT")<any>();
export const setHubJob = createAction("SET_HUB_JOB")<any>();
export const setHubTruss = createAction("SET_HUB_TRUSS")<any>();

export type HubActionType = ActionType<
	| typeof setHubTree
	| typeof setHubCustomer
	| typeof setHubProject
	| typeof setHubJob
	| typeof setHubTruss
>;
