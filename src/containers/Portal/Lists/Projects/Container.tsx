import Component, { StateProps } from './Component';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { getHeaderSettings, putHeaderSettings } from '../_action';
import { getProjects } from '../../SidebarFilter/_actions';
import { Page } from '../../../../types/_types';
import { push } from 'connected-react-router';
import { PutHeaderSettings } from '../_types';
import { setSelectedKeys } from '../../TreeView/_actions';
import { usersAction } from '../../Accounts/_actions';

const mapStateToProps = (state: any): StateProps => ({
	firstRecordOnPage: state.FilterReducer.projects?.FirstRecordOnPage,
	lastRecordOnPage: state.FilterReducer.projects?.LastRecordOnPage,
	currentPage: state.FilterReducer.projects?.CurrentPage,
	totalPages: state.FilterReducer.projects?.TotalPages,
	totalRecords: state.FilterReducer.projects?.TotalRecords,
	isFiltered: state.FilterReducer.projects?.IsFiltered,
	recordsBeforeFilter: state.FilterReducer.projects?.RecordsBeforeFilter,
	jobs: state.FilterReducer.jobs?.Data,
	pageSize: state.FilterReducer.projects?.PageSize,
	project: state.FilterReducer.projects?.Data,
	path: state.router.location.pathname,
	pending: state.FilterReducer.pending,
	filter: state.SettingsReducer.filter,
	customerTree: state.TreeReducer.customerTree,
	projectTree: state.TreeReducer.projectTree,
	jobTree: state.TreeReducer.jobTree,
	activeTree: state.SettingsReducer.activeTree,
	users: state.UserReducer.users,
	trussTree: state.TreeReducer.trussTree,
	local: state.AuthReducer.local,
	token: state.AuthReducer.token,
	settings: state.SettingsReducer.settings,
	activeFilterContent: state.FilterReducer.activeFilterContent,
	initSort: state.HeaderSettingsReducer.sort,
	initSortOrder: state.HeaderSettingsReducer.sortOrder,
	initHeaders: state.HeaderSettingsReducer.headers,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	getProjects: (data: Page) => dispatch(getProjects.request(data)),
	getUsers: (data: Page) => dispatch(usersAction.request(data)),
	setSelectedKeys: (data: string[]) => dispatch(setSelectedKeys(data)),
	putHeaderSettings: (data: PutHeaderSettings) =>
		dispatch(putHeaderSettings.request(data)),
	getHeaderSettings: (data: string) =>
		dispatch(getHeaderSettings.request(data)),
	push,
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
