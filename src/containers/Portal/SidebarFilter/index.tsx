import * as Yup from 'yup';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import SidebarNavigation from '../Lists/components/SidebarNavigation';
import { Customer } from './Customer';
import { faFolders, faHomeLgAlt, faMountains } from '@fortawesome/pro-light-svg-icons';
import {
	Fetch,
	FilterSettings,
	Page,
	TreeType
	} from '../../../types/_types';
import { FilterWrapper, Icon, Title } from './_styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form } from '../../../constants/globalStyles';
import { getInitialValues } from './_services';
import { Hub } from '../../../constants/hub';
import { HubConnection } from '@microsoft/signalr';
import { Job } from './Jobs';
import { lang, t } from '../../../translation/i18n';
import { Project } from './Projects';
import { Sidebar } from '../Lists/components/_styles';
import { Submit } from './components/Submit';
import { Tooltip } from 'antd';
import { translationPath } from '../../../utils/getPath';
import { Truss } from './Trusses';
import { useFormik } from 'formik';
import { useLocation } from 'react-router';
import { UserData } from '../Accounts/_types';

export enum FilterType {
	Customer,
	CustomerPerson,
	CustomerCompany,
	CustomerEvidence,
	Project,
	Job,
	Truss,
}

interface IFilter {
	filter: FilterSettings;
	activeTree: TreeType;
	path: string;
	getUsers: (data: Fetch) => void;
	users: UserData[];
	connect: HubConnection;
	active: boolean;
	activeFilterContent: any;
	getCustomers: (data: Page) => void;
	filterEntities: (data: any) => void;
	trussPending: boolean;
	jobPending: boolean;
	projectPending: boolean;
	customerPending: boolean;
	activeFilter: boolean;
	selectedKeys: string[];
	getProjects: (data: Fetch) => void;
	getJobs: (data: Page) => void;
	pending: boolean;
}

export const Filter = ({
	active,
	activeFilterContent,
	filter,
	activeTree,
	path,
	users,
	getUsers,
	filterEntities,
	connect,
	getCustomers,
	trussPending,
	projectPending,
	customerPending,
	jobPending,
	activeFilter,
	pending,
	getJobs,
	getProjects,
}: IFilter) => {
	const location = useLocation();
	const [activeFilterType, setActiveFilter] = useState<FilterType>(
		FilterType.Job
	);

	useEffect(() => {
		setActiveFilter(
			activeTree === TreeType.PROJECT
				? FilterType.Project
				: activeTree === TreeType.JOB
				? FilterType.Job
				: activeTree === TreeType.TRUSS
				? FilterType.Truss
				: FilterType.Customer
		);
	}, [activeTree]);

	const invokeTreeHub = async (tree: TreeType) => {
		try {
			console.log("RequestNewTree");
			connect.invoke(Hub.RequestNewTree, tree, 0, 25, "");
		} catch (err) {
			console.log(err);
		}
	};

	const handleChange = (value: FilterType) => {
		setActiveFilter(value);
	};

	const resetTree = () => {
		try {
			connect.invoke("ResetTree");
		} catch (err) {
			console.log(err);
		}
	};

	const formik = useFormik({
		initialValues: getInitialValues(activeTree, filter, activeFilterContent),
		enableReinitialize: true,
		validationSchema: Yup.object({}),
		onSubmit: (values: any) => {
			if (!_.isEqual(getInitialValues(activeTree, filter), values)) {
				invokeTreeHub(activeTree);
				filterEntities({...values, location});
			}
		},
	});
	return (
		<SidebarNavigation path={path} activeFilter={activeFilter}>
			<Sidebar>
				<Title>
					<Tooltip
						title={t(
							translationPath(
								activeFilterType === FilterType.Job
									? lang.common.jobFilter
									: activeFilterType === FilterType.Project
									? lang.common.projectFilter
									: lang.common.trussFilter
							)
						)}
						placement={"top"}
					>
						<Icon isActive={true}>
							{t(translationPath(lang.common.filterTitle))}{" "}
							<FontAwesomeIcon
								icon={
									activeFilterType === FilterType.Job
										? faHomeLgAlt
										: activeFilterType === FilterType.Project
										? faFolders
										: faMountains
								}
							/>
						</Icon>
					</Tooltip>
				</Title>

				<FilterWrapper>
					<Form onSubmit={formik.handleSubmit}>
						<Submit
							formik={formik}
							active={active}
							activeFilterContent={activeFilterContent}
							activeTree={activeTree}
							pending={pending}
							filter={filter}
						/>
						<Project
							formik={formik}
							filter={filter}
							activeTree={activeTree}
							path={path}
							users={users}
							getUsers={getUsers}
							active={active}
							resetTree={resetTree}
							activeFilterContent={activeFilterContent}
							handleChange={handleChange}
							activeFilter={activeFilterType}
							invokeTreeHub={invokeTreeHub}
							projectPending={projectPending}
							getProjects={getProjects}
							show={activeFilterType === FilterType.Project}
						/>
						<Job
							formik={formik}
							filter={filter}
							activeTree={activeTree}
							path={path}
							users={users}
							getUsers={getUsers}
							active={active}
							resetTree={resetTree}
							activeFilterContent={activeFilterContent}
							handleChange={handleChange}
							activeFilter={activeFilterType}
							invokeTreeHub={invokeTreeHub}
							jobPending={jobPending}
							show={activeFilterType === FilterType.Job}
						/>
						<Truss
							formik={formik}
							filter={filter}
							activeTree={activeTree}
							path={path}
							getUsers={getUsers}
							active={active}
							resetTree={resetTree}
							activeFilterContent={activeFilterContent}
							handleChange={handleChange}
							activeFilter={activeFilterType}
							invokeTreeHub={invokeTreeHub}
							trussPending={trussPending}
							show={activeFilterType === FilterType.Truss}
						/>
						<Customer
							formik={formik}
							getCustomers={getCustomers}
							filter={filter}
							activeTree={activeTree}
							path={path}
							active={active}
							resetTree={resetTree}
							activeFilterContent={activeFilterContent}
							handleChange={handleChange}
							activeFilter={activeFilterType}
							invokeTreeHub={invokeTreeHub}
							customerPending={customerPending}
							show={activeFilterType === FilterType.Customer}
						/>
					</Form>
				</FilterWrapper>
			</Sidebar>
		</SidebarNavigation>
	);
};
