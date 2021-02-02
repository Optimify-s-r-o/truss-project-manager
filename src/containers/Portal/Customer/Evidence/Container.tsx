import Component, { StateProps } from './Component';
import { clearNotificationAction } from '../../../../components/Toast/_actions';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Customer, Fetch } from '../../../../types/_types';
import { getEvidenceCustomer } from './_actions';
import { updateCustomerAction } from '../_actions';
import { withRouter } from 'react-router-dom';

const mapDispatchToProps = (dispatch: Dispatch) => ({
	save: (data: Customer) => dispatch(updateCustomerAction.request(data)),
	getEvidenceCustomer: (data: Fetch) =>
		dispatch(getEvidenceCustomer.request(data)),
	clearToast: () => dispatch(clearNotificationAction()),
});

const mapStateToProps = (state: any): StateProps => ({
	activeTree: state.SettingsReducer.activeTree,
	pending: state.CustomerReducer.updatingCustomer,
	toast: state.toastReducer.notification,
	evidence: state.EvidenceReducer.evidence,
});

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Component);
