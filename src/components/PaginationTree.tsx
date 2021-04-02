import lang from '../translation/lang';
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Page } from '../types/_types';
import { PlainButton } from './Optimify/Button';
import { Select } from './Optimify/Form/Select';
import { translationPath } from '../utils/getPath';
import { useTranslation } from 'react-i18next';
import {
	faAngleDoubleLeft,
	faAngleDoubleRight,
	faAngleLeft,
	faAngleRight,
} from "@fortawesome/pro-light-svg-icons";

interface OwnProps {
	pageSize?: number;
	currentPage: number;
	totalPages: number;
	totalRecords: number;
	onPageRequired: (page: Page) => void;
	onSizeChanged: (newSize: number) => void;
}

const PaginationTree = (props: OwnProps) => {
	const {
		pageSize,
		currentPage,
		totalPages,
		onPageRequired,
		onSizeChanged,
	} = props;

	const { t } = useTranslation();
	return (
		<PaginationWrapper>
			<div>
				<PlainButton
					level={3}
					onClick={() => {
						onPageRequired({
							PageSize: pageSize,
							Page: 0,
						});
					}}
					disabled={currentPage <= 1}
				>
					<FontAwesomeIcon icon={faAngleDoubleLeft} />
				</PlainButton>
				<PlainButton
					level={3}
					onClick={() => {
						onPageRequired({
							PageSize: pageSize,
							Page: currentPage - 2,
						});
					}}
					disabled={currentPage <= 1}
				>
					<FontAwesomeIcon icon={faAngleLeft} />
				</PlainButton>
				<span>
					{currentPage} / {totalPages}
				</span>
				<PlainButton
					level={3}
					onClick={() => {
						onPageRequired({
							PageSize: pageSize,
							Page: currentPage,
						});
					}}
					disabled={currentPage >= totalPages}
				>
					<FontAwesomeIcon icon={faAngleRight} />
				</PlainButton>
				<PlainButton
					level={3}
					onClick={() => {
						onPageRequired({
							PageSize: pageSize,
							Page: totalPages - 1,
						});
					}}
					disabled={currentPage >= totalPages}
				>
					<FontAwesomeIcon icon={faAngleDoubleRight} />
				</PlainButton>
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
					onChange={(value) => {
						onSizeChanged(value.value);
					}}
					align={"center"}
					direction={props.totalRecords > 10 ? "up" : "down"}
				/>
			</div>
		</PaginationWrapper>
	);
};

export default PaginationTree;

const PaginationWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	padding: 8px 8px 0;

	border-top: 1px solid ${(props) => props.theme.colors.background.menu};
	color: ${(props) => props.theme.colors.contentText};
	font-size: 0.75em;

	> div {
		flex: 1 0 33%;

		&:nth-child(1) {
			text-align: center;

			button {
				margin: 0 2px;
			}

			span {
				margin: 0 6px;
			}
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
