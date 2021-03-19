import * as React from 'react';
import Sidebar from './Sidebar';
import { FilterSettings, TreeType } from '../../../../types/_types';
import { FilterType } from '../index';
import { Show } from '../_styles';
import { UserData } from '../../Accounts/_types';

export interface IProject {
	filter: FilterSettings;
	activeTree: TreeType;
	path: string;

	users: UserData[];
	active: boolean;
	resetTree: () => void;
	activeFilterContent: any;
	activeFilter: FilterType;
	handleChange: (value: FilterType) => void;
	invokeTreeHub: (tree: TreeType) => void;
	projectPending: boolean;
	show: boolean;
	formik: any;
}

export const Project = ({
	filter,
	activeTree,
	path,
	users,

	active,
	resetTree,
	activeFilterContent,
	activeFilter,
	handleChange,
	invokeTreeHub,
	projectPending,
	show,
	formik,
}: IProject) => {
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
			/>
		</Show>
	);
};
