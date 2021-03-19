import * as React from 'react';
import Accounts from '../containers/Portal/Accounts/Container';
import FilterJob from '../containers/Portal/Lists/Jobs/Container';
import FilterProject from '../containers/Portal/Lists/Projects/Container';
import FilterTruss from '../containers/Portal/Lists/Trusses/Container';
import Job from '../containers/Portal/TreeView/Job/Container';
import JobMultiple from '../containers/Portal/TreeView/Jobs/Container';
import ListOfCustomers from '../containers/Portal/Lists/Customers/Container';
import NewPassword from '../containers/Portal/Accounts/PasswordChange/Container';
import PriceListCustom from '../containers/Portal/PriceLists/Container';
import PriceListPlates from '../containers/Portal/PriceListsPlates/Container';
import Project from '../containers/Portal/TreeView/Project/Container';
import ProjectMultiple from '../containers/Portal/TreeView/Projects/Container';
import Projects from '../containers/Portal/Project/Container';
import ProtectedRoute from './ProtectedRoute';
import Searched from '../containers/Portal/QuickSearch/Container';
import SettingsAboutProgram from '../containers/Portal/Settings/AboutProgram/Container';
import SettingsOrganization from '../containers/Portal/Settings/Organization/Container';
import SettingsTrussSystem from '../containers/Portal/Settings/FileStore/Container';
import Templates from '../containers/Portal/Quotations/Container';
import Truss from '../containers/Portal/TreeView/Truss/Container';
import TrussMultiple from '../containers/Portal/TreeView/Trusses/Container';
import User from '../containers/Portal/Accounts/User/Container';
import { HubConnection } from '@microsoft/signalr';
import { Routes } from '../constants/routes';
import { Switch } from 'react-router';
import {
	default as CreateCustomer,
	default as NewLegalCustomer,
} from "../containers/Portal/Customer/Create/Container";

interface IProps {
	token: string;
	connect: HubConnection;
}

const Index = ({ token, connect }: IProps) => {
	return (
		<Switch>
			{/*Projects*/}
			<ProtectedRoute
				path={Routes.PROJECT_NEW}
				component={Projects}
				token={token}
			/>
			<ProtectedRoute
				exact={true}
				path={Routes.PORTAL}
				component={Projects}
				token={token}
			/>
			{/*Customers*/}
			<ProtectedRoute
				path={Routes.CUSTOMER_LIST}
				component={ListOfCustomers}
				token={token}
			/>
			{/*Filter*/}
			<ProtectedRoute
				path={Routes.FILTER_PROJECT}
				component={FilterProject}
				token={token}
			/>
			<ProtectedRoute
				path={Routes.FILTER_TRUSS}
				component={FilterTruss}
				token={token}
			/>
			<ProtectedRoute
				exact
				path={Routes.FILTER_JOB}
				component={FilterJob}
				token={token}
			/>
			{/*Accounts*/}
			<ProtectedRoute
				exact={true}
				path={Routes.ACCOUNTS_NEW_PASSWORD}
				component={NewPassword}
				token={token}
			/>
			<ProtectedRoute
				exact={true}
				path={Routes.CREATE_USER}
				component={User}
				token={token}
			/>
			<ProtectedRoute
				exact={true}
				path={Routes.LINK_CREATE_USER}
				component={User}
				token={token}
			/>
			<ProtectedRoute
				exact={true}
				path={Routes.USERS}
				component={Accounts}
				token={token}
			/>
			{/*Tree*/}
			<ProtectedRoute
				path={Routes.TREE_PROJECT}
				component={Project}
				token={token}
			/>
			<ProtectedRoute
				path={Routes.TREE_PROJECT_MULTIPLE}
				component={ProjectMultiple}
				token={token}
			/>
			<ProtectedRoute path={Routes.TREE_JOB} component={Job} token={token} />
			<ProtectedRoute
				path={Routes.TREE_JOB_MULTIPLE}
				component={JobMultiple}
				token={token}
			/>
			<ProtectedRoute
				path={Routes.TREE_TRUSS_MULTIPLE}
				component={TrussMultiple}
				token={token}
			/>
			<ProtectedRoute
				path={Routes.TREE_TRUSS}
				component={Truss}
				token={token}
			/>
			{/*Searched*/}
			<ProtectedRoute
				path={Routes.SEARCHED}
				component={Searched}
				token={token}
			/>
			<ProtectedRoute
				path={Routes.CREATE_USER}
				component={User}
				token={token}
			/>
			<ProtectedRoute
				path={Routes.NEW_LEGAL_CUSTOMER_UPGRADE}
				component={NewLegalCustomer}
				token={token}
			/>
			<ProtectedRoute
				path={Routes.CREATE_CUSTOMER}
				component={CreateCustomer}
				token={token}
			/>
			<ProtectedRoute
				path={Routes.SETTINGS_ABOUT_PROGRAM}
				component={SettingsAboutProgram}
				token={token}
			/>
			<ProtectedRoute
				path={Routes.SETTINGS_ORGANIZATION}
				component={SettingsOrganization}
				token={token}
			/>
			<ProtectedRoute
				path={Routes.SETTINGS_TRUSS}
				component={SettingsTrussSystem}
				token={token}
			/>
			{/*Templates*/}
			<ProtectedRoute
				path={Routes.TEMPLATES}
				component={Templates}
				token={token}
			/>
			{/*Templates*/}
			<ProtectedRoute
				path={Routes.PRICE_LISTS_PLATES}
				component={PriceListPlates}
				token={token}
			/>
			{/*Templates*/}
			<ProtectedRoute
				path={Routes.PRICE_LISTS_CUSTOM}
				component={PriceListCustom}
				token={token}
			/>
		</Switch>
	);
};

export default Index;
