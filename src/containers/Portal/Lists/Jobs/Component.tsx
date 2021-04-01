import Checkbox from './Checkbox';
import EditJob from '../../TreeView/Project/General/components/EditJob';
import ExternalTable from '../../../../components/Optimify/Table/ExternalTable';
import Moment from 'react-moment';
import React, { useEffect } from 'react';
import sort from 'fast-sort';
import { FilterContentType, FilterProxy } from '../../SidebarFilter/_types';
import { FilterRequest } from '../components/_types';
import { formatCurrency } from 'src/utils/currencyFormat';
import { getFilterActiveContent } from '../_services';
import { getPath, translationPath } from '../../../../utils/getPath';
import { Job } from '../../TreeView/_types';
import { lang, WithTranslation } from '../../../../translation/i18n';
import { Main } from '../../SidebarFilter/Jobs/_styles';
import { OpenTruss } from '../../../../sagas/Truss/_actions';
import { Phase } from '../../../../components/Phase';
import { PutHeaderSettings } from '../_types';
import { RouteComponentProps } from 'react-router';
import { Routes } from '../../../../constants/routes';
import { StyledDiv } from '../../Sidebar/_styles';
import { UserData } from '../../Accounts/_types';
import { useTranslation } from 'react-i18next';
import {
	CardMiddleTableWrapper,
	ContentCard,
	ContentFilter,
	ContentInline,
	ContentSpaceBetweenWithPadding,
	Header1,
	SAlert,
} from "../../../../constants/globalStyles";
import {
	Data,
	FilterSettings,
	JobType,
	Page,
	Tree,
	TreeType,
	TrussExe,
} from "../../../../types/_types";

export interface StateProps {
	firstRecordOnPage: number | null;
	lastRecordOnPage: number | null;
	currentPage: number | null;
	totalPages: number | null;
	totalRecords: number | null;
	jobs: JobType[];
	path: string;
	filter: FilterSettings;
	pending: boolean;
	projectTree: Data<Tree>;
	customerTree: Data<Tree>;
	jobTree: Data<Job>;
	trussTree: Data<Tree>;
	activeTree: TreeType;
	users: UserData[];
	pageSize: string | null;
	local: boolean;
	token: string;
	recordsBeforeFilter: string;
	isFiltered: boolean;
	activeFilterContent: any;
	initSort: number[];
	initSortOrder: number[];
	initHeaders: string[];
}

interface DispatchProps {
	getJobs: (data: Page) => void;
	jobFilterRequest: (data: FilterRequest) => void;
	editTruss: (data: OpenTruss) => void;
	getUsers: (data: Page) => void;
	setSelectedKeys: (data: string[]) => void;
	setExpandedKeys: (data: string[]) => void;
	putHeaderSettings: (data: PutHeaderSettings) => void;
	getHeaderSettings: (data: string) => void;
}

export interface Checkbox {
	name: string;
	title: string;
	position?: number;
	section: string;
	filter?: any | null;
	filterType?: FilterContentType;
	round?: boolean;
}

