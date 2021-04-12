import * as React from 'react';
import DateRange from '../../Lists/components/DateRange';
import FilterSection from '../../Lists/components/FilterSection';
import FormikBox from '../../../../components/Optimify/Form/FormikCheckbox';
import { CustomersFilterProxy, FilterProxy } from '../_types';
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
	values: any;
	setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
	filter: FilterSettings;
}

const Index = (props: OwnProps & WithTranslation) => {
	const { filter, values, setFieldValue } = props;

	return (
		<FilterSection
			title={t(translationPath(lang.common.dateOfProcessing))}
			values={values}
			filters={[getPath(FilterProxy.Customers.CustomerDateOfCreationFilter)]}
			filter={filter}
			skipCount={1}
		>
			<FilterContentSection>
				<FormikBox
					checked={true}
					name={[getPath(CustomersFilterProxy.CustomerDateOfCreationFilter)]}
					values={values}
					setFieldValue={setFieldValue}
					label={
						<DateRangeTitle>
							{t(translationPath(lang.common.customerDateOfCreationFilter))}
						</DateRangeTitle>
					}
				/>
				<DateRange
					values={values}
					setFieldValue={setFieldValue}
					name={getPath(CustomersFilterProxy.CustomerDateOfCreationFilter)}
					title={t(translationPath(lang.common.customerDateOfCreationFilter))}
				/>
			</FilterContentSection>
		</FilterSection>
	);
};

export default withTranslation()(React.memo(Index));
