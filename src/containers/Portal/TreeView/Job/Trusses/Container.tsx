import Component, { DispatchProps } from './Component';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { deleteJob, getTrusses, unlockJob } from '../_actions';
import { DeleteJob, GetTrusses, Unlock } from '../_types';
import { EditTruss, editTruss } from '../../../../../sagas/Truss/_actions';
import { setExpandedKeys, setSelectedKeys } from '../../_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state: any) => ({
	trusses: state.JobReducer.trusses,
	job: state.JobReducer.jobs,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
	getTrusses: (data: GetTrusses) => dispatch(getTrusses.request(data)),
	setSelectedKeys: (data: string[]) => dispatch(setSelectedKeys(data)),
	setExpandedKeys: (data: string[]) => dispatch(setExpandedKeys(data)),
	removeJob: (data: DeleteJob) => dispatch(deleteJob.request(data)),
	editTruss: (data: EditTruss) => dispatch(editTruss.request(data)),
	unlockJob: (data: Unlock) => dispatch(unlockJob.request(data)),
});

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Component);
