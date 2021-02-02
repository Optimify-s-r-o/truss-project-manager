import { createAsyncAction } from 'typesafe-actions';
import { Error } from '../../../sagas/_sagas';

export const addToSelectionAction = createAsyncAction(
	"ADD_TO_SELECTION_REQUEST",
	"ADD_TO_SELECTION_SUCCESS",
	"ADD_TO_SELECTION_FAILURE"
)<string, void, Error>();

export const removeFromSelectionAction = createAsyncAction(
	"REMOVE_FROM_SELECTION_REQUEST",
	"REMOVE_FROM_SELECTION_SUCCESS",
	"REMOVE_FROM_SELECTION_FAILURE"
)<string, void, Error>();

export const resetSelectionAction = createAsyncAction(
	"RESET_SELECTION_REQUEST",
	"RESET_SELECTION_SUCCESS",
	"RESET_SELECTION_FAILURE"
)<void, void, Error>();
