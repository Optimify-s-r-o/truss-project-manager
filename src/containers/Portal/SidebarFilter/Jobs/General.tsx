import * as React from 'react';
import FilterSection from '../../Lists/components/FilterSection';
import { FilterContentSection } from '../../Lists/components/_styles';
import { FilterSettings, FilterSettingsProxy } from '../../../../types/_types';
import { FormikCheckbox } from '../components/FormikCheckbox';
import { JobsFilterProxy } from '../_types';
import { NestedInput } from 'src/components/Form/NestedInput';
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

export interface OwnProps {
	values: any;
	setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
	filter: FilterSettings;
	users: UserData[];
}

const Index = (props: OwnProps & WithTranslation) => {
	const { values, filter, setFieldValue } = props;

	return (
		<FilterSection
			title={t(translationPath(lang.common.filterGeneral))}
			values={values}
			formikCheckboxes={[
				getPath(JobsFilterProxy.JobTypeFilter),
				getPath(JobsFilterProxy.JobStateFilter),
			]}
			filter={filter}
			checkboxes={[
				getPath(FilterSettingsProxy.Job.JobTypes),
				getPath(FilterSettingsProxy.Job.States),
			]}
			input={[getPath(JobsFilterProxy.NameFilter.Name)]}
		>
			<FilterContentSection withoutMargin>
				<NestedInput
					name={getPath(JobsFilterProxy.NameFilter.Name)}
					value={values.NameFilter?.Name}
					title={t(translationPath(lang.common.jobName))}
				/>
			</FilterContentSection>
			<FormikCheckbox
				values={values}
				setFieldValue={setFieldValue}
				filter={filter}
				filterPath={getPath(FilterSettingsProxy.Job.JobTypes)}
				name={getPath(JobsFilterProxy.JobTypeFilter.JobTypes)}
				pathName={lastPathMember(JobsFilterProxy.JobTypeFilter.JobTypes).path}
				path={getPath(JobsFilterProxy.JobTypeFilter)}
				title={t(translationPath(lang.common.jobType))}
				value={values?.JobTypeFilter?.JobTypes}
			/>
			<FormikCheckbox
				values={values}
				setFieldValue={setFieldValue}
				filter={filter}
				filterPath={getPath(FilterSettingsProxy.Job.States)}
				name={getPath(JobsFilterProxy.JobStateFilter.JobStates)}
				pathName={lastPathMember(JobsFilterProxy.JobStateFilter.JobStates).path}
				path={getPath(JobsFilterProxy.JobStateFilter)}
				title={t(translationPath(lang.common.jobState))}
				value={values?.JobStateFilter?.JobStates}
			/>
		</FilterSection>
	);
};

export default withTranslation()(React.memo(Index));
