import Component, { StateProps } from './Componet';
import { clearNotificationAction } from '../../../../components/Toast/_actions';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Customer, Fetch } from '../../../../types/_types';
import { CustomerFetch } from '../_types';
import { CustomerRootObject, IArest } from './_types';
import { settings } from '../../_actions';
import { withRouter } from 'react-router-dom';
import {
	clearCustomerAction,
	customerAction,
	updateCustomerAction,
} from "../_actions";
import {
	arest,
	clearArest,
	clearLegal,
	getLegalPersonById,
	SaveLegalCustomerAction,
} from "./_actions";

const mapDispatchToProps = (dispatch: Dispatch) => ({
	loadData: (data: IArest) => dispatch(arest.request(data)),
	saveLegalPerson: (data: CustomerRootObject) =>
		dispatch(SaveLegalCustomerAction.request(data)),
	getCustomer: (data: CustomerFetch) => dispatch(customerAction.request(data)),
	save: (data: Customer) => dispatch(updateCustomerAction.request(data)),
	clearCustomer: () => dispatch(clearCustomerAction()),
	clearArest: () => dispatch(clearArest()),
	clearLegal: () => dispatch(clearLegal()),
	getSettings: (data: Fetch) => dispatch(settings.request(data)),
	getLegalPersonById: (data: Fetch) =>
		dispatch(getLegalPersonById.request(data)),
	clearToast: () => dispatch(clearNotificationAction()),
});

const mapStateToProps = (state: any): StateProps => ({
	activeTree: state.SettingsReducer.activeTree,
	customer: state.CustomerReducer.customer,
	customerPending: state.CustomerReducer.pending,
	pending: state.CustomerReducer.updatingCustomer,
	legal: state.LegalPersonReducer.legal,
	pendingArest: state.LegalPersonReducer.pendingArest,
	arestResponse: state.LegalPersonReducer.arest,
	settings: state.SettingsReducer.settings,
	toast: state.toastReducer.notification,
});

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Component);
