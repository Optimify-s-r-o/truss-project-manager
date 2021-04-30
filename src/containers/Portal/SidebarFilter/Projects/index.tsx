import * as React from 'react';
import * as Yup from 'yup';
import Sidebar from './Sidebar';
import { FilterSettings, TreeType } from '../../../../types/_types';
import { FilterType } from '../index';
import { Form } from '../../../../constants/globalStyles';
import { Formik } from 'formik';
import { getProjectsFilters } from '../_services';
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
	handleForm: (newData: any) => void;
	treeHub: any;
}

export const Project = ({
	filter,
	activeTree,
	path,
	users,
	handleForm,
	resetTree,
	activeFilterContent,
	activeFilter,
	handleChange,
	projectPending,
	show,
	treeHub,
}: IProject) => {
	return (
		<Show show={show}>
			<Formik
				initialValues={getProjectsFilters(filter, activeFilterContent)}
				enableReinitialize={true}
				validationSchema={Yup.object({})}
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
							filter={filter}
							activeTree={activeTree}
							users={users}
							resetTree={resetTree}
							activeFilterContent={activeFilterContent}
							handleChange={handleChange}
							activeFilter={activeFilter}
							projectPending={projectPending}
						/>
					</Form>
				)}
			</Formik>
		</Show>
	);
};
