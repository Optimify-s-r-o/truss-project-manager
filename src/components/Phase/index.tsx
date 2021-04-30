import * as React from 'react';
import styled from 'styled-components';
import { lang } from '../../translation/i18n';
import { translationPath } from '../../utils/getPath';
import { useTranslation } from 'react-i18next';
import {
	getStatusIcons,
	Status,
} from "../../containers/Portal/Sidebar/components/Icons";

export interface OwnProps {
	phase: string[];
}

export const Phase = ({ phase }: OwnProps) => {
	const { t } = useTranslation();
	return (
		<StatusWrapper>
			{phase?.map((i, key) => (
				<Box color={i} key={key}>
					{getStatusIcons(Status[i])}
				</Box>
			))}
			<Span>
				{phase
					?.map((i, key) =>
						t(translationPath(lang.common["treeTooltip" + i]).path)
					)
					.join(", ")}
			</Span>
		</StatusWrapper>
	);
};

const Box = styled.div`
	display: inline-block;

	white-space: nowrap;

	svg {
		color: ${(props) => props.theme.colors.status[props.color]};
		margin-top: -1px;
		margin-bottom: -1px;

		font-size: 14px;

		&:last-of-type {
			margin-right: 6px;
		}
	}
`;

const StatusWrapper = styled.span`
	padding: 4px 9px;
	font-size: 0.7rem;
	font-weight: 400;
	background-color: ${(props) => props.theme.colors.background.content};
	border-radius: 10px;
	color: ${(props) => props.theme.colors.primaryText.default};
	margin-left: 10px;
	svg {
		color: ${(props) => props.theme.colors.status[props.color]};
	}
`;

const Span = styled.span`
	margin: 0 2px;
`;
