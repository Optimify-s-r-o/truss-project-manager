import * as React from 'react';
import Accounts from '../containers/Portal/Accounts/Container';
import Bin from '../containers/Portal/Bin/Container';
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
import Backup from '../containers/Portal/Settings/Backup/Container';
import { HubConnection } from '@microsoft/signalr';
import { Routes } from '../constants/routes';
import { Switch } from 'react-router';
import {
	default as CreateCustomer,
	default as NewLegalCustomer,
} from "../containers/Portal/Customer/Create/Container";

interface IProps {
	connect: HubConnection;
}

const Index = ({ connect }: IProps) => {
	return (
		<Switch>
			{/*Projects*/}
			<ProtectedRoute path={Routes.PROJECT_NEW} component={Projects} />
			<ProtectedRoute exact={true} path={Routes.PORTAL} component={Projects} />
			<ProtectedRoute exact={true} path={Routes.BIN} component={Bin} />
			{/*Customers*/}
			<ProtectedRoute path={Routes.CUSTOMER_LIST} component={ListOfCustomers} />
			{/*Filter*/}
			<ProtectedRoute path={Routes.FILTER_PROJECT} component={FilterProject} />
			<ProtectedRoute path={Routes.FILTER_TRUSS} component={FilterTruss} />
			<ProtectedRoute exact path={Routes.FILTER_JOB} component={FilterJob} />
			{/*Accounts*/}
			<ProtectedRoute
				exact={true}
				path={Routes.ACCOUNTS_NEW_PASSWORD}
				component={NewPassword}
			/>
			<ProtectedRoute exact={true} path={Routes.CREATE_USER} component={User} />
			<ProtectedRoute
				exact={true}
				path={Routes.LINK_CREATE_USER}
				component={User}
			/>
			<ProtectedRoute exact={true} path={Routes.USERS} component={Accounts} />
			{/*Tree*/}
			<ProtectedRoute path={Routes.TREE_PROJECT} component={Project} />
			<ProtectedRoute
				path={Routes.TREE_PROJECT_MULTIPLE}
				component={ProjectMultiple}
			/>
			<ProtectedRoute path={Routes.TREE_JOB} component={Job} />
			<ProtectedRoute path={Routes.TREE_JOB_MULTIPLE} component={JobMultiple} />
			<ProtectedRoute
				path={Routes.TREE_TRUSS_MULTIPLE}
				component={TrussMultiple}
			/>
			<ProtectedRoute path={Routes.TREE_TRUSS} component={Truss} />
			{/*Searched*/}
			<ProtectedRoute path={Routes.SEARCHED} component={Searched} />
			<ProtectedRoute path={Routes.CREATE_USER} component={User} />
			<ProtectedRoute
				path={Routes.NEW_LEGAL_CUSTOMER_UPGRADE}
				component={NewLegalCustomer}
			/>
			<ProtectedRoute
				path={Routes.CREATE_CUSTOMER}
				component={CreateCustomer}
			/>
			<ProtectedRoute path={Routes.EDIT_CUSTOMER} component={CreateCustomer} />
			<ProtectedRoute
				path={Routes.SETTINGS_ABOUT_PROGRAM}
				component={SettingsAboutProgram}
			/>
			<ProtectedRoute
				path={Routes.BACKUP}
				component={Backup}
			/>
			<ProtectedRoute
				path={Routes.SETTINGS_ORGANIZATION}
				component={SettingsOrganization}
			/>
			<ProtectedRoute
				path={Routes.SETTINGS_TRUSS}
				component={SettingsTrussSystem}
			/>
			{/*Templates*/}
			<ProtectedRoute path={Routes.TEMPLATES} component={Templates} />
			{/*Templates*/}
			<ProtectedRoute
				path={Routes.PRICE_LISTS_PLATES}
				component={PriceListPlates}
			/>
			{/*Templates*/}
			<ProtectedRoute
				path={Routes.PRICE_LISTS_CUSTOM}
				component={PriceListCustom}
			/>
		</Switch>
	);
};

export default Index;
