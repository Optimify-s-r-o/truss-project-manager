import Component from './Component';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { getProjectLogs } from '../_actions';
import { ProjectLogsRequest } from '../_types';
import { withRouter } from 'react-router-dom';
import {
	download,
	FileRequest,
} from "../../../../../sagas/DownloadFile/_actions";

const mapDispatchToProps = (dispatch: Dispatch) => ({
	downloadFile: (data: FileRequest) => dispatch(download.request(data)),
	getLogs: (data: ProjectLogsRequest) => dispatch(getProjectLogs.request(data)),
});

const mapStateToProps = (state: any) => ({
	all: state.CustomersReducer.all,
	activeTree: state.SettingsReducer.activeTree,
	project: state.ProjectViewReducer.project,
	logs: state.ProjectViewReducer.logs,
	routerState: state.router.location.state,
	users: state.UserReducer.users,
	settings: state.SettingsReducer.settings,
	customers: state.CustomersReducer.customers,
	pending: state.LoadingReducer.pending,
	files: state.ProjectViewReducer.files,
});

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Component);
