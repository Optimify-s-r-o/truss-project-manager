import Component from './Component';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { setSelectedKeys } from '../../_actions';
import { UpdateJobRequest } from '../_types';
import { updateSelectedJob } from '../_actions';
import { withRouter } from 'react-router-dom';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  jobUpdate: (data: UpdateJobRequest) =>
    dispatch(updateSelectedJob.request(data)),
  setSelectedKeys: (data: string[]) => dispatch(setSelectedKeys(data)),
});

const mapStateToProps = (state: any) => ({
  activeTree: state.SettingsReducer.activeTree,
  routerState: state.router.location.state,
  jobs: state.JobReducer.jobs,
  pending: state.JobReducer.pending,
  image: state.JobReducer.image,
  settings: state.SettingsReducer.settings,
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Component);
