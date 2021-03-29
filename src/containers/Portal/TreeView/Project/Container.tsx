import Component, { StateProps } from './Component';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createTruss, OpenTruss } from '../../../../sagas/Truss/_actions';
import { deleteProject } from '../../Project/_actions';
import { DeleteProject } from '../../Project/_types';
import { getProjectFiles, getSelectedProject, setProject } from './_actions';
import { Project } from '../../../../types/_types';
import { ProjectFileRequest } from './_types';
import { SelectedProjectsRequest } from '../Projects/_types';
import { setLoading } from './General/_actions';
import { setSelectedKeys } from '../_actions';
import { withRouter } from 'react-router-dom';

const mapDispatchToProps = (dispatch: Dispatch) => ({
	selectedProjectRequest: (data: SelectedProjectsRequest) =>
		dispatch(getSelectedProject.request(data)),
	getFiles: (data: ProjectFileRequest) =>
		dispatch(getProjectFiles.request(data)),
	removeProject: (data: DeleteProject) => dispatch(deleteProject.request(data)),
	setProject: (data: Project) => dispatch(setProject(data)),
	createTruss: (data: OpenTruss) => dispatch(createTruss.request(data)),
	setSelectedKeys: (data: string[]) => dispatch(setSelectedKeys(data)),
	setLoading: (data: boolean) => dispatch(setLoading(data)),
});

const mapStateToProps = (state: any): StateProps => ({
	activeTree: state.SettingsReducer.activeTree,
	routerState: state.router.location.state,
	pending: state.ProjectViewReducer.pending,
	filesUploading: state.ProjectViewReducer.filesUploading,
	project: state.ProjectViewReducer.project,
	files: state.ProjectViewReducer.files,
	token: state.AuthReducer.token,
	local: state.AuthReducer.local,
	selectedKeys: state.TreeReducer.selectedKeys,
	projectHub: state.HubReducer.project,
	loadingPage: state.LoadingReducer.loadingPage,
});

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Component);
