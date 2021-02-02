import { getSelectedProjects, selectedProjectsType } from './_actions';
import { getType } from 'typesafe-actions';
import { JobsStateType } from '../../../../types/_types';

const initialState: JobsStateType = {
  error: null,
  pending: true,
  jobs: null
};

export default (
  state: JobsStateType = initialState,
  action: selectedProjectsType
): JobsStateType => {
  switch (action.type) {
    case getType(getSelectedProjects.request):
      return {
        ...initialState,
        error: null,
        pending: true
      };
    case getType(getSelectedProjects.success):
      return {
        ...initialState,
        pending: false,
        jobs: action.payload
      };

    case getType(getSelectedProjects.failure):
      return {
        ...initialState,
        error: action.payload.ErrorMessage,
        pending: false
      };
    default:
      return state;
  }
};
