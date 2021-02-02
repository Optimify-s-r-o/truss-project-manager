import * as React from 'react';
import General from './General';
import Load from './Load';
import Other from './Other';
import Price from './Price';
import Size from './Size';
import { FilterSettings, TreeType } from '../../../../types/_types';
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
	trussPending: boolean;
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
	trussPending,
}: OwnProps & WithTranslation) => {
	return (
		<>
			<SelectType activeFilter={activeFilter} handleChange={handleChange} />
			<Grow>
				<General formik={formik} filter={filter} />
				<Price formik={formik} filter={filter} />
				<Load formik={formik} filter={filter} />
				<Size formik={formik} filter={filter} />
				<Other formik={formik} filter={filter} />
			</Grow>
			<Reset
				activeTree={activeTree}
				filter={filter}
				formik={formik}
				resetTree={resetTree}
				pending={trussPending}
				activeFilter={activeFilter}
			/>
		</>
	);
};

export default withTranslation()(React.memo(Index));
