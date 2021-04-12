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

const Index = (props: OwnProps & WithTranslation) => {
	const { values, filter, setFieldValue } = props;

	return (
		<FilterSection
			title={t(translationPath(lang.common.price))}
			values={values}
			filters={[
				getPath(CustomersFilterProxy.SumOfProjectPricesFilter),
				getPath(CustomersFilterProxy.AveragePricePerProjectFilter),
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
				<FormSlider
					label={t(translationPath(lang.common.averagePricePerProjectFilter))}
					name={getPath(CustomersFilterProxy.AveragePricePerProjectFilter)}
					values={values}
					setFieldValue={setFieldValue}
					from={values?.AveragePricePerProjectFilter?.From}
					to={values?.AveragePricePerProjectFilter?.To}
					settingsFrom={filter?.Customer?.AveragePricePerProjectFrom}
					settingsTo={filter?.Customer?.AveragePricePerProjectTo}
				/>
				<FormSlider
					label={t(translationPath(lang.common.sumOfProjectPricesFilter))}
					name={getPath(CustomersFilterProxy.SumOfProjectPricesFilter)}
					values={values}
					setFieldValue={setFieldValue}
					from={values?.SumOfProjectPricesFilter?.From}
					to={values?.SumOfProjectPricesFilter?.To}
					settingsFrom={filter?.Customer?.SumOfProjectPricesFrom}
					settingsTo={filter?.Customer?.SumOfProjectPricesTo}
				/>
			</EmptyFilter>
		</FilterSection>
	);
};

export default withTranslation()(React.memo(Index));
