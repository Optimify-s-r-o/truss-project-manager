import * as React from 'react';
import Sidebar from './Sidebar';
import { Fetch, FilterSettings, TreeType } from '../../../../types/_types';
import { FilterType } from '../index';
import { getPortalUsers } from '../../../../sagas/Fetch/actions';
import { Show } from '../_styles';

export interface ITruss {
	filter: FilterSettings;
	activeTree: TreeType;
	path: string;
	getUsers: (data: Fetch) => void;
	active: boolean;
	resetTree: () => void;
	activeFilterContent: any;
	activeFilter: FilterType;
	handleChange: (value: FilterType) => void;
	invokeTreeHub: (tree: TreeType) => void;
	trussPending: boolean;
	show: boolean;
	formik: any;
}

export const Truss = ({
	filter,
	activeTree,
	path,
	getUsers,
	active,
	resetTree,
	activeFilterContent,
	activeFilter,
	handleChange,
	trussPending,
	formik,
	show,
}: ITruss) => {
	React.useEffect(() => {
		getUsers(getPortalUsers());
	}, []);
	return (
		<Show show={show}>
			<Sidebar
				formik={formik}
				filter={filter}
				activeTree={activeTree}
				active={active}
				resetTree={resetTree}
				activeFilterContent={activeFilterContent}
				handleChange={handleChange}
				activeFilter={activeFilter}
				trussPending={trussPending}
			/>
		</Show>
	);
};
