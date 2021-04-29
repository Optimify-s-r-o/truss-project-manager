import * as React from 'react';
import EmptyFilter from '../../../../components/EmpyFilter';
import FilterSection from '../../Lists/components/FilterSection';
import FormSlider from '../../../../components/FormSlider';
import { CustomersFilterProxy } from '../_types';
import { FilterSettings, FilterSettingsProxy } from '../../../../types/_types';
import { getPath, translationPath } from '../../../../utils/getPath';
import {
	lang,
	t,
	WithTranslation,
	withTranslation,
} from "../../../../translation/i18n";

export interface OwnProps {
	filter: FilterSettings;
	values: any;
	setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

const Index = ({
	values,
	filter,
	setFieldValue,
}: OwnProps & WithTranslation) => {
	return (
		<FilterSection
			title={t(translationPath(lang.common.statistics))}
			values={values}
			filters={[
				getPath(CustomersFilterProxy.NumberOfProjectsFilter),
				getPath(CustomersFilterProxy.NumberOfQuotationsFilter),
				getPath(CustomersFilterProxy.NumberOfProductionsFilter),
				getPath(CustomersFilterProxy.ProductionsPerQuotationsFilter),
			]}
			filter={filter}
			setting={[
				{
					from: getPath(FilterSettingsProxy.Customer.NumberOfProjectsFrom),
					to: getPath(FilterSettingsProxy.Customer.NumberOfProjectsTo),
				},
				{
					from: getPath(FilterSettingsProxy.Customer.NumberOfQuotationsFrom),
					to: getPath(FilterSettingsProxy.Customer.NumberOfQuotationsTo),
				},
				{
					from: getPath(FilterSettingsProxy.Customer.NumberOfProductionsFrom),
					to: getPath(FilterSettingsProxy.Customer.NumberOfProductionsTo),
				},
				{
					from: 0,
					to: 1,
				},
			]}
		>
			<EmptyFilter
				filter={filter}
				type="Customer"
				names={[
					"NumberOfProjects",
					"NumberOfQuotations",
					"NumberOfProductions",
					"ProductionsPerQuotations",
				]}
			>
				<FormSlider
					label={t(translationPath(lang.common.numberOfProjectsFilter))}
					name={getPath(CustomersFilterProxy.NumberOfProjectsFilter)}
					setFieldValue={setFieldValue}
					values={values}
					from={values?.NumberOfProjectsFilter?.From}
					to={values?.NumberOfProjectsFilter?.To}
					settingsFrom={filter?.Customer?.NumberOfProjectsFrom}
					settingsTo={filter?.Customer?.NumberOfProjectsTo}
					step={1}
					round={0}
				/>
				<FormSlider
					label={t(translationPath(lang.common.finishedQuotationCount))}
					name={getPath(CustomersFilterProxy.NumberOfQuotationsFilter)}
					setFieldValue={setFieldValue}
					values={values}
					from={values?.NumberOfQuotationsFilter?.From}
					to={values?.NumberOfQuotationsFilter?.To}
					settingsFrom={filter?.Customer?.NumberOfQuotationsFrom}
					settingsTo={filter?.Customer?.NumberOfQuotationsTo}
					step={1}
					round={0}
				/>
				<FormSlider
					label={t(translationPath(lang.common.finishedProductionCount))}
					name={getPath(CustomersFilterProxy.NumberOfProductionsFilter)}
					setFieldValue={setFieldValue}
					values={values}
					from={values?.NumberOfProductionsFilter?.From}
					to={values?.NumberOfProductionsFilter?.To}
					settingsFrom={filter?.Customer?.NumberOfProductionsFrom}
					settingsTo={filter?.Customer?.NumberOfProductionsTo}
					step={1}
					round={0}
				/>
				<FormSlider
					label={t(translationPath(lang.common.productionsPerQuotationsFilter))}
					name={getPath(CustomersFilterProxy.ProductionsPerQuotationsFilter)}
					setFieldValue={setFieldValue}
					values={values}
					from={values?.ProductionsPerQuotationsFilter?.From}
					to={values?.ProductionsPerQuotationsFilter?.To}
					settingsFrom={0}
					settingsTo={1}
					step={1}
					round={0}
					min={0}
					max={1}
				/>
			</EmptyFilter>
		</FilterSection>
	);
};

export default withTranslation()(React.memo(Index));
