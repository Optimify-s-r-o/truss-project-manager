import * as React from 'react';
import FilterSection from '../../Lists/components/FilterSection';
import { FilterContentSection } from '../../Lists/components/_styles';
import { FilterSettings, FilterSettingsProxy } from '../../../../types/_types';
import { FormikCheckbox } from '../components/FormikCheckbox';
import { NestedInput } from 'src/components/Form/NestedInput';
import { TrussesFilterProxy } from '../_types';
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
	values: any;
	setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
	filter: FilterSettings;
}

const Index = ({
	values,
	setFieldValue,
	filter,
}: OwnProps & WithTranslation) => {
	return (
		<FilterSection
			title={t(translationPath(lang.common.filterGeneral))}
			filter={filter}
			values={values}
			formikCheckboxes={[
				getPath(TrussesFilterProxy.StatusFilter.Statuses),
				getPath(TrussesFilterProxy.TypeFilter.Types),
				getPath(TrussesFilterProxy.KindsFilter.Kinds),
			]}
			checkboxes={[
				getPath(FilterSettingsProxy.Truss.Statuses),
				getPath(FilterSettingsProxy.Truss.Types),
				getPath(FilterSettingsProxy.Truss.Kinds),
			]}
			input={[getPath(TrussesFilterProxy.NameFilter.Name)]}
		>
			<FilterContentSection>
				<NestedInput
					name={getPath(TrussesFilterProxy.NameFilter.Name)}
					value={values?.NameFilter?.Name}
					title={t(translationPath(lang.common.truss))}
				/>
			</FilterContentSection>
			<FormikCheckbox
				values={values}
				setFieldValue={setFieldValue}
				filter={filter}
				filterPath={getPath(FilterSettingsProxy.Truss.Statuses)}
				name={getPath(TrussesFilterProxy.StatusFilter.Statuses)}
				pathName={lastPathMember(TrussesFilterProxy.StatusFilter.Statuses).path}
				path={getPath(TrussesFilterProxy.StatusFilter)}
				title={t(translationPath(lang.common.assessment))}
				value={values?.StatusFilter?.Statuses}
			/>
			<FormikCheckbox
				values={values}
				setFieldValue={setFieldValue}
				filter={filter}
				filterPath={getPath(FilterSettingsProxy.Truss.Types)}
				name={getPath(TrussesFilterProxy.TypeFilter.Types)}
				pathName={lastPathMember(TrussesFilterProxy.TypeFilter.Types).path}
				path={getPath(TrussesFilterProxy.TypeFilter)}
				title={t(translationPath(lang.common.trussType))}
				value={values?.TypeFilter?.Types}
			/>
			<FormikCheckbox
				values={values}
				setFieldValue={setFieldValue}
				filter={filter}
				filterPath={getPath(FilterSettingsProxy.Truss.Kinds)}
				name={getPath(TrussesFilterProxy.KindsFilter.Kinds)}
				pathName={lastPathMember(TrussesFilterProxy.KindsFilter.Kinds).path}
				path={getPath(TrussesFilterProxy.KindsFilter)}
				title={t(translationPath(lang.common.typeOfTruss))}
				value={values?.KindsFilter?.Kinds}
			/>
		</FilterSection>
	);
};

export default withTranslation()(React.memo(Index));
