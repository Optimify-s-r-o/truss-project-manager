import { ActionType, createAsyncAction } from 'typesafe-actions';
import { Error } from '../../../sagas/_sagas';
import { QuickSearchRequest, SearchRootObject } from './_types';

export const quickSearch = createAsyncAction(
  'QUICK_SEARCH_REQUEST',
  'QUICK_SEARCH_SUCCESS',
  'QUICK_SEATCH_FAILURE'
)<QuickSearchRequest, SearchRootObject, Error>();

export type searchActionType = ActionType<typeof quickSearch>;
