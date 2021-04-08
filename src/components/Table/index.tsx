import React, { useEffect } from 'react';
import styled from 'styled-components';
import useResizeAware from 'react-resize-aware';
import { device } from '../../constants/theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { lang } from '../../translation/i18n';
import { RootStateType } from '../../reducers/index';
import { Tooltip } from 'antd';
import { translationPath } from '../../utils/getPath';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
	faSortAmountDown,
	faSortAmountUpAlt,
} from "@fortawesome/pro-solid-svg-icons";
import {
	setDisabledColumnSelector,
	setSort,
	setSortOrder,
} from "../../containers/Portal/Lists/_action";

export enum SortOptions {
	Default,
	Asc,
	Desc,
}

export enum SortType {
	Internal,
	External,
}

interface TableProps {
	activeFilter?: boolean;
	data?: Array<any>;
	renderers: Array<(value: any, key: number, parent: any) => any>;
	headers?: Array<string>;
	style?: string;
	sortable?: Array<boolean>;
	sortType?: SortType;
	onSort?: (sortOptions: SortOptions[], sortOrder: number[]) => void;
	initialSort?: SortOptions[];
	initialSortOrder?: number[];
	filterContent?: string[];
	names?: string[];
}

interface ScrollableProps {
	height?: number;
}

export const TABLE_STYLE_DEFAULT = "default";
export const TABLE_STYLE_CONDENSED = "condensed";

export const Table = (props: TableProps) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const state = useSelector(
		(state: RootStateType) => state.HeaderSettingsReducer
	);

	useEffect(() => {
		if (props.initialSort && props.initialSortOrder) {
			dispatch(
				setDisabledColumnSelector(
					props.names.filter((value: string, key: number) => {
						if (props.initialSort[key] == 1 || props.initialSort[key] == 2)
							return value;
					})
				)
			);
		}
	}, [props.initialSort, props.initialSortOrder]);

	const handleSort = (key: number, sortOption: SortOptions) => (
		e: React.MouseEvent<HTMLElement, MouseEvent>
	) => {
		const newSort = [...state.sort];
		newSort[key] = newSort[key] === sortOption ? 0 : sortOption;
		dispatch(setSort(newSort));
		if (props.names) {
			dispatch(
				setDisabledColumnSelector(
					props.names?.filter((value: string, key: number) => {
						if (newSort[key] == 1 || newSort[key] == 2) return value;
					})
				)
			);
		}

		let newSortOrder = [...state.sortOrder];

		if (!newSortOrder.includes(key) && newSort[key] !== SortOptions.Default)
			newSortOrder.push(key);
		else if (newSortOrder.includes(key) && newSort[key] === SortOptions.Default)
			newSortOrder = newSortOrder.filter((val) => val !== key);
		dispatch(setSortOrder(newSortOrder));
		if (props.sortType === SortType.External) {
			props.onSort && props.onSort(newSort, newSortOrder);
		}
	};

	return (
		<TableElement>
			<TableHead>
				<TableRow>
					{props.headers?.map((header: string, key: any) => (
						<TableHeading
							key={key}
							tableStyle={props.style ? props.style : TABLE_STYLE_DEFAULT}
						>
							<Header>
								<HeaderColumn>{header}</HeaderColumn>
								{props.sortable[key] &&
									state.sort &&
									key in state?.sort &&
									typeof state?.sort[key] != "undefined" && (
										<SortColumn>
											<Sort
												onClick={handleSort(key, 1)}
												active={state?.sort[key] === SortOptions.Asc}
											>
												<Tooltip
													title={t(translationPath(lang.common.asc).path)}
													placement={"bottom"}
												>
													<FontAwesomeIcon
														icon={faSortAmountUpAlt as IconProp}
													/>
												</Tooltip>
												{state?.sort[key] === SortOptions.Asc && (
													<SortOrder>
														{state.sortOrder.indexOf(key) + 1}
													</SortOrder>
												)}
											</Sort>

											<Sort
												onClick={handleSort(key, 2)}
												active={state.sort[key] === SortOptions.Desc}
											>
												<Tooltip
													title={t(translationPath(lang.common.desc).path)}
													placement={"bottom"}
												>
													<FontAwesomeIcon
														icon={faSortAmountDown as IconProp}
													/>
												</Tooltip>
												{state.sort[key] === SortOptions.Desc && (
													<SortOrder>
														{state.sortOrder.indexOf(key) + 1}
													</SortOrder>
												)}
											</Sort>
										</SortColumn>
									)}
							</Header>
						</TableHeading>
					))}
				</TableRow>
			</TableHead>

			<TableBody>
				{props.activeFilter &&
					props.filterContent &&
					props.filterContent.length > 0 && (
						<TableFilter>
							{props.filterContent?.map((value, key) => {
								return (
									<TableFilterHeading key={key}>{value}</TableFilterHeading>
								);
							})}
						</TableFilter>
					)}

				{props.data &&
					[...props.data]
						.sort((a, b) => {
							if (!props.sortable || props.sortType === SortType.External)
								return 0;

							for (let i = 0; i < state.sortOrder.length; i++) {
								let column = state.sortOrder[i];
								if (state.sort[column] === SortOptions.Desc) {
									if (a[column] < b[column]) return 1;
									else if (a[column] > b[column]) return -1;
								} else if (state.sort[column] === SortOptions.Asc) {
									if (a[column] > b[column]) return 1;
									else if (a[column] < b[column]) return -1;
								}
							}

							return 0;
						})
						.map((row: Array<any> | object, rowKey: number) => (
							<TableRow key={rowKey}>
								{Array.isArray(row)
									? row.map((cell: any, key: any) => {
											return (
												key !== row.length - 1 && (
													<TableData
														key={key}
														tableStyle={
															props.style ? props.style : TABLE_STYLE_DEFAULT
														}
													>
														{props.renderers &&
															props.renderers[key] &&
															props.renderers[key](
																cell,
																rowKey,
																row[row.length - 1]
															)}
													</TableData>
												)
											);
									  })
									: {}}
							</TableRow>
						))}
			</TableBody>
		</TableElement>
	);
};

