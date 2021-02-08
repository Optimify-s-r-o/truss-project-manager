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
			title={t(translationPath(lang.common.next))}
			formik={formik}
			filters={[
				getPath(FilterProxy.Trusses.WeightFilter),
				getPath(FilterProxy.Trusses.TransportWeightFilter),
				getPath(FilterProxy.Trusses.SupportsQuantityFilter),
				getPath(FilterProxy.Trusses.ModelCountFilter),
				getPath(FilterProxy.Trusses.MembersCountFilter),
				getPath(FilterProxy.Trusses.PlatesCountFilter),
				getPath(FilterProxy.Trusses.PliesFilter),
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
					label={t(translationPath(lang.common.weight))}
					name={getPath(FilterProxy.Trusses.WeightFilter)}
					formik={formik}
					from={formik?.values?.Trusses?.WeightFilter?.From}
					to={formik?.values?.Trusses?.WeightFilter?.To}
					settingsFrom={filter?.Truss?.WeightFrom}
					settingsTo={filter?.Truss?.WeightTo}
				/>
				<FormSlider
					label={t(translationPath(lang.common.transportWeight))}
					name={getPath(FilterProxy.Trusses.TransportWeightFilter)}
					formik={formik}
					from={formik?.values?.Trusses?.TransportWeightFilter?.From}
					to={formik?.values?.Trusses?.TransportWeightFilter?.To}
					settingsFrom={filter?.Truss?.TransportWeightFrom}
					settingsTo={filter?.Truss?.TransportWeightTo}
				/>
				<FormSlider
					label={t(translationPath(lang.common.numberOfSupports))}
					name={getPath(FilterProxy.Trusses.SupportsQuantityFilter)}
					formik={formik}
					from={formik?.values?.Trusses?.SupportsQuantityFilter?.From}
					to={formik?.values?.Trusses?.SupportsQuantityFilter?.To}
					settingsFrom={filter?.Truss?.SupportsCountFrom}
					settingsTo={filter?.Truss?.SupportsCountTo}
					step={1}
					round={0}
				/>
				<FormSlider
					label={t(translationPath(lang.common.membersCount))}
					name={getPath(FilterProxy.Trusses.MembersCountFilter)}
					formik={formik}
					from={formik?.values?.Trusses?.MembersCountFilter?.From}
					to={formik?.values?.Trusses?.MembersCountFilter?.To}
					settingsFrom={filter?.Truss?.MembersCountFrom}
					settingsTo={filter?.Truss?.MembersCountTo}
					step={1}
					round={0}
				/>
				<FormSlider
					label={t(translationPath(lang.common.platesCount))}
					name={getPath(FilterProxy.Trusses.PlatesCountFilter)}
					formik={formik}
					from={formik?.values?.Trusses?.PlatesCountFilter?.From}
					to={formik?.values?.Trusses?.PlatesCountFilter?.To}
					settingsFrom={filter?.Truss?.PlatesCountFrom}
					settingsTo={filter?.Truss?.PlatesCountTo}
					step={1}
					round={0}
				/>

				<FormSlider
					label={t(translationPath(lang.common.modelCount))}
					name={getPath(FilterProxy.Trusses.ModelCountFilter)}
					formik={formik}
					from={formik?.values?.Trusses?.ModelCountFilter?.From}
					to={formik?.values?.Trusses?.ModelCountFilter?.To}
					settingsFrom={filter?.Truss?.ModelCountFrom}
					settingsTo={filter?.Truss?.ModelCountTo}
					step={1}
					round={0}
				/>
				<FormSlider
					label={t(translationPath(lang.common.ply))}
					name={getPath(FilterProxy.Trusses.PliesFilter)}
					formik={formik}
					from={formik?.values?.Trusses?.PliesFilter?.From}
					to={formik?.values?.Trusses?.PliesFilter?.To}
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
