import * as React from 'react';
import Sidebar from './Sidebar';
import { FilterSettings, Page, TreeType } from '../../../../types/_types';
import { FilterType } from '../index';
import { Show } from '../_styles';
import { useEffect } from 'react';

export interface ICustomer {
	filter: FilterSettings;
	activeTree: TreeType;
	path: string;
	active: boolean;
	resetTree: () => void;
	activeFilterContent: any;
	activeFilter: FilterType;
	handleChange: (value: FilterType) => void;
	invokeTreeHub: (tree: TreeType) => void;
	getCustomers: (data: Page) => void;
	customerPending: boolean;
	show: boolean;
	formik: any;
}

export const Customer = ({
	getCustomers,
	filter,
	activeTree,
	path,
	active,
	resetTree,
	activeFilterContent,
	activeFilter,
	handleChange,
	invokeTreeHub,
	customerPending,
	show,
	formik,
}: ICustomer) => {
	useEffect(() => {
		getCustomers({ Page: 0, PageSize: 25, Sort: "" });
	}, []);

	return (
		<Show show={show}>
			<Sidebar
				getCustomers={getCustomers}
				formik={formik}
				filter={filter}
				activeTree={activeTree}
				active={active}
				resetTree={resetTree}
				activeFilterContent={activeFilterContent}
				handleChange={handleChange}
				activeFilter={activeFilter}
				customerPending={customerPending}
			/>
		</Show>
	);
};
