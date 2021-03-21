import * as React from 'react';
import DateRange from './DateRange';
import General from './General';
import Statistics from './Statistics';
import { FilterSettings, Page, TreeType } from '../../../../types/_types';
import { FilterType } from '../index';
import { Grow } from '../../Lists/components/_styles';
import { Reset } from '../components/Reset';
import { SelectType } from '../components/Select';
import { WithTranslation, withTranslation } from '../../../../translation/i18n';

export interface OwnProps {
	filter: FilterSettings;
	activeTree: TreeType;
	formik: any;
	active: boolean;
	resetTree: () => void;
	activeFilterContent: any;
	activeFilter: FilterType;
	handleChange: (value: FilterType) => void;
	customerPending: boolean;
	getCustomers: (data: Page) => void;
}

const Index = ({
	formik,
	activeTree,
	filter,
	active,
	resetTree,
	activeFilterContent,
	activeFilter,
	handleChange,
	customerPending,
}: OwnProps & WithTranslation) => {
	return (
		<>
			<SelectType activeFilter={activeFilter} handleChange={handleChange} />
			<Grow>
				<General formik={formik} filter={filter} />
				<Statistics formik={formik} filter={filter} />
				{/* <Price formik={formik} filter={filter} /> */}
				<DateRange formik={formik} filter={filter} />
			</Grow>
			<Reset
				activeTree={activeTree}
				filter={filter}
				formik={formik}
				resetTree={resetTree}
				pending={customerPending}
				activeFilter={activeFilter}
			/>
		</>
	);
};

export default withTranslation()(React.memo(Index));
