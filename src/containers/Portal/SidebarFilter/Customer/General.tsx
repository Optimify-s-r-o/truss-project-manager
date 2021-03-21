import * as React from 'react';
import FilterSection from '../../Lists/components/FilterSection';
import FormikRow from '../../../../components/Optimify/Form/FormikRow';
import { CustomersAllFilterProxy } from './_types';
import { FilterCustomerContentSection } from '../../Lists/components/_styles';
import { FilterProxy } from '../_types';
import { FilterSettings, FilterSettingsProxy } from '../../../../types/_types';
import { Input } from '../../../../constants/enum';
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
	formik: any;
	filter: FilterSettings;
}

const Index = (props: OwnProps & WithTranslation) => {
	const { formik, filter } = props;

	return (
		<FilterSection
			title={t(translationPath(lang.common.filterGeneral))}
			formik={formik}
			formikCheckboxes={[getPath(CustomersAllFilterProxy.CustomerTypeFilter)]}
			filter={filter}
			input={[
				getPath(FilterProxy.Customers.CompanyNameFilter.Name),
				getPath(FilterProxy.Customers.CrnFilter.Crn),
				getPath(FilterProxy.Customers.VatNumberFilter.VatNumber),
				getPath(FilterProxy.Customers.FirstNameFilter.FirstName),
				getPath(FilterProxy.Customers.LastNameFilter.LastName),
			]}
			checkboxes={[getPath(FilterSettingsProxy.Job.CustomerTypes)]}
		>
			<FilterCustomerContentSection>
				<FormikRow
					formik={formik}
					name={getPath(FilterProxy.Customers.FirstNameFilter.FirstName)}
					filter={getPath(FilterProxy.Customers.FirstNameFilter)}
					filterName={
						lastPathMember(FilterProxy.Customers.FirstNameFilter.FirstName).path
					}
					title={t(translationPath(lang.common.forename))}
					type={Input.FILTER_TEXT}
				/>
				<FormikRow
					formik={formik}
					name={getPath(FilterProxy.Customers.LastNameFilter.LastName)}
					filter={getPath(FilterProxy.Customers.LastNameFilter)}
					filterName={
						lastPathMember(FilterProxy.Customers.LastNameFilter.LastName).path
					}
					title={t(translationPath(lang.common.surname))}
					type={Input.FILTER_TEXT}
				/>
				<FormikRow
					formik={formik}
					name={getPath(FilterProxy.Customers.CompanyNameFilter.Name)}
					filter={getPath(FilterProxy.Customers.CompanyNameFilter)}
					filterName={
						lastPathMember(FilterProxy.Customers.CompanyNameFilter.Name).path
					}
					title={t(translationPath(lang.common.companyName))}
					type={Input.FILTER_TEXT}
				/>
				<FormikRow
					formik={formik}
					name={getPath(FilterProxy.Customers.CrnFilter.Crn)}
					filter={getPath(FilterProxy.Customers.CrnFilter)}
					filterName={lastPathMember(FilterProxy.Customers.CrnFilter.Crn).path}
					title={t(translationPath(lang.common.crn))}
					type={Input.FILTER_TEXT}
				/>
				<FormikRow
					formik={formik}
					name={getPath(FilterProxy.Customers.VatNumberFilter.VatNumber)}
					filter={getPath(FilterProxy.Customers.VatNumberFilter)}
					filterName={
						lastPathMember(FilterProxy.Customers.VatNumberFilter.VatNumber).path
					}
					title={t(translationPath(lang.common.vatRegNo))}
					type={Input.FILTER_TEXT}
				/>
			</FilterCustomerContentSection>
		</FilterSection>
	);
};

export default withTranslation()(React.memo(Index));
