import * as React from 'react';
import FilterSection from '../../Lists/components/FilterSection';
import { CustomersAllFilterProxy } from './_types';
import { CustomersFilterProxy } from '../_types';
import { FilterCustomerContentSection } from '../../Lists/components/_styles';
import { FilterSettings, FilterSettingsProxy } from '../../../../types/_types';
import { getPath, translationPath } from '../../../../utils/getPath';
import { NestedInput } from 'src/components/Form/NestedInput';
import {
	lang,
	t,
	WithTranslation,
	withTranslation,
} from "../../../../translation/i18n";
export interface OwnProps {
	filter: FilterSettings;
	values: any;
}

const Index = ({ filter, values }: OwnProps & WithTranslation) => {
	return (
		<FilterSection
			title={t(translationPath(lang.common.filterGeneral))}
			values={values}
			formikCheckboxes={[getPath(CustomersAllFilterProxy.CustomerTypeFilter)]}
			filter={filter}
			input={[
				getPath(CustomersFilterProxy.CompanyNameFilter.Name),
				getPath(CustomersFilterProxy.CrnFilter.Crn),
				getPath(CustomersFilterProxy.VatNumberFilter.VatNumber),
				getPath(CustomersFilterProxy.FirstNameFilter.FirstName),
				getPath(CustomersFilterProxy.LastNameFilter.LastName),
			]}
			checkboxes={[getPath(FilterSettingsProxy.Job.CustomerTypes)]}
		>
			<FilterCustomerContentSection>
				<NestedInput
					name={getPath(CustomersFilterProxy.FirstNameFilter.FirstName)}
					value={values?.FirstNameFilter?.FirstName}
					title={t(translationPath(lang.common.forename))}
				/>
				<NestedInput
					name={getPath(CustomersFilterProxy.LastNameFilter.LastName)}
					value={values?.LastNameFilter?.LastName}
					title={t(translationPath(lang.common.surname))}
				/>
				<NestedInput
					name={getPath(CustomersFilterProxy.CompanyNameFilter.Name)}
					value={values?.CompanyNameFilter?.Name}
					title={t(translationPath(lang.common.companyName))}
				/>
				<NestedInput
					name={getPath(CustomersFilterProxy.CrnFilter.Crn)}
					value={values?.CrnFilter?.Crn}
					title={t(translationPath(lang.common.crn))}
				/>
				<NestedInput
					name={getPath(CustomersFilterProxy.VatNumberFilter.VatNumber)}
					value={values?.VatNumberFilter?.VatNumber}
					title={t(translationPath(lang.common.vatRegNo))}
				/>
			</FilterCustomerContentSection>
		</FilterSection>
	);
};

export default withTranslation()(React.memo(Index));