const Index = (
	props: StateProps & DispatchProps & WithTranslation & RouteComponentProps
) => {
	const {
		pageSize,
		getUsers,
		firstRecordOnPage,
		lastRecordOnPage,
		currentPage,
		totalPages,
		totalRecords,
		setSelectedKeys,
		setExpandedKeys,
		activeFilterContent,
		isFiltered,
		recordsBeforeFilter,
		initHeaders,
		initSort,
		initSortOrder,
		getHeaderSettings,
		putHeaderSettings,
	} = props;
	const { t } = useTranslation();
	const [checked, setChecked] = React.useState<Checkbox[]>([]);
	React.useEffect(() => {
		props.getJobs({ Page: 0, PageSize: 25, Sort: "" });
		getUsers({ Paginate: false });
		getHeaderSettings(TreeType.JOB);
	}, []);

	useEffect(() => {
		setChecked(
			checkboxes
				.map((c, i) => {
					return { ...c, position: i };
				})
				.filter((item) => initHeaders?.includes(item.name))
		);
	}, [initHeaders]);

	console.log(checked);
	const changeChecked = (newItem: Checkbox) => {
		const hasDuplicates = checked?.find((item) => item.name === newItem.name);
		let newCheckboxes = [];
		if (hasDuplicates) {
			newCheckboxes = checked.filter((item) => item.name !== newItem.name);
		} else {
			newCheckboxes = sort([...checked, newItem]).asc(
				(u: Checkbox) => u.position
			);
		}
		putHeaderSettings({
			Param: TreeType.JOB,
			Headers: newCheckboxes.map((e) => e.name),
		});
		setChecked(newCheckboxes);
	};

	const route = (value: JobType, item: Checkbox) => (
		_event: React.MouseEvent<HTMLElement, MouseEvent>
	) => {
		setSelectedKeys([value.Id]);
		setExpandedKeys([value.ParentProjectId]);
		props.history.push(Routes.TREE_LINK_JOB + value.Id);
	};

	const routeProject = (value: JobType, item: Checkbox) => (
		_event: React.MouseEvent<HTMLElement, MouseEvent>
	) => {
		setSelectedKeys([value.ParentProjectId]);
		props.history.push(Routes.TREE_LINK_PROJECT + value.ParentProjectId);
	};

	const checkboxes: Checkbox[] = [
		{
			name: "JobName",
			title: t(translationPath(lang.common.jobName).path),
			section: "General",
			filter: getPath(FilterProxy.Jobs.NameFilter.Name),
			filterType: FilterContentType.TEXT,
		},
		{
			name: "Project",
			title: t(translationPath(lang.common.projectName).path),
			section: "General",
			filter: getPath(FilterProxy.Projects.NameFilter.Name),
			filterType: FilterContentType.TEXT,
		},
		{
			name: "Price",
			title: t(translationPath(lang.common.designPrice).path),
			section: "Calculation",
			filter: getPath(FilterProxy.Jobs.PriceFilter),
			filterType: FilterContentType.RANGE,
		},
		{
			name: "PricePerSquareMeter",
			title: t(translationPath(lang.common.pricePerSquareMeter).path),
			section: "Calculation",
			filter: getPath(FilterProxy.Jobs.PricePerSquareMeterFilter),
			filterType: FilterContentType.RANGE,
		},
		{
			name: "LastChange",
			title: t(translationPath(lang.common.jobDateOfLastUpdate).path),
			section: "General",
			filter: getPath(FilterProxy.Jobs.DateOfLastUpdateFilter),
			filterType: FilterContentType.DATE,
		},
		{
			name: "CustomerName",
			title: t(translationPath(lang.common.customer).path),
			section: "General",
			filter: null,
		},
		{
			name: "Type",
			title: t(translationPath(lang.common.jobType).path),
			section: "General",
			filter: getPath(FilterProxy.Jobs.JobTypeFilter.JobTypes),
			filterType: FilterContentType.ARRAY,
		},
		{
			name: "State",
			title: t(translationPath(lang.common.jobState).path),
			section: "General",
			filter: getPath(FilterProxy.Jobs.JobStateFilter.JobStates),
			filterType: FilterContentType.ARRAY,
		},
		{
			name: "Open",
			title: t(translationPath(lang.common.editJob).path),
			section: "General",
			filter: null,
		},
		{
			name: "CoveredArea",
			title: t(translationPath(lang.common.roofArea).path),
			section: "TechnicalParameters",
			filter: getPath(FilterProxy.Jobs.CoveredAreaFilter),
			filterType: FilterContentType.RANGE,
		},
		{
			name: "HipLength",
			title: t(translationPath(lang.common.hipLength).path),
			section: "TechnicalParameters",
			filter: getPath(FilterProxy.Jobs.HipLengthFilter),
			filterType: FilterContentType.RANGE,
		},
		{
			name: "SnowRegion",
			title: t(translationPath(lang.common.snowArea).path),
			section: "Load",
			filter: null,
		},
		{
			name: "WindRegion",
			title: t(translationPath(lang.common.windArea).path),
			section: "Load",
			filter: null,
		},
	];

	const getValue = (value: JobType, item: Checkbox) => {
		switch (item.name) {
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
				return t(translationPath(lang.common[value[item.name]]).path);
			case "Status":
				return <Phase phase={value.Phase} />;
			case "LastChange":
				return <Moment format="DD/MM/YYYY">{value[item.name]}</Moment>;
			case "Price":
			case "PricePerSquareMeter":
				return !!value[item.name] ? formatCurrency(value[item.name]) : "x";

			case "Open":
				return (
					<EditJob
						openTruss={props.editTruss}
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
				return value.RoofInfo[item.name];
			case "SnowRegion":
			case "WindRegion":
				return value.Load[item.name];
			default:
				if (!value[item.name]) {
					return "x";
				}
				return value[item.name];
		}
	};

	return (
		<ContentInline>
			<Main>
				<ContentFilter>
					{isFiltered && (
						<SAlert
							message={t(translationPath(lang.common.tooltip.filtered).path, {
								totalRecords: totalRecords,
								recordsBeforeFilter: recordsBeforeFilter,
							})}
							type="info"
							showIcon
							closable
						/>
					)}
					<ContentCard>
						<ContentSpaceBetweenWithPadding>
							<Header1>{t(translationPath(lang.common.jobList).path)}</Header1>
							<ContentInline>
								<Checkbox
									changeChecked={changeChecked}
									checked={checked}
									checkboxes={checkboxes.map((c, i) => {
										return { ...c, position: i };
									})}
								/>
							</ContentInline>
						</ContentSpaceBetweenWithPadding>

						<CardMiddleTableWrapper>
							<ExternalTable
								headers={checked?.map(
									(value: Checkbox, index: number) => value.title
								)}
								data={
									props.jobs
										? props.jobs.map((value: JobType, index: number) => [
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
									checkboxes,
									activeFilterContent
								)}
								onPageRequired={(requiredPage: Page) => {
									props.getJobs(requiredPage);
								}}
								pageSize={parseInt(pageSize)}
								firstRecordOnPage={firstRecordOnPage}
								lastRecordOnPage={lastRecordOnPage}
								currentPage={currentPage}
								totalPages={totalPages}
								totalRecords={totalRecords}
								isLoading={props.pending}
								initSort={initSort}
								initSortOrder={initSortOrder}
							/>
						</CardMiddleTableWrapper>
					</ContentCard>
				</ContentFilter>
			</Main>
		</ContentInline>
	);
};

export default React.memo(Index);
