import * as React from 'react';
import EmptyFilter from '../../../../components/EmpyFilter';
import FilterSection from '../../Lists/components/FilterSection';
import FormSlider from '../../../../components/FormSlider';
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
			title={t(translationPath(lang.common.next))}
			values={values}
			filters={[
				getPath(TrussesFilterProxy.WeightFilter),
				getPath(TrussesFilterProxy.TransportWeightFilter),
				getPath(TrussesFilterProxy.ModelCountFilter),
				getPath(TrussesFilterProxy.PlatesCountFilter),
			]}
			filter={filter}
			setting={[
				{
					from: getPath(FilterSettingsProxy.Truss.WeightFrom),
					to: getPath(FilterSettingsProxy.Truss.WeightTo),
				},
				{
					from: getPath(FilterSettingsProxy.Truss.TransportWeightFrom),
					to: getPath(FilterSettingsProxy.Truss.TransportWeightTo),
				},
				{
					from: getPath(FilterSettingsProxy.Truss.PlatesCountFrom),
					to: getPath(FilterSettingsProxy.Truss.PlatesCountTo),
				},
				{
					from: getPath(FilterSettingsProxy.Truss.ModelCountFrom),
					to: getPath(FilterSettingsProxy.Truss.ModelCountTo),
				},
			]}
		>
			<EmptyFilter
				filter={filter}
				type="Truss"
				names={["Weight", "TransportWeight", "PlatesCount", "ModelCount"]}
			>
				<FormSlider
					label={t(translationPath(lang.common.trussWeight))}
					name={getPath(TrussesFilterProxy.WeightFilter)}
					setFieldValue={setFieldValue}
					values={values}
					from={values?.WeightFilter?.From}
					to={values?.WeightFilter?.To}
					settingsFrom={filter?.Truss?.WeightFrom}
					settingsTo={filter?.Truss?.WeightTo}
				/>
				<FormSlider
					label={t(translationPath(lang.common.transportWeight))}
					name={getPath(TrussesFilterProxy.TransportWeightFilter)}
					setFieldValue={setFieldValue}
					values={values}
					from={values?.TransportWeightFilter?.From}
					to={values?.TransportWeightFilter?.To}
					settingsFrom={filter?.Truss?.TransportWeightFrom}
					settingsTo={filter?.Truss?.TransportWeightTo}
				/>
				<FormSlider
					label={t(translationPath(lang.common.platesCount))}
					name={getPath(TrussesFilterProxy.PlatesCountFilter)}
					setFieldValue={setFieldValue}
					values={values}
					from={values?.PlatesCountFilter?.From}
					to={values?.PlatesCountFilter?.To}
					settingsFrom={filter?.Truss?.PlatesCountFrom}
					settingsTo={filter?.Truss?.PlatesCountTo}
					step={1}
					round={0}
				/>
				<FormSlider
					label={t(translationPath(lang.common.modelCount))}
					name={getPath(TrussesFilterProxy.ModelCountFilter)}
					setFieldValue={setFieldValue}
					values={values}
					from={values?.ModelCountFilter?.From}
					to={values?.ModelCountFilter?.To}
					settingsFrom={filter?.Truss?.ModelCountFrom}
					settingsTo={filter?.Truss?.ModelCountTo}
					step={1}
					round={0}
				/>
			</EmptyFilter>
		</FilterSection>
	);
};

export default withTranslation()(React.memo(Index));
