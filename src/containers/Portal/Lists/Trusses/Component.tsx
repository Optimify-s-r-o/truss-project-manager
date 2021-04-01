import CheckboxComponent from './Checkbox';
import ExternalTable from '../../../../components/Optimify/Table/ExternalTable';
import React, { useEffect } from 'react';
import { Checkbox } from '../Jobs/Component';
import { FilterContentType, FilterProxy } from '../../SidebarFilter/_types';
import { fixed } from '../../../../utils/formating';
import { formatCurrency } from 'src/utils/currencyFormat';
import { getFilterActiveContent } from '../_services';
import { getPath, translationPath } from '../../../../utils/getPath';
import { insert } from '../../../../utils/helpers';
import { Main } from '../../SidebarFilter/Jobs/_styles';
import { PutHeaderSettings } from '../_types';
import { RouteComponentProps } from 'react-router';
import { Routes } from '../../../../constants/routes';
import { StyledDiv } from '../../Sidebar/_styles';
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
	lang,
	WithTranslation,
	withTranslation,
} from "../../../../translation/i18n";
import {
	Data,
	FilterSettings,
	Page,
	Tree,
	TreeType,
	Truss,
} from "../../../../types/_types";
const signalRMsgPack = require("@microsoft/signalr-protocol-msgpack");

interface OwnProps {}

export interface StateProps {
	firstRecordOnPage: number | null;
	lastRecordOnPage: number | null;
	currentPage: number | null;
	totalPages: number | null;
	totalRecords: number | null;
	trusses: Truss[];
	path: string;
	filter: FilterSettings;
	pending: boolean;
	projectTree: Data<Tree>;
	customerTree: Data<Tree>;
	jobTree: Data<Tree>;
	activeTree: TreeType;
	pageSize: string | null;
	trussTree: Data<Tree>;
	local: boolean;
	token: string;
	isFiltered: boolean;
	recordsBeforeFilter: number;
	activeFilterContent: any;
	initSort: number[];
	initSortOrder: number[];
	initHeaders: string[];
}

interface DispatchProps {
	getTrusses: (data: Page) => void;
	getUsers: (data: Page) => void;
	setSelectedKeys: (data: string[]) => void;
	setExpandedKeys: (data: string[]) => void;
	putHeaderSettings: (data: PutHeaderSettings) => void;
	getHeaderSettings: (data: string) => void;
}

