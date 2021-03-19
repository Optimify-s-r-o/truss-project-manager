import * as React from 'react';
import EmptyFilter from '../../../../components/EmpyFilter';
import FilterSection from '../../Lists/components/FilterSection';
import FormSlider from '../../../../components/FormSlider';
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
			title={t(translationPath(lang.templates.templates))}
			formik={formik}
			filters={[
				getPath(FilterProxy.Projects.QuotationPriceFilter),
				getPath(FilterProxy.Projects.ProductionPriceFilter),
			]}
			filter={filter}
			setting={[
				{
					from: getPath(FilterSettingsProxy.Project.QuotationPriceFrom),
					to: getPath(FilterSettingsProxy.Project.QuotationPriceTo),
				},
				{
					from: getPath(FilterSettingsProxy.Project.ProductionPriceFrom),
					to: getPath(FilterSettingsProxy.Project.ProductionPriceTo),
				},
			]}
		>
			<EmptyFilter
				filter={filter}
				type="Project"
				names={["QuotationPrice", "ProductionPrice"]}
			>
				<FormSlider
					label={t(translationPath(lang.common.quotation))}
					name={getPath(FilterProxy.Projects.QuotationPriceFilter)}
					formik={formik}
					from={formik?.values?.Projects?.QuotationPriceFilter?.From}
					to={formik?.values?.Projects?.QuotationPriceFilter?.To}
					settingsFrom={filter?.Project?.QuotationPriceFrom}
					settingsTo={filter?.Project?.QuotationPriceTo}
				/>
				<FormSlider
					label={t(translationPath(lang.common.production))}
					name={getPath(FilterProxy.Projects.ProductionPriceFilter)}
					formik={formik}
					from={formik?.values?.Projects?.ProductionPriceFilter?.From}
					to={formik?.values?.Projects?.ProductionPriceFilter?.To}
					settingsFrom={filter?.Project?.ProductionPriceFrom}
					settingsTo={filter?.Project?.ProductionPriceTo}
				/>
			</EmptyFilter>
		</FilterSection>
	);
};

export default withTranslation()(React.memo(Index));
