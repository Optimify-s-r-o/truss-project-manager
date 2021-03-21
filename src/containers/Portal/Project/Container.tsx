import Component, { StateProps } from './Component';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { CreateCustomer } from '../Customer/_types';
import { createCustomerAction } from '../Customer/_actions';
import { createfromJson, ProjectRequest } from './_types';
import { createProject, createProjectWithJson } from './_actions';
import { getCustomers } from '../SidebarFilter/_actions';
import { Page } from '../../../types/_types';
import { withRouter } from 'react-router-dom';

const mapDispatchToProps = (dispatch: Dispatch) => ({
	saveProject: (data: ProjectRequest) => dispatch(createProject.request(data)),
	saveProjectFromJson: (data: createfromJson) =>
		dispatch(createProjectWithJson.request(data)),
	getCustomers: (data: Page) => dispatch(getCustomers.request(data)),
	createCustomerAction: (data: CreateCustomer) =>
		dispatch(createCustomerAction.request(data)),
});

const mapStateToProps = (state: any): StateProps => ({
	all: state.CustomersReducer.all,
	project: state.ProjectReducer.project,
	projectPending: state.ProjectReducer.pending,
	customersPending: state.CustomersReducer.pending,
	createdEvidence: state.CustomerReducer.createdEvidence,
	updatingCustomer: state.CustomerReducer.updatingCustomer,
	customers: state.FilterReducer.customers?.Data,
	loadingCustomers: state.FilterReducer.pending,
	loadingCustomerAction: state.CustomerReducer.pending,
	settings: state.SettingsReducer.settings,
	users: state.UserReducer.users,
	username: state.AuthReducer.username,
});

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Component);
