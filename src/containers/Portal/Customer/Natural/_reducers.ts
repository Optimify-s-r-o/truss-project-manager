import { getType } from 'typesafe-actions';
import { NaturalPersonStateType } from './_types';
import {
	getNaturalPersonById,
	naturalPersonType,
	saveNaturalPerson,
} from "./_actions";

const initialState: NaturalPersonStateType = {
	error: null,
	pending: false,
	natural: null,
};

export default (
	state: NaturalPersonStateType = initialState,
	action: naturalPersonType
): NaturalPersonStateType => {
	switch (action.type) {
		case getType(saveNaturalPerson.request):
		case getType(getNaturalPersonById.request):
			return {
				...initialState,
				error: null,
				pending: true,
			};
		case getType(saveNaturalPerson.success):
			return {
				...initialState,
				pending: false,
			};
		case getType(getNaturalPersonById.success):
			return {
				...initialState,
				natural: action.payload,
				pending: false,
			};
		case getType(saveNaturalPerson.failure):
		case getType(getNaturalPersonById.failure):
			return {
				...initialState,
				error: action.payload.ErrorMessage,
				pending: false,
			};
		default:
			return state;
	}
};
