import lang from '../../../translation/lang';
import React from 'react';
import styled from 'styled-components';
import { Button, PlainButton } from '../Button';
import { Page } from '../../../types/_types';
import { Select } from '../Form/Select';
import { translationPath } from '../../../utils/getPath';
import { useTranslation } from 'react-i18next';

interface OwnProps {
	pageSize?: number;
	currentPageSize: number;
	firstRecordOnPage: number;
	lastRecordOnPage: number;
	currentPage: number;
	totalPages: number;
	totalRecords: number;
	sort?: string | null;
	onPageRequired: (page: Page) => void;
	onSizeChanged: (newSize: number) => void;
	handleSelectedPageSize: (newSize: number) => void;
}

const Pagination = (props: OwnProps) => {
	const {
		pageSize,
		firstRecordOnPage,
		lastRecordOnPage,
		currentPage,
		totalPages,
		totalRecords,
		onPageRequired,
		sort,
		onSizeChanged,
		handleSelectedPageSize,
	} = props;

	const { t } = useTranslation();

	const handlePageSize = (value: any, actionMeta: any) => {
		onSizeChanged(value.value);
		handleSelectedPageSize(value.value);
	};

	return (
		<PaginationWrapper>
			<div>
				{t(translationPath(lang.common.showingRecors).path)} {firstRecordOnPage}{" "}
				{t(translationPath(lang.common.to).path)} {lastRecordOnPage}{" "}
				{t(translationPath(lang.common.of).path)} {totalRecords}.{" "}
				{t(translationPath(lang.common.page).path)} {currentPage}{" "}
				{t(translationPath(lang.common.of).path)} {totalPages}.
			</div>

			<div>
				{currentPage > 2 ? (
					<PlainButton
						onClick={() => {
							onPageRequired({
								PageSize: pageSize,
								Page: 0,
								...(sort && { Sort: sort }),
								Paginate: true,
							});
						}}
					>
						1
					</PlainButton>
				) : (
					""
				)}

				{currentPage > 3 ? <PlainButton disabled>...</PlainButton> : ""}

				{currentPage !== 1 ? (
					<PlainButton
						onClick={() => {
							onPageRequired({
								PageSize: pageSize,
								Page: currentPage - 2,
								...(sort && { Sort: sort }),
								Paginate: true,
							});
						}}
					>
						{currentPage - 1}
					</PlainButton>
				) : (
					""
				)}

				<Button>{currentPage}</Button>

				{currentPage !== totalPages ? (
					<PlainButton
						onClick={() => {
							onPageRequired({
								PageSize: pageSize,
								Page: currentPage,
								...(sort && { Sort: sort }),
								Paginate: true,
							});
						}}
					>
						{currentPage + 1}
					</PlainButton>
				) : (
					""
				)}

				{currentPage + 2 < totalPages ? (
					<PlainButton disabled>...</PlainButton>
				) : (
					""
				)}

				{currentPage + 1 < totalPages ? (
					<PlainButton
						onClick={() => {
							onPageRequired({
								PageSize: pageSize,
								Page: totalPages - 1,
								...(sort && { Sort: sort }),
								Paginate: true,
							});
						}}
					>
						{totalPages}
					</PlainButton>
				) : (
					""
				)}
			</div>
			<div>
				{t(translationPath(lang.common.itemsToShow).path)}:
				<Select
					value={{ value: pageSize, label: pageSize }}
					options={[
						{ value: 5, label: "5" },
						{ value: 10, label: "10" },
						{ value: 25, label: "25" },
						{ value: 50, label: "50" },
					]}
					onChange={handlePageSize}
					align={"center"}
				/>
			</div>
		</PaginationWrapper>
	);
};

export default Pagination;

const PaginationWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;

	padding: 0 16px;

	font-size: 0.75em;

	> div {
		flex: 1 0 33%;

		&:nth-child(2) {
			text-align: center;
		}

		&:last-child {
			display: flex;
			flex-direction: row;
			justify-content: flex-end;
			align-items: center;

			> div {
				width: 48px;

				margin-left: 8px;
			}
		}
	}
`;