const Index = (
	props: OwnProps &
		StateProps &
		DispatchProps &
		WithTranslation &
		RouteComponentProps
) => {
	const {
		pageSize,
		activeFilterContent,
		firstRecordOnPage,
		lastRecordOnPage,
		currentPage,
		totalPages,
		totalRecords,
		getTrusses,
		getUsers,
		setSelectedKeys,
		setExpandedKeys,
		local,
		token,
		recordsBeforeFilter,
		isFiltered,
		initHeaders,
		initSort,
		initSortOrder,
		getHeaderSettings,
		putHeaderSettings,
	} = props;
	const { t } = useTranslation();

	React.useEffect(() => {
		getTrusses({ Page: 0, PageSize: 25, Sort: "" });
		getUsers({ Paginate: false });
		getHeaderSettings(TreeType.TRUSS);
	}, []);

	const changeChecked = (newItem: Checkbox) => {
		const hasDuplicates = checked.find((item) => item.name === newItem.name);
		let newCheckboxes = [];
		if (hasDuplicates) {
			newCheckboxes = checked.filter((item) => item.name !== newItem.name);
		} else {
			newCheckboxes = insert(checked, newItem.position, newItem);
		}
		putHeaderSettings({
			Param: TreeType.TRUSS,
			Headers: newCheckboxes.map((e) => e.name),
		});
		setChecked(newCheckboxes);
	};

	const routeJob = (value: Truss, item: Checkbox) => (
		_event: React.MouseEvent<HTMLElement, MouseEvent>
	) => {
		setSelectedKeys([value.JobId]);
		setExpandedKeys([value.ParentProjectId]);
		props.history.push(Routes.TREE_LINK_JOB + value.JobId);
	};

	const routeProject = (value: Truss, item: Checkbox) => (
		_event: React.MouseEvent<HTMLElement, MouseEvent>
	) => {
		setSelectedKeys([value.ParentProjectId]);
		props.history.push(Routes.TREE_LINK_PROJECT + value.ParentProjectId);
	};

	const routeTruss = (value: Truss, item: Checkbox) => (
		_event: React.MouseEvent<HTMLElement, MouseEvent>
	) => {
		setExpandedKeys([value.ParentProjectId, value.JobId]);
		setSelectedKeys([value.Id]);
		props.history.push(Routes.TREE_LINK_TRUSS + value.Id);
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

	const checkboxes: Checkbox[] = [
		{
			name: "Name",
			title: t(translationPath(lang.common.truss).path),
			section: "General",
			filter: getPath(FilterProxy.Trusses.NameFilter.Name),
			filterType: FilterContentType.TEXT,
		},
		{
			name: "JobName",
			title: t(translationPath(lang.common.jobName).path),
			section: "General",
			filter: getPath(FilterProxy.Jobs.NameFilter.Name),
			filterType: FilterContentType.TEXT,
		},
		{
			name: "Status",
			title: t(translationPath(lang.common.status).path),
			section: "General",
			filter: getPath(FilterProxy.Trusses.StatusFilter.Statuses),
			filterType: FilterContentType.ARRAY,
		},
		{
			name: "Count",
			title: t(translationPath(lang.common.count).path),
			section: "General",
			filter: null,
		},
		{
			name: "Plies",
			title: t(translationPath(lang.common.ply).path),
			section: "Dimensions",
			filter: getPath(FilterProxy.Trusses.PliesFilter),
			filterType: FilterContentType.RANGE,
			round: true,
		},
		{
			name: "Thickness",
			title: t(translationPath(lang.common.thickness).path),
			section: "Dimensions",
			filter: getPath(FilterProxy.Trusses.ThicknessFilter),
			filterType: FilterContentType.RANGE,
		},
		{
			name: "Length",
			title: t(translationPath(lang.common.length).path),
			section: "Dimensions",
			filter: getPath(FilterProxy.Trusses.LengthFilter),
			filterType: FilterContentType.RANGE,
		},
		{
			name: "Type",
			title: t(translationPath(lang.common.type).path),
			section: "General",
			filter: getPath(FilterProxy.Trusses.TypeFilter.Types),
			filterType: FilterContentType.ARRAY,
		},
		{
			name: "Kind",
			title: t(translationPath(lang.common.kinds).path),
			section: "General",
			filter: getPath(FilterProxy.Trusses.KindsFilter.Kinds),
			filterType: FilterContentType.ARRAY,
		},
		{
			name: "Price",
			title: t(translationPath(lang.common.price).path),
			section: "Calculation",
			filter: null,
		},
		{
			name: "PriceSum",
			title: t(translationPath(lang.common.totalPrice).path),
			section: "Calculation",
			filter: getPath(FilterProxy.Trusses.PriceFilter),
			filterType: FilterContentType.RANGE,
		},
		{
			name: "ModelCount",
			title: t(translationPath(lang.common.modelCount).path),
			section: "General",
			filter: getPath(FilterProxy.Trusses.ModelCountFilter),
			filterType: FilterContentType.RANGE,
			round: true,
		},
		{
			name: "SupportsCount",
			title: t(translationPath(lang.common.numberOfSupports).path),
			section: "General",
			filter: getPath(FilterProxy.Trusses.SupportsQuantityFilter),
			filterType: FilterContentType.RANGE,
			round: true,
		},
		{
			name: "PlateWeight",
			title: t(translationPath(lang.common.platesWeight).path),
			section: "Calculation",
			filter: null,
		},
		{
			name: "Centres",
			title: t(translationPath(lang.common.centres).path),
			section: "Construction",
			filter: null,
		},
		{
			name: "TransportWeight",
			title: t(translationPath(lang.common.transportWeight).path),
			section: "Weight",
			filter: getPath(FilterProxy.Trusses.TransportWeightFilter),
			filterType: FilterContentType.RANGE,
		},
		{
			name: "PlatesOnPlanks",
			title: t(translationPath(lang.common.PlatesWeighOnPlanksVolume).path),
			section: "Weight",
			filter: null,
		},
		{
			name: "PlatesOnArea",
			title: t(translationPath(lang.common.PlateWeightOnArea).path),
			section: "Weight",

			filter: null,
		},
		{
			name: "PlanksOnArea",
			title: t(translationPath(lang.common.planksOnArea).path),
			section: "Calculation",
			filter: null,
		},
		{
			name: "PriceOnPlanks",
			title: t(translationPath(lang.common.priceOnPlanks).path),
			section: "Calculation",
			filter: null,
		},
		{
			name: "PriceOnArea",
			title: t(translationPath(lang.common.PriceOnArea).path),
			section: "Calculation",
			filter: null,
		},
		{
			name: "Width",
			title: t(translationPath(lang.common.width).path),
			section: "Dimensions",
			filter: null,
		},
		{
			name: "Height",
			title: t(translationPath(lang.common.height).path),
			section: "Dimensions",
			filter: null,
		},
		{
			name: "Pitch",
			title: t(translationPath(lang.common.pitch).path),
			section: "Construction",
			filter: null,
		},
		{
			name: "MembersCount",
			title: t(translationPath(lang.common.membersCount).path),
			section: "General",
			filter: getPath(FilterProxy.Trusses.MembersCountFilter),
			filterType: FilterContentType.RANGE,
			round: true,
		},
		{
			name: "PlatesCount",
			title: t(translationPath(lang.common.platesCount).path),
			section: "General",
			filter: getPath(FilterProxy.Trusses.PlatesCountFilter),
			filterType: FilterContentType.RANGE,
			round: true,
		},
		{
			name: "RoofingLoad",
			title: t(translationPath(lang.common.roofingLoad).path),
			section: "Load",
			filter: getPath(FilterProxy.Trusses.RoofingLoadFilter),
			filterType: FilterContentType.RANGE,
		},
		{
			name: "CeilingLoad",
			title: t(translationPath(lang.common.ceilingLoad).path),
			section: "Load",
			filter: getPath(FilterProxy.Trusses.CeilingLoadFilter),
			filterType: FilterContentType.RANGE,
		},
		{
			name: "SnowRegion",
			title: t(translationPath(lang.common.snowRegion).path),
			section: "Load",
			filter: null,
		},
		{
			name: "SnowLoad",
			title: t(translationPath(lang.common.snowLoad).path),
			section: "Load",
			filter: getPath(FilterProxy.Trusses.SnowLoadFilter),
			filterType: FilterContentType.RANGE,
		},
		{
			name: "WindRegion",
			title: t(translationPath(lang.common.windRegion).path),
			section: "Load",
			filter: null,
		},
		{
			name: "WindLoad",
			title: t(translationPath(lang.common.windLoad).path),
			section: "Load",
			filter: getPath(FilterProxy.Trusses.WindLoadFilter),
			filterType: FilterContentType.RANGE,
		},
		{
			name: "RoofingName",
			title: t(translationPath(lang.common.roofingName).path),
			section: "Load",
			filter: null,
		},
		{
			name: "CeilingName",
			title: t(translationPath(lang.common.ceilingName).path),
			section: "Load",
			filter: null,
		},
	];

	const [checked, setChecked] = React.useState<Checkbox[]>([]);

	useEffect(() => {
		setChecked(
			checkboxes
				.map((c, i) => {
					return { ...c, position: i };
				})
				.filter((item) => initHeaders?.includes(item.name))
		);
	}, [initHeaders]);
	const tree = props.projectTree
		? props.projectTree
		: props.jobTree
		? props.jobTree
		: props.trussTree
		? props.trussTree
		: props.customerTree
		? props.customerTree
		: null;

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
							<Header1>
								{t(translationPath(lang.common.trussList).path)}
							</Header1>
							<ContentInline>
								<CheckboxComponent
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
								headers={checked.map(
									(value: Checkbox, index: number) => value.title
								)}
								data={
									props.trusses
										? props.trusses?.map((value: Truss, index: number) => [
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
										parent: Truss
									) => {
										return value;
									}
								)}
								sortable={checked?.map(
									(value: Checkbox, index: number) => true
								)}
								columnNames={checked?.map((value: Checkbox) => value.name)}
								filterContent={getFilterActiveContent(
									checked,
									checkboxes,
									activeFilterContent
								)}
								onPageRequired={(requiredPage: Page) => {
									props.getTrusses(requiredPage);
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

export default withTranslation()(React.memo(Index));
