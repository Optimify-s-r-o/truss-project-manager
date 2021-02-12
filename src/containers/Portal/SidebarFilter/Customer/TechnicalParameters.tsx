import * as React from 'react';
import EmptyFilter from '../../../../components/EmpyFilter';
import FilterSection from '../../Lists/components/FilterSection';
import FormSlider from '../../../../components/FormSlider';
import { FilterContentSection } from '../../Lists/components/_styles';
import { FilterProxy } from '../_types';
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
	formik: any;
}

const Index = (props: OwnProps & WithTranslation) => {
	const { formik, filter } = props;

	return (
		<FilterSection
			title={t(translationPath(lang.common.filterTechnicalParametr))}
			formik={formik}
			filters={[
				getPath(FilterProxy.Customers.NumberOfProjectsFilter),
				getPath(FilterProxy.Customers.NumberOfQuotationsFilter),
				getPath(FilterProxy.Customers.NumberOfProductionsFilter),
				getPath(FilterProxy.Customers.ProductionsPerQuotationsFilter),
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
				<FilterContentSection>
					<FormSlider
						label={t(translationPath(lang.common.numberOfProjectsFilter))}
						name={getPath(FilterProxy.Customers.NumberOfProjectsFilter)}
						formik={formik}
						from={formik?.values?.Customers?.NumberOfProjectsFilter?.From}
						to={formik?.values?.Customers?.NumberOfProjectsFilter?.To}
						settingsFrom={filter?.Customer?.NumberOfProjectsFrom}
						settingsTo={filter?.Customer?.NumberOfProjectsTo}
						step={1}
						round={0}
					/>
				</FilterContentSection>
				<FilterContentSection>
					<FormSlider
						label={t(translationPath(lang.common.numberOfQuotationsFilter))}
						name={getPath(FilterProxy.Customers.NumberOfQuotationsFilter)}
						formik={formik}
						from={formik?.values?.Customers?.NumberOfQuotationsFilter?.From}
						to={formik?.values?.Customers?.NumberOfQuotationsFilter?.To}
						settingsFrom={filter?.Customer?.NumberOfQuotationsFrom}
						settingsTo={filter?.Customer?.NumberOfQuotationsTo}
						step={1}
						round={0}
					/>
				</FilterContentSection>
				<FilterContentSection>
					<FormSlider
						label={t(translationPath(lang.common.numberOfProductionsFilter))}
						name={getPath(FilterProxy.Customers.NumberOfProductionsFilter)}
						formik={formik}
						from={formik?.values?.Customers?.NumberOfProductionsFilter?.From}
						to={formik?.values?.Customers?.NumberOfProductionsFilter?.To}
						settingsFrom={filter?.Customer?.NumberOfProductionsFrom}
						settingsTo={filter?.Customer?.NumberOfProductionsTo}
						step={1}
						round={0}
					/>
				</FilterContentSection>
				<FilterContentSection>
					<FormSlider
						label={t(
							translationPath(lang.common.productionsPerQuotationsFilter)
						)}
						name={getPath(FilterProxy.Customers.ProductionsPerQuotationsFilter)}
						formik={formik}
						from={
							formik?.values?.Customers?.ProductionsPerQuotationsFilter?.From
						}
						to={formik?.values?.Customers?.ProductionsPerQuotationsFilter?.To}
						step={1}
						round={0}
						min={0}
						max={1}
					/>
				</FilterContentSection>
			</EmptyFilter>
		</FilterSection>
	);
};

export default withTranslation()(React.memo(Index));
