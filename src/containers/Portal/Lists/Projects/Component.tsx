import Checkbox from './Checkbox';
import ExternalTable from '../../../../components/Optimify/Table/ExternalTable';
import Moment from 'react-moment';
import React from 'react';
import { FilterProjectRequest } from '../../SidebarFilter/Projects/_types';
import { formatCurrency } from 'src/utils/currencyFormat';
import { insert } from '../../../../utils/helpers';
import { lang } from '../../../../translation/i18n';
import { Main } from '../../SidebarFilter/Jobs/_styles';
import { OpenTruss } from '../../../../sagas/Truss/_actions';
import { RouteComponentProps } from 'react-router';
import { Routes } from '../../../../constants/routes';
import { StyledDiv } from '../../Sidebar/_styles';
import { translationPath } from '../../../../utils/getPath';
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
}

interface DispatchProps {
	getProjects: (data: Page) => void;
	projectFilterRequest: (data: FilterProjectRequest) => void;
	openTruss: (data: OpenTruss) => void;
	getUsers: (data: Page) => void;
	setSelectedKeys: (data: string[]) => void;
	push: any;
}

export interface Checkbox {
	name: string;
	title: string;
	position?: number;
	section: string;
}
const Index = (
	props: OwnProps & StateProps & DispatchProps & RouteComponentProps
) => {
	const {
		activeTree,
		users,
		getUsers,
		pageSize,
		firstRecordOnPage,
		lastRecordOnPage,
		currentPage,
		totalPages,
		totalRecords,
		setSelectedKeys,
		token,
		local,
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
			PageSize: 25,
			Page: 0,
			Sort: null,
			All: true,
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
		},
		{
			name: "Description",
			title: t(translationPath(lang.common.description).path),
			section: "General",
		},
		{
			name: "Customer",
			title: t(translationPath(lang.common.customer).path),
			section: "General",
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
		},
		{
			name: "ProductionPrice",
			title: t(translationPath(lang.common.production).path),
			section: "Calculation",
		},
		{
			name: "State",
			title: t(translationPath(lang.common.projectState).path),
			section: "General",
		},
		{
			name: "TimeOfCreation",
			title: t(translationPath(lang.common.dateOfCreation).path),
			section: "General",
		},
		{
			name: "ConstructionDate",
			title: t(translationPath(lang.common.constructionDate).path),
			section: "General",
		},
		{
			name: "QuotationDate",
			title: t(translationPath(lang.common.quotationDate).path),
			section: "General",
		},

		{
			name: "DateOfLastUpdate",
			title: t(translationPath(lang.common.dateOfLastUpdate).path),
			section: "General",
		},
		{
			name: "AssignedUser",
			title: t(translationPath(lang.common.user).path),
			section: "General",
		},
		{
			name: "Location",
			title: t(translationPath(lang.common.address).path),
			section: "General",
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
				return !!value[item.name] ? formatCurrency(value[item.name]) : "x";
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
