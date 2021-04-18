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
				getPath(TrussesFilterProxy.SupportsQuantityFilter),
				getPath(TrussesFilterProxy.ModelCountFilter),
				getPath(TrussesFilterProxy.MembersCountFilter),
				getPath(TrussesFilterProxy.PlatesCountFilter),
				getPath(TrussesFilterProxy.PliesFilter),
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
					from: getPath(FilterSettingsProxy.Truss.SupportsCountFrom),
					to: getPath(FilterSettingsProxy.Truss.SupportsCountTo),
				},
				{
					from: getPath(FilterSettingsProxy.Truss.MembersCountFrom),
					to: getPath(FilterSettingsProxy.Truss.MembersCountTo),
				},
				{
					from: getPath(FilterSettingsProxy.Truss.PlatesCountFrom),
					to: getPath(FilterSettingsProxy.Truss.PlatesCountTo),
				},
				{
					from: getPath(FilterSettingsProxy.Truss.ModelCountFrom),
					to: getPath(FilterSettingsProxy.Truss.ModelCountTo),
				},
				{
					from: getPath(FilterSettingsProxy.Truss.PliesFrom),
					to: getPath(FilterSettingsProxy.Truss.PliesTo),
				},
			]}
		>
			<EmptyFilter
				filter={filter}
				type="Truss"
				names={[
					"Weight",
					"TransportWeight",
					"SupportsQuantity",
					"MembersCount",
					"PlatesCount",
					"ModelCount",
					"Plies",
				]}
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
					label={t(translationPath(lang.common.numberOfSupports))}
					name={getPath(TrussesFilterProxy.SupportsQuantityFilter)}
					setFieldValue={setFieldValue}
					values={values}
					from={values?.SupportsQuantityFilter?.From}
					to={values?.SupportsQuantityFilter?.To}
					settingsFrom={filter?.Truss?.SupportsCountFrom}
					settingsTo={filter?.Truss?.SupportsCountTo}
					step={1}
					round={0}
				/>
				<FormSlider
					label={t(translationPath(lang.common.membersCount))}
					name={getPath(TrussesFilterProxy.MembersCountFilter)}
					setFieldValue={setFieldValue}
					values={values}
					from={values?.MembersCountFilter?.From}
					to={values?.MembersCountFilter?.To}
					settingsFrom={filter?.Truss?.MembersCountFrom}
					settingsTo={filter?.Truss?.MembersCountTo}
					step={1}
					round={0}
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
				<FormSlider
					label={t(translationPath(lang.common.ply))}
					name={getPath(TrussesFilterProxy.PliesFilter)}
					setFieldValue={setFieldValue}
					values={values}
					from={values?.PliesFilter?.From}
					to={values?.PliesFilter?.To}
					settingsFrom={filter?.Truss?.PliesFrom}
					settingsTo={filter?.Truss?.PliesTo}
					step={1}
					round={0}
				/>
			</EmptyFilter>
		</FilterSection>
	);
};

export default withTranslation()(React.memo(Index));
