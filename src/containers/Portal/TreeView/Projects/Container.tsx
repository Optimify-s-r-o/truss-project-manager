import Component, { StateProps } from './Component';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { getSelectedProjects } from './_actions';
import { SelectedProjectsRequest } from './_types';
import { withRouter } from 'react-router-dom';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  selectedProjectsRequest: (data: SelectedProjectsRequest) =>
    dispatch(getSelectedProjects.request(data))
});

const mapStateToProps = (state: any): StateProps => ({
  routerState: state.router.location.state,
  pending: state.ProjectMultipleReducer.pending,
  jobs: state.ProjectMultipleReducer.jobs
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Component);
