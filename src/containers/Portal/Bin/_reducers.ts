import { BinStateType } from './_types';
import { getType } from 'typesafe-actions';
import {
	binActionType,
	clearBinReducer,
	deleteEntity,
	emptyBin,
	getBinAction,
	refreshFromBinAction,
} from "./_actions";

const initialState: BinStateType = {
	error: null,
	pending: false,
	data: null,
};

export const BinReducer = (
	state: BinStateType = initialState,
	action: binActionType
): BinStateType => {
	switch (action.type) {
		case getType(clearBinReducer):
			return {
				...initialState,
			};
		case getType(getBinAction.request):
		case getType(emptyBin.request):
			return {
				...state,
				error: null,
				pending: true,
			};
		case getType(refreshFromBinAction.request):
		case getType(deleteEntity.request):
			return {
				...state,
				error: null,
				pending: true,
			};
		case getType(refreshFromBinAction.success):
		case getType(deleteEntity.success):
		case getType(emptyBin.success):
			return {
				...state,
				pending: false,
			};
		case getType(getBinAction.success):
			return {
				...state,
				data: action.payload,
				pending: false,
			};
		case getType(getBinAction.failure):
		case getType(refreshFromBinAction.failure):
		case getType(deleteEntity.failure):
		case getType(emptyBin.failure):
			return {
				...state,
				error: action.payload.ErrorMessage,
				pending: false,
			};
		default:
			return state;
	}
};
