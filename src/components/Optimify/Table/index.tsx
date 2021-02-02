import * as React from 'react';
import styled from 'styled-components';
import useResizeAware from 'react-resize-aware';
import { device } from '../../../constants/theme';
import { faSort, faSortDown, faSortUp } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export enum SortOptions {
	Default,
	Desc,
	Asc,
}

export enum SortType {
	Internal,
	External,
}

interface TableProps {
	data?: Array<any>;
	renderers: Array<(value: any, key: number, parent: any) => any>;
	headers?: Array<string>;
	style?: string;
	sortable?: Array<boolean>;
	sortType?: SortType;
	onSort?: (sortOptions: SortOptions[], sortOrder: number[]) => void;
	initialSort?: SortOptions[];
	initialSortOrder?: number[];
}

interface ScrollableProps {
	height?: number;
}

export const TABLE_STYLE_DEFAULT = "default";
export const TABLE_STYLE_CONDENSED = "condensed";

export const Table = (props: TableProps) => {
	const getDefaultSort = () => {
		let defaultSort;
		if (props.sortable && props.headers?.length) {
			defaultSort = [];
			for (let i = 0; i < props.headers?.length; i++)
				if (props.sortable[i]) defaultSort[i] = SortOptions.Default;
		}
		return defaultSort;
	};

	const [sort, setSort] = React.useState<Array<SortOptions>>(
		props.initialSort ? props.initialSort : getDefaultSort()
	);
	const [sortOrder, setSortOrder] = React.useState<Array<number>>(
		props.initialSortOrder ? props.initialSortOrder : []
	);
	const [headers, setHeaders] = React.useState<Array<string> | undefined>(
		props.headers
	);

	React.useEffect(() => {
		let newSort = getDefaultSort();
		let newSortOrder: any[] = [];
		let headerKeysMapping: any[] = [];

		if (typeof newSort !== "undefined") {
			headers?.forEach((header: string, key: number) => {
				if (props.headers?.includes(header)) {
					newSort[props.headers.indexOf(header)] = sort[key];
					headerKeysMapping[key] = props.headers.indexOf(header);
				}
			});

			sortOrder.forEach((oldHeaderKey: number, order: number) => {
				if (
					headerKeysMapping[oldHeaderKey] &&
					typeof headerKeysMapping[oldHeaderKey] !== "undefined"
				)
					newSortOrder[order] = headerKeysMapping[oldHeaderKey];
			});
			newSortOrder = newSortOrder.filter(Boolean);

			if (
				JSON.stringify(newSort) !== JSON.stringify(sort) &&
				JSON.stringify(newSortOrder) !== JSON.stringify(sortOrder)
			)
				props.onSort && props.onSort(newSort, newSortOrder);

			setSort(newSort);
			setSortOrder(newSortOrder);
		}

		setHeaders(props.headers);
	}, [props.headers]);

	return (
		<TableElement>
			<TableHead>
				<TableRow>
					{headers?.map((header: string, key: any) => (
						<TableHeading
							key={key}
							tableStyle={props.style ? props.style : TABLE_STYLE_DEFAULT}
						>
							{header}
							{props.sortable &&
								sort &&
								key in sort &&
								typeof sort[key] != "undefined" && (
									<SortButton
										type="button"
										onClick={() => {
											let newSort = [...sort];
											newSort[key] !== 2 ? newSort[key]++ : (newSort[key] = 0);
											setSort(newSort);

											let newSortOrder = [...sortOrder];
											if (
												!newSortOrder.includes(key) &&
												newSort[key] !== SortOptions.Default
											)
												newSortOrder.push(key);
											else if (
												newSortOrder.includes(key) &&
												newSort[key] === SortOptions.Default
											)
												newSortOrder = newSortOrder.filter(
													(val) => val !== key
												);
											setSortOrder(newSortOrder);

											if (props.sortType === SortType.External)
												props.onSort && props.onSort(newSort, newSortOrder);
										}}
									>
										{sort[key] === SortOptions.Default ? (
											<FontAwesomeIcon icon={faSort as IconProp} />
										) : sort[key] === SortOptions.Asc ? (
											<SortWrapper>
												<FontAwesomeIcon icon={faSortUp as IconProp} />{" "}
												<SortOrder>{sortOrder.indexOf(key) + 1}</SortOrder>
											</SortWrapper>
										) : (
											<SortWrapper>
												<FontAwesomeIcon icon={faSortDown as IconProp} />{" "}
												<SortOrder>{sortOrder.indexOf(key) + 1}</SortOrder>
											</SortWrapper>
										)}
									</SortButton>
								)}
						</TableHeading>
					))}
				</TableRow>
			</TableHead>
			<TableBody>
				{props.data &&
					[...props.data]
						.sort((a, b) => {
							if (!props.sortable || props.sortType === SortType.External)
								return 0;

							for (let i = 0; i < sortOrder.length; i++) {
								let column = sortOrder[i];
								if (sort[column] === SortOptions.Desc) {
									if (a[column] < b[column]) return 1;
									else if (a[column] > b[column]) return -1;
								} else if (sort[column] === SortOptions.Asc) {
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
									: "TODO object"}
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

const TableHeading = styled.th`
	padding: ${(props) =>
		props.tableStyle === TABLE_STYLE_CONDENSED ? "2px 8px" : "8px 0px 8px 8px"};

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
	position: absolute;

	top: 4px;
	bottom: 4px;
	right: -10px;

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
