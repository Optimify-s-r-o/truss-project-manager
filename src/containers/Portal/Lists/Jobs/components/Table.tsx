import EditJob from '../../../TreeView/Project/General/components/EditJob';
import ExternalTable from '../../../../../components/Table/ExternalTable';
import Moment from 'react-moment';
import React from 'react';
import { CardMiddleTableWrapper } from '../../../../../constants/globalStyles';
import { Checkbox } from '../Component';
import { EditTruss } from '../../../../../sagas/Truss/_actions';
import { formatCurrency } from 'src/utils/currencyFormat';
import { getFilterActiveContent } from '../../_services';
import {
	JobType,
	Page,
	TreeType,
	TrussExe
	} from '../../../../../types/_types';
import { lang } from '../../../../../translation/i18n';
import { Phase } from '../../../../../components/Phase';
import { Routes } from '../../../../../constants/routes';
import { StyledDiv } from '../../../Sidebar/_styles';
import { translationPath } from '../../../../../utils/getPath';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Table {
	activeFilter?: boolean;
	setSelectedKeys: (data: string[]) => void;
	setExpandedKeys: (data: string[]) => void;
	editTruss: (data: EditTruss) => void;
	checked: Checkbox[];
	jobs: JobType[];
	activeFilterContent: any;
	initSort: number[];
	initSortOrder: number[];
	columns: Checkbox[];
	getJobs: (data: Page) => void;
	firstRecordOnPage: number | null;
	lastRecordOnPage: number | null;
	currentPage: number | null;
	totalPages: number | null;
	totalRecords: number | null;
	pending: boolean;
	pageSize: string | null;
	resetHeaderSettings: (data: string) => void;
}

export const JobTable = ({
	activeFilter,
	setSelectedKeys,
	setExpandedKeys,
	editTruss,
	checked,
	jobs,
	activeFilterContent,
	initSort,
	initSortOrder,
	columns,
	getJobs,
	firstRecordOnPage,
	lastRecordOnPage,
	currentPage,
	totalPages,
	totalRecords,
	pending,
	pageSize,
	resetHeaderSettings,
}: Table) => {
	const { t } = useTranslation();
	const history = useHistory();

	const route = (value: JobType, item: Checkbox) => (
		_event: React.MouseEvent<HTMLElement, MouseEvent>
	) => {
		setSelectedKeys([value.Id]);
		setExpandedKeys([value.ParentProjectId]);
		history.push(Routes.TREE_LINK_JOB + value.Id);
	};

	const routeProject = (value: JobType, item: Checkbox) => (
		_event: React.MouseEvent<HTMLElement, MouseEvent>
	) => {
		setSelectedKeys([value.ParentProjectId]);
		history.push(Routes.TREE_LINK_PROJECT + value.ParentProjectId);
	};
	const getValue = (value: JobType, item: Checkbox) => {
		switch (item?.name) {
			case "JobName":
				return (
					<StyledDiv onClick={route(value, item)}>{value.JobName}</StyledDiv>
				);
			case "Project":
				return (
					<StyledDiv onClick={routeProject(value, item)}>
						{value.Project}
					</StyledDiv>
				);
			case "CustomerName":
				return value.CustomerName;
			case "State":
			case "Type":
				return t(translationPath(lang.common[value[item?.name]]).path);
			case "Status":
				return <Phase phase={value.Phase} />;
			case "LastChange":
			case "DateOfCreation":
				return <Moment format="DD/MM/YYYY">{value[item?.name]}</Moment>;
			case "Price":
			case "PricePerSquareMeter":
				return !!value[item?.name] ? formatCurrency(value[item?.name]) : "x";

			case "Open":
				return (
					<EditJob
						openTruss={editTruss}
						id={value.Id}
						project={value.Project}
						trussExe={
							value.TrussType === TrussExe.TRUSS_2D
								? TrussExe.TRUSS_2D
								: TrussExe.TRUSS_3D
						}
						projectName={value.Project}
						jobName={value.JobName}
					/>
				);
			case "CoveredArea":
			case "HipLength":
			case "Ridge":
				return value.RoofInfo[item?.name];
			case "SnowRegion":
			case "WindRegion":
			case "SnowLoad":
			case "WindLoad":
				return value.Load[item?.name];
			default:
				if (!value[item?.name]) {
					return "x";
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
					jobs
						? jobs.map((value: JobType, index: number) => [
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
					value?.name === "Open" ? false : true
				)}
				columnNames={checked?.map((value: Checkbox) => value?.name)}
				filterContent={getFilterActiveContent(
					checked,
					columns,
					activeFilterContent
				)}
				onPageRequired={(requiredPage: Page) => {
					getJobs(requiredPage);
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
				resetHeaderSettings={resetHeaderSettings}
				type={TreeType.JOB}
			/>
		</CardMiddleTableWrapper>
	);
};
