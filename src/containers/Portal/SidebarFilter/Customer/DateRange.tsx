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
	formik: any;
	filter: FilterSettings;
}

const Index = (props: OwnProps & WithTranslation) => {
	const { formik, filter } = props;
	return (
		<FilterSection
			title={t(translationPath(lang.common.dateOfProcessing))}
			formik={formik}
			filters={[getPath(FilterProxy.Customers.CustomerDateOfCreationFilter)]}
			filter={filter}
			skipCount={1}
		>
			<FilterContentSection>
				<FormikBox
					checked={true}
					name={[getPath(FilterProxy.Customers.CustomerDateOfCreationFilter)]}
					formik={formik}
					label={
						<DateRangeTitle>
							{t(translationPath(lang.common.customerDateOfCreationFilter))}
						</DateRangeTitle>
					}
				/>
				<DateRange
					formik={formik}
					name={getPath(FilterProxy.Customers.CustomerDateOfCreationFilter)}
					title={t(translationPath(lang.common.customerDateOfCreationFilter))}
				/>
			</FilterContentSection>
		</FilterSection>
	);
};

export default withTranslation()(React.memo(Index));
