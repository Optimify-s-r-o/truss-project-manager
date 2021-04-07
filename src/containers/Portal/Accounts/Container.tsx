import Component, { StateProps } from './Component';
import { connect } from 'react-redux';
import { deleteUser, usersWithPaginationAction } from './_actions';
import { Dispatch } from 'redux';
import { GlobalNotification } from '../../../components/Toast/_types';
import { notificationAction } from '../../../components/Toast/_actions';
import { Page } from '../../../types/_types';

const mapStateToProps = (state: any): StateProps => ({
	users: state.UserReducer.usersWithPagination?.Data,
	pending: state.UserReducer.pending,
	pendingLocal: state.AuthReducer.pending,
	pendingCloud: state.AuthReducer.pending,
	role: state.AuthReducer.role,
	username: state.AuthReducer.username,
	firstRecordOnPage: state.UserReducer.usersWithPagination?.FirstRecordOnPage,
	lastRecordOnPage: state.UserReducer.usersWithPagination?.LastRecordOnPage,
	currentPage: state.UserReducer.usersWithPagination?.CurrentPage,
	totalPages: state.UserReducer.usersWithPagination?.TotalPages,
	totalRecords: state.UserReducer.usersWithPagination?.TotalRecords,
	pageSize: state.UserReducer.usersWithPagination?.PageSize,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	getUsers: (data: Page) => dispatch(usersWithPaginationAction.request(data)),
	deleteUserCall: (data: string) => dispatch(deleteUser.request(data)),
	notify: (data: GlobalNotification) => dispatch(notificationAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
