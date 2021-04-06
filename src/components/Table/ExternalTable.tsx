import lang from '../../translation/lang';
import Loading from '../Optimify/Loading';
import Pagination from './Pagination';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ActionButton } from '../Quotations';
import { Center } from '../../constants/globalStyles';
import { Empty } from 'antd';
import { faSlidersHSquare } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Page, TreeType } from '../../types/_types';
import { ScrollableTable, SortOptions, SortType } from '.';
import { translationPath } from '../../utils/getPath';
import { useTranslation } from 'react-i18next';

interface OwnProps {
	activeFilter?: boolean;
	headers?: Array<string>;
	data: Array<any>;
	renderers: Array<(value: any, key?: number, parent?: any) => any>;
	sortable?: Array<boolean>;
	defaultPageSize?: number;
	columnNames: string[];
	filterContent?: string[];
	onPageRequired: (requiredPage: Page) => void;
	pageSize: number;
	firstRecordOnPage: number;
	lastRecordOnPage: number;
	currentPage: number;
	totalPages: number;
	totalRecords: number;
	isLoading?: boolean;
	initSortOrder?: number[];
	initSort?: number[];
	names?: string[];
	resetHeaderSettings: (data: string) => void;
	type: TreeType;
}

const ExternalTable = (props: OwnProps) => {
	const {
		activeFilter,
		headers,
		data,
		renderers,
		sortable,
		defaultPageSize,
		columnNames,
		onPageRequired,
		pageSize,
		firstRecordOnPage,
		lastRecordOnPage,
		currentPage,
		totalPages,
		totalRecords,
		isLoading,
		filterContent,
		initSort,
		initSortOrder,
		names,
		type,
		resetHeaderSettings,
	} = props;

	const [selectedPageSize, setSelectedPageSize] = React.useState(
		defaultPageSize ? defaultPageSize : 25
	);
	const [sortString, setSortString] = React.useState<string | null | undefined>(
		null
	);
	const [sort, setSort] = React.useState<number[]>(initSort);
	const [sortOrder, setSortOrder] = React.useState<number[]>(initSortOrder);
	const { t } = useTranslation();

	useEffect(() => {
		setSort(initSort);
		setSortOrder(initSortOrder);
	}, [initSort, initSortOrder]);

	const onSort = (sortOptions: SortOptions[], sortOrder: number[]) => {
		onSortHelper(columnNames, sortOptions, sortOrder, (sortString) => {
			setSortString(sortString);
			setSort(sortOptions);
			setSortOrder(sortOrder);

			if (sortString) {
				onPageRequired({
					PageSize: selectedPageSize,
					Page: currentPage - 1,
					Sort: sortString,
					RewriteSort: true,
				});
			} else {
				onPageRequired({
					PageSize: selectedPageSize,
					Page: currentPage - 1,
					RewriteSort: true,
				});
			}
		});
	};

	const handleSelectedPageSize = (newSize: number) => {
		selectedPageSize &&
			onPageRequired({
				PageSize: newSize,
				Page: 0,
				Sort: sortString,
			});
	};

	const reset = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
		resetHeaderSettings(type);
	};

	return (
		<>
			<HorizontalLine />
			<LoadedWrapper isLoading={isLoading}>
				<Pagination
					sort={sortString}
					pageSize={selectedPageSize}
					currentPageSize={pageSize}
					firstRecordOnPage={firstRecordOnPage}
					lastRecordOnPage={lastRecordOnPage}
					currentPage={currentPage}
					totalPages={totalPages}
					totalRecords={totalRecords}
					onPageRequired={onPageRequired}
					onSizeChanged={setSelectedPageSize}
					handleSelectedPageSize={handleSelectedPageSize}
				/>
				{headers && headers.length > 0 ? (
					<ScrollableTable
						headers={headers}
						data={data}
						renderers={renderers}
						sortable={sortable}
						sortType={SortType.External}
						onSort={onSort}
						initialSort={sort}
						initialSortOrder={sortOrder}
						filterContent={filterContent}
						activeFilter={activeFilter}
						names={names}
					/>
				) : (
					<HeadersEmpty>
						<Empty
							description={t(translationPath(lang.table.headersEmpty).path)}
						/>
						<br />
						<Center>
							<ActionButton onClick={reset}>
								<FontAwesomeIcon icon={faSlidersHSquare} />
								{t(translationPath(lang.table.setDefault).path)}
							</ActionButton>
						</Center>
					</HeadersEmpty>
				)}
				<HorizontalLine />
				<Pagination
					sort={sortString}
					pageSize={selectedPageSize}
					currentPageSize={pageSize}
					firstRecordOnPage={firstRecordOnPage}
					lastRecordOnPage={lastRecordOnPage}
					currentPage={currentPage}
					totalPages={totalPages}
					totalRecords={totalRecords}
					onPageRequired={onPageRequired}
					onSizeChanged={setSelectedPageSize}
					handleSelectedPageSize={handleSelectedPageSize}
				/>
			</LoadedWrapper>
			<LoadingWrapper isLoading={isLoading}>
				<Loading
					pending={true}
					text={t(translationPath(lang.common.loading).path)}
					margin
				>
					x
				</Loading>
			</LoadingWrapper>
		</>
	);
};

const onSortHelper = (
	checked: string[],
	sortOptions: SortOptions[],
	sortOrder: number[],
	callback: (sortString: string | null) => void
) => {
	let sortString: string | null = "";
	sortOrder.forEach((key: number) => {
		const value = sortOptions[key];
		if (value === SortOptions.Asc || value === SortOptions.Desc)
			sortString +=
				checked[key] + "+" + (value === SortOptions.Asc ? "asc" : "desc") + ",";
	});
	if (sortString.length > 0)
		sortString = sortString.substr(0, sortString.length - 1);
	else sortString = null;
	callback(sortString);
};

export default ExternalTable;

const LoadedWrapper = styled.div`
	display: ${(props) => (props.isLoading ? "none" : "block")};
`;

const LoadingWrapper = styled.div`
	display: ${(props) => (props.isLoading ? "block" : "none")};
`;

const HorizontalLine = styled.div`
	height: 1px;
	background-color: ${(props) => props.theme.colors.sectionsDivider};
`;

const HeadersEmpty = styled.div`
	padding: 2em;
`;
