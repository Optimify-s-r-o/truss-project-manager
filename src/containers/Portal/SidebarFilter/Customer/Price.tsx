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
			title={t(translationPath(lang.common.price))}
			formik={formik}
			filters={[
				getPath(FilterProxy.Customers.SumOfProjectPricesFilter),
				getPath(FilterProxy.Customers.AveragePricePerProjectFilter),
			]}
			filter={filter}
			setting={[
				{
					from: getPath(FilterSettingsProxy.Customer.SumOfProjectPricesFrom),
					to: getPath(FilterSettingsProxy.Customer.SumOfProjectPricesTo),
				},
				{
					from: getPath(
						FilterSettingsProxy.Customer.AveragePricePerProjectFrom
					),
					to: getPath(FilterSettingsProxy.Customer.AveragePricePerProjectTo),
				},
			]}
		>
			<EmptyFilter
				filter={filter}
				type="Customer"
				names={["AveragePricePerProject", "SumOfProjectPrices"]}
			>
				<FilterContentSection>
					<FormSlider
						label={t(translationPath(lang.common.averagePricePerProjectFilter))}
						name={getPath(FilterProxy.Customers.AveragePricePerProjectFilter)}
						formik={formik}
						from={formik?.values?.Customers?.AveragePricePerProjectFilter?.From}
						to={formik?.values?.Customers?.AveragePricePerProjectFilter?.To}
						settingsFrom={filter?.Customer?.AveragePricePerProjectFrom}
						settingsTo={filter?.Customer?.AveragePricePerProjectTo}
					/>
				</FilterContentSection>
				<FilterContentSection>
					<FormSlider
						label={t(translationPath(lang.common.sumOfProjectPricesFilter))}
						name={getPath(FilterProxy.Customers.SumOfProjectPricesFilter)}
						formik={formik}
						from={formik?.values?.Customers?.SumOfProjectPricesFilter?.From}
						to={formik?.values?.Customers?.SumOfProjectPricesFilter?.To}
						settingsFrom={filter?.Customer?.SumOfProjectPricesFrom}
						settingsTo={filter?.Customer?.SumOfProjectPricesTo}
					/>
				</FilterContentSection>
			</EmptyFilter>
		</FilterSection>
	);
};

export default withTranslation()(React.memo(Index));
