import Component, { DispatchProps } from './Component';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { deleteJob, getJobMaterials, unlockJob } from '../_actions';
import { DeleteJob, Unlock } from '../_types';
import { editTruss, OpenTruss } from '../../../../../sagas/Truss/_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state: any) => ({
	materials: state.JobReducer.materials,
	job: state.JobReducer.jobs,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
	getJobMaterials: (data: string) => dispatch(getJobMaterials.request(data)),
	removeJob: (data: DeleteJob) => dispatch(deleteJob.request(data)),
	editTruss: (data: OpenTruss) => dispatch(editTruss.request(data)),
	unlockJob: (data: Unlock) => dispatch(unlockJob.request(data)),
});

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Component);
