import * as React from 'react';
import DateRange from '../../Lists/components/DateRange';
import FilterSection from '../../Lists/components/FilterSection';
import FormikBox from '../../../../components/Optimify/Form/FormikCheckbox';
import { FilterSettings } from '../../../../types/_types';
import { JobsFilterProxy } from '../_types';
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
	DateRangeTitle,
	FilterContentSection,
} from "../../Lists/components/_styles";

export interface OwnProps {
	filter: FilterSettings;
	values: any;
	setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

const Index = (props: OwnProps & WithTranslation) => {
	const { filter, values, setFieldValue } = props;

	return (
		<FilterSection
			title={t(translationPath(lang.common.dateOfProcessing))}
			values={values}
			filters={[
				lastPathMember(JobsFilterProxy.DateOfCreationFilter).path,
				lastPathMember(JobsFilterProxy.DateOfLastUpdateFilter).path,
			]}
			filter={filter}
			skipCount={2}
		>
			<FilterContentSection>
				<FormikBox
					checked={true}
					name={[getPath(JobsFilterProxy.DateOfCreationFilter)]}
					values={values}
					setFieldValue={setFieldValue}
					label={
						<DateRangeTitle>
							{t(translationPath(lang.common.jobDateOfCreation))}
						</DateRangeTitle>
					}
				/>
				<DateRange
					values={values}
					setFieldValue={setFieldValue}
					name={getPath(JobsFilterProxy.DateOfCreationFilter)}
					title={t(translationPath(lang.common.jobDateOfCreation))}
				/>
			</FilterContentSection>
			<FilterContentSection>
				<FormikBox
					checked={true}
					name={[getPath(JobsFilterProxy.DateOfLastUpdateFilter)]}
					values={values}
					setFieldValue={setFieldValue}
					label={
						<DateRangeTitle>
							{t(translationPath(lang.common.jobDateOfLastUpdate))}
						</DateRangeTitle>
					}
				/>
				<DateRange
					values={values}
					setFieldValue={setFieldValue}
					name={getPath(JobsFilterProxy.DateOfLastUpdateFilter)}
					title={t(translationPath(lang.common.jobDateOfLastUpdate))}
				/>
			</FilterContentSection>
		</FilterSection>
	);
};

export default withTranslation()(React.memo(Index));
