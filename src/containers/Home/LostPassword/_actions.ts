import { createAsyncAction } from 'typesafe-actions';
import { Error } from '../../../sagas/_sagas';

export const resetPassword = createAsyncAction(
	"RESET_PASSWORD_REQUEST",
	"RESET_PASSWORD_SUCCESS",
	"RESET_PASSWORD_FAILURE"
)<string, void, Error>();
