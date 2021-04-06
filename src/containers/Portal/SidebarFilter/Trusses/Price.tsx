import * as React from 'react';
import EmptyFilter from '../../../../components/EmpyFilter';
import FilterSection from '../../Lists/components/FilterSection';
import FormSlider from '../../../../components/FormSlider';
import { FilterProxy } from '..//_types';
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
			title={t(translationPath(lang.common.checkboxSectionCalculation))}
			formik={formik}
			filters={[getPath(FilterProxy.Trusses.PriceFilter)]}
			filter={filter}
			setting={[
				{
					from: getPath(FilterSettingsProxy.Job.PriceFrom),
					to: getPath(FilterSettingsProxy.Job.PriceTo),
				},
			]}
		>
			<EmptyFilter filter={filter} type="Job" names={["Price"]}>
				<FormSlider
					label={t(translationPath(lang.common.price))}
					name={getPath(FilterProxy.Trusses.PriceFilter)}
					formik={formik}
					from={formik?.values?.Trusses?.PriceFilter?.From}
					to={formik?.values?.Trusses?.PriceFilter?.To}
					settingsFrom={filter?.Truss?.PriceFrom}
					settingsTo={filter?.Truss?.PriceTo}
				/>
			</EmptyFilter>
		</FilterSection>
	);
};

export default withTranslation()(React.memo(Index));
