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
			title={t(translationPath(lang.common.price))}
			formik={formik}
			filters={[
				getPath(FilterProxy.Jobs.PriceFilter),
				getPath(FilterProxy.Jobs.PricePerSquareMeterFilter),
			]}
			filter={filter}
			setting={[
				{
					from: getPath(FilterSettingsProxy.Job.PriceFrom),
					to: getPath(FilterSettingsProxy.Job.PriceTo),
				},
				{
					from: getPath(FilterSettingsProxy.Job.PricePerSquareMeterFrom),
					to: getPath(FilterSettingsProxy.Job.PricePerSquareMeterTo),
				},
			]}
		>
			<EmptyFilter filter={filter} type="Job" names={["Price"]}>
				<FormSlider
					label={t(translationPath(lang.common.price))}
					name={getPath(FilterProxy.Jobs.PriceFilter)}
					formik={formik}
					from={formik?.values?.Jobs.PriceFilter?.From}
					to={formik?.values?.Jobs.PriceFilter?.To}
					settingsFrom={filter?.Job?.PriceFrom}
					settingsTo={filter?.Job?.PriceTo}
				/>
				<FormSlider
					label={t(translationPath(lang.common.pricePerSquareMeter))}
					name={getPath(FilterProxy.Jobs.PricePerSquareMeterFilter)}
					formik={formik}
					from={formik?.values?.Jobs.PricePerSquareMeterFilter?.From}
					to={formik?.values?.Jobs.PricePerSquareMeterFilter?.To}
					settingsFrom={filter?.Job?.PricePerSquareMeterFrom}
					settingsTo={filter?.Job?.PricePerSquareMeterTo}
				/>
			</EmptyFilter>
		</FilterSection>
	);
};

export default withTranslation()(React.memo(Index));
