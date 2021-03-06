import React from "react";
import { useTranslation } from "react-i18next";
import Moment from "react-moment";
import { useHistory } from "react-router-dom";
import { formatCurrency } from "src/utils/currencyFormat";
import ExternalTable from "../../../../../components/Table/ExternalTable";
import { CardMiddleTableWrapper } from "../../../../../constants/globalStyles";
import { Routes } from "../../../../../constants/routes";
import { lang } from "../../../../../translation/i18n";
import { JobType, Page, Project, TreeType } from "../../../../../types/_types";
import { getAddress } from "../../../../../utils/formating";
import { translationPath } from "../../../../../utils/getPath";
import { StyledDiv } from "../../../Sidebar/_styles";
import { Checkbox } from "../../Jobs/Component";
import { getFilterActiveContent } from "../../_services";

interface Table {
	activeFilter: boolean;
	setSelectedKeys: (data: string[]) => void;
	checked: Checkbox[];
	projects: Project[];
	activeFilterContent: any;
	initSort: number[];
	initSortOrder: number[];
	columns: Checkbox[];
	getProjects: (data: Page) => void;
	firstRecordOnPage: number | null;
	lastRecordOnPage: number | null;
	currentPage: number | null;
	totalPages: number | null;
	totalRecords: number | null;
	pending: boolean;
	pageSize: string | null;
	resetHeaderSettings: (data: string) => void;
	settingsPageSize: number | null;
}

export const ProjectTable = ({
	activeFilter,
	setSelectedKeys,
	checked,
	getProjects,
	activeFilterContent,
	initSort,
	initSortOrder,
	columns,
	projects,
	firstRecordOnPage,
	lastRecordOnPage,
	currentPage,
	totalPages,
	totalRecords,
	pending,
	pageSize,
	resetHeaderSettings,
	settingsPageSize,
}: Table) => {
	const { t } = useTranslation();
	const history = useHistory();

	const route = (value: Project, item: Checkbox) => (
		_event: React.MouseEvent<HTMLElement, MouseEvent>
	) => {
		setSelectedKeys([value.Id]);
		history.push(Routes.TREE_LINK_PROJECT + value.Id);
	};

	const getValue = (value: Project, item: Checkbox) => {
		switch (item?.name) {
			case "Name":
				return <StyledDiv onClick={route(value, item)}>{value.Name}</StyledDiv>;
			case "QuotationDate":
			case "TimeOfCreation":
			case "DateOfLastUpdate":
			case "ConstructionDate":
			case "LastChange":
				return value[item.name] ? (
					<Moment format="DD/MM/YYYY">{value[item?.name]}</Moment>
				) : (
					"-"
				);
			case "State":
				const filtered = (value[item?.name] as any).filter((value) => {
					if (value != "") {
						return value;
					}
				});
				const mapped = filtered
					.map((value) => {
						return t(translationPath(lang.common[value]).path);
					})
					.join(", ");
				return mapped;
			case "QuotationPrice":
			case "ProductionPrice":
				return !!value[item?.name]
					? formatCurrency(value[item?.name] as number)
					: "-";
			case "Location":
				return (
					<span>
						{getAddress(value?.Location) ? getAddress(value?.Location) : "-"}
					</span>
				);
			default:
				if (value[item?.name] === null || value[item?.name] === undefined) {
					return "-";
				}
				return value[item?.name];
		}
	};

	return (
		<CardMiddleTableWrapper>
			<ExternalTable
				headers={checked?.map((value: Checkbox, index: number) => value?.title)}
				names={checked?.map((value: Checkbox, index: number) => value?.name)}
				data={
					projects
						? projects.map((value: Project, index: number) => [
								...checked.map((item: Checkbox, index: number) =>
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
					value?.name === "Open" ? false : true
				)}
				columnNames={checked?.map((value: Checkbox) => value?.name)}
				filterContent={getFilterActiveContent(
					checked,
					columns,
					activeFilterContent
				)}
				onPageRequired={(requiredPage: Page) => {
					getProjects(requiredPage);
				}}
				pageSize={settingsPageSize}
				firstRecordOnPage={firstRecordOnPage}
				lastRecordOnPage={lastRecordOnPage}
				currentPage={currentPage}
				totalPages={totalPages}
				totalRecords={totalRecords}
				isLoading={pending || !currentPage}
				initSort={initSort}
				initSortOrder={initSortOrder}
				activeFilter={activeFilter}
				resetHeaderSettings={resetHeaderSettings}
				type={TreeType.PROJECT}
			/>
		</CardMiddleTableWrapper>
	);
};
