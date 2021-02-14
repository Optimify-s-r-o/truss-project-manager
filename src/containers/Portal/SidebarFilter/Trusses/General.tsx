import * as React from 'react';
import FilterSection from '../../Lists/components/FilterSection';
import FormikRow from '../../../../components/Optimify/Form/FormikRow';
import { FilterContentSection } from '../../Lists/components/_styles';
import { FilterProxy } from '../_types';
import { FilterSettings, FilterSettingsProxy } from '../../../../types/_types';
import { FormikCheckbox } from '../components/FormikCheckbox';
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

export interface OwnProps {
	formik: any;
	filter: FilterSettings;
}

const Index = (props: OwnProps & WithTranslation) => {
	const { filter, formik } = props;

	return (
		<FilterSection
			title={t(translationPath(lang.common.filterGeneral))}
			filter={filter}
			formik={formik}
			formikCheckboxes={[
				getPath(FilterProxy.Trusses.StatusFilter.Statuses),
				getPath(FilterProxy.Trusses.TypeFilter.Types),
				getPath(FilterProxy.Trusses.KindsFilter.Kinds),
			]}
			checkboxes={[
				getPath(FilterSettingsProxy.Truss.Statuses),
				getPath(FilterSettingsProxy.Truss.Types),
				getPath(FilterSettingsProxy.Truss.Kinds),
			]}
			input={[getPath(FilterProxy.Trusses.NameFilter.Name)]}
		>
			<FilterContentSection>
				<FormikRow
					formik={formik}
					name={getPath(FilterProxy.Trusses.NameFilter.Name)}
					filter={getPath(FilterProxy.Trusses.NameFilter)}
					title={t(translationPath(lang.common.name))}
					type={Input.FILTER_TEXT}
				/>
			</FilterContentSection>
			<FormikCheckbox
				formik={formik}
				filter={filter}
				filterPath={getPath(FilterSettingsProxy.Truss.Statuses)}
				name={getPath(FilterProxy.Trusses.StatusFilter.Statuses)}
				pathName={
					lastPathMember(FilterProxy.Trusses.StatusFilter.Statuses).path
				}
				path={getPath(FilterProxy.Trusses.StatusFilter)}
				title={t(translationPath(lang.common.status))}
				value={formik.values?.Trusses?.StatusFilter?.Statuses}
			/>
			<FormikCheckbox
				formik={formik}
				filter={filter}
				filterPath={getPath(FilterSettingsProxy.Truss.Types)}
				name={getPath(FilterProxy.Trusses.TypeFilter.Types)}
				pathName={lastPathMember(FilterProxy.Trusses.TypeFilter.Types).path}
				path={getPath(FilterProxy.Trusses.TypeFilter)}
				title={t(translationPath(lang.common.type))}
				value={formik.values?.Trusses?.TypeFilter?.Types}
			/>
			<FormikCheckbox
				formik={formik}
				filter={filter}
				filterPath={getPath(FilterSettingsProxy.Truss.Kinds)}
				name={getPath(FilterProxy.Trusses.KindsFilter.Kinds)}
				pathName={lastPathMember(FilterProxy.Trusses.KindsFilter.Kinds).path}
				path={getPath(FilterProxy.Trusses.KindsFilter)}
				title={t(translationPath(lang.common.kinds))}
				value={formik.values?.Trusses?.KindsFilter?.Kinds}
			/>
		</FilterSection>
	);
};

export default withTranslation()(React.memo(Index));
