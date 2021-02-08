import moment from 'moment';
import React from 'react';
import styled from 'styled-components';
import { fixed } from '../../../../utils/formating';
import { lang, t } from '../../../../translation/i18n';
import { translationPath } from '../../../../utils/getPath';

export interface IRow {
	title: string;
	value: string;
	show: boolean;
	includeNotSetTooltip?: string;
	includeNotSet?: boolean;
}
export const Row = ({
	title,
	value,
	show,
	includeNotSet,
	includeNotSetTooltip,
}: IRow) => {
	if (show) {
		return (
			<Box>
				{title}:{" "}
				{includeNotSet
					? includeNotSetTooltip
					: !!value
					? value
					: t(translationPath(lang.common.tooltip.allRecords))}
			</Box>
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
}: {
	title: string;
	value: string[];
	show: boolean;
	translate?: boolean;
	includeNotSetTooltip?: string;
	includeNotSet?: boolean;
	string?: boolean;
}) => {
	if (show) {
		return (
			<Box>
				{title}:{" "}
				{includeNotSet
					? includeNotSetTooltip
					: translate
					? string
						? value
						: value?.map((v) => t(translationPath(lang.common[v])))?.join(", ")
					: value?.join(", ")}
			</Box>
		);
	}
	return <div></div>;
};

export const SliderRange = ({
	title,
	value,
	show,
	round,
}: {
	title: string;
	value: any;
	show: boolean;
	round?: boolean;
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
			<Box>
				{title}: {getValue()}
			</Box>
		);
	}
	return <div></div>;
};

export const DateRange = ({ title, value, show }) => {
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
			<Box>
				{title}: {getValue()}
			</Box>
		);
	}
	return <div></div>;
};

const Box = styled.span`
	background-color: #5d5d5d;
	color: white;
	padding: 2px 8px;
	border-radius: 6px;
	font-size: 0.9em;
	margin-top: 4px;
`;
