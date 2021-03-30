import lang from '../../../translation/lang';
import Loading from '../Loading';
import Pagination from './Pagination';
import React from 'react';
import styled from 'styled-components';
import { Page } from '../../../types/_types';
import { ScrollableTable, SortOptions, SortType } from '.';
import { translationPath } from '../../../utils/getPath';
import { useTranslation } from 'react-i18next';

interface OwnProps {
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
}

const ExternalTable = (props: OwnProps) => {
	const {
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
	} = props;

	const [selectedPageSize, setSelectedPageSize] = React.useState(
		defaultPageSize ? defaultPageSize : 25
	);
	const [sortString, setSortString] = React.useState<string | null | undefined>(
		null
	);
	const [sort, setSort] = React.useState<SortOptions[]>();
	const [sortOrder, setSortOrder] = React.useState<number[]>();
	const { t } = useTranslation();

	const onSort = (sortOptions: SortOptions[], sortOrder: number[]) => {
		onSortHelper(columnNames, sortOptions, sortOrder, (sortString) => {
			setSortString(sortString);
			setSort(sortOptions);
			setSortOrder(sortOrder);
			onPageRequired({
				PageSize: selectedPageSize,
				Page: currentPage - 1,
				Sort: sortString,
			});
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
				/>
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
