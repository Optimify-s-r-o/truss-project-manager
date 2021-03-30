import * as React from 'react';
import Checkbox from './Checkbox';
import ExternalTable from '../../../../components/Optimify/Table/ExternalTable';
import { fixed } from '../../../../utils/formating';
import { formatCurrency } from 'src/utils/currencyFormat';
import { insert } from '../../../../utils/helpers';
import { Main } from '../../SidebarFilter/Jobs/_styles';
import { RouteComponentProps } from 'react-router';
import { Routes } from '../../../../constants/routes';
import { StyledDiv } from '../../Sidebar/_styles';
import { translationPath } from '../../../../utils/getPath';
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
}

interface DispatchProps {
	getTrusses: (data: Page) => void;
	getUsers: (data: Page) => void;
	setSelectedKeys: (data: string[]) => void;
	setExpandedKeys: (data: string[]) => void;
}

export interface Checkbox {
	name: string;
	title: string;
	position?: number;
	section: string;
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
		activeTree,
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
	} = props;
	const { t } = useTranslation();

	React.useEffect(() => {
		getTrusses({ Page: 0, PageSize: 25, Sort: "" });
		getUsers({ Paginate: false });
	}, []);

	const defaultChecked = [
		"Name",
		"JobName",
		"Project",
		"Status",
		"Count",
		"Plies",
		"Thickness",
		"Length",
		"Type",
		"Kind",
		"Planks",
		"Price",
		"PriceSum",
	];

	const changeChecked = (newItem: Checkbox) => {
		const hasDuplicates = checked.find((item) => item.name === newItem.name);
		if (hasDuplicates) {
			setChecked(checked.filter((item) => item.name !== newItem.name));
		} else {
			const newArr = insert(checked, newItem.position, newItem);
			setChecked(newArr);
		}
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
		},
		{
			name: "JobName",
			title: t(translationPath(lang.common.jobName).path),
			section: "General",
		},
		{
			name: "Status",
			title: t(translationPath(lang.common.status).path),
			section: "General",
		},
		{
			name: "Count",
			title: t(translationPath(lang.common.count).path),
			section: "General",
		},
		{
			name: "Plies",
			title: t(translationPath(lang.common.ply).path),
			section: "Dimensions",
		},
		{
			name: "Thickness",
			title: t(translationPath(lang.common.thickness).path),
			section: "Dimensions",
		},
		{
			name: "Length",
			title: t(translationPath(lang.common.length).path),
			section: "Dimensions",
		},
		{
			name: "Type",
			title: t(translationPath(lang.common.type).path),
			section: "General",
		},
		{
			name: "Kind",
			title: t(translationPath(lang.common.kinds).path),
			section: "General",
		},
		{
			name: "Price",
			title: t(translationPath(lang.common.price).path),
			section: "Calculation",
		},
		{
			name: "PriceSum",
			title: t(translationPath(lang.common.totalPrice).path),
			section: "Calculation",
		},
		{
			name: "ModelCount",
			title: t(translationPath(lang.common.modelCount).path),
			section: "General",
		},
		{
			name: "SupportsCount",
			title: t(translationPath(lang.common.numberOfSupports).path),
			section: "General",
		},
		{
			name: "PlateWeight",
			title: t(translationPath(lang.common.platesWeight).path),
			section: "Calculation",
		},
		{
			name: "Centres",
			title: t(translationPath(lang.common.centres).path),
			section: "Construction",
		},
		{
			name: "TransportWeight",
			title: t(translationPath(lang.common.transportWeight).path),
			section: "Weight",
		},
		{
			name: "PlatesOnPlanks",
			title: t(translationPath(lang.common.PlatesWeighOnPlanksVolume).path),
			section: "Weight",
		},
		{
			name: "PlatesOnArea",
			title: t(translationPath(lang.common.PlateWeightOnArea).path),
			section: "Weight",
		},
		{
			name: "PlanksOnArea",
			title: t(translationPath(lang.common.planksOnArea).path),
			section: "Calculation",
		},
		{
			name: "PriceOnPlanks",
			title: t(translationPath(lang.common.priceOnPlanks).path),
			section: "Calculation",
		},
		{
			name: "PriceOnArea",
			title: t(translationPath(lang.common.PriceOnArea).path),
			section: "Calculation",
		},
		{
			name: "Width",
			title: t(translationPath(lang.common.width).path),
			section: "Dimensions",
		},
		{
			name: "Height",
			title: t(translationPath(lang.common.height).path),
			section: "Dimensions",
		},
		{
			name: "Pitch",
			title: t(translationPath(lang.common.pitch).path),
			section: "Construction",
		},
		{
			name: "MembersCount",
			title: t(translationPath(lang.common.membersCount).path),
			section: "General",
		},
		{
			name: "PlatesCount",
			title: t(translationPath(lang.common.platesCount).path),
			section: "General",
		},
		{
			name: "RoofingLoad",
			title: t(translationPath(lang.common.roofingLoad).path),
			section: "Load",
		},
		{
			name: "CeilingLoad",
			title: t(translationPath(lang.common.ceilingLoad).path),
			section: "Load",
		},
		{
			name: "SnowRegion",
			title: t(translationPath(lang.common.snowRegion).path),
			section: "Load",
		},
		{
			name: "SnowLoad",
			title: t(translationPath(lang.common.snowLoad).path),
			section: "Load",
		},
		{
			name: "WindRegion",
			title: t(translationPath(lang.common.windRegion).path),
			section: "Load",
		},
		{
			name: "WindLoad",
			title: t(translationPath(lang.common.windLoad).path),
			section: "Load",
		},
		{
			name: "RoofingName",
			title: t(translationPath(lang.common.roofingName).path),
			section: "Load",
		},
		{
			name: "CeilingName",
			title: t(translationPath(lang.common.ceilingName).path),
			section: "Load",
		},
	];

	const [checked, setChecked] = React.useState<Checkbox[]>(
		checkboxes
			.map((c, i) => {
				return { ...c, position: i };
			})
			.filter((item) => defaultChecked.includes(item.name))
	);
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
							/>
						</CardMiddleTableWrapper>
					</ContentCard>
				</ContentFilter>
			</Main>
		</ContentInline>
	);
};

export default withTranslation()(React.memo(Index));
