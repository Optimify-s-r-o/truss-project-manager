import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose, Dispatch } from 'redux';

import { EditTruss, editTruss } from '../../../../../sagas/Truss/_actions';
import { deleteJob, unlockJob } from '../_actions';
import { DeleteJob, Unlock } from '../_types';
import { clearModels, deleteModel, editModelPutAction, modelsGetAction, publishModelPostAction } from './_actions';
import { ViewerRequest } from './_types';
import Component, { DispatchProps, StateProps } from './Component';

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
	publishModelPostAction: (data: string) =>
		dispatch(publishModelPostAction.request(data)),
	editModelPutAction: (data: ViewerRequest) =>
		dispatch(editModelPutAction.request(data)),
	modelsGetAction: (data: string) => dispatch(modelsGetAction.request(data)),
	deleteModel: (data: string) => dispatch(deleteModel.request(data)),
	clearModels: (data: void) => dispatch(clearModels()),
	removeJob: (data: DeleteJob) => dispatch(deleteJob.request(data)),
	editTruss: (data: EditTruss) => dispatch(editTruss.request(data)),
	unlockJob: (data: Unlock) => dispatch(unlockJob.request(data)),
});

const mapStateToProps = (state: any): StateProps => ({
	models: state.ViewerReducer.models,
	pending: state.ViewerReducer.pending,
	job: state.JobReducer.jobs,
	token: state.AuthReducer.token,
});

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Component);
