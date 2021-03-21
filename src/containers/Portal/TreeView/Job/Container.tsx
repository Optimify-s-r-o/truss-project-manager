import Component, { StateProps } from './Component';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { editTruss, OpenTruss } from '../../../../sagas/Truss/_actions';
import { setLoading } from '../Project/General/_actions';
import { withRouter } from 'react-router-dom';
import {
	deleteJob,
	jobImage,
	jobImageByName,
	selectedJob,
	setJob,
	unlockJob,
} from "./_actions";
import {
	DeleteJob,
	JobRootObject,
	JobsSelectedRequest,
	ProjectNameJobName,
	Unlock,
} from "./_types";

const mapDispatchToProps = (dispatch: Dispatch) => ({
	jobRequest: (data: JobsSelectedRequest) =>
		dispatch(selectedJob.request(data)),
	getJobImage: (data: string) => dispatch(jobImage.request(data)),
	jobImageByName: (data: ProjectNameJobName) =>
		dispatch(jobImageByName.request(data)),
	removeJob: (data: DeleteJob) => dispatch(deleteJob.request(data)),
	editTruss: (data: OpenTruss) => dispatch(editTruss.request(data)),
	unlockJob: (data: Unlock) => dispatch(unlockJob.request(data)),
	setJob: (data: JobRootObject) => dispatch(setJob(data)),
	setLoading: (data: boolean) => dispatch(setLoading(data)),
});

const mapStateToProps = (state: any): StateProps => ({
	activeTree: state.SettingsReducer.activeTree,
	routerState: state.router.location.state,
	pending: state.JobReducer.pending,
	job: state.JobReducer.jobs,
	token: state.AuthReducer.token,
	local: state.AuthReducer.local,
	jobHub: state.HubReducer.job,
	loadingPage: state.LoadingReducer.loadingPage,
});

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Component);
