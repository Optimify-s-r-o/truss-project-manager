import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';
import { Data, Fetch, Tree } from '../../../types/_types';
import { Error } from '../../../sagas/_sagas';

export const projectTree = createAsyncAction(
	"PROJECT_TREE_REQUEST",
	"PROJECT_TREE_SUCCESS",
	"PROJECT_TREE_FAILURE"
)<Fetch, Data<Tree>, Error>();

export const customerTree = createAsyncAction(
	"CUSTOMER_TREE_REQUEST",
	"CUSTOMER_TREE_SUCCESS",
	"CUSTOMER_TREE_FAILURE"
)<Fetch, Data<Tree>, Error>();

export const jobTree = createAsyncAction(
	"JOB_TREE_REQUEST",
	"JOB_TREE_SUCCESS",
	"JOB_TREE_FAILURE"
)<Fetch, Data<Tree>, Error>();

export const trussTree = createAsyncAction(
	"TRUSS_TREE_REQUEST",
	"TRUSS_TREE_SUCCESS",
	"TRUSS_TREE_FAILURE"
)<Fetch, Data<Tree>, Error>();

export const treeReset = createAsyncAction(
	"TREE_RESET_REQUEST",
	"TREE_RESET_SUCCESS",
	"TREE_RESET_FAILURE"
)<Fetch, void, Error>();

export const setExpandedKeys = createAction("SET_EXPANDED_KEYS")<string[]>();
export const setSelectedKeys = createAction("SET_SELECTED_KEYS")<string[]>();
export const setCopiedJob = createAction("SET_COPIED_JOB")<string>();

export type treeFirstLayerActionType = ActionType<
	| typeof customerTree
	| typeof projectTree
	| typeof jobTree
	| typeof trussTree
	| typeof treeReset
	| typeof setExpandedKeys
	| typeof setSelectedKeys
	| typeof setCopiedJob
>;
