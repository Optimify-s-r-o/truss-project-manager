import * as React from 'react';
import EmptyFilter from '../../../../components/EmpyFilter';
import FilterSection from '../../Lists/components/FilterSection';
import FormSlider from '../../../../components/FormSlider';
import { FilterProxy } from '..//_types';
import { FilterSettings, FilterSettingsProxy } from '../../../../types/_types';
import { getPath, translationPath } from '../../../../utils/getPath';
import { TrussesFilterProxy } from '../_types';
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
			title={t(translationPath(lang.common.checkboxSectionCalculation))}
			values={values}
			filters={[getPath(TrussesFilterProxy.PriceFilter)]}
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
					setFieldValue={setFieldValue}
					values={values}
					from={values?.PriceFilter?.From}
					to={values?.PriceFilter?.To}
					settingsFrom={filter?.Truss?.PriceFrom}
					settingsTo={filter?.Truss?.PriceTo}
				/>
			</EmptyFilter>
		</FilterSection>
	);
};

export default withTranslation()(React.memo(Index));
