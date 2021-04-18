import * as React from 'react';
import EmptyFilter from '../../../../components/EmpyFilter';
import FilterSection from '../../Lists/components/FilterSection';
import FormSlider from '../../../../components/FormSlider';
import { FilterSettings, FilterSettingsProxy } from '../../../../types/_types';
import { FormikCheckbox } from '../components/FormikCheckbox';
import { JobsFilterProxy } from '../_types';
import {
	lang,
	t,
	WithTranslation,
	withTranslation,
} from "../../../../translation/i18n";
import {
	getPath,
	lastPathMember,
	translationPath,
} from "../../../../utils/getPath";
export interface OwnProps {
	filter: FilterSettings;
	values: any;
	setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

const Index = (props: OwnProps & WithTranslation) => {
	const { values, filter, setFieldValue } = props;

	return (
		<FilterSection
			values={values}
			formikCheckboxes={[
				getPath(JobsFilterProxy.WindAreaFilter),
				getPath(JobsFilterProxy.SnowAreaFilter),
			]}
			filter={filter}
			filters={[
				lastPathMember(JobsFilterProxy.AltitudeFilter).path,
				lastPathMember(JobsFilterProxy.CentresFilter).path,
				lastPathMember(JobsFilterProxy.WindFilter).path,
				lastPathMember(JobsFilterProxy.SnowFilter).path,
				lastPathMember(JobsFilterProxy.RoofingLoadFilter).path,
				lastPathMember(JobsFilterProxy.CeilingLoadFilter).path,
			]}
			checkboxes={[
				getPath(FilterSettingsProxy.Job.WindAreas),
				getPath(FilterSettingsProxy.Job.SnowAreas),
			]}
			title={t(translationPath(lang.common.load))}
			setting={[
				{
					from: getPath(FilterSettingsProxy.Job.AltitudeFrom),
					to: getPath(FilterSettingsProxy.Job.AltitudeTo),
				},
				{
					from: getPath(FilterSettingsProxy.Truss.CentresFrom),
					to: getPath(FilterSettingsProxy.Truss.CentresTo),
				},
				{
					from: getPath(FilterSettingsProxy.Job.WindFrom),
					to: getPath(FilterSettingsProxy.Job.WindTo),
				},
				{
					from: getPath(FilterSettingsProxy.Job.SnowFrom),
					to: getPath(FilterSettingsProxy.Job.SnowTo),
				},
				{
					from: getPath(FilterSettingsProxy.Job.RoofingLoadFrom),
					to: getPath(FilterSettingsProxy.Job.RoofingLoadTo),
				},
				{
					from: getPath(FilterSettingsProxy.Job.CeilingLoadFrom),
					to: getPath(FilterSettingsProxy.Job.CeilingLoadTo),
				},
			]}
		>
			<EmptyFilter
				filter={filter}
				type="Job"
				names={[
					"Altitude",
					"Centres",
					"Snow",
					"Wind",
					"RoofingLoad",
					"CeilingLoad",
				]}
				array={["WindAreas", "SnowAreas"]}
			>
				<FormSlider
					label={t(translationPath(lang.common.altitude))}
					name={getPath(JobsFilterProxy.AltitudeFilter)}
					values={values}
					setFieldValue={setFieldValue}
					from={values?.AltitudeFilter?.From}
					to={values?.AltitudeFilter?.To}
					settingsFrom={filter?.Job?.AltitudeFrom}
					settingsTo={filter?.Job?.AltitudeTo}
				/>
				<FormSlider
					label={t(translationPath(lang.common.centres))}
					name={getPath(JobsFilterProxy.CentresFilter)}
					values={values}
					setFieldValue={setFieldValue}
					from={values?.CentresFilter?.From}
					to={values?.CentresFilter?.To}
					settingsFrom={filter?.Truss?.CentresFrom}
					settingsTo={filter?.Truss?.CentresTo}
				/>
				<FormikCheckbox
					values={values}
					setFieldValue={setFieldValue}
					filter={filter}
					filterPath={getPath(FilterSettingsProxy.Job.SnowAreas)}
					name={getPath(JobsFilterProxy.SnowAreaFilter.SnowAreas)}
					pathName={
						lastPathMember(JobsFilterProxy.SnowAreaFilter.SnowAreas).path
					}
					path={getPath(JobsFilterProxy.SnowAreaFilter)}
					title={t(translationPath(lang.common.snowArea))}
					value={values?.SnowAreaFilter?.SnowAreas}
				/>
				<FormikCheckbox
					values={values}
					setFieldValue={setFieldValue}
					filter={filter}
					filterPath={getPath(FilterSettingsProxy.Job.WindAreas)}
					name={getPath(JobsFilterProxy.WindAreaFilter.WindAreas)}
					pathName={
						lastPathMember(JobsFilterProxy.WindAreaFilter.WindAreas).path
					}
					path={getPath(JobsFilterProxy.WindAreaFilter)}
					title={t(translationPath(lang.common.windArea))}
					value={values?.WindAreaFilter?.WindAreas}
				/>
				<FormSlider
					label={t(translationPath(lang.common.snowLoad))}
					name={getPath(JobsFilterProxy.SnowFilter)}
					values={values}
					setFieldValue={setFieldValue}
					from={values?.SnowFilter?.From}
					to={values?.SnowFilter?.To}
					settingsFrom={filter?.Job?.SnowFrom}
					settingsTo={filter?.Job?.SnowTo}
				/>
				<FormSlider
					label={t(translationPath(lang.common.windLoad))}
					name={getPath(JobsFilterProxy.WindFilter)}
					values={values}
					setFieldValue={setFieldValue}
					from={values?.WindFilter?.From}
					to={values?.WindFilter?.To}
					settingsFrom={filter?.Job?.WindFrom}
					settingsTo={filter?.Job?.WindTo}
				/>
				<FormSlider
					label={t(translationPath(lang.common.roofingLoad))}
					name={getPath(JobsFilterProxy.RoofingLoadFilter)}
					values={values}
					setFieldValue={setFieldValue}
					from={values?.RoofingLoadFilter?.From}
					to={values?.RoofingLoadFilter?.To}
					settingsFrom={filter?.Job?.RoofingLoadFrom}
					settingsTo={filter?.Job?.RoofingLoadTo}
				/>
				<FormSlider
					label={t(translationPath(lang.common.ceilingLoad))}
					name={getPath(JobsFilterProxy.CeilingLoadFilter)}
					values={values}
					setFieldValue={setFieldValue}
					from={values?.CeilingLoadFilter?.From}
					to={values?.CeilingLoadFilter?.To}
					settingsFrom={filter?.Job?.CeilingLoadFrom}
					settingsTo={filter?.Job?.CeilingLoadTo}
				/>
			</EmptyFilter>
		</FilterSection>
	);
};

export default withTranslation()(React.memo(Index));
