import Component, { StateProps } from './Component';
import { clearNotificationAction } from '../../components/Toast/_actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootStateType } from '../../reducers';
import { setCloud } from './Cloud/_actions';
import { setLocal } from './Local/_actions';

const mapStateToProps = (state: RootStateType): StateProps => ({
	path: state.router.location.pathname,
	local: state.AuthReducer.local,
	cloud: state.AuthReducer.cloud,
	toast: state.toastReducer.notification,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	setLocal: (data: boolean) => dispatch(setLocal(data)),
	setCloud: (data: boolean) => dispatch(setCloud(data)),
	clearToast: () => dispatch(clearNotificationAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
