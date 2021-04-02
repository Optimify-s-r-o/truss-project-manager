import Component, { StateProps } from './Component';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { getHeaderSettings, putHeaderSettings } from '../_action';
import { getTrusses } from '../../SidebarFilter/_actions';
import { Page } from '../../../../types/_types';
import { PutHeaderSettings } from '../_types';
import { setExpandedKeys, setSelectedKeys } from '../../TreeView/_actions';
import { usersAction } from '../../Accounts/_actions';

const mapStateToProps = (state: any): StateProps => ({
	firstRecordOnPage: state.TrussesReducer.trusses?.FirstRecordOnPage,
	lastRecordOnPage: state.TrussesReducer.trusses?.LastRecordOnPage,
	currentPage: state.TrussesReducer.trusses?.CurrentPage,
	totalRecords: state.TrussesReducer.trusses?.TotalRecords,
	totalPages: state.TrussesReducer.trusses?.TotalPages,
	isFiltered: state.TrussesReducer.trusses?.IsFiltered,
	recordsBeforeFilter: state.TrussesReducer.trusses?.RecordsBeforeFilter,
	trusses: state.TrussesReducer.trusses?.Data,
	pageSize: state.TrussesReducer.trusses?.PageSize,
	pending: state.TrussesReducer.pending,
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
	setExpandedKeys: (data: string[]) => dispatch(setExpandedKeys(data)),
	putHeaderSettings: (data: PutHeaderSettings) =>
		dispatch(putHeaderSettings.request(data)),
	getHeaderSettings: (data: string) =>
		dispatch(getHeaderSettings.request(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
