import Component from './Component';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { deleteJob, unlockJob, updateSelectedJob } from '../_actions';
import { DeleteJob, Unlock } from '../_types';
import { EditTruss, editTruss } from '../../../../../sagas/Truss/_actions';
import { JobType } from 'src/types/_types';
import { setSelectedKeys } from '../../_actions';
import { ViewerRequest } from '../Viewer/_types';
import { withRouter } from 'react-router-dom';
import {
	deleteModel,
	editModelPutAction,
	modelsGetAction,
	uploadModelPostAction,
} from "../Viewer/_actions";

const mapDispatchToProps = (dispatch: Dispatch) => ({
	jobUpdate: (data: JobType) => dispatch(updateSelectedJob.request(data)),
	setSelectedKeys: (data: string[]) => dispatch(setSelectedKeys(data)),
	removeJob: (data: DeleteJob) => dispatch(deleteJob.request(data)),
	editTruss: (data: EditTruss) => dispatch(editTruss.request(data)),
	unlockJob: (data: Unlock) => dispatch(unlockJob.request(data)),
	uploadModelPostAction: (data: ViewerRequest) =>
		dispatch(uploadModelPostAction.request(data)),
	editModelPutAction: (data: ViewerRequest) =>
		dispatch(editModelPutAction.request(data)),
	deleteModel: (data: string) => dispatch(deleteModel.request(data)),
});

const mapStateToProps = (state: any) => ({
	activeTree: state.SettingsReducer.activeTree,
	routerState: state.router.location.state,
	job: state.JobReducer.jobs,
	pending: state.JobReducer.pending,
	image: state.JobReducer.image,
	settings: state.SettingsReducer.settings,
	models: state.ViewerReducer.models,
	viewerPending: state.ViewerReducer.pending,
});

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Component);
