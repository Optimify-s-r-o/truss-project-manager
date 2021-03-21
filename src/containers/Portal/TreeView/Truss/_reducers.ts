import { getType } from 'typesafe-actions';
import { TrussStateType } from './_types';
import {
	calculateTruss,
	getTruss,
	getTrussMaterials,
	getTrussQuotations,
	setTruss,
	trussImage,
	trussType,
} from "./_actions";

const initialState: TrussStateType = {
	error: null,
	pending: true,
	truss: null,
	image: null,
	quotationCalculating: false,
	materials: null,
	quotations: null,
};

export default (
	state: TrussStateType = initialState,
	action: trussType
): TrussStateType => {
	switch (action.type) {
		case getType(calculateTruss.request):
			return {
				...state,
				quotationCalculating: true,
			};
		case getType(setTruss):
			return {
				...state,
				truss: action.payload,
			};
		case getType(calculateTruss.success):
			return {
				...state,
				quotationCalculating: false,
			};

		case getType(getTruss.request):
		case getType(getTrussMaterials.request):
		case getType(getTrussQuotations.request):
			return {
				...state,
				error: null,
				pending: true,
			};
		case getType(getTrussMaterials.success):
			return {
				...state,
				pending: false,
				materials: action.payload,
			};
		case getType(getTrussQuotations.success):
			return {
				...state,
				pending: false,
				quotations: action.payload,
			};
		case getType(getTruss.success):
			return {
				...state,
				pending: false,
				truss: action.payload,
			};
		case getType(getTruss.failure):
		case getType(calculateTruss.failure):
			return {
				...state,
				error: action.payload.ErrorMessage,
				quotationCalculating: false,
				pending: false,
			};
		case getType(trussImage.request):
			return {
				...state,
				image: null,
			};
		case getType(trussImage.failure):
			return {
				...state,
				image: null,
			};
		case getType(trussImage.success):
			return {
				...state,
				image: action.payload,
			};
		default:
			return state;
	}
};
