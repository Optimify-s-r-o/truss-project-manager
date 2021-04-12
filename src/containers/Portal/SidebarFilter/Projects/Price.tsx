import * as React from 'react';
import EmptyFilter from '../../../../components/EmpyFilter';
import FilterSection from '../../Lists/components/FilterSection';
import FormSlider from '../../../../components/FormSlider';
import { FilterSettings, FilterSettingsProxy } from '../../../../types/_types';
import { getPath, translationPath } from '../../../../utils/getPath';
import { ProjectsFilterProxy } from '../_types';
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
			title={t(translationPath(lang.templates.templates))}
			values={values}
			filters={[
				getPath(ProjectsFilterProxy.QuotationPriceFilter),
				getPath(ProjectsFilterProxy.ProductionPriceFilter),
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
					name={getPath(ProjectsFilterProxy.QuotationPriceFilter)}
					setFieldValue={setFieldValue}
					values={values}
					from={values?.QuotationPriceFilter?.From}
					to={values?.QuotationPriceFilter?.To}
					settingsFrom={filter?.Project?.QuotationPriceFrom}
					settingsTo={filter?.Project?.QuotationPriceTo}
				/>
				<FormSlider
					label={t(translationPath(lang.common.production))}
					name={getPath(ProjectsFilterProxy.ProductionPriceFilter)}
					setFieldValue={setFieldValue}
					values={values}
					from={values?.ProductionPriceFilter?.From}
					to={values?.ProductionPriceFilter?.To}
					settingsFrom={filter?.Project?.ProductionPriceFrom}
					settingsTo={filter?.Project?.ProductionPriceTo}
				/>
			</EmptyFilter>
		</FilterSection>
	);
};

export default withTranslation()(React.memo(Index));
