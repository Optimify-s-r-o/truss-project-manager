import * as React from 'react';
import * as Yup from 'yup';
import Sidebar from './Sidebar';
import { FilterSettings, Page, TreeType } from '../../../../types/_types';
import { FilterType } from '../index';
import { Form } from '../../../../constants/globalStyles';
import { Formik } from 'formik';
import { getCustomersFilters } from '../_services';
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
				enableReinitialize={true}
				validationSchema={Yup.object({})}
				onSubmit={(values: any) => {}}
			>
				<Form>
					<Sidebar
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
			</Formik>
		</Show>
	);
};
