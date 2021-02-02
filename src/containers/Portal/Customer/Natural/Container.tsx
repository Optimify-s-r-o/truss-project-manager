import Component, { StateProps } from './Component';
import { clearNotificationAction } from '../../../../components/Toast/_actions';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Customer, Fetch } from '../../../../types/_types';
import { CustomerFetch } from '../_types';
import { getNaturalPersonById } from './_actions';
import { settings } from '../../_actions';
import { withRouter } from 'react-router-dom';
import {
	clearCustomerAction,
	customerAction,
	updateCustomerAction,
} from "../_actions";

const mapDispatchToProps = (dispatch: Dispatch) => ({
	save: (data: Customer) => dispatch(updateCustomerAction.request(data)),
	clearCustomer: () => dispatch(clearCustomerAction()),
	getCustomer: (data: CustomerFetch) => dispatch(customerAction.request(data)),
	getNaturalPersonById: (data: Fetch) =>
		dispatch(getNaturalPersonById.request(data)),
	getSettings: (data: Fetch) => dispatch(settings.request(data)),
	clearToast: () => dispatch(clearNotificationAction()),
});

const mapStateToProps = (state: any): StateProps => ({
	activeTree: state.SettingsReducer.activeTree,
	pending: state.CustomerReducer.updatingCustomer,
	natural: state.NaturalPersonReducer.natural,
	settings: state.SettingsReducer.settings,
	customer: state.CustomerReducer.customer,
	toast: state.toastReducer.notification,
});

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Component);
