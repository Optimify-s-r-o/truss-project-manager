import Component, { DispatchProps, StateProps } from './Component';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { resetPassword } from './_actions';
import { RootStateType } from '../../../reducers';
import { withRouter } from 'react-router-dom';

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
	resetPasswordAction: (data: string) => dispatch(resetPassword.request(data)),
});

const mapStateToProps = (state: RootStateType): StateProps => ({
	pending: state.AuthReducer.pending,
});

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Component);
