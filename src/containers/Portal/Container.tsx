import Component from './Component';
import { clearNotificationAction } from '../../components/Toast/_actions';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createTruss, editTruss, OpenTruss } from '../../sagas/Truss/_actions';
import { DeleteJob, JobRootObject, Unlock } from './TreeView/Job/_types';
import { deleteProject } from './Project/_actions';
import { DeleteProject } from './Project/_types';
import {
	Fetch,
	Page,
	Project,
	TreeType
	} from '../../types/_types';
import { getProjectFiles, setProject } from './TreeView/Project/_actions';
import { priceListsGetAction } from './PriceLists/_actions';
import { ProjectFileRequest } from './TreeView/Project/_types';
import { quickSearch } from './FastNavigation/_actions';
import { QuickSearchRequest } from './FastNavigation/_types';
import { setCloud } from '../Home/Cloud/_actions';
import { setLoading } from './TreeView/Project/General/_actions';
import { setLocal } from '../Home/Local/_actions';
import {
	settings,
	settingsFilter,
	treeType,
	usersAction
	} from './_actions';
import { setTruss, trussImage } from './TreeView/Truss/_actions';
import { Truss } from './TreeView/Truss/_types';
import { withRouter } from 'react-router';
import {
	setHubJob,
	setHubProject,
	setHubTree,
	setHubTruss,
} from "../../reducers/hubReducer/_actions";
import {
	addToSelectionAction,
	removeFromSelectionAction,
	resetSelectionAction,
} from "./Sidebar/_actions";
import {
	filterEntities,
	getCustomers,
	getJobs,
	getProjects,
	getTrusses,
} from "./SidebarFilter/_actions";
import {
	deleteJob,
	jobImage,
	setJob,
	unlockJob,
} from "./TreeView/Job/_actions";
import {
	customerTree,
	jobTree,
	setExpandedKeys,
	setSelectedKeys,
	treeReset,
	trussTree,
} from "./TreeView/_actions";

const mapStateToProps = (state: any) => ({
	activeTree: state.SettingsReducer.activeTree,
	router: state.router,
	projectTree: state.TreeFirstLayerReducer.projectTree,
	customerTree: state.TreeFirstLayerReducer.customerTree,
	jobTree: state.TreeFirstLayerReducer.jobTree,
	pending: state.FilterReducer.pending,
	pathname: state.router.location.pathname,
	local: state.AuthReducer.local,
	token: state.AuthReducer.token,
	currentPage: state.TreeFirstLayerReducer.currentPage,
	totalPages: state.TreeFirstLayerReducer.totalPages,
	totalRecords: state.TreeFirstLayerReducer.totalRecords,
	expandedKeys: state.TreeReducer.expandedKeys,
	selectedKeys: state.TreeReducer.selectedKeys,
	toast: state.toastReducer.notification,
	filter: state.SettingsReducer.filter,
	path: state.router.location.pathname,
	users: state.UserReducer.users,
	trussPending: state.TrussesReducer.trussPending,
	jobPending: state.FilterReducer.pending,
	projectPending: state.FilterReducer.projectPending,
	customerPending: state.CustomersReducer.customerPending,
	treeHub: state.HubReducer.tree,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	setLoading: (data: boolean) => dispatch(setLoading(data)),
	setHubTree: (data: any) => dispatch(setHubTree(data)),
	setHubProject: (data: any) => dispatch(setHubProject(data)),
	setHubJob: (data: any) => dispatch(setHubJob(data)),
	setHubTruss: (data: any) => dispatch(setHubTruss(data)),
	settingsCall: (data: Fetch) => dispatch(settings.request(data)),
	filterSettingsCall: (data: Fetch) => dispatch(settingsFilter.request(data)),
	customerTree: (data: Fetch) => dispatch(customerTree.request(data)),
	jobTree: (data: Fetch) => dispatch(jobTree.request(data)),
	trussTree: (data: Fetch) => dispatch(trussTree.request(data)),
	changeTree: (data: TreeType) => dispatch(treeType(data)),
	setLocal: (data: boolean) => dispatch(setLocal(data)),
	setCloud: (data: boolean) => dispatch(setCloud(data)),
	setExpandedKeys: (data: string[]) => dispatch(setExpandedKeys(data)),
	setSelectedKeys: (data: string[]) => dispatch(setSelectedKeys(data)),
	treeReset: (data: Fetch) => dispatch(treeReset.request(data)),
	removeJob: (data: DeleteJob) => dispatch(deleteJob.request(data)),
	removeProject: (data: DeleteProject) => dispatch(deleteProject.request(data)),
	editTruss: (data: OpenTruss) => dispatch(editTruss.request(data)),
	createTruss: (data: OpenTruss) => dispatch(createTruss.request(data)),
	unlockJob: (data: Unlock) => dispatch(unlockJob.request(data)),
	clearToast: () => dispatch(clearNotificationAction()),
	quickSearchRequest: (data: QuickSearchRequest) =>
		dispatch(quickSearch.request(data)),
	getUsers: (data: Fetch) => dispatch(usersAction.request(data)),
	filterEntities: (data: any) => dispatch(filterEntities.request(data)),
	getCustomers: (data: Page) => dispatch(getCustomers.request(data)),
	getTrusses: (data: Page) => dispatch(getTrusses.request(data)),
	getProjects: (data: Page) => dispatch(getProjects.request(data)),
	getJobs: (data: Page) => dispatch(getJobs.request(data)),
	removeFromSelection: (data: string) =>
		dispatch(removeFromSelectionAction.request(data)),
	addToSelection: (data: string) =>
		dispatch(addToSelectionAction.request(data)),
	resetSelectionAction: (data: void) =>
		dispatch(resetSelectionAction.request(data)),
	getFiles: (data: ProjectFileRequest) =>
		dispatch(getProjectFiles.request(data)),
	setJob: (data: JobRootObject) => dispatch(setJob(data)),
	getJobImage: (data: string) => dispatch(jobImage.request(data)),
	getTrussImage: (data: string) => dispatch(trussImage.request(data)),
	setTruss: (data: Truss) => dispatch(setTruss(data)),
	priceListsGetAction: (data: void) =>
		dispatch(priceListsGetAction.request(data)),
	setProject: (data: Project) => dispatch(setProject(data)),
});

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Component);
