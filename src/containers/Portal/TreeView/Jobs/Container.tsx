import Component, { StateProps } from './Component';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { getSelectedJobs } from './_actions';
import { JobsSelectedRequest } from '../Job/_types';
import { withRouter } from 'react-router-dom';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getJobs: (data: JobsSelectedRequest) =>
    dispatch(getSelectedJobs.request(data))
});

const mapStateToProps = (state: any): StateProps => ({
  routerState: state.router.location.state,
  pending: state.JobMultipleReducer.pending,
  jobs: state.JobMultipleReducer.jobs
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Component);
