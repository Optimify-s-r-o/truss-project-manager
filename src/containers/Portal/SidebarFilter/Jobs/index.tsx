import * as React from 'react';
import Sidebar from './Sidebar';
import { Fetch, FilterSettings, TreeType } from '../../../../types/_types';
import { FilterType } from '../index';
import { getPortalUsers } from '../../../../sagas/Fetch/actions';
import { Show } from '../_styles';
import { UserData } from '../../Accounts/_types';

export interface IJob {
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
	jobPending: boolean;
	show: boolean;
	formik: any;
}

export const Job = ({
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
	formik,
	jobPending,
	show,
}: IJob) => {
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
				jobPending={jobPending}
			/>
		</Show>
	);
};
