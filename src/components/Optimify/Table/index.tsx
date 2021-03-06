import * as React from 'react';
import styled from 'styled-components';
import useResizeAware from 'react-resize-aware';
import { device } from '../../../constants/theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
	faSortAmountDownAlt,
	faSortAmountUp,
} from "@fortawesome/pro-duotone-svg-icons";

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
				if (typeof headerKeysMapping[oldHeaderKey] !== "undefined")
					newSortOrder[order] = headerKeysMapping[oldHeaderKey];
			});

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

	const handleSort = (key: number, sortOption: SortOptions) => (
		e: React.MouseEvent<HTMLElement, MouseEvent>
	) => {
		const newSort = [...sort];
		newSort[key] = newSort[key] === sortOption ? 0 : sortOption;
		setSort(newSort);

		let newSortOrder = [...sortOrder];

		if (!newSortOrder.includes(key) && newSort[key] !== SortOptions.Default)
			newSortOrder.push(key);
		else if (newSortOrder.includes(key) && newSort[key] === SortOptions.Default)
			newSortOrder = newSortOrder.filter((val) => val !== key);
		setSortOrder(newSortOrder);
		if (props.sortType === SortType.External) {
			props.onSort && props.onSort(newSort, newSortOrder);
		}
	};

	return (
		<TableElement>
			<TableHead>
				<TableRow>
					{headers?.map((header: string, key: any) => (
						<TableHeading
							key={key}
							tableStyle={props.style ? props.style : TABLE_STYLE_DEFAULT}
						>
							<Header>
								<HeaderColumn>{header}</HeaderColumn>
								{props.sortable &&
									sort &&
									key in sort &&
									typeof sort[key] != "undefined" && (
										<SortColumn>
											<Sort
												onClick={handleSort(key, 1)}
												active={sort[key] === SortOptions.Asc}
											>
												<FontAwesomeIcon
													icon={faSortAmountDownAlt as IconProp}
												/>
												{sort[key] === SortOptions.Asc && (
													<SortOrder>{sortOrder.indexOf(key) + 1}</SortOrder>
												)}
											</Sort>
											<Sort
												onClick={handleSort(key, 2)}
												active={sort[key] === SortOptions.Desc}
											>
												<FontAwesomeIcon icon={faSortAmountUp as IconProp} />
												{sort[key] === SortOptions.Desc && (
													<SortOrder>{sortOrder.indexOf(key) + 1}</SortOrder>
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
				{props.filterContent && props.filterContent.length > 0 && (
					<TableFilter>
						{props.filterContent?.map((value, key) => {
							return <TableFilterHeading key={key}>{value}</TableFilterHeading>;
						})}
					</TableFilter>
				)}

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

	padding: 4px 2px;
	${Scrollable} & {
		position: sticky;
		top: 0;
		z-index: 99;
	}
`;
