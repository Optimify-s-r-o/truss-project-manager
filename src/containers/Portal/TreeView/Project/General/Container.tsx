import Component from './Component';
import { addJsonToProject } from './File/_actions';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { CreateCustomer } from '../../../Customer/_types';
import { createCustomerAction } from '../../../Customer/_actions';
import { createJobFromTrussFile } from '../../../../../sagas/CreateJobFromFile/_actions';
import { CreateJobFromTrussFile } from '../../../../../sagas/CreateJobFromFile/_types';
import { deleteFile, duplicateJob, projectUpdate } from './_actions';
import { deleteJob, downloadJob, unlockJob } from '../../Job/_actions';
import { DeleteJob, RequestDownloadLink, Unlock } from '../../Job/_types';
import { deleteProject } from '../../../Project/_actions';
import { DeleteProject } from '../../../Project/_types';
import { IAddJsonToProject } from './File/_types';
import { Page, Project } from '../../../../../types/_types';
import { SelectedProjectsRequest } from '../../Projects/_types';
import { setExpandedKeys, setSelectedKeys } from '../../_actions';
import { usersAction } from 'src/containers/Portal/Accounts/_actions';
import { withRouter } from 'react-router-dom';
import {
	download,
	FileRequest,
} from "../../../../../sagas/DownloadFile/_actions";
import {
	createTruss,
	EditTruss,
	editTruss,
	OpenTruss,
} from "../../../../../sagas/Truss/_actions";
import {
	getProjectFiles,
	getProjectLogs,
	getSelectedProject,
	uploadProjectFile,
} from "../_actions";
import {
	ProjectFileRequest,
	ProjectLogsRequest,
	ProjectUploadFileRequest,
} from "../_types";

const mapDispatchToProps = (dispatch: Dispatch) => ({
	updateProject: (data: Project) => dispatch(projectUpdate.request(data)),
	addJsonRequest: (data: IAddJsonToProject) =>
		dispatch(addJsonToProject.request(data)),
	createTruss: (data: OpenTruss) => dispatch(createTruss.request(data)),
	editTruss: (data: EditTruss) => dispatch(editTruss.request(data)),
	duplicateJob: (data: string) => dispatch(duplicateJob.request(data)),
	removeJob: (data: DeleteJob) => dispatch(deleteJob.request(data)),
	removeFile: (data: ProjectFileRequest) => dispatch(deleteFile.request(data)),
	getFiles: (data: ProjectFileRequest) =>
		dispatch(getProjectFiles.request(data)),
	downloadFile: (data: FileRequest) => dispatch(download.request(data)),
	uploadProjectFile: (data: ProjectUploadFileRequest) =>
		dispatch(uploadProjectFile.request(data)),
	selectedProjectRequest: (data: SelectedProjectsRequest) =>
		dispatch(getSelectedProject.request(data)),
	getUsers: (data: Page) => dispatch(usersAction.request(data)),
	getLogs: (data: ProjectLogsRequest) => dispatch(getProjectLogs.request(data)),
	createJobFromTrussFile: (data: CreateJobFromTrussFile) =>
		dispatch(createJobFromTrussFile.request(data)),
	setSelectedKeys: (data: string[]) => dispatch(setSelectedKeys(data)),
	setExpandedKeys: (data: string[]) => dispatch(setExpandedKeys(data)),
	unlockJob: (data: Unlock) => dispatch(unlockJob.request(data)),
	createCustomerAction: (data: CreateCustomer) =>
		dispatch(createCustomerAction.request(data)),
	removeProject: (data: DeleteProject) => dispatch(deleteProject.request(data)),
	downloadJob: (data: RequestDownloadLink) =>
		dispatch(downloadJob.request(data)),
});

const mapStateToProps = (state: any) => ({
	all: state.CustomersReducer.all,
	activeTree: state.SettingsReducer.activeTree,
	folders: state.SettingsReducer.folders,
	project: state.ProjectViewReducer.project,
	logs: state.ProjectViewReducer.logs,
	duplicatePending: state.ProjectViewReducer.duplicatePending,
	duplicateId: state.ProjectViewReducer.duplicateId,
	routerState: state.router.location.state,
	users: state.UserReducer.users,
	settings: state.SettingsReducer.settings,
	customers: state.FilterReducer.customers?.Data,
	pending: state.LoadingReducer.pending,
	files: state.ProjectViewReducer.files,
	selectedKeys: state.TreeReducer.selectedKeys,
	filesUploading: state.ProjectViewReducer.filesUploading,
	loadingCustomers: state.FilterReducer.pending,
	loadingCustomerAction: state.CustomerReducer.pending,
	newCustomer: state.CustomerReducer.newCustomer,
	updatingCustomer: state.CustomerReducer.updatingCustomer,
});

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Component);
