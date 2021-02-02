import * as React from 'react';
import FilterSection from '../../Lists/components/FilterSection';
import FormikRow from '../../../../components/Optimify/Form/FormikRow';
import FormSlider from '../../../../components/FormSlider';
import { FilterProxy } from '../_types';
import { FilterSettings, FilterSettingsProxy } from '../../../../types/_types';
import { Input } from '../../../../constants/enum';
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
import {
	FilterContentSection,
	FilterTitle,
} from "../../Lists/components/_styles";

export interface OwnProps {
	filter: FilterSettings;
	formik: any;
}

const Index = (props: OwnProps & WithTranslation) => {
	const { formik, filter } = props;

	return (
		<FilterSection
			title={t(translationPath(lang.common.roofName))}
			formik={formik}
			filters={[lastPathMember(FilterProxy.Jobs.CentresFilter).path]}
			filter={filter}
			input={[
				getPath(FilterProxy.Jobs.CeilingNameFilter.Name),
				getPath(FilterProxy.Jobs.RoofingNameFilter.Name),
			]}
			setting={[
				{
					from: getPath(FilterSettingsProxy.Truss.CentresFrom),
					to: getPath(FilterSettingsProxy.Truss.CentresTo),
				},
			]}
		>
			<FilterContentSection>
				<FilterTitle>{t(translationPath(lang.common.details))}</FilterTitle>
				<FormikRow
					formik={formik}
					name={getPath(FilterProxy.Jobs.CeilingNameFilter.Name)}
					filter={getPath(FilterProxy.Jobs.CeilingNameFilter)}
					title={t(translationPath(lang.common.ceilingName))}
					type={Input.FILTER_TEXT}
				/>
				<FormikRow
					formik={formik}
					name={getPath(FilterProxy.Jobs.RoofingNameFilter.Name)}
					filter={getPath(FilterProxy.Jobs.RoofingNameFilter)}
					title={t(translationPath(lang.common.roofingName))}
					type={Input.FILTER_TEXT}
				/>
			</FilterContentSection>
			<FormSlider
				label={t(translationPath(lang.common.centres))}
				name={getPath(FilterProxy.Jobs.CentresFilter)}
				formik={formik}
				from={formik?.values?.Jobs.CentresFilter?.From}
				to={formik?.values?.Jobs.CentresFilter?.To}
				settingsFrom={filter?.Truss?.CentresFrom}
				settingsTo={filter?.Truss?.CentresTo}
			/>
		</FilterSection>
	);
};

export default withTranslation()(React.memo(Index));
