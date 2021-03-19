import * as React from 'react';
import Sidebar from './Sidebar';
import { FilterSettings, TreeType } from '../../../../types/_types';
import { FilterType } from '../index';
import { Show } from '../_styles';
import { UserData } from '../../Accounts/_types';

export interface IJob {
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
	jobPending: boolean;
	show: boolean;
	formik: any;
}

export const Job = ({
	filter,
	activeTree,
	path,
	users,
	active,
	resetTree,
	activeFilterContent,
	activeFilter,
	handleChange,
	formik,
	jobPending,
	show,
}: IJob) => {
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
				jobPending={jobPending}
			/>
		</Show>
	);
};
