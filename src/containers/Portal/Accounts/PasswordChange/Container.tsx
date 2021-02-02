import Component from './Component';
import { changeLocalPasswordAction } from '../_actions';
import { ChangePassword } from '../_types';
import { clearNotificationAction } from '../../../../components/Toast/_actions';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { push } from 'connected-react-router';
import { StateProps } from './Component';
import { withRouter } from 'react-router';

const mapStateToProps = (state: any): StateProps => ({
  routerState: state.router.location.state,
  users: state.UserReducer.users,
  pending: state.UserReducer.pending,
  toast: state.toastReducer.notification
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  changeLocalPasswordAction: (data: ChangePassword) =>
    dispatch(changeLocalPasswordAction.request(data)),
  clearToast: () => dispatch(clearNotificationAction()),
  push
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Component);
