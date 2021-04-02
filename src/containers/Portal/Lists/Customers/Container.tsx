import Component, { DispatchProps, StateProps } from './Component';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { CustomersAllFilterRequest, DeleteRequest } from './_types';
import { deleteCustomer } from './_actions';
import { filterEntities, getCustomers } from '../../SidebarFilter/_actions';
import { getHeaderSettings, putHeaderSettings } from '../_action';
import { Page } from '../../../../types/_types';
import { PutHeaderSettings } from '../_types';
import { withRouter } from 'react-router-dom';

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
	getCustomers: (data: Page) => dispatch(getCustomers.request(data)),
	filterCustomers: (data: CustomersAllFilterRequest) =>
		dispatch(filterEntities.request(data)),
	deleteCustomer: (data: DeleteRequest) =>
		dispatch(deleteCustomer.request(data)),
	putHeaderSettings: (data: PutHeaderSettings) =>
		dispatch(putHeaderSettings.request(data)),
	getHeaderSettings: (data: string) =>
		dispatch(getHeaderSettings.request(data)),
});

const mapStateToProps = (state: any): StateProps => ({
	activeTree: state.SettingsReducer.activeTree,
	filter: state.SettingsReducer.filter,
	customers: state.FilterReducer.customers?.Data,
	firstRecordOnPage: state.FilterReducer.customers?.FirstRecordOnPage,
	lastRecordOnPage: state.FilterReducer.customers?.LastRecordOnPage,
	isFiltered: state.FilterReducer.customers?.IsFiltered,
	recordsBeforeFilter: state.FilterReducer.customers?.RecordsBeforeFilter,
	currentPage: state.FilterReducer.customers?.CurrentPage,
	totalPages: state.FilterReducer.customers?.TotalPages,
	totalRecords: state.FilterReducer.customers?.TotalRecords,
	pageSize: state.FilterReducer.customers?.PageSize,
	path: state.router.location.pathname,
	pending: state.FilterReducer.pending,
	activeFilterContent: state.FilterReducer.activeFilterContent,
	initSort: state.HeaderSettingsReducer.sort,
	initSortOrder: state.HeaderSettingsReducer.sortOrder,
	initHeaders: state.HeaderSettingsReducer.header,
	activeFilter: state.FilterReducer.activeFilter,
});

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Component);
