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
			title={t(translationPath(lang.common.sizes))}
			values={values}
			filters={[
				getPath(TrussesFilterProxy.HeightFilter),
				getPath(TrussesFilterProxy.LengthFilter),
				getPath(TrussesFilterProxy.SpanFilter),
				getPath(TrussesFilterProxy.ThicknessFilter),
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
					name={getPath(TrussesFilterProxy.HeightFilter)}
					setFieldValue={setFieldValue}
					values={values}
					from={values?.HeightFilter?.From}
					to={values?.HeightFilter?.To}
					settingsFrom={filter?.Truss?.HeightFrom}
					settingsTo={filter?.Truss?.HeightTo}
				/>
				<FormSlider
					label={t(translationPath(lang.common.length))}
					name={getPath(TrussesFilterProxy.LengthFilter)}
					setFieldValue={setFieldValue}
					values={values}
					from={values?.LengthFilter?.From}
					to={values?.LengthFilter?.To}
					settingsFrom={filter?.Truss?.LengthFrom}
					settingsTo={filter?.Truss?.LengthTo}
				/>
				<FormSlider
					label={t(translationPath(lang.common.span))}
					name={getPath(TrussesFilterProxy.SpanFilter)}
					setFieldValue={setFieldValue}
					values={values}
					from={values?.SpanFilter?.From}
					to={values?.SpanFilter?.To}
					settingsFrom={filter?.Truss?.SpanFrom}
					settingsTo={filter?.Truss?.SpanTo}
				/>
				<FormSlider
					label={t(translationPath(lang.common.thickness))}
					name={getPath(TrussesFilterProxy.ThicknessFilter)}
					setFieldValue={setFieldValue}
					values={values}
					from={values?.ThicknessFilter?.From}
					to={values?.ThicknessFilter?.To}
					settingsFrom={filter?.Truss?.ThicknessFrom}
					settingsTo={filter?.Truss?.ThicknessTo}
				/>
			</EmptyFilter>
		</FilterSection>
	);
};

export default withTranslation()(React.memo(Index));
