import * as React from 'react';
import General from './General';
import Geometry from './Geometry';
import Load from './Load';
import Other from './Other';
import Price from './Price';
import { FilterSettings, TreeType } from '../../../../types/_types';
import { FilterType } from '../index';
import { getTrussesFilters } from '../_services';
import { Grow } from '../../Lists/components/_styles';
import { Hub } from 'src/constants/hub';
import { Reset } from '../components/Reset';
import { SelectType } from '../components/Select';
import { useEffect } from 'react';
import { WithTranslation, withTranslation } from '../../../../translation/i18n';

export interface OwnProps {
	filter: FilterSettings;
	activeTree: TreeType;
	active: boolean;
	resetTree: () => void;
	activeFilterContent: any;
	activeFilter: FilterType;
	handleChange: (value: FilterType) => void;
	trussPending: boolean;
	handleForm: (newData: any) => void;
	treeHub: any;
	values: any;
	setValues: any;
	setFieldValue: any;
}

const Index = ({
	activeTree,
	filter,
	treeHub,
	resetTree,
	handleForm,
	activeFilter,
	handleChange,
	trussPending,
	values,
	setValues,
	setFieldValue,
	activeFilterContent,
}: OwnProps & WithTranslation) => {
	useEffect(() => {
		handleForm({ Trusses: values });
	}, [values]);

	useEffect(() => {
		if (treeHub) {
			treeHub.on(Hub.TreeResetFinished, (message) => {
				const initialValues: any = getTrussesFilters(filter);
				setValues(initialValues);
			});
		}
	}, [treeHub]);

	useEffect(() => {
		console.log(filter);
		console.log(activeFilterContent);
		setValues(getTrussesFilters(filter, activeFilterContent));
	}, [filter, activeFilterContent]);

	return (
		<>
			<SelectType activeFilter={activeFilter} handleChange={handleChange} />
			<Grow>
				<General
					values={values}
					setFieldValue={setFieldValue}
					filter={filter}
				/>
				<Price values={values} setFieldValue={setFieldValue} filter={filter} />
				<Load values={values} setFieldValue={setFieldValue} filter={filter} />
				<Geometry
					values={values}
					setFieldValue={setFieldValue}
					filter={filter}
				/>
				<Other values={values} setFieldValue={setFieldValue} filter={filter} />
			</Grow>
			<Reset
				activeTree={activeTree}
				filter={filter}
				values={values}
				setValues={setValues}
				resetTree={resetTree}
				pending={trussPending}
				activeFilter={activeFilter}
			/>
		</>
	);
};

export default withTranslation()(React.memo(Index));
