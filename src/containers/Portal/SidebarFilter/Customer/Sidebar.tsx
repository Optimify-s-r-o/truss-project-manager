import DateRange from './DateRange';
import General from './General';
import React, { useEffect } from 'react';
import Statistics from './Statistics';
import { FilterSettings, Page, TreeType } from '../../../../types/_types';
import { FilterType } from '../index';
import { getCustomersFilters, getTrussesFilters } from '../_services';
import { Grow } from '../../Lists/components/_styles';
import { Hub } from '../../../../constants/hub';
import { Reset } from '../components/Reset';
import { SelectType } from '../components/Select';
import { useFormikContext } from 'formik';
import { WithTranslation, withTranslation } from '../../../../translation/i18n';

export interface OwnProps {
	filter: FilterSettings;
	activeTree: TreeType;
	active: boolean;
	resetTree: () => void;
	activeFilterContent: any;
	activeFilter: FilterType;
	handleChange: (value: FilterType) => void;
	customerPending: boolean;
	getCustomers: (data: Page) => void;
	handleForm: (newData: any) => void;
	treeHub: any;
}

const Index = ({
	activeTree,
	filter,
	treeHub,
	resetTree,
	handleForm,
	activeFilter,
	handleChange,
	customerPending,
}: OwnProps & WithTranslation) => {
	const { values, setValues, setFieldValue } = useFormikContext() ?? {};

	useEffect(() => {
		handleForm({ Customers: values });
	}, [values]);

	useEffect(() => {
		if (treeHub) {
			treeHub.on(Hub.TreeResetFinished, (message) => {
				const initialValues: any = getCustomersFilters(filter);
				setValues(initialValues);
			});
		}
	}, [treeHub]);
	return (
		<>
			<SelectType activeFilter={activeFilter} handleChange={handleChange} />
			<Grow>
				<General values={values} filter={filter} />
				<Statistics
					values={values}
					setFieldValue={setFieldValue}
					filter={filter}
				/>
				<DateRange
					values={values}
					filter={filter}
					setFieldValue={setFieldValue}
				/>
			</Grow>
			<Reset
				activeTree={activeTree}
				filter={filter}
				values={values}
				setValues={setValues}
				resetTree={resetTree}
				pending={customerPending}
				activeFilter={activeFilter}
			/>
		</>
	);
};

export default withTranslation()(React.memo(Index));
