import { ActionType, createAsyncAction } from 'typesafe-actions';
import { Error } from '../../../../sagas/_sagas';
import { Organization } from './_types';

export const getOrganization = createAsyncAction(
	"ORGANIZATION_GET_REQUEST",
	"ORGANIZATION_GET_SUCCESS",
	"ORGANIZATION_GET_FAILURE"
)<void, Organization, Error>();

export const updateOrganization = createAsyncAction(
	"ORGANIZATION_PUT_REQUEST",
	"ORGANIZATION_PUT_SUCCESS",
	"ORGANIZATION_PUT_FAILURE"
)<Organization, Organization, Error>();

export type OrganizationAction = ActionType<
	typeof getOrganization | typeof updateOrganization
>;
