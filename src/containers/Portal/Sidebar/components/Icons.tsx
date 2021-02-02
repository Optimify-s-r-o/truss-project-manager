import React from 'react';
import styled from 'styled-components';
import { faBookUser } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { lang } from '../../../../translation/i18n';
import { SSpan, StatusWrapper } from '../_styles';
import { Tooltip } from 'antd';
import { translationPath } from '../../../../utils/getPath';
import { TreeType } from '../../../../types/_types';
import { useTranslation } from 'react-i18next';
import {
	faArchive,
	faBan,
	faCheck,
	faCog,
	faIdCard,
	faMoneyBillWave,
	faSuitcase,
} from "@fortawesome/free-solid-svg-icons";
import {
	faExclamationTriangle,
	faTools,
} from "@fortawesome/pro-solid-svg-icons";

interface Icons {
	status: string[];
	title: string;
	treeType: TreeType;
	lock: string;
	lockedByMe: boolean;
	id: string;
}

export enum Status {
	// Truss
	TrussNotCalculated,
	TrussFailed,
	TrussSucceeded,

	// Job
	JobQuotationFinished,
	JobQuotationInProgress,
	JobQuotationAborted,
	JobConstructionFinished,
	JobConstructionInProgress,
	JobConstructionAborted,

	JobTRUSS_3D,
	JobTRUSS_2D,

	// Project
	ProjectArchivedAndRealized,
	ProjectArchivedAndAborted,
	ProjectNewlyCreated,
	ProjectQuotationInProgress,
	ProjectQuotationFinished,
	ProjectProductionInProgress,
	ProjectProductionFinished,

	// Customer
	CustomerInEvidence,
	CustomerCompany,
	CustomerPerson,
}

export const getStatusIcons = (nodeStatus: Status): React.ReactNode => {
	let icons = [];
	switch (nodeStatus) {
		case Status.TrussNotCalculated:
			icons.push(faTools);
			break;
		case Status.TrussFailed:
			icons.push(faBan);
			break;
		case Status.TrussSucceeded:
			icons.push(faCheck);
			break;
		case Status.JobQuotationFinished:
			icons.push(faMoneyBillWave);
			break;
		case Status.JobQuotationInProgress:
			icons.push(faMoneyBillWave);
			break;
		case Status.JobQuotationAborted:
			icons.push(faExclamationTriangle);
			break;
		case Status.JobConstructionFinished:
			icons.push(faCog);
			break;
		case Status.JobConstructionInProgress:
			icons.push(faCog);
			break;
		case Status.JobConstructionAborted:
			icons.push(faExclamationTriangle);
			break;
		case Status.JobTRUSS_3D:
			icons.push(faArchive);
			break;
		case Status.JobTRUSS_2D:
			icons.push(faArchive);
			break;
		case Status.ProjectArchivedAndRealized:
			icons.push(faArchive);
			break;
		case Status.ProjectArchivedAndAborted:
			icons.push(faArchive);
			break;
		case Status.ProjectNewlyCreated:
			icons.push(faArchive);
			break;
		case Status.ProjectQuotationInProgress:
			icons.push(faMoneyBillWave);
			break;
		case Status.ProjectQuotationFinished:
			icons.push(faMoneyBillWave);
			break;
		case Status.ProjectProductionInProgress:
			icons.push(faTools);
			break;
		case Status.ProjectProductionFinished:
			icons.push(faTools);
			break;
		case Status.CustomerInEvidence:
			icons.push(faBookUser);
			break;
		case Status.CustomerCompany:
			icons.push(faSuitcase);
			break;
		case Status.CustomerPerson:
			icons.push(faIdCard);
			break;
		default:
			console.log("Tree status undefined");
	}
	return (
		<>
			{icons.map((icon, key) => {
				return <FontAwesomeIcon key={key} icon={icon} />;
			})}
		</>
	);
};

export const Icons = ({ id, title, status, lock, lockedByMe }: Icons) => {
	const { t } = useTranslation();
	return (
		<SSpan id={id}>
			{lock ? (
				<Tooltip
					title={
						lockedByMe
							? t(translationPath(lang.common.lockedByMe).path)
							: t(translationPath(lang.common.lock).path, { lock })
					}
					placement={"right"}
					color={"red"}
				>
					<Span lock={lock}> {title}</Span>
				</Tooltip>
			) : (
				<Span lock={lock}> {title}</Span>
			)}
			{status && (
				<StatusWrapper>
					{status?.map((i, key) => {
						return (
							<Box color={i}>
								<Tooltip
									key={key}
									color={"#108ee9"}
									title={t(
										translationPath(lang.common["treeTooltip" + i]).path
									)}
									placement={"right"}
								>
									<span>{getStatusIcons(Status[i])}</span>
								</Tooltip>
							</Box>
						);
					})}
				</StatusWrapper>
			)}
		</SSpan>
	);
};

const Box = styled.div<{ color: string }>`
	display: inline-block;
	border-radius: 10px;
	color: ${(props) => props.theme.colors.status[props.color]};
	font-size: 0.7rem;
	font-weight: 400;
	padding: 1px;
	white-space: nowrap;

	svg {
		margin-top: -1px;
		margin-right: 3px;
		margin-bottom: -1px;

		font-size: 1rem;

		&:last-of-type {
			margin-right: 6px;
		}
	}
`;

const Span = styled.span<{ lock: string }>`
	margin: 0 0.5rem 0 0.25rem;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	color: ${(props) => (!!props.lock ? "#d00a0a" : "inherit")};
	font-size: 14px;
`;
