import { getType } from 'typesafe-actions';
import { quickSearch, searchActionType } from './_actions';
import { SearchStateType } from './_types';

const initialState: SearchStateType = {
  error: null,
  pending: false,
  searched: null
};

export default (
  state: SearchStateType = initialState,
  action: searchActionType
): SearchStateType => {
  switch (action.type) {
    case getType(quickSearch.request):
      return {
        ...initialState,
        error: null,
        pending: true
      };
    case getType(quickSearch.success):
      return {
        ...initialState,
        pending: false,
        searched: action.payload
      };

    case getType(quickSearch.failure):
      return {
        ...initialState,
        error: action.payload.ErrorMessage,
        pending: false
      };
    default:
      return state;
  }
};
