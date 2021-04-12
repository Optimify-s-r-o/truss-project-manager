import * as React from 'react';
import General from './General';
import Load from './Load';
import Other from './Other';
import Price from './Price';
import Size from './Size';
import { FilterSettings, TreeType } from '../../../../types/_types';
import { FilterType } from '../index';
import { getTrussesFilters } from '../_services';
import { Grow } from '../../Lists/components/_styles';
import { Hub } from 'src/constants/hub';
import { Reset } from '../components/Reset';
import { SelectType } from '../components/Select';
import { useEffect } from 'react';
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
	trussPending: boolean;
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
	trussPending,
}: OwnProps & WithTranslation) => {
	const { values, setValues, setFieldValue } = useFormikContext() ?? {};

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
				<Size values={values} setFieldValue={setFieldValue} filter={filter} />
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
