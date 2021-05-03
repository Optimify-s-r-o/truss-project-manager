import * as React from 'react';
import Sidebar from './Sidebar';
import { FilterSettings, TreeType } from '../../../../types/_types';
import { FilterType } from '../index';
import { Form } from '../../../../constants/globalStyles';
import { Formik } from 'formik';
import { getJobsFilters } from '../_services';
import { Show } from '../components/Show';
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
	handleForm: (newData: any) => void;
	treeHub: any;
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
	handleForm,
	jobPending,
	show,
	treeHub,
}: IJob) => {
	return (
		<Show show={show}>
			<Formik
				initialValues={getJobsFilters(filter, activeFilterContent)}
				onSubmit={(values: any) => {}}
			>
				{(props) => {
					console.log(props);
					return (
						<Form>
							<Sidebar
								values={props.values}
								setValues={props.setValues}
								setFieldValue={props.setFieldValue}
								treeHub={treeHub}
								filter={filter}
								activeTree={activeTree}
								users={users}
								active={active}
								resetTree={resetTree}
								activeFilterContent={activeFilterContent}
								handleChange={handleChange}
								activeFilter={activeFilter}
								jobPending={jobPending}
								handleForm={handleForm}
							/>
						</Form>
					);
				}}
			</Formik>
		</Show>
	);
};
