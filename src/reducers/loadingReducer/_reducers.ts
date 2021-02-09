import { FetchStateType } from '../../types/_types';
import { getType } from 'typesafe-actions';
import {
	projectUpdate,
	projectUpdateActionType,
	setLoading,
} from "../../containers/Portal/TreeView/Project/General/_actions";

type LoadingReducerType = FetchStateType & { loadingPage: boolean };

const initialState: LoadingReducerType = {
	error: null,
	pending: false,
	loadingPage: false,
};

const LoadingReducer = (
	state: LoadingReducerType = initialState,
	action: projectUpdateActionType
): LoadingReducerType => {
	switch (action.type) {
		case getType(setLoading):
			return {
				...initialState,
				error: null,
				loadingPage: !state.loadingPage,
			};
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
