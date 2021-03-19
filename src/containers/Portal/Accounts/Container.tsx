import Component, { StateProps } from './Component';
import { connect } from 'react-redux';
import { deleteUser, usersAction } from './_actions';
import { Dispatch } from 'redux';
import { GlobalNotification } from '../../../components/Toast/_types';
import { notificationAction } from '../../../components/Toast/_actions';
import { Page } from '../../../types/_types';

const mapStateToProps = (state: any): StateProps => ({
	users: state.UserReducer.users.Data,
	pending: state.UserReducer.pending,
	pendingLocal: state.AuthReducer.pending,
	pendingCloud: state.AuthReducer.pending,
	role: state.AuthReducer.role,
	username: state.AuthReducer.username,
	firstRecordOnPage: state.UserReducer.users?.FirstRecordOnPage,
	lastRecordOnPage: state.UserReducer.users?.LastRecordOnPage,
	currentPage: state.UserReducer.users?.CurrentPage,
	totalPages: state.UserReducer.users?.TotalPages,
	totalRecords: state.UserReducer.users?.TotalRecords,
	pageSize: state.UserReducer.users?.PageSize,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	getUsers: (data: Page) => dispatch(usersAction.request(data)),
	deleteUserCall: (data: string) => dispatch(deleteUser.request(data)),
	notify: (data: GlobalNotification) => dispatch(notificationAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
