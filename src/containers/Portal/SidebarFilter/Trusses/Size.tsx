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
			title={t(translationPath(lang.common.sizes))}
			formik={formik}
			filters={[
				getPath(FilterProxy.Trusses.HeightFilter),
				getPath(FilterProxy.Trusses.LengthFilter),
				getPath(FilterProxy.Trusses.SpanFilter),
				getPath(FilterProxy.Trusses.ThicknessFilter),
			]}
			filter={filter}
			setting={[
				{
					from: getPath(FilterSettingsProxy.Truss.HeightFrom),
					to: getPath(FilterSettingsProxy.Truss.HeightTo),
				},
				{
					from: getPath(FilterSettingsProxy.Truss.LengthFrom),
					to: getPath(FilterSettingsProxy.Truss.LengthTo),
				},
				{
					from: getPath(FilterSettingsProxy.Truss.SpanFrom),
					to: getPath(FilterSettingsProxy.Truss.SpanTo),
				},
				{
					from: getPath(FilterSettingsProxy.Truss.ThicknessFrom),
					to: getPath(FilterSettingsProxy.Truss.ThicknessTo),
				},
			]}
		>
			<EmptyFilter
				filter={filter}
				type="Truss"
				names={["Height", "Length", "Span", "Thickness"]}
			>
				<FormSlider
					label={t(translationPath(lang.common.height))}
					name={getPath(FilterProxy.Trusses.HeightFilter)}
					formik={formik}
					from={formik?.values?.Trusses?.HeightFilter?.From}
					to={formik?.values?.Trusses?.HeightFilter?.To}
					settingsFrom={filter?.Truss?.HeightFrom}
					settingsTo={filter?.Truss?.HeightTo}
				/>
				<FormSlider
					label={t(translationPath(lang.common.length))}
					name={getPath(FilterProxy.Trusses.LengthFilter)}
					formik={formik}
					from={formik?.values?.Trusses?.LengthFilter?.From}
					to={formik?.values?.Trusses?.LengthFilter?.To}
					settingsFrom={filter?.Truss?.LengthFrom}
					settingsTo={filter?.Truss?.LengthTo}
				/>
				<FormSlider
					label={t(translationPath(lang.common.span))}
					name={getPath(FilterProxy.Trusses.SpanFilter)}
					formik={formik}
					from={formik?.values?.Trusses?.SpanFilter?.From}
					to={formik?.values?.Trusses?.SpanFilter?.To}
					settingsFrom={filter?.Truss?.SpanFrom}
					settingsTo={filter?.Truss?.SpanTo}
				/>
				<FormSlider
					label={t(translationPath(lang.common.thickness))}
					name={getPath(FilterProxy.Trusses.ThicknessFilter)}
					formik={formik}
					from={formik?.values?.Trusses?.ThicknessFilter?.From}
					to={formik?.values?.Trusses?.ThicknessFilter?.To}
					settingsFrom={filter?.Truss?.ThicknessFrom}
					settingsTo={filter?.Truss?.ThicknessTo}
				/>
			</EmptyFilter>
		</FilterSection>
	);
};

export default withTranslation()(React.memo(Index));
