import Component from './Component';
import { clearNotificationAction } from '../../../../components/Toast/_actions';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { editUser, getUserByUsername } from '../_actions';
import { Fetch } from '../../../../types/_types';
import { push } from 'connected-react-router';
import { StateProps } from './Component';
import { User } from '../_types';
import { withRouter } from 'react-router';

const mapStateToProps = (state: any): StateProps => ({
  routerState: state.router.location.state,
  users: state.UserReducer.users,
  user: state.UserReducer.user,
  pending: state.UserReducer.pending,
  toast: state.toastReducer.notification,
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
