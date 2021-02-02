import { createProject, createProjectWithJson, projectType } from './_actions';
import { getType } from 'typesafe-actions';
import { ProjectRequestStateType } from './_types';

const initialState: ProjectRequestStateType = {
  error: null,
  pending: false,
  project: null
};

export default (
  state: ProjectRequestStateType = initialState,
  action: projectType
): ProjectRequestStateType => {
  switch (action.type) {
    case getType(createProject.request):
      return {
        ...initialState,
        project: action.payload,
        error: null,
        pending: true
      };
    case getType(createProject.success):
      return {
        ...initialState,
        pending: false
      };
    case getType(createProject.failure):
      return {
        ...initialState,
        error: action.payload.ErrorMessage,
        pending: false
      };
    case getType(createProjectWithJson.request):
      return {
        ...initialState,
        error: null,
        pending: true
      };
    case getType(createProjectWithJson.success):
      return {
        ...initialState,
        pending: false
      };
    case getType(createProjectWithJson.failure):
      return {
        ...initialState,
        error: action.payload.ErrorMessage,
        pending: false
      };

    default:
      return state;
  }
};
