import * as React from 'react';
import DateRange from '../../Lists/components/DateRange';
import FilterSection from '../../Lists/components/FilterSection';
import FormikBox from '../../../../components/Optimify/Form/FormikCheckbox';
import { FilterProxy } from '../_types';
import { FilterSettings } from '../../../../types/_types';
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
	formik: any;
}

const Index = (props: OwnProps & WithTranslation) => {
	const { filter, formik } = props;

	return (
		<FilterSection
			title={t(translationPath(lang.common.dateOfProcessing))}
			formik={formik}
			filters={[
				lastPathMember(FilterProxy.Jobs.JobDateOfCreationFilter).path,
				lastPathMember(FilterProxy.Jobs.DateOfLastUpdateFilter).path,
			]}
			filter={filter}
			skipCount={2}
		>
			<FilterContentSection>
				<FormikBox
					checked={true}
					name={[getPath(FilterProxy.Jobs.JobDateOfCreationFilter)]}
					formik={formik}
					label={
						<DateRangeTitle>
							{t(translationPath(lang.common.dateOfCreation))}
						</DateRangeTitle>
					}
				/>
				<DateRange
					formik={formik}
					name={getPath(FilterProxy.Jobs.JobDateOfCreationFilter)}
					title={t(translationPath(lang.common.dateOfCreation))}
				/>
			</FilterContentSection>
			<FilterContentSection>
				<FormikBox
					checked={true}
					name={[getPath(FilterProxy.Jobs.DateOfLastUpdateFilter)]}
					formik={formik}
					label={
						<DateRangeTitle>
							{t(translationPath(lang.common.dateOfLastUpdate))}
						</DateRangeTitle>
					}
				/>
				<DateRange
					formik={formik}
					name={getPath(FilterProxy.Jobs.DateOfLastUpdateFilter)}
					title={t(translationPath(lang.common.dateOfLastUpdate))}
				/>
			</FilterContentSection>
		</FilterSection>
	);
};

export default withTranslation()(React.memo(Index));
