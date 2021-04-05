import * as React from 'react';
import EmptyFilter from '../../../../components/EmpyFilter';
import FilterSection from '../../Lists/components/FilterSection';
import FormSlider from '../../../../components/FormSlider';
import { FilterProxy } from '../_types';
import { FilterSettings, FilterSettingsProxy } from '../../../../types/_types';
import { FormikCheckbox } from '../components/FormikCheckbox';
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
	formik: any;
}

const Index = (props: OwnProps & WithTranslation) => {
	const { formik, filter } = props;

	return (
		<FilterSection
			formik={formik}
			formikCheckboxes={[
				getPath(FilterProxy.Jobs.WindAreaFilter.WindAreas),
				getPath(FilterProxy.Jobs.SnowAreaFilter.SnowAreas),
			]}
			filter={filter}
			filters={[
				lastPathMember(FilterProxy.Jobs.AltitudeFilter).path,
				lastPathMember(FilterProxy.Jobs.CentresFilter).path,
				lastPathMember(FilterProxy.Jobs.WindFilter).path,
				lastPathMember(FilterProxy.Jobs.SnowFilter).path,
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
			]}
		>
			<EmptyFilter
				filter={filter}
				type="Job"
				names={["Altitude", "Centres", "Snow", "Wind"]}
				array={["WindAreas", "SnowAreas"]}
			>
				<FormSlider
					label={t(translationPath(lang.common.altitude))}
					name={getPath(FilterProxy.Jobs.AltitudeFilter)}
					formik={formik}
					from={formik?.values?.AltitudeFilter?.From}
					to={formik?.values?.AltitudeFilter?.To}
					settingsFrom={filter?.Job?.AltitudeFrom}
					settingsTo={filter?.Job?.AltitudeTo}
				/>
				<FormSlider
					label={t(translationPath(lang.common.centres))}
					name={getPath(FilterProxy.Jobs.CentresFilter)}
					formik={formik}
					from={formik?.values?.Jobs.CentresFilter?.From}
					to={formik?.values?.Jobs.CentresFilter?.To}
					settingsFrom={filter?.Truss?.CentresFrom}
					settingsTo={filter?.Truss?.CentresTo}
				/>
				<FormikCheckbox
					formik={formik}
					filter={filter}
					filterPath={getPath(FilterSettingsProxy.Job.SnowAreas)}
					name={getPath(FilterProxy.Jobs.SnowAreaFilter.SnowAreas)}
					pathName={
						lastPathMember(FilterProxy.Jobs.SnowAreaFilter.SnowAreas).path
					}
					path={getPath(FilterProxy.Jobs.SnowAreaFilter)}
					title={t(translationPath(lang.common.snowArea))}
					value={formik.values?.Jobs?.SnowAreaFilter?.SnowAreas}
				/>
				<FormikCheckbox
					formik={formik}
					filter={filter}
					filterPath={getPath(FilterSettingsProxy.Job.WindAreas)}
					name={getPath(FilterProxy.Jobs.WindAreaFilter.WindAreas)}
					pathName={
						lastPathMember(FilterProxy.Jobs.WindAreaFilter.WindAreas).path
					}
					path={getPath(FilterProxy.Jobs.WindAreaFilter)}
					title={t(translationPath(lang.common.windArea))}
					value={formik.values?.Jobs?.WindAreaFilter?.WindAreas}
				/>
				<FormSlider
					label={t(translationPath(lang.common.snowLoad))}
					name={getPath(FilterProxy.Jobs.SnowFilter)}
					formik={formik}
					from={formik?.values?.Jobs.SnowFilter?.From}
					to={formik?.values?.Jobs.SnowFilter?.To}
					settingsFrom={filter?.Job?.SnowFrom}
					settingsTo={filter?.Job?.SnowTo}
				/>
				<FormSlider
					label={t(translationPath(lang.common.windLoad))}
					name={getPath(FilterProxy.Jobs.WindFilter)}
					formik={formik}
					from={formik?.values?.Jobs.WindFilter?.From}
					to={formik?.values?.Jobs.WindFilter?.To}
					settingsFrom={filter?.Job?.WindFrom}
					settingsTo={filter?.Job?.WindTo}
				/>
			</EmptyFilter>
		</FilterSection>
	);
};

export default withTranslation()(React.memo(Index));
