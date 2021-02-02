import { ActionType, createAsyncAction } from 'typesafe-actions';
import { Error } from '../../../../sagas/_sagas';
import { Fetch } from '../../../../types/_types';
import { NaturalPerson, NaturalPersonRequest } from './_types';

export const saveNaturalPerson = createAsyncAction(
	"SAVE_NATURAL_PERSON_REQUEST",
	"SAVE_NATURAL_PERSON_SUCCESS",
	"SAVE_NATURAL_PERSON_FAILURE"
)<NaturalPersonRequest, void, Error>();

export const getNaturalPersonById = createAsyncAction(
	"GET_NATURAL_PERSON_BY_ID_REQUEST",
	"GET_NATURAL_PERSON_BY_ID_SUCCESS",
	"GET_NATURAL_PERSON_BY_ID_FAILURE"
)<Fetch, NaturalPerson, Error>();

export type naturalPersonType = ActionType<
	typeof saveNaturalPerson | typeof getNaturalPersonById
>;
