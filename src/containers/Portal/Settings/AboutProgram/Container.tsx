import Component, { DispatchProps, StateProps } from './Component';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootStateType } from '../../../../reducers';
import { withRouter } from 'react-router';

const mapStateToProps = (state: RootStateType): StateProps => ({});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({});

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Component);
