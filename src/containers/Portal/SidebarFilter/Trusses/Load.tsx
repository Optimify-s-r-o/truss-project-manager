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
	console.log(formik.values);
	return (
		<FilterSection
			title={t(translationPath(lang.common.load))}
			formik={formik}
			filters={[
				getPath(FilterProxy.Trusses.WindLoadFilter),
				getPath(FilterProxy.Trusses.SnowLoadFilter),
				getPath(FilterProxy.Trusses.CeilingLoadFilter),
				getPath(FilterProxy.Trusses.RoofingLoadFilter),
			]}
			filter={filter}
			setting={[
				{
					from: getPath(FilterSettingsProxy.Truss.WindLoadFrom),
					to: getPath(FilterSettingsProxy.Truss.WindLoadTo),
				},
				{
					from: getPath(FilterSettingsProxy.Truss.SnowLoadFrom),
					to: getPath(FilterSettingsProxy.Truss.SnowLoadTo),
				},
				{
					from: getPath(FilterSettingsProxy.Truss.CeilingLoadFrom),
					to: getPath(FilterSettingsProxy.Truss.CeilingLoadTo),
				},
				{
					from: getPath(FilterSettingsProxy.Truss.RoofingLoadFrom),
					to: getPath(FilterSettingsProxy.Truss.RoofingLoadTo),
				},
			]}
		>
			<EmptyFilter
				filter={filter}
				type="Truss"
				names={["WindLoad", "SnowLoad", "CeilingLoad", "RoofingLoad"]}
			>
				<FormSlider
					label={t(translationPath(lang.common.windLoad))}
					name={getPath(FilterProxy.Trusses.WindLoadFilter)}
					formik={formik}
					from={formik?.values?.Trusses?.WindLoadFilter?.From}
					to={formik?.values?.Trusses?.WindLoadFilter?.To}
					settingsFrom={filter?.Truss?.WindLoadFrom}
					settingsTo={filter?.Truss?.WindLoadTo}
				/>
				<FormSlider
					label={t(translationPath(lang.common.snowLoad))}
					name={getPath(FilterProxy.Trusses.SnowLoadFilter)}
					formik={formik}
					from={formik?.values?.Trusses?.SnowLoadFilter?.From}
					to={formik?.values?.Trusses?.SnowLoadFilter?.To}
					settingsFrom={filter?.Truss?.SnowLoadFrom}
					settingsTo={filter?.Truss?.SnowLoadTo}
				/>
				<FormSlider
					label={t(translationPath(lang.common.ceilingLoad))}
					name={getPath(FilterProxy.Trusses.CeilingLoadFilter)}
					formik={formik}
					from={formik?.values?.Trusses?.CeilingLoadFilter?.From}
					to={formik?.values?.Trusses?.CeilingLoadFilter?.To}
					settingsFrom={filter?.Truss?.CeilingLoadFrom}
					settingsTo={filter?.Truss?.CeilingLoadTo}
				/>
				<FormSlider
					label={t(translationPath(lang.common.roofingLoad))}
					name={getPath(FilterProxy.Trusses.RoofingLoadFilter)}
					formik={formik}
					from={formik?.values?.Trusses?.RoofingLoadFilter?.From}
					to={formik?.values?.Trusses?.RoofingLoadFilter?.To}
					settingsFrom={filter?.Truss?.RoofingLoadFrom}
					settingsTo={filter?.Truss?.RoofingLoadTo}
				/>
			</EmptyFilter>
		</FilterSection>
	);
};

export default withTranslation()(React.memo(Index));
