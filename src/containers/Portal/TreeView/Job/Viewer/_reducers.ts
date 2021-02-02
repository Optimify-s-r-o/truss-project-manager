import { getType } from 'typesafe-actions';
import { ViewerStateType } from './_types';
import {
  clearModels,
  deleteModel,
  editModelPutAction,
  modelsGetAction,
  selectedJobType,
  uploadModelPostAction,
} from './_actions';


const initialState: ViewerStateType = {
  error: null,
  pending: false,
  models: null,
};

export const ViewerReducer = (
  state: ViewerStateType = initialState,
  action: selectedJobType
): ViewerStateType => {
  switch (action.type) {
    case getType(clearModels):
      return {
        ...initialState,
      };
    case getType(modelsGetAction.request):
    case getType(editModelPutAction.request):
    case getType(uploadModelPostAction.request):
    case getType(deleteModel.request):
      return {
        ...state,
        error: null,
        pending: true,
      };
    case getType(modelsGetAction.success):
      return {
        ...state,
        pending: false,
        models: action.payload,
      };
    case getType(uploadModelPostAction.success):
    case getType(editModelPutAction.success):
    case getType(deleteModel.success):
      return {
        ...state,
        pending: false,
      };
    case getType(modelsGetAction.failure):
    case getType(editModelPutAction.failure):
    case getType(uploadModelPostAction.failure):
    case getType(deleteModel.failure):
      return {
        ...state,
        error: action.payload.ErrorMessage,
        pending: false,
      };
    default:
      return state;
  }
};
