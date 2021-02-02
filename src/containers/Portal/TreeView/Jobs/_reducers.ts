import { getSelectedJobs, selectedJobsType } from './_actions';
import { getType } from 'typesafe-actions';
import { JobsStateType } from '../../../../types/_types';

const initialState: JobsStateType = {
  error: null,
  pending: true,
  jobs: null
};

export default (
  state: JobsStateType = initialState,
  action: selectedJobsType
): JobsStateType => {
  switch (action.type) {
    case getType(getSelectedJobs.request):
      return {
        ...initialState,
        error: null,
        pending: true
      };
    case getType(getSelectedJobs.success):
      return {
        ...initialState,
        pending: false,
        jobs: action.payload
      };

    case getType(getSelectedJobs.failure):
      return {
        ...initialState,
        error: action.payload.ErrorMessage,
        pending: false
      };
    default:
      return state;
  }
};
