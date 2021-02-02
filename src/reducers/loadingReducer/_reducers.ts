import { FetchStateType } from '../../types/_types';
import { getType } from 'typesafe-actions';
import {
	projectUpdate,
	projectUpdateActionType,
} from "../../containers/Portal/TreeView/Project/General/_actions";

const initialState: FetchStateType = {
	error: null,
	pending: false,
};

const LoadingReducer = (
	state: FetchStateType = initialState,
	action: projectUpdateActionType
): FetchStateType => {
	switch (action.type) {
		case getType(projectUpdate.request):
			return {
				...initialState,
				error: null,
				pending: true,
			};
		case getType(projectUpdate.success):
			return {
				...initialState,
				pending: false,
			};

		case getType(projectUpdate.failure):
			return {
				...initialState,
				error: action.payload.ErrorMessage,
				pending: false,
			};
		default:
			return state;
	}
};

export default LoadingReducer;
