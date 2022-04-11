import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose, Dispatch } from 'redux';

import { EditTruss, editTruss } from '../../../../../sagas/Truss/_actions';
import { deleteJob, getJobMaterials, unlockJob } from '../_actions';
import { DeleteJob, Unlock } from '../_types';
import Component, { DispatchProps } from './Component';

const mapStateToProps = (state: any) => ({
	materials: state.JobReducer.materials,
	job: state.JobReducer.jobs,
	token: state.AuthReducer.token,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
	getJobMaterials: (data: string) => dispatch(getJobMaterials.request(data)),
	removeJob: (data: DeleteJob) => dispatch(deleteJob.request(data)),
	editTruss: (data: EditTruss) => dispatch(editTruss.request(data)),
	unlockJob: ( data: Unlock ) => dispatch( unlockJob.request( data ) )
});

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Component);
