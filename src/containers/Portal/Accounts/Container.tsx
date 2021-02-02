import Component, { StateProps } from './Component';
import { connect } from 'react-redux';
import { deleteUser } from './_actions';
import { Dispatch } from 'redux';
import { Fetch } from '../../../types/_types';
import { GlobalNotification } from '../../../components/Toast/_types';
import { notificationAction } from '../../../components/Toast/_actions';
import { usersAction } from '../_actions';

const mapStateToProps = (state: any): StateProps => ({
	users: state.UserReducer.users,
	pendingLocal: state.AuthReducer.pending,
	pendingCloud: state.AuthReducer.pending,
	local: state.AuthReducer.local,
	role: state.AuthReducer.role,
	username: state.AuthReducer.username,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	getUsers: (data: Fetch) => dispatch(usersAction.request(data)),
	deleteUserCall: (data: Fetch) => dispatch(deleteUser.request(data)),
	notify: (data: GlobalNotification) => dispatch(notificationAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
