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
			title={t(translationPath(lang.common.load))}
			values={values}
			filters={[
				getPath(TrussesFilterProxy.WindLoadFilter),
				getPath(TrussesFilterProxy.SnowLoadFilter),
				getPath(TrussesFilterProxy.CeilingLoadFilter),
				getPath(TrussesFilterProxy.RoofingLoadFilter),
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
					label={t(translationPath(lang.common.roofingLoad))}
					name={getPath(TrussesFilterProxy.RoofingLoadFilter)}
					setFieldValue={setFieldValue}
					values={values}
					from={values?.RoofingLoadFilter?.From}
					to={values?.RoofingLoadFilter?.To}
					settingsFrom={filter?.Truss?.RoofingLoadFrom}
					settingsTo={filter?.Truss?.RoofingLoadTo}
				/>
				<FormSlider
					label={t(translationPath(lang.common.ceilingLoad))}
					name={getPath(TrussesFilterProxy.CeilingLoadFilter)}
					setFieldValue={setFieldValue}
					values={values}
					from={values?.CeilingLoadFilter?.From}
					to={values?.CeilingLoadFilter?.To}
					settingsFrom={filter?.Truss?.CeilingLoadFrom}
					settingsTo={filter?.Truss?.CeilingLoadTo}
				/>
				<FormSlider
					label={t(translationPath(lang.common.snowLoad))}
					name={getPath(TrussesFilterProxy.SnowLoadFilter)}
					setFieldValue={setFieldValue}
					values={values}
					from={values?.SnowLoadFilter?.From}
					to={values?.SnowLoadFilter?.To}
					settingsFrom={filter?.Truss?.SnowLoadFrom}
					settingsTo={filter?.Truss?.SnowLoadTo}
				/>
				<FormSlider
					label={t(translationPath(lang.common.windLoad))}
					name={getPath(TrussesFilterProxy.WindLoadFilter)}
					setFieldValue={setFieldValue}
					values={values}
					from={values?.WindLoadFilter?.From}
					to={values?.WindLoadFilter?.To}
					settingsFrom={filter?.Truss?.WindLoadFrom}
					settingsTo={filter?.Truss?.WindLoadTo}
				/>
			</EmptyFilter>
		</FilterSection>
	);
};

export default withTranslation()(React.memo(Index));
