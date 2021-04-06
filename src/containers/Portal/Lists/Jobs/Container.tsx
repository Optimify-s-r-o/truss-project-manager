import Component, { StateProps } from './Component';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { EditTruss, editTruss } from '../../../../sagas/Truss/_actions';
import { getJobs } from '../../SidebarFilter/_actions';
import { Page } from '../../../../types/_types';
import { PutHeaderSettings } from '../_types';
import { setExpandedKeys, setSelectedKeys } from '../../TreeView/_actions';
import { usersAction } from '../../Accounts/_actions';
import {
	getHeaderSettings,
	putHeaderSettings,
	resetHeaderSettings,
} from "../_action";

const mapStateToProps = (state: any): StateProps => ({
	firstRecordOnPage: state.FilterReducer.jobs?.FirstRecordOnPage,
	lastRecordOnPage: state.FilterReducer.jobs?.LastRecordOnPage,
	totalPages: state.FilterReducer.jobs?.TotalPages,
	totalRecords: state.FilterReducer.jobs?.TotalRecords,
	currentPage: state.FilterReducer.jobs?.CurrentPage,
	isFiltered: state.FilterReducer.jobs?.IsFiltered,
	recordsBeforeFilter: state.FilterReducer.jobs?.RecordsBeforeFilter,
	pageSize: state.FilterReducer.jobs?.PageSize,
	jobs: state.FilterReducer.jobs?.Data,
	pending: state.FilterReducer.pending,
	filter: state.SettingsReducer.filter,
	path: state.router.location.pathname,
	customerTree: state.TreeReducer.customerTree,
	projectTree: state.TreeReducer.projectTree,
	jobTree: state.TreeReducer.jobTree,
	trussTree: state.TreeReducer.trussTree,
	activeTree: state.SettingsReducer.activeTree,
	users: state.UserReducer.users,
	local: state.AuthReducer.local,
	token: state.AuthReducer.token,
	activeFilterContent: state.FilterReducer.activeFilterContent,
	initSort: state.HeaderSettingsReducer.sort,
	initSortOrder: state.HeaderSettingsReducer.sortOrder,
	initHeaders: state.HeaderSettingsReducer.headers,
	activeFilter: state.FilterReducer.activeFilter,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	getJobs: (data: Page) => dispatch(getJobs.request(data)),
	editTruss: (data: EditTruss) => dispatch(editTruss.request(data)),
	getUsers: (data: Page) => dispatch(usersAction.request(data)),
	setSelectedKeys: (data: string[]) => dispatch(setSelectedKeys(data)),
	setExpandedKeys: (data: string[]) => dispatch(setExpandedKeys(data)),
	putHeaderSettings: (data: PutHeaderSettings) =>
		dispatch(putHeaderSettings.request(data)),
	getHeaderSettings: (data: string) =>
		dispatch(getHeaderSettings.request(data)),
	resetHeaderSettings: (data: string) =>
		dispatch(resetHeaderSettings.request(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
