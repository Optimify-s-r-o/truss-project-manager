import Component, { StateProps } from './Component';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Fetch, Page } from '../../../../types/_types';
import { getTrusses } from '../../SidebarFilter/_actions';
import { setExpandedKeys, setSelectedKeys } from '../../TreeView/_actions';
import { usersAction } from '../../_actions';

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
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	getTrusses: (data: Page) => dispatch(getTrusses.request(data)),
	getUsers: (data: Fetch) => dispatch(usersAction.request(data)),
	setSelectedKeys: (data: string[]) => dispatch(setSelectedKeys(data)),
	setExpandedKeys: (data: string[]) => dispatch(setExpandedKeys(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
