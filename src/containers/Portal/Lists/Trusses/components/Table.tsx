import ExternalTable from '../../../../../components/Table/ExternalTable';
import React from 'react';
import { CardMiddleTableWrapper } from '../../../../../constants/globalStyles';
import { Checkbox } from '../../Jobs/Component';
import { fixed } from '../../../../../utils/formating';
import { formatCurrency } from 'src/utils/currencyFormat';
import { getFilterActiveContent } from '../../_services';
import { JobType, Page, Truss } from '../../../../../types/_types';
import { lang } from '../../../../../translation/i18n';
import { Routes } from '../../../../../constants/routes';
import { StyledDiv } from '../../../Sidebar/_styles';
import { translationPath } from '../../../../../utils/getPath';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Table {
	activeFilter: boolean;
	setSelectedKeys: (data: string[]) => void;
	setExpandedKeys: (data: string[]) => void;
	checked: Checkbox[];
	activeFilterContent: any;
	initSort: number[];
	initSortOrder: number[];
	columns: Checkbox[];
	getTrusses: (data: Page) => void;
	firstRecordOnPage: number | null;
	lastRecordOnPage: number | null;
	currentPage: number | null;
	totalPages: number | null;
	totalRecords: number | null;
	pending: boolean;
	pageSize: string | null;
	trusses: Truss[];
}

export const TrussTable = ({
	activeFilter,
	setSelectedKeys,
	setExpandedKeys,
	checked,
	trusses,
	activeFilterContent,
	initSort,
	initSortOrder,
	columns,
	getTrusses,
	firstRecordOnPage,
	lastRecordOnPage,
	currentPage,
	totalPages,
	totalRecords,
	pending,
	pageSize,
}: Table) => {
	const { t } = useTranslation();
	const history = useHistory();

	const routeJob = (value: Truss, item: Checkbox) => (
		_event: React.MouseEvent<HTMLElement, MouseEvent>
	) => {
		setSelectedKeys([value.JobId]);
		setExpandedKeys([value.ParentProjectId]);
		history.push(Routes.TREE_LINK_JOB + value.JobId);
	};

	const routeProject = (value: Truss, item: Checkbox) => (
		_event: React.MouseEvent<HTMLElement, MouseEvent>
	) => {
		setSelectedKeys([value.ParentProjectId]);
		history.push(Routes.TREE_LINK_PROJECT + value.ParentProjectId);
	};

	const routeTruss = (value: Truss, item: Checkbox) => (
		_event: React.MouseEvent<HTMLElement, MouseEvent>
	) => {
		setExpandedKeys([value.ParentProjectId, value.JobId]);
		setSelectedKeys([value.Id]);
		history.push(Routes.TREE_LINK_TRUSS + value.Id);
	};

	const getValue = (value: Truss, item: Checkbox) => {
		switch (item.name) {
			case "Name":
				return (
					<StyledDiv onClick={routeTruss(value, item)}>{value.Name}</StyledDiv>
				);
			case "JobName":
				return (
					<StyledDiv onClick={routeJob(value, item)}>{value.JobName}</StyledDiv>
				);
			case "Project":
				return (
					<StyledDiv onClick={routeProject(value, item)}>
						{value.Project}
					</StyledDiv>
				);
			case "Status":
			case "Type":
			case "Kind":
				return t(translationPath(lang.common[value[item.name]]).path);
			case "Count":
			case "Plies":
				return value[item.name];
			case "Price":
			case "PriceSum":
			case "PriceOnPlanks":
			case "PriceOnArea":
				return !!value[item.name] ? formatCurrency(value[item.name]) : "x";
			case "MembersCount":
			case "PlatesCount":
			case "ModelCount":
			case "SupportsCount":
				return value[item.name];
			default:
				if (value[item.name] && typeof value[item.name] == "number") {
					return fixed(value[item.name], 2);
				} else if (!value[item.name]) {
					return "x";
				}
				return value[item.name];
		}
	};

	return (
		<CardMiddleTableWrapper>
			<ExternalTable
				headers={checked?.map((value: Checkbox, index: number) => value.title)}
				names={checked?.map((value: Checkbox, index: number) => value.name)}
				data={
					trusses
						? trusses?.map((value: Truss, index: number) => [
								...checked?.map((item: Checkbox, index: number) =>
									getValue(value, item)
								),
								value,
						  ])
						: []
				}
				renderers={checked?.map(
					(item: Checkbox, index: number) => (
						value: any,
						key: number,
						parent: JobType
					) => {
						return value;
					}
				)}
				sortable={checked?.map((value: Checkbox, index: number) =>
					value.name === "Open" ? false : true
				)}
				columnNames={checked?.map((value: Checkbox) => value.name)}
				filterContent={getFilterActiveContent(
					checked,
					columns,
					activeFilterContent
				)}
				onPageRequired={(requiredPage: Page) => {
					getTrusses(requiredPage);
				}}
				pageSize={parseInt(pageSize)}
				firstRecordOnPage={firstRecordOnPage}
				lastRecordOnPage={lastRecordOnPage}
				currentPage={currentPage}
				totalPages={totalPages}
				totalRecords={totalRecords}
				isLoading={pending || !currentPage}
				initSort={initSort}
				initSortOrder={initSortOrder}
				activeFilter={activeFilter}
			/>
		</CardMiddleTableWrapper>
	);
};
