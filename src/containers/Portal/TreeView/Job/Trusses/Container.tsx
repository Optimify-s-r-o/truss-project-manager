import Component from './Component';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { DispatchProps } from './Component';
import { getTrusses } from '../_actions';
import { GetTrusses } from '../_types';
import { setExpandedKeys, setSelectedKeys } from '../../_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state: any) => ({
  trusses: state.JobReducer.trusses,
  jobs: state.JobReducer.jobs,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  getTrusses: (data: GetTrusses) => dispatch(getTrusses.request(data)),
  setSelectedKeys: (data: string[]) => dispatch(setSelectedKeys(data)),
  setExpandedKeys: (data: string[]) => dispatch(setExpandedKeys(data)),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Component);
