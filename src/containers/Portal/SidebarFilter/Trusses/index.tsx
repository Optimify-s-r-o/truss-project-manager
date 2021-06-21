import * as React from 'react';
import Sidebar from './Sidebar';
import { FilterSettings, TreeType } from '../../../../types/_types';
import { FilterType } from '../index';
import { Form } from '../../../../constants/globalStyles';
import { Formik } from 'formik';
import { getTrussesFilters } from '../_services';
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
	handleForm: (newData: any) => void;
	treeHub: any;
}

export const Truss = ({
	filter,
	activeTree,
	handleForm,
	active,
	resetTree,
	activeFilterContent,
	activeFilter,
	handleChange,
	trussPending,
	treeHub,
	show,
}: ITruss) => {
	return (
		<Show show={show}>
			<Formik
				initialValues={getTrussesFilters(filter, activeFilterContent)}
				onSubmit={(values: any) => {}}
			>
				{(props) => {
					return (
						<Form>
							<Sidebar
								values={props.values}
								setValues={props.setValues}
								setFieldValue={props.setFieldValue}
								treeHub={treeHub}
								handleForm={handleForm}
								filter={filter}
								activeTree={activeTree}
								active={active}
								resetTree={resetTree}
								activeFilterContent={activeFilterContent}
								handleChange={handleChange}
								activeFilter={activeFilter}
								trussPending={trussPending}
							/>
						</Form>
					);
				}}
			</Formik>
		</Show>
	);
};
