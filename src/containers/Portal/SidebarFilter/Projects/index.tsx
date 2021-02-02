import * as React from 'react';
import Sidebar from './Sidebar';
import { Fetch, FilterSettings, TreeType } from '../../../../types/_types';
import { FilterType } from '../index';
import { getPortalUsers } from '../../../../sagas/Fetch/actions';
import { Show } from '../_styles';
import { UserData } from '../../Accounts/_types';

export interface IProject {
	filter: FilterSettings;
	activeTree: TreeType;
	path: string;
	getUsers: (data: Fetch) => void;
	users: UserData[];
	active: boolean;
	resetTree: () => void;
	activeFilterContent: any;
	activeFilter: FilterType;
	handleChange: (value: FilterType) => void;
	invokeTreeHub: (tree: TreeType) => void;
	projectPending: boolean;
	getProjects: (data: Fetch) => void;
	show: boolean;
	formik: any;
}

export const Project = ({
	filter,
	activeTree,
	path,
	users,
	getUsers,
	active,
	resetTree,
	activeFilterContent,
	activeFilter,
	handleChange,
	invokeTreeHub,
	projectPending,
	getProjects,
	show,
	formik,
}: IProject) => {
	React.useEffect(() => {
		getUsers(getPortalUsers());
	}, []);

	return (
		<Show show={show}>
			<Sidebar
				formik={formik}
				filter={filter}
				activeTree={activeTree}
				users={users}
				active={active}
				resetTree={resetTree}
				activeFilterContent={activeFilterContent}
				handleChange={handleChange}
				activeFilter={activeFilter}
				projectPending={projectPending}
				getProjects={getProjects}
			/>
		</Show>
	);
};
