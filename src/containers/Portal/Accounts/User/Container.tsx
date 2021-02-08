import Component, { StateProps } from './Component';
import { clearNotificationAction } from '../../../../components/Toast/_actions';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { editUser, getUserByUsername } from '../_actions';
import { Fetch } from '../../../../types/_types';
import { push } from 'connected-react-router';
import { User } from '../_types';
import { withRouter } from 'react-router';

const mapStateToProps = (state: any): StateProps => ({
	routerState: state.router.location.state,
	users: state.UserReducer.users,
	user: state.UserReducer.user,
	pending: state.UserReducer.pending,
	toast: state.toastReducer.notification,
	role: state.AuthReducer.role,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	editUserCall: (data: User) => dispatch(editUser.request(data)),
	clearToast: () => dispatch(clearNotificationAction()),
	getUserByUsername: (data: Fetch) => dispatch(getUserByUsername.request(data)),
	push,
});

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Component);
