import * as React from 'react';
import DateRange from '../../Lists/components/DateRange';
import FilterSection from '../../Lists/components/FilterSection';
import FormikBox from '../../../../components/Optimify/Form/FormikCheckbox';
import { FilterSettings } from '../../../../types/_types';
import { getPath, translationPath } from '../../../../utils/getPath';
import { ProjectsFilterProxy } from '../_types';
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
				getPath(ProjectsFilterProxy.DateOfCreationFilter),
				getPath(ProjectsFilterProxy.ConstructionDateFilter),
				getPath(ProjectsFilterProxy.QuotationDateFilter),
			]}
			filter={filter}
			skipCount={3}
		>
			<FilterContentSection>
				<FormikBox
					checked={true}
					name={[getPath(ProjectsFilterProxy.DateOfCreationFilter)]}
					values={values}
					setFieldValue={setFieldValue}
					label={
						<DateRangeTitle>
							{t(translationPath(lang.common.projectTimeOfCreation))}
						</DateRangeTitle>
					}
				/>
				<DateRange
					values={values}
					setFieldValue={setFieldValue}
					name={getPath(ProjectsFilterProxy.DateOfCreationFilter)}
					title={t(translationPath(lang.common.projectTimeOfCreation))}
				/>
			</FilterContentSection>
			<FilterContentSection>
				<FormikBox
					checked={true}
					name={[getPath(ProjectsFilterProxy.QuotationDateFilter)]}
					values={values}
					setFieldValue={setFieldValue}
					label={
						<DateRangeTitle>
							{t(translationPath(lang.common.quotationDate))}
						</DateRangeTitle>
					}
				/>
				<DateRange
					values={values}
					setFieldValue={setFieldValue}
					name={getPath(ProjectsFilterProxy.QuotationDateFilter)}
					title={t(translationPath(lang.common.quotationDate))}
				/>
			</FilterContentSection>
			<FilterContentSection>
				<FormikBox
					checked={true}
					name={[getPath(ProjectsFilterProxy.ConstructionDateFilter)]}
					values={values}
					setFieldValue={setFieldValue}
					label={
						<DateRangeTitle>
							{t(translationPath(lang.common.constructionDate))}
						</DateRangeTitle>
					}
				/>
				<DateRange
					values={values}
					setFieldValue={setFieldValue}
					name={getPath(ProjectsFilterProxy.ConstructionDateFilter)}
					title={t(translationPath(lang.common.constructionDate))}
				/>
			</FilterContentSection>
		</FilterSection>
	);
};

export default withTranslation()(React.memo(Index));
