import * as React from 'react';
import EmptyFilter from '../../../../components/EmpyFilter';
import FilterSection from '../../Lists/components/FilterSection';
import FormSlider from '../../../../components/FormSlider';
import { FilterProxy } from '..//_types';
import { FilterSettings, FilterSettingsProxy } from '../../../../types/_types';
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
			title={t(translationPath(lang.common.filterTechnicalParametr))}
			formik={formik}
			filters={[
				lastPathMember(FilterProxy.Jobs.HipLengthFilter).path,
				lastPathMember(FilterProxy.Jobs.CoveredAreaFilter).path,
				lastPathMember(FilterProxy.Jobs.RidgeLengthFilter).path,
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
			]}
		>
			<EmptyFilter
				filter={filter}
				type="Job"
				names={["HipLength", "CoveredArea", "RidgeLength"]}
			>
				<FormSlider
					label={t(translationPath(lang.common.hipLength))}
					name={getPath(FilterProxy.Jobs.HipLengthFilter)}
					formik={formik}
					from={formik?.values?.Jobs?.HipLengthFilter?.From}
					to={formik?.values?.Jobs?.HipLengthFilter?.To}
					settingsFrom={filter?.Job?.HipLengthFrom}
					settingsTo={filter?.Job?.HipLengthTo}
				/>
				<FormSlider
					label={t(translationPath(lang.common.roofArea))}
					name={getPath(FilterProxy.Jobs.CoveredAreaFilter)}
					formik={formik}
					from={formik?.values?.Jobs?.CoveredAreaFilter?.From}
					to={formik?.values?.Jobs?.CoveredAreaFilter?.To}
					settingsFrom={filter?.Job?.CoveredAreaFrom}
					settingsTo={filter?.Job?.CoveredAreaTo}
				/>
				<FormSlider
					label={t(translationPath(lang.common.ridgeLength))}
					name={getPath(FilterProxy.Jobs.RidgeLengthFilter)}
					formik={formik}
					from={formik?.values?.Jobs?.RidgeLengthFilter?.From}
					to={formik?.values?.Jobs?.RidgeLengthFilter?.To}
					settingsFrom={filter?.Job?.RidgeLengthFrom}
					settingsTo={filter?.Job?.RidgeLengthTo}
				/>
			</EmptyFilter>
		</FilterSection>
	);
};

export default withTranslation()(React.memo(Index));
