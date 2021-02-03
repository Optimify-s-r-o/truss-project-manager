import Component, { DispatchProps, StateProps } from './Component';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Credentials } from '../Cloud/_types';
import { localUsers, loginLocal } from './_actions';
import { RootStateType } from '../../../reducers';
import { withRouter } from 'react-router-dom';

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
	localLogin: (data: Credentials) => dispatch(loginLocal.request(data)),
	localUsers: (data: void) => dispatch(localUsers.request(data)),
});

const mapStateToProps = (state: RootStateType): StateProps => ({
	pending: state.AuthReducer.pending,
	loadingUsers: state.AuthReducer.loadingUsers,
	users: state.AuthReducer.users,
	local: state.AuthReducer.local,
});

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Component);
