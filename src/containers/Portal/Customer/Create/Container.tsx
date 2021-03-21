import Component, { StateProps } from './Componet';
import { clearNotificationAction } from '../../../../components/Toast/_actions';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { CreateCustomer, Customer } from '../_types';
import { Page } from '../../../../types/_types';
import { withRouter } from 'react-router-dom';
import {
	clearAres,
	clearCustomerAction,
	createCustomerAction,
	deleteCustomerAction,
	getAllCustomersSimplifiedAction,
	getCustomerByIdAction,
	loadCompanyDataFromAres,
	updateCustomerAction,
} from "../_actions";

const mapDispatchToProps = (dispatch: Dispatch) => ({
	createCustomerAction: (data: CreateCustomer) =>
		dispatch(createCustomerAction.request(data)),
	getAllCustomersSimplifiedAction: (data: Page) =>
		dispatch(getAllCustomersSimplifiedAction.request(data)),
	getCustomerByIdAction: (data: string) =>
		dispatch(getCustomerByIdAction.request(data)),
	updateCustomerAction: (data: Customer) =>
		dispatch(updateCustomerAction.request(data)),
	deleteCustomerAction: (data: string) =>
		dispatch(deleteCustomerAction.request(data)),
	loadCompanyDataFromAres: (data: string) =>
		dispatch(loadCompanyDataFromAres.request(data)),
	clearAres: () => dispatch(clearAres()),
	clearCustomerAction: () => dispatch(clearCustomerAction()),
	clearToast: () => dispatch(clearNotificationAction()),
});

const mapStateToProps = (state: any): StateProps => ({
	customer: state.CustomerReducer.customer,
	pending: state.CustomerReducer.pending,
	ares: state.CustomerReducer.ares,
	aresPending: state.CustomerReducer.aresPending,
});

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Component);
