import * as React from 'react';
import Sidebar from './Sidebar';
import { FilterSettings, Page, TreeType } from '../../../../types/_types';
import { FilterType } from '../index';
import { Form } from '../../../../constants/globalStyles';
import { Formik } from 'formik';
import { getCustomersFilters } from '../_services';
import { Show } from '../components/Show';
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
	handleForm: (newData: any) => void;
	treeHub: any;
}

export const Customer = ({
	getCustomers,
	filter,
	activeTree,
	handleForm,
	active,
	resetTree,
	activeFilterContent,
	activeFilter,
	handleChange,
	treeHub,
	customerPending,
	show,
}: ICustomer) => {
	useEffect(() => {
		getCustomers({ Page: 0, PageSize: 25, Sort: "" });
	}, []);

	return (
		<Show show={show}>
			<Formik
				initialValues={getCustomersFilters(filter, activeFilterContent)}
				onSubmit={(values: any) => {}}
			>
				{(props) => (
					<Form>
						<Sidebar
							values={props.values}
							setValues={props.setValues}
							setFieldValue={props.setFieldValue}
							treeHub={treeHub}
							handleForm={handleForm}
							getCustomers={getCustomers}
							filter={filter}
							activeTree={activeTree}
							active={active}
							resetTree={resetTree}
							activeFilterContent={activeFilterContent}
							handleChange={handleChange}
							activeFilter={activeFilter}
							customerPending={customerPending}
						/>
					</Form>
				)}
			</Formik>
		</Show>
	);
};
