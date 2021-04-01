import ExternalTable from '../../../../../components/Optimify/Table/ExternalTable';
import Moment from 'react-moment';
import React from 'react';
import { CardMiddleTableWrapper } from '../../../../../constants/globalStyles';
import { Checkbox } from '../../Jobs/Component';
import { formatCurrency } from 'src/utils/currencyFormat';
import { getFilterActiveContent } from '../../_services';
import { JobType, Page, Project } from '../../../../../types/_types';
import { lang } from '../../../../../translation/i18n';
import { Routes } from '../../../../../constants/routes';
import { StyledDiv } from '../../../Sidebar/_styles';
import { translationPath } from '../../../../../utils/getPath';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Table {
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
}

export const ProjectTable = ({
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
		switch (item.name) {
			case "Name":
				return <StyledDiv onClick={route(value, item)}>{value.Name}</StyledDiv>;
			case "QuotationDate":
			case "TimeOfCreation":
			case "DateOfLastUpdate":
			case "ConstructionDate":
			case "LastChange":
				return value[item.name] ? (
					<Moment format="DD/MM/YYYY">{value[item.name]}</Moment>
				) : (
					"x"
				);
			case "State":
				return t(translationPath(lang.common[value[item.name]]).path);
			case "QuotationPrice":
			case "ProductionPrice":
				return !!value[item.name]
					? formatCurrency(value[item.name] as number)
					: "x";
			case "Location":
				return (
					<span>
						{value.Location?.CityName}, {value.Location?.StreetName}{" "}
						{value.Location?.PlaceNumber}
						{value.Location?.Zip}, {value?.Location?.Country}
					</span>
				);
			default:
				if (!value[item.name]) {
					return "x";
				}
				return value[item.name];
		}
	};

	return (
		<CardMiddleTableWrapper>
			<ExternalTable
				headers={checked?.map((value: Checkbox, index: number) => value.title)}
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
					value.name === "Open" ? false : true
				)}
				columnNames={checked?.map((value: Checkbox) => value.name)}
				filterContent={getFilterActiveContent(
					checked,
					columns,
					activeFilterContent
				)}
				onPageRequired={(requiredPage: Page) => {
					getProjects(requiredPage);
				}}
				pageSize={parseInt(pageSize)}
				firstRecordOnPage={firstRecordOnPage}
				lastRecordOnPage={lastRecordOnPage}
				currentPage={currentPage}
				totalPages={totalPages}
				totalRecords={totalRecords}
				isLoading={pending}
				initSort={initSort}
				initSortOrder={initSortOrder}
			/>
		</CardMiddleTableWrapper>
	);
};
