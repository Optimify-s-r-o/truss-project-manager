import Component, { StateProps } from './Component';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { getTrusses } from '../../SidebarFilter/_actions';
import { Page } from '../../../../types/_types';
import { PutHeaderSettings } from '../_types';
import { setExpandedKeys, setSelectedKeys } from '../../TreeView/_actions';
import { usersAction } from '../../Accounts/_actions';
import {
	getHeaderSettings,
	putHeaderSettings,
	resetHeaderSettings,
	setSort,
	setSortOrder,
} from "../_action";

const mapStateToProps = (state: any): StateProps => ({
	firstRecordOnPage: state.FilterReducer.trusses?.FirstRecordOnPage,
	lastRecordOnPage: state.FilterReducer.trusses?.LastRecordOnPage,
	currentPage: state.FilterReducer.trusses?.CurrentPage,
	totalRecords: state.FilterReducer.trusses?.TotalRecords,
	totalPages: state.FilterReducer.trusses?.TotalPages,
	settingsPageSize: state.FilterReducer.trusses?.SettingsPageSize,
	isFiltered: state.FilterReducer.trusses?.IsFiltered,
	recordsBeforeFilter: state.FilterReducer.trusses?.RecordsBeforeFilter,
	trusses: state.FilterReducer.trusses?.Data,
	pageSize: state.FilterReducer.trusses?.PageSize,
	pending: state.FilterReducer.pending,
	path: state.router.location.pathname,
	filter: state.SettingsReducer.filter,
	customerTree: state.TreeReducer.customerTree,
	projectTree: state.TreeReducer.projectTree,
	jobTree: state.TreeReducer.jobTree,
	activeTree: state.SettingsReducer.activeTree,
	trussTree: state.TreeReducer.trussTree,
	local: state.AuthReducer.local,
	token: state.AuthReducer.token,
	activeFilterContent: state.FilterReducer.activeFilterContent,
	initSort: state.HeaderSettingsReducer.sort,
	initSortOrder: state.HeaderSettingsReducer.sortOrder,
	initHeaders: state.HeaderSettingsReducer.headers,
	activeFilter: state.FilterReducer.activeFilter,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	getTrusses: (data: Page) => dispatch(getTrusses.request(data)),
	getUsers: (data: Page) => dispatch(usersAction.request(data)),
	setSelectedKeys: (data: string[]) => dispatch(setSelectedKeys(data)),
	setSort: (data: number[]) => dispatch(setSort(data)),
	setSortOrder: (data: number[]) => dispatch(setSortOrder(data)),
	setExpandedKeys: (data: string[]) => dispatch(setExpandedKeys(data)),
	putHeaderSettings: (data: PutHeaderSettings) =>
		dispatch(putHeaderSettings.request(data)),
	getHeaderSettings: (data: string) =>
		dispatch(getHeaderSettings.request(data)),
	resetHeaderSettings: (data: string) =>
		dispatch(resetHeaderSettings.request(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
