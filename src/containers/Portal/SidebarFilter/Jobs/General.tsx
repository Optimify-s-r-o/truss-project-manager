import * as React from 'react';
import FilterSection from '../../Lists/components/FilterSection';
import FormikRow from '../../../../components/Optimify/Form/FormikRow';
import { FilterProxy } from '../_types';
import { FilterSettings, FilterSettingsProxy } from '../../../../types/_types';
import { FormikCheckbox } from '../components/FormikCheckbox';
import { Input } from '../../../../constants/enum';
import { UserData } from '../../Accounts/_types';
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
	formik: any;
	filter: FilterSettings;
	users: UserData[];
}

const Index = (props: OwnProps & WithTranslation) => {
	const { formik, filter, users } = props;

	return (
		<FilterSection
			title={t(translationPath(lang.common.filterGeneral))}
			formik={formik}
			formikCheckboxes={[
				getPath(FilterProxy.Jobs.JobTypeFilter.JobTypes),
				getPath(FilterProxy.Jobs.JobStateFilter.JobStates),
			]}
			filter={filter}
			checkboxes={[getPath(FilterSettingsProxy.Job.JobTypes)]}
			input={[getPath(FilterProxy.Jobs.NameFilter.Name)]}
		>
			<FilterContentSection>
				<FilterTitle>{t(translationPath(lang.common.job))}</FilterTitle>
				<FormikRow
					formik={formik}
					name={getPath(FilterProxy.Jobs.NameFilter.Name)}
					filter={getPath(FilterProxy.Jobs.NameFilter)}
					filterName={lastPathMember(FilterProxy.Jobs.NameFilter.Name).path}
					title={t(translationPath(lang.common.name))}
					type={Input.FILTER_TEXT}
				/>
			</FilterContentSection>
			<FormikCheckbox
				formik={formik}
				filter={filter}
				filterPath={getPath(FilterSettingsProxy.Job.JobTypes)}
				name={getPath(FilterProxy.Jobs.JobTypeFilter.JobTypes)}
				pathName={lastPathMember(FilterProxy.Jobs.JobTypeFilter.JobTypes).path}
				path={getPath(FilterProxy.Jobs.JobTypeFilter)}
				title={t(translationPath(lang.common.jobType))}
				value={formik.values?.Jobs?.JobTypeFilter?.JobTypes}
			/>
			<FormikCheckbox
				formik={formik}
				filter={filter}
				filterPath={getPath(FilterSettingsProxy.Job.States)}
				name={getPath(FilterProxy.Jobs.JobStateFilter.JobStates)}
				pathName={
					lastPathMember(FilterProxy.Jobs.JobStateFilter.JobStates).path
				}
				path={getPath(FilterProxy.Jobs.JobStateFilter)}
				title={t(translationPath(lang.common.state))}
				value={formik?.values?.Jobs?.JobStateFilter?.JobStates}
			/>
		</FilterSection>
	);
};

export default withTranslation()(React.memo(Index));
