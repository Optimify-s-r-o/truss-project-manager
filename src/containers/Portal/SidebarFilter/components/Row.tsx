import moment from 'moment';
import React from 'react';
import styled from 'styled-components';
import { ContentRow } from 'src/constants/globalStyles';
import { fixed } from '../../../../utils/formating';
import { getIcon } from '../../Sidebar/_services';
import { lang, t } from '../../../../translation/i18n';
import { translationPath } from '../../../../utils/getPath';
import { TreeType } from '../../../../types/_types';

const Icon = (type: TreeType) => {
	if (type === TreeType.PROJECT) {
		return;
	}
};
export interface IRowWrapper {
	title: string;
	value: string;
	show: boolean;
	includeNotSetTooltip?: string;
	includeNotSet?: boolean;
	type: TreeType;
}

export const Row = ({
	title,
	value,
	show,
	includeNotSet,
	includeNotSetTooltip,
	type,
}: IRowWrapper) => {
	if (show) {
		return (
			<RowWrapper>
				<IconWrapper>{getIcon(type)}</IconWrapper>
				<Box>
					{title}:{" "}
					{includeNotSet
						? includeNotSetTooltip
						: !!value
						? value
						: t(translationPath(lang.common.tooltip.allRecords))}
				</Box>
			</RowWrapper>
		);
	}
	return <div></div>;
};

export const MultipleSelect = ({
	title,
	value,
	show,
	translate,
	includeNotSetTooltip,
	includeNotSet,
	string,
	type,
}: {
	title: string;
	value: string[];
	show: boolean;
	translate?: boolean;
	includeNotSetTooltip?: string;
	includeNotSet?: boolean;
	string?: boolean;
	type: TreeType;
}) => {
	if (show) {
		return (
			<RowWrapper>
				<IconWrapper>{getIcon(type)}</IconWrapper>
				<Box>
					{title}:{" "}
					{includeNotSet
						? includeNotSetTooltip
						: translate
						? string
							? value
							: value
									?.map((v) => t(translationPath(lang.common[v])))
									?.join(", ")
						: value?.join(", ")}
				</Box>
			</RowWrapper>
		);
	}
	return <div></div>;
};

export const SliderRange = ({
	title,
	value,
	show,
	round,
	type,
}: {
	title: string;
	value: any;
	show: boolean;
	round?: boolean;
	type: TreeType;
}) => {
	const getValue = () => {
		if (round) {
			return `${value?.From} - ${value?.To}`;
		} else {
			return `${fixed(value?.From, 2)} - ${fixed(value?.To, 2)}`;
		}
	};
	if (show) {
		return (
			<RowWrapper>
				<IconWrapper>{getIcon(type)}</IconWrapper>
				<Box>
					{title}: {getValue()}
				</Box>
			</RowWrapper>
		);
	}
	return <div></div>;
};

export const DateRange = ({ title, value, show, type }) => {
	const getValue = () => {
		if (moment(value?.From)?.isValid() && moment(value?.To)?.isValid()) {
			return `${moment(value?.From).format("D. MM. YYYY")} -
				${moment(value?.To).format("D. MM. YYYY")}`;
		} else if (moment(value?.From)?.isValid()) {
			return `${moment(value?.From).format("D. MM. YYYY")} -
			 X`;
		} else if (moment(value?.To)?.isValid()) {
			return `X -
			${moment(value?.To).format("D. MM. YYYY")}`;
		}
	};
	if (show) {
		return (
			<RowWrapper>
				<IconWrapper>{getIcon(type)}</IconWrapper>
				<Box>
					{title}: {getValue()}
				</Box>
			</RowWrapper>
		);
	}
	return <div></div>;
};

const RowWrapper = styled(ContentRow)`
	margin-top: 4px;
`;

const IconWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding-right: 5px;
`;

const Box = styled.span`
	background-color: #5d5d5d;
	color: white;
	padding: 2px 8px;
	border-radius: 6px;
	font-size: 0.9em;
`;
