import { getType } from 'typesafe-actions';
import { LoadedDataStateType } from './_types';
import {
  SaveLegalCustomerAction,
  arest,
  clearArest,
  clearLegal,
  getLegalPersonById,
  legalPersonType,
} from './_actions';


const initialState: LoadedDataStateType = {
  error: null,
  pending: false,
  pendingArest: false,
  arest: null,
  legal: null,
};

export default (
  state: LoadedDataStateType = initialState,
  action: legalPersonType
): LoadedDataStateType => {
  switch (action.type) {
    case getType(clearArest):
    case getType(clearLegal):
      return initialState;
    case getType(arest.request):
    case getType(getLegalPersonById.request):
      return {
        ...initialState,
        error: null,
        pendingArest: true,
      };
    case getType(arest.success):
      return {
        ...initialState,
        pendingArest: false,
        arest: action.payload,
      };
    case getType(getLegalPersonById.success):
      return {
        ...state,
        pendingArest: false,
        pending: false,
        legal: action.payload,
      };
    case getType(arest.failure):
      return {
        ...initialState,
        error: action.payload.ErrorMessage,
        pendingArest: false,
      };
    case getType(SaveLegalCustomerAction.request):
      return {
        ...initialState,
        error: null,
        pending: true,
      };
    case getType(SaveLegalCustomerAction.success):
      return {
        ...initialState,
        error: null,
        pending: false,
      };
    case getType(SaveLegalCustomerAction.failure):
    case getType(getLegalPersonById.failure):
      return {
        ...initialState,
        error: action.payload.ErrorMessage,
        pending: false,
      };
    default:
      return state;
  }
};