export const ScrollableTable = (props: TableProps & ScrollableProps) => {
	const { height, ...tableProps } = props;
	const [resizeListener, sizes] = useResizeAware();
	return (
		<Scrollable height={height} currentHeight={sizes.height}>
			{resizeListener}
			<Table {...tableProps} />
		</Scrollable>
	);
};

interface ActionsColumnProps {
	children?: React.ReactNode;
}

export const ActionsColumn = (props: ActionsColumnProps) => {
	return <ActionsColumnEl>{props.children}</ActionsColumnEl>;
};

const Scrollable = styled.div`
	position: relative;
	max-height: ${(props) => (props.height ? props.height + "px" : "100%")};

	padding-bottom: ${(props) =>
		props.currentHeight < props.height ? `1px` : "0"};

	overflow: auto;

	border-radius: ${(props) =>
		props.currentHeight < props.height ? `0` : "0 0 3px 3px"};

	/* TODO: if parrent is bigger than this, draw a box-shadow in table tr */
`;

const TableElement = styled.table`
	width: 100%;
	font-size: 0.85rem;
	border-collapse: collapse;
	border-spacing: 0;

	@media ${device.large} {
		font-size: 0.7rem;
	}
`;

const TableHead = styled.thead``;

const Header = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const TableHeading = styled.th`
	padding: ${(props) =>
		props.tableStyle === TABLE_STYLE_CONDENSED ? "0" : "0"};
	min-width: 100px;
	background-color: ${(props) => props.theme.colors.background.table.heading};
	box-shadow: 0 1px 0 0 ${(props) => props.theme.colors.primary.default};

	&:not(:first-child) {
		box-shadow: 0 1px 0 0 ${(props) => props.theme.colors.primary.default},
			inset 1px 0 0 0 rgba(23, 120, 94, 0.1);
	}

	${Scrollable} & {
		position: sticky;
		top: 0;
		z-index: 99;
	}
`;

const SortButton = styled.button`
	border: 0;
	background: transparent;
	cursor: pointer;
	font-size: 16px;
`;

const SortWrapper = styled.div`
	position: relative;
	display: inline-block;
`;

const SortOrder = styled.span`
	padding-left: 2px;

	line-height: 10px;

	font-size: 10px;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
	background-color: transparent;

	transition: all 0.2s ease-out;

	&:hover {
		background-color: ${(props) => props.theme.colors.background.primary.hover};
	}

	&:last-child {
		box-shadow: 0 1px 0 0
			${(props) => props.theme.colors.background.primary.active};
	}
`;

const TableData = styled.td`
	padding: ${(props) =>
		props.tableStyle === TABLE_STYLE_CONDENSED ? "2px 8px" : "6px 16px"};

	border-bottom: 1px solid
		${(props) => props.theme.colors.background.primary.active};

	&:not(:last-child) {
		box-shadow: 1px 0 0 0
			${(props) => props.theme.colors.background.primary.hover};
	}

	${TableRow}:last-child & {
		border-bottom: 0;
	}

	button {
		margin: 0;

		font-size: 15px;
	}
`;

const ActionsColumnEl = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
`;

const HeaderColumn = styled.div`
	width: 100%;
	padding: 8px 8px 2px 8px;
	white-space: nowrap;
`;

const SortColumn = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	border-top: 1px solid
		${(props) => props.theme.colors.background.primary.active};
`;

const Sort = styled.div<{ active: boolean }>`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 50%;

	cursor: pointer;
	padding: 2px 0;

	background-color: ${(props) =>
		props.active
			? props.theme.colors.background.content
			: props.theme.colors.background.table.headingSort};

	&:hover {
		background-color: ${(props) => props.theme.colors.background.content};
	}

	svg {
		color: #119c08;
	}
`;

const TableFilter = styled.tr`
	font-size: 0.8em;
`;

const TableFilterHeading = styled.td`
	text-align: center;
	padding: ${(props) =>
		props.tableStyle === TABLE_STYLE_CONDENSED ? "0" : "0"};
	min-width: 100px;
	border-bottom: 1px solid
		${(props) => props.theme.colors.background.primary.active};
	&:not(:last-child) {
		border-right: 1px solid
			${(props) => props.theme.colors.background.primary.active};
	}
	height: 20px;
	padding: 4px 2px;
	${Scrollable} & {
		position: sticky;
		top: 0;
		z-index: 99;
	}
`;
