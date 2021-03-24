import Component, { DispatchProps, StateProps } from './Component';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { deleteJob, unlockJob } from '../_actions';
import { DeleteJob, Unlock } from '../_types';
import { editTruss, OpenTruss } from '../../../../../sagas/Truss/_actions';
import { ViewerRequest } from './_types';
import { withRouter } from 'react-router-dom';
import {
	clearModels,
	deleteModel,
	editModelPutAction,
	modelsGetAction,
	uploadModelPostAction,
} from "./_actions";

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
	uploadModelPostAction: (data: ViewerRequest) =>
		dispatch(uploadModelPostAction.request(data)),
	editModelPutAction: (data: ViewerRequest) =>
		dispatch(editModelPutAction.request(data)),
	modelsGetAction: (data: string) => dispatch(modelsGetAction.request(data)),
	deleteModel: (data: string) => dispatch(deleteModel.request(data)),
	clearModels: (data: void) => dispatch(clearModels()),
	removeJob: (data: DeleteJob) => dispatch(deleteJob.request(data)),
	editTruss: (data: OpenTruss) => dispatch(editTruss.request(data)),
	unlockJob: (data: Unlock) => dispatch(unlockJob.request(data)),
});

const mapStateToProps = (state: any): StateProps => ({
	models: state.ViewerReducer.models,
	pending: state.ViewerReducer.pending,
	job: state.JobReducer.jobs,
});

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Component);
