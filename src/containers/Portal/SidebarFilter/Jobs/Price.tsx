import * as React from 'react';
import EmptyFilter from '../../../../components/EmpyFilter';
import FilterSection from '../../Lists/components/FilterSection';
import FormSlider from '../../../../components/FormSlider';
import { FilterSettings, FilterSettingsProxy } from '../../../../types/_types';
import { getPath, translationPath } from '../../../../utils/getPath';
import { JobsFilterProxy } from '../_types';
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
			title={t(translationPath(lang.common.designPrice))}
			values={values}
			filters={[
				getPath(JobsFilterProxy.PriceFilter),
				getPath(JobsFilterProxy.PricePerSquareMeterFilter),
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
					label={t(translationPath(lang.common.designPrice))}
					name={getPath(JobsFilterProxy.PriceFilter)}
					values={values}
					setFieldValue={setFieldValue}
					from={values?.PriceFilter?.From}
					to={values?.PriceFilter?.To}
					settingsFrom={filter?.Job?.PriceFrom}
					settingsTo={filter?.Job?.PriceTo}
				/>
				<FormSlider
					label={t(translationPath(lang.common.pricePerSquareMeter))}
					name={getPath(JobsFilterProxy.PricePerSquareMeterFilter)}
					values={values}
					setFieldValue={setFieldValue}
					from={values?.PricePerSquareMeterFilter?.From}
					to={values?.PricePerSquareMeterFilter?.To}
					settingsFrom={filter?.Job?.PricePerSquareMeterFrom}
					settingsTo={filter?.Job?.PricePerSquareMeterTo}
				/>
			</EmptyFilter>
		</FilterSection>
	);
};

export default withTranslation()(React.memo(Index));
