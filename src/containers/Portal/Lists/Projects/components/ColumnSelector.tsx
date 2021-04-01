import CheckboxSelection from '../Checkbox';
import React, { useEffect } from 'react';
import { Checkbox } from '../../Jobs/Component';
import { FilterContentType, FilterProxy } from '../../../SidebarFilter/_types';
import { getPath, translationPath } from '../../../../../utils/getPath';
import { lang } from '../../../../../translation/i18n';
import { PutHeaderSettings } from '../../_types';
import { TreeType } from '../../../../../types/_types';
import { useTranslation } from 'react-i18next';
import {
	ContentInline,
	ContentSpaceBetweenWithPadding,
	Header1,
} from "../../../../../constants/globalStyles";

interface ColumnSelector {
	checked: Checkbox[];
	setChecked: React.Dispatch<React.SetStateAction<Checkbox[]>>;
	setColumns: React.Dispatch<React.SetStateAction<Checkbox[]>>;
	initHeaders: string[];
	putHeaderSettings: (data: PutHeaderSettings) => void;
}

export const ProjectColumnSelector = ({
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
			Param: TreeType.PROJECT,
			Headers: newCheckboxes.map((e) => e.name),
		});
		setChecked(newCheckboxes);
	};

	const checkboxes: Checkbox[] = [
		{
			name: "Name",
			title: t(translationPath(lang.common.projectName).path),
			section: "General",
			filter: getPath(FilterProxy.Projects.NameFilter.Name),
			filterType: FilterContentType.TEXT,
		},
		{
			name: "Description",
			title: t(translationPath(lang.common.description).path),
			section: "General",
			filter: null,
		},
		{
			name: "Customer",
			title: t(translationPath(lang.common.customer).path),
			section: "General",
			filter: null,
		},
		{
			name: "Currency",
			title: t(translationPath(lang.common.currency).path),
			section: "Calculation",
		},
		{
			name: "QuotationPrice",
			title: t(translationPath(lang.common.quotation).path),
			section: "Calculation",
			filter: getPath(FilterProxy.Projects.QuotationPriceFilter),
			filterType: FilterContentType.RANGE,
		},
		{
			name: "ProductionPrice",
			title: t(translationPath(lang.common.production).path),
			section: "Calculation",
			filter: getPath(FilterProxy.Projects.ProductionPriceFilter),
			filterType: FilterContentType.RANGE,
		},
		{
			name: "State",
			title: t(translationPath(lang.common.projectState).path),
			section: "General",
			filter: getPath(FilterProxy.Projects.ProjectStateFilter.ProjectStates),
			filterType: FilterContentType.ARRAY,
		},
		{
			name: "TimeOfCreation",
			title: t(translationPath(lang.common.projectTimeOfCreation).path),
			section: "Date",
			filter: getPath(FilterProxy.Projects.DateOfCreationFilter),
			filterType: FilterContentType.DATE,
		},
		{
			name: "ConstructionDate",
			title: t(translationPath(lang.common.constructionDate).path),
			section: "Date",
			filter: getPath(FilterProxy.Projects.ConstructionDateFilter),
			filterType: FilterContentType.DATE,
		},
		{
			name: "QuotationDate",
			title: t(translationPath(lang.common.quotationDate).path),
			section: "Date",
			filter: getPath(FilterProxy.Projects.QuotationDateFilter),
			filterType: FilterContentType.DATE,
		},

		{
			name: "DateOfLastUpdate",
			title: t(translationPath(lang.common.dateOfLastUpdate).path),
			section: "Date",
			filter: null,
		},
		{
			name: "AssignedUser",
			title: t(translationPath(lang.common.user).path),
			section: "General",
			filter: null,
		},
		{
			name: "Location",
			title: t(translationPath(lang.common.address).path),
			section: "General",
			filter: null,
		},
	];

	return (
		<ContentSpaceBetweenWithPadding>
			<Header1>{t(translationPath(lang.common.projectList).path)}</Header1>
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
