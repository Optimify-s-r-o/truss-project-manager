import { getType } from 'typesafe-actions';
import { OrganizationState } from './_types';
import {
  OrganizationAction,
  getOrganization,
  updateOrganization,
} from './_actions';


const initialState: OrganizationState = {
  error: null,
  organization: null,
  pending: false,
};

export const OrganizationReducer = (
  state: OrganizationState = initialState,
  action: OrganizationAction
): OrganizationState => {
  switch (action.type) {
    case getType(getOrganization.request):
    case getType(updateOrganization.request):
      return {
        ...state,
      };
    case getType(getOrganization.success):
    case getType(updateOrganization.success):
      return {
        ...state,
        organization: action.payload,
      };

    case getType(getOrganization.failure):
    case getType(updateOrganization.failure):
      return {
        ...state,
        error: action.payload.ErrorMessage,
      };

    default:
      return state;
  }
};
