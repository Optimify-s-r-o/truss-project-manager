import * as React from 'react';
import DateRange from './DateRange';
import General from './General';
import Load from './Load';
import Price from './Price';
import TechnicalParameters from './TechnicalParameters';
import { FilterSettings, TreeType } from '../../../../types/_types';
import { FilterType } from '../index';
import { Grow } from '../../Lists/components/_styles';
import { Hub } from 'src/constants/hub';
import { Reset } from '../components/Reset';
import { SelectType } from '../components/Select';
import { useEffect } from 'react';
import { useFormikContext } from 'formik';
import { UserData } from '../../Accounts/_types';
import { WithTranslation, withTranslation } from '../../../../translation/i18n';
export interface OwnProps {
	filter: FilterSettings;
	activeTree: TreeType;
	users: UserData[];
	active: boolean;
	resetTree: () => void;
	activeFilterContent: any;
	activeFilter: FilterType;
	handleChange: (value: FilterType) => void;
	jobPending: boolean;
	handleForm: (newData: any) => void;
	treeHub: any;
}

const Index = ({
	activeTree,
	filter,
	users,
	treeHub,
	resetTree,
	handleForm,
	activeFilter,
	handleChange,
	jobPending,
}: OwnProps & WithTranslation) => {
	const { values, setValues, setFieldValue, resetForm } =
		useFormikContext() ?? {};

	useEffect(() => {
		handleForm({ Jobs: values });
	}, [values]);

	useEffect(() => {
		if (treeHub) {
			treeHub.on(Hub.TreeResetFinished, (message) => {
				resetForm();
			});
		}
	}, [treeHub]);

	return (
		<>
			<SelectType activeFilter={activeFilter} handleChange={handleChange} />
			<Grow>
				<General
					values={values}
					setFieldValue={setFieldValue}
					filter={filter}
					users={users}
				/>
				<Price values={values} setFieldValue={setFieldValue} filter={filter} />
				<Load values={values} setFieldValue={setFieldValue} filter={filter} />
				<TechnicalParameters
					values={values}
					setFieldValue={setFieldValue}
					filter={filter}
				/>
				<DateRange
					values={values}
					setFieldValue={setFieldValue}
					filter={filter}
				/>
			</Grow>
			<Reset
				activeTree={activeTree}
				filter={filter}
				values={values}
				setValues={setValues}
				resetTree={resetTree}
				pending={jobPending}
				activeFilter={activeFilter}
				resetForm={resetForm}
			/>
		</>
	);
};

export default withTranslation()(React.memo(Index));
