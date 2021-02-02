import Component, { StateProps } from './Component';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Credentials, Login } from './_types';
import { login } from './_actions';
import { RootStateType } from '../../../reducers';
import { withRouter } from 'react-router-dom';

const mapDispatchToProps = (dispatch: Dispatch) => ({
	login: (data: Credentials) => dispatch(login.request(data)),
});

const mapStateToProps = (state: RootStateType): StateProps => ({
	pending: state.AuthReducer.pending,
});

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Component);
