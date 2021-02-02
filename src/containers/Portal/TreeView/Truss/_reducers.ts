import { getType } from 'typesafe-actions';
import { TrussStateType } from './_types';
import {
  calculateTruss,
  getTruss,
  setTruss,
  trussImage,
  trussType,
} from './_actions';


const initialState: TrussStateType = {
  error: null,
  pending: true,
  truss: null,
  image: null,
  quotationCalculating: false,
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
    case getType(calculateTruss.failure):
      return {
        ...state,
        error: action.payload.ErrorMessage,
        quotationCalculating: false,
      };
    case getType(getTruss.request):
      return {
        ...state,
        error: null,
        pending: true,
      };
    case getType(getTruss.success):
      return {
        ...state,
        pending: false,
        truss: action.payload,
      };

    case getType(getTruss.failure):
      return {
        ...state,
        error: action.payload.ErrorMessage,
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
