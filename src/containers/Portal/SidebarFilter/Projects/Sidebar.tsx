import * as React from 'react';
import DateRange from './DateRange';
import General from './General';
import Price from './Price';
import { FilterSettings, TreeType } from '../../../../types/_types';
import { FilterType } from '../index';
import { Grow } from '../../Lists/components/_styles';
import { Reset } from '../components/Reset';
import { SelectType } from '../components/Select';
import { UserData } from '../../Accounts/_types';
import { WithTranslation, withTranslation } from '../../../../translation/i18n';

export interface OwnProps {
	filter: FilterSettings;
	activeTree: TreeType;
	users: UserData[];
	formik: any;
	active: boolean;
	resetTree: () => void;
	activeFilterContent: any;
	activeFilter: FilterType;
	handleChange: (value: FilterType) => void;
	projectPending: boolean;
}

const Index = ({
	activeTree,
	filter,
	users,
	formik,
	active,
	resetTree,
	activeFilterContent,
	activeFilter,
	handleChange,
	projectPending,
}: OwnProps & WithTranslation) => {
	return (
		<>
			<SelectType activeFilter={activeFilter} handleChange={handleChange} />
			<Grow>
				<General formik={formik} filter={filter} users={users} />
				<Price formik={formik} filter={filter} />
				<DateRange formik={formik} filter={filter} />
			</Grow>
			<Reset
				activeTree={activeTree}
				filter={filter}
				formik={formik}
				resetTree={resetTree}
				pending={projectPending}
				activeFilter={activeFilter}
			/>
		</>
	);
};

export default withTranslation()(React.memo(Index));
