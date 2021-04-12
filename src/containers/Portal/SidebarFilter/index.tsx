import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import SidebarNavigation from '../Lists/components/SidebarNavigation';
import { Customer } from './Customer';
import { FilterSettings, Page, TreeType } from '../../../types/_types';
import { FilterWrapper, Icon, Title } from './_styles';
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
	getUsers: (data: Page) => void;
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
	getProjects: (data: Page) => void;
	getJobs: (data: Page) => void;
	pending: boolean;
	treeHub: any;
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
	treeHub,
}: IFilter) => {
	const location = useLocation();
	const [formData, setFormData] = useState<any>(getInitialValues(filter));
	const [activeFilterType, setActiveFilter] = useState<FilterType>(
		FilterType.Job
	);

	useEffect(() => {
		setFormData(getInitialValues(filter, activeFilterContent));
	}, [activeFilterContent]);

	useEffect(() => {
		getUsers({ Page: 0, PageSize: 25, Sort: "" });
	}, []);

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

	const handleForm = (newData: any) => {
		setFormData({ ...formData, ...newData });
	};

	const invokeTreeHub = async (tree: TreeType) => {
		try {
			if (connect?.state === "Connected") {
				connect.invoke(Hub.RequestNewTree, tree, 0, 25, "");
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handleChange = (value: FilterType) => {
		setActiveFilter(value);
	};

	const resetTree = () => {
		try {
			if (connect?.state === "Connected") {
				connect.invoke(Hub.ResetTree);
			}
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (treeHub) {
			treeHub.on(Hub.TreeResetFinished, (message) => {
				setFormData(getInitialValues(filter));
			});
		}
	}, [treeHub, activeTree, filter]);

	const handleSubmit = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
		if (!_.isEqual(getInitialValues(filter), formData)) {
			invokeTreeHub(activeTree);
			filterEntities({ ...formData, location });
		}
	};

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
							{t(translationPath(lang.common.filterTitle))}
						</Icon>
					</Tooltip>
				</Title>

				<FilterWrapper>
					<Submit
						active={active}
						activeFilterContent={activeFilterContent}
						activeFilter={activeFilter}
						activeTree={activeTree}
						pending={pending}
						filter={filter}
						formData={formData}
						handleSubmit={handleSubmit}
					/>
					<Project
						treeHub={treeHub}
						filter={filter}
						activeTree={activeTree}
						path={path}
						users={users}
						active={active}
						resetTree={resetTree}
						activeFilterContent={activeFilterContent}
						handleChange={handleChange}
						activeFilter={activeFilterType}
						invokeTreeHub={invokeTreeHub}
						projectPending={projectPending}
						handleForm={handleForm}
						show={activeFilterType === FilterType.Project}
					/>
					<Job
						treeHub={treeHub}
						filter={filter}
						activeTree={activeTree}
						path={path}
						users={users}
						active={active}
						resetTree={resetTree}
						activeFilterContent={activeFilterContent}
						handleChange={handleChange}
						activeFilter={activeFilterType}
						invokeTreeHub={invokeTreeHub}
						jobPending={jobPending}
						handleForm={handleForm}
						show={activeFilterType === FilterType.Job}
					/>
					<Truss
						treeHub={treeHub}
						filter={filter}
						activeTree={activeTree}
						path={path}
						active={active}
						resetTree={resetTree}
						activeFilterContent={activeFilterContent}
						handleChange={handleChange}
						activeFilter={activeFilterType}
						invokeTreeHub={invokeTreeHub}
						trussPending={trussPending}
						handleForm={handleForm}
						show={activeFilterType === FilterType.Truss}
					/>
					<Customer
						treeHub={treeHub}
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
						handleForm={handleForm}
						show={activeFilterType === FilterType.Customer}
					/>
				</FilterWrapper>
			</Sidebar>
		</SidebarNavigation>
	);
};
