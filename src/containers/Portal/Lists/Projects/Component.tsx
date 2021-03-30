import CheckboxComponent from './Checkbox';
import ExternalTable from '../../../../components/Optimify/Table/ExternalTable';
import Moment from 'react-moment';
import React from 'react';
import { Checkbox } from '../Jobs/Component';
import { FilterContentType, FilterProxy } from '../../SidebarFilter/_types';
import { FilterProjectRequest } from '../../SidebarFilter/Projects/_types';
import { formatCurrency } from 'src/utils/currencyFormat';
import { getFilterActiveContent } from '../_services';
import { getPath, translationPath } from '../../../../utils/getPath';
import { insert } from '../../../../utils/helpers';
import { lang } from '../../../../translation/i18n';
import { Main } from '../../SidebarFilter/Jobs/_styles';
import { OpenTruss } from '../../../../sagas/Truss/_actions';
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
	Project,
	Settings,
	Tree,
	TreeType,
} from "../../../../types/_types";
const signalRMsgPack = require("@microsoft/signalr-protocol-msgpack");

interface OwnProps {}

export interface StateProps {
	firstRecordOnPage: number | null;
	lastRecordOnPage: number | null;
	currentPage: number | null;
	totalPages: number | null;
	totalRecords: number | null;
	jobs: JobType[];
	path: string;
	project: Project[];
	filter: FilterSettings;
	pending: boolean;
	projectTree: Data<Tree>;
	customerTree: Data<Tree>;
	jobTree: Data<Tree>;
	activeTree: TreeType;
	users: UserData[];
	pageSize: string | null;
	trussTree: Data<Tree>;
	token: string;
	local: boolean;
	recordsBeforeFilter: string | null;
	isFiltered: boolean;
	settings: Settings;
	activeFilterContent: any;
}

interface DispatchProps {
	getProjects: (data: Page) => void;
	projectFilterRequest: (data: FilterProjectRequest) => void;
	openTruss: (data: OpenTruss) => void;
	getUsers: (data: Page) => void;
	setSelectedKeys: (data: string[]) => void;
	push: any;
}

const Index = (
	props: OwnProps & StateProps & DispatchProps & RouteComponentProps
) => {
	const {
		activeFilterContent,
		getUsers,
		pageSize,
		firstRecordOnPage,
		lastRecordOnPage,
		currentPage,
		totalPages,
		totalRecords,
		setSelectedKeys,
		recordsBeforeFilter,
		isFiltered,
		settings,
	} = props;
	const { t } = useTranslation();

	const defaultChecked = [
		"Name",
		"DateOfLastUpdate",
		"TimeOfCreation",
		"QuotationDate",
		"ConstructionDate",
		"QuotationPrice",
		"ProductionPrice",
		"State",
	];

	React.useEffect(() => {
		props.getProjects({
			PageSize: 25,
			Page: 0,
			Sort: null,
		});
		getUsers({
			Paginate: false,
		});
	}, []);

	const changeChecked = (newItem: Checkbox) => {
		const hasDuplicates = checked.find((item) => item.name === newItem.name);
		if (hasDuplicates) {
			setChecked(checked.filter((item) => item.name !== newItem.name));
		} else {
			const newArr = insert(checked, newItem.position, newItem);
			setChecked(newArr);
		}
	};

	const route = (value: Project, item: Checkbox) => (
		_event: React.MouseEvent<HTMLElement, MouseEvent>
	) => {
		setSelectedKeys([value.Id]);
		props.history.push(Routes.TREE_LINK_PROJECT + value.Id);
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

	const [checked, setChecked] = React.useState<Checkbox[]>(
		checkboxes
			.map((c, i) => {
				return { ...c, position: i };
			})
			.filter((item) => defaultChecked.includes(item.name))
	);

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
						{value.Location?.Zip},{" "}
						{settings?.Countries?.find(
							(c) => c.Id === value.Location?.CountryId
						)}
					</span>
				);
			default:
				if (!value[item.name]) {
					return "x";
				}
				return value[item.name];
		}
	};

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
								{t(translationPath(lang.common.projectList).path)}
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
									props.project
										? props.project.map((value: Project, index: number) => [
												...checked.map((item: Checkbox, index: number) =>
													getValue(value, item)
												),
												value,
										  ])
										: []
								}
								renderers={checked.map(
									(item: Checkbox, index: number) => (
										value: any,
										key: number,
										parent: Project
									) => {
										return value;
									}
								)}
								sortable={checked.map((value: Checkbox, index: number) => true)}
								columnNames={checked.map((value: Checkbox) => value.name)}
								filterContent={getFilterActiveContent(
									checked,
									checkboxes,
									activeFilterContent
								)}
								onPageRequired={(requiredPage: Page) => {
									props.getProjects(requiredPage);
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

export default React.memo(Index);
