import * as React from 'react';
import Sidebar from './Sidebar';
import { FilterSettings, TreeType } from '../../../../types/_types';
import { FilterType } from '../index';
import { Show } from '../_styles';

export interface ITruss {
	filter: FilterSettings;
	activeTree: TreeType;
	path: string;
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
	active,
	resetTree,
	activeFilterContent,
	activeFilter,
	handleChange,
	trussPending,
	formik,
	show,
}: ITruss) => {
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
