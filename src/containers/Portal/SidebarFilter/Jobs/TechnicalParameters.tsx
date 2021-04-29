import * as React from 'react';
import EmptyFilter from '../../../../components/EmpyFilter';
import FilterSection from '../../Lists/components/FilterSection';
import FormSlider from '../../../../components/FormSlider';
import { FilterSettings, FilterSettingsProxy } from '../../../../types/_types';
import { JobsFilterProxy } from '..//_types';
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
			title={t(translationPath(lang.common.filterTechnicalParametr))}
			values={values}
			filters={[
				lastPathMember(JobsFilterProxy.HipLengthFilter).path,
				lastPathMember(JobsFilterProxy.CoveredAreaFilter).path,
				lastPathMember(JobsFilterProxy.RidgeLengthFilter).path,
				lastPathMember(JobsFilterProxy.AltitudeFilter).path,
			]}
			filter={filter}
			setting={[
				{
					from: getPath(FilterSettingsProxy.Job.HipLengthFrom),
					to: getPath(FilterSettingsProxy.Job.HipLengthTo),
				},
				{
					from: getPath(FilterSettingsProxy.Job.CoveredAreaFrom),
					to: getPath(FilterSettingsProxy.Job.CoveredAreaTo),
				},
				{
					from: getPath(FilterSettingsProxy.Job.RidgeLengthFrom),
					to: getPath(FilterSettingsProxy.Job.RidgeLengthTo),
				},
				{
					from: getPath(FilterSettingsProxy.Job.AltitudeFrom),
					to: getPath(FilterSettingsProxy.Job.AltitudeTo),
				},
			]}
		>
			<EmptyFilter
				filter={filter}
				type="Job"
				names={["HipLength", "CoveredArea", "RidgeLength", "Altitude"]}
			>
				<FormSlider
					label={t(translationPath(lang.common.hipLength))}
					name={getPath(JobsFilterProxy.HipLengthFilter)}
					values={values}
					setFieldValue={setFieldValue}
					from={values?.HipLengthFilter?.From}
					to={values?.HipLengthFilter?.To}
					settingsFrom={filter?.Job?.HipLengthFrom}
					settingsTo={filter?.Job?.HipLengthTo}
				/>
				<FormSlider
					label={t(translationPath(lang.common.roofArea))}
					name={getPath(JobsFilterProxy.CoveredAreaFilter)}
					values={values}
					setFieldValue={setFieldValue}
					from={values?.CoveredAreaFilter?.From}
					to={values?.CoveredAreaFilter?.To}
					settingsFrom={filter?.Job?.CoveredAreaFrom}
					settingsTo={filter?.Job?.CoveredAreaTo}
				/>
				<FormSlider
					label={t(translationPath(lang.common.ridgeLength))}
					name={getPath(JobsFilterProxy.RidgeLengthFilter)}
					values={values}
					setFieldValue={setFieldValue}
					from={values?.RidgeLengthFilter?.From}
					to={values?.RidgeLengthFilter?.To}
					settingsFrom={filter?.Job?.RidgeLengthFrom}
					settingsTo={filter?.Job?.RidgeLengthTo}
				/>
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
			</EmptyFilter>
		</FilterSection>
	);
};

export default withTranslation()(React.memo(Index));
