import CheckboxSelection from '../../components/Checkbox';
import React, { useEffect } from 'react';
import { Checkbox } from '../../Jobs/Component';
import { CustomerProxy } from '../../../Customer/_types';
import { FilterContentType, FilterProxy } from '../../../SidebarFilter/_types';
import { lang } from '../../../../../translation/i18n';
import { PutHeaderSettings } from '../../_types';
import { TreeType } from '../../../../../types/_types';
import { useTranslation } from 'react-i18next';
import {
	ContentInline,
	ContentSpaceBetweenWithPadding,
	Header1,
} from "../../../../../constants/globalStyles";
import {
	getPath,
	lastPathMember,
	translationPath,
} from "../../../../../utils/getPath";

interface ColumnSelector {
	checked: Checkbox[];
	setChecked: React.Dispatch<React.SetStateAction<Checkbox[]>>;
	setColumns: React.Dispatch<React.SetStateAction<Checkbox[]>>;
	initHeaders: string[];
	putHeaderSettings: (data: PutHeaderSettings) => void;
}

export const CustomerColumnSelector = ({
	checked,
	setChecked,
	initHeaders,
	putHeaderSettings,
	setColumns,
}: ColumnSelector) => {
	const { t } = useTranslation();

	useEffect(() => {
		setChecked(
			checkboxes
				.map((c, i) => {
					return { ...c, position: i };
				})
				.filter((item) => initHeaders?.includes(item.name))
		);
		setColumns(checkboxes);
	}, [initHeaders]);

	const changeChecked = (newItem: Checkbox) => {
		const hasDuplicates = checked?.find((item) => item.name === newItem.name);
		let newCheckboxes = [];
		if (hasDuplicates) {
			newCheckboxes = checked.filter((item) => item.name !== newItem.name);
		} else {
			newCheckboxes = [...checked, newItem];
		}
		putHeaderSettings({
			Param: TreeType.CUSTOMER,
			Headers: newCheckboxes.map((e) => e.name),
		});

		setChecked(newCheckboxes);
	};

	const checkboxes: Checkbox[] = [
		{
			name: lastPathMember(CustomerProxy.Forename).path,
			title: t(translationPath(lang.common.forename).path),
			section: "General",
			filter: getPath(FilterProxy.Customers.FirstNameFilter.FirstName),
			filterType: FilterContentType.TEXT,
		},
		{
			name: lastPathMember(CustomerProxy.Surname).path,
			title: t(translationPath(lang.common.surname).path),
			section: "General",
			filter: getPath(FilterProxy.Customers.LastNameFilter.LastName),
			filterType: FilterContentType.TEXT,
		},
		{
			name: lastPathMember(CustomerProxy.Company).path,
			title: t(translationPath(lang.common.companyName).path),
			section: "General",
			filter: getPath(FilterProxy.Customers.CompanyNameFilter.Name),
			filterType: FilterContentType.TEXT,
		},
		{
			name: lastPathMember(CustomerProxy.Crn).path,
			title: t(translationPath(lang.common.crn).path),
			section: "General",
			filter: getPath(FilterProxy.Customers.CrnFilter.Crn),
			filterType: FilterContentType.TEXT,
		},

		{
			name: lastPathMember(CustomerProxy.VatRegNo).path,
			title: t(translationPath(lang.common.vatRegNo).path),
			section: "General",
			filter: getPath(FilterProxy.Customers.VatNumberFilter.VatNumber),
			filterType: FilterContentType.TEXT,
		},

		{
			name: "Open",
			title: t(translationPath(lang.common.actions).path),
			section: "General",
			filter: null,
		},
		{
			name: lastPathMember(CustomerProxy.ProjectCount).path,
			title: t(translationPath(lang.common.numberOfProjectsFilter).path),
			section: "Statistics",
			filter: getPath(FilterProxy.Customers.NumberOfProjectsFilter),
			filterType: FilterContentType.RANGE,
			round: true,
		},
		{
			name: lastPathMember(CustomerProxy.FinishedQuotationCount).path,
			title: t(translationPath(lang.common.finishedQuotationCount).path),
			section: "Statistics",
			filter: getPath(FilterProxy.Customers.NumberOfQuotationsFilter),
			filterType: FilterContentType.RANGE,
			round: true,
		},
		{
			name: lastPathMember(CustomerProxy.FinishedProductionCount).path,
			title: t(translationPath(lang.common.finishedProductionCount).path),
			section: "Statistics",
			filter: getPath(FilterProxy.Customers.NumberOfProductionsFilter),
			filterType: FilterContentType.RANGE,
			round: true,
		},
		{
			name: lastPathMember(CustomerProxy.ProductionsPerQuotations).path,
			title: t(
				translationPath(lang.common.productionsPerQuotationsFilter).path
			),
			section: "Statistics",
			filter: getPath(FilterProxy.Customers.ProductionsPerQuotationsFilter),
			filterType: FilterContentType.RANGE,
			round: true,
		},
		{
			name: lastPathMember(CustomerProxy.DateOfCreation).path,
			title: t(translationPath(lang.common.customerDateOfCreationFilter).path),
			section: "Date",
			filter: getPath(FilterProxy.Customers.CustomerDateOfCreationFilter),
			filterType: FilterContentType.DATE,
			round: true,
		},
	];

	return (
		<ContentSpaceBetweenWithPadding>
			<Header1>{t(translationPath(lang.common.customersList).path)}</Header1>
			<ContentInline>
				<CheckboxSelection
					changeChecked={changeChecked}
					checked={checked}
					checkboxes={checkboxes.map((c, i) => {
						return { ...c, position: i };
					})}
				/>
			</ContentInline>
		</ContentSpaceBetweenWithPadding>
	);
};
