import * as React from 'react';
import DateRange from '../../Lists/components/DateRange';
import FilterSection from '../../Lists/components/FilterSection';
import FormikBox from '../../../../components/Optimify/Form/FormikCheckbox';
import { FilterProxy } from '../_types';
import { FilterSettings } from '../../../../types/_types';
import { getPath, translationPath } from '../../../../utils/getPath';
import {
	lang,
	t,
	WithTranslation,
	withTranslation,
} from "../../../../translation/i18n";
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
				getPath(FilterProxy.Projects.DateOfCreationFilter),
				getPath(FilterProxy.Projects.ConstructionDateFilter),
				getPath(FilterProxy.Projects.QuotationDateFilter),
			]}
			filter={filter}
			skipCount={3}
		>
			<FilterContentSection>
				<FormikBox
					checked={true}
					name={[getPath(FilterProxy.Projects.DateOfCreationFilter)]}
					formik={formik}
					label={
						<DateRangeTitle>
							{t(translationPath(lang.common.projectTimeOfCreation))}
						</DateRangeTitle>
					}
				/>
				<DateRange
					formik={formik}
					name={getPath(FilterProxy.Projects.DateOfCreationFilter)}
					title={t(translationPath(lang.common.dateOfCreation))}
				/>
			</FilterContentSection>
			<FilterContentSection>
				<FormikBox
					checked={true}
					name={[getPath(FilterProxy.Projects.QuotationDateFilter)]}
					formik={formik}
					label={
						<DateRangeTitle>
							{t(translationPath(lang.common.quotationDate))}
						</DateRangeTitle>
					}
				/>
				<DateRange
					formik={formik}
					name={getPath(FilterProxy.Projects.QuotationDateFilter)}
					title={t(translationPath(lang.common.quotationDate))}
				/>
			</FilterContentSection>
			<FilterContentSection>
				<FormikBox
					checked={true}
					name={[getPath(FilterProxy.Projects.ConstructionDateFilter)]}
					formik={formik}
					label={
						<DateRangeTitle>
							{t(translationPath(lang.common.constructionDate))}
						</DateRangeTitle>
					}
				/>
				<DateRange
					formik={formik}
					name={getPath(FilterProxy.Projects.ConstructionDateFilter)}
					title={t(translationPath(lang.common.constructionDate))}
				/>
			</FilterContentSection>
		</FilterSection>
	);
};

export default withTranslation()(React.memo(Index));
