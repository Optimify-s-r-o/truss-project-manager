import React from 'react';
import styled from 'styled-components';
import { Active, ActiveFilter } from '../_styles';
import { Column } from 'src/styles/global';
import { ContentRow } from 'src/constants/globalStyles';
import { faSlash as faSlashSolid } from '@fortawesome/free-solid-svg-icons';
import { Fetch, Page, TreeType } from '../../../../types/_types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getProjectsAction } from '../../../../sagas/Fetch/actions';
import { Hub } from '../../../../constants/hub';
import { HubConnection } from '@microsoft/signalr';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { lang } from '../../../../translation/i18n';
import { Tooltip } from 'antd';
import { translationPath } from '../../../../utils/getPath';
import { useTranslation } from 'react-i18next';
import {
	faFolder,
	faHomeLgAlt,
	faMountains,
	faUser,
} from "@fortawesome/pro-duotone-svg-icons";
import {
	faEyeSlash,
	faFilter,
	faSlash,
} from "@fortawesome/pro-light-svg-icons";
interface IActiveActions {
	data: any;
	activeTree: TreeType;
	getCustomers: (data: Page) => void;
	getTrusses: (data: Page) => void;
	getProjects: (data: Fetch) => void;
	getJobs: (data: Page) => void;
	connect: HubConnection;
	resetSelectionAction: (data: void) => void;
}
export const ActiveActions = ({
	data,
	activeTree,
	getCustomers,
	getTrusses,
	getProjects,
	getJobs,
	connect,
	resetSelectionAction,
}: IActiveActions) => {
	const { t } = useTranslation();

	const resetLists = () => {
		if (activeTree === TreeType.CUSTOMER) {
			getCustomers({ Page: 0, PageSize: 25, Sort: "" });
		} else if (activeTree === TreeType.JOB) {
			getJobs({ Page: 0, PageSize: 25, Sort: "" });
		} else if (activeTree === TreeType.TRUSS) {
			getTrusses({ Page: 0, PageSize: 25, Sort: "" });
		} else if (activeTree === TreeType.PROJECT) {
			getProjects(
				getProjectsAction({
					PageSize: 25,
					Page: 0,
					Sort: null,
					Filtered: false,
				})
			);
		}
	};
	const resetTree = () => {
		try {
			resetLists();
			connect.invoke(Hub.ResetTree);
		} catch (err) {
			console.log(err);
		}
	};

	const resetSelection = () => {
		resetSelectionAction();
	};

	return (
		<>
			{(data?.IsFilterActive || data?.IsSkipped) && (
				<ActiveFilter>
					<Column>
						{data?.IsFilterActive && data?.IsSkipped ? (
							<Active>
								{t(translationPath(lang.common.activeFilter).path)}
							</Active>
						) : (
							<span>{t(translationPath(lang.common.activeFilter).path)}</span>
						)}
						{data?.IsSkipped && (
							<span>
								{t(translationPath(lang.common.activeSelection).path)}
								<Row>
									<Icon>
										<FontAwesomeIcon
											icon={faFolder as IconProp}
											style={{ color: "#d08f1a" }}
										/>
									</Icon>
									<span>:</span>
									<Skipped>{data?.ProjectsSkipped}</Skipped>
								</Row>
								<Row>
									<Icon>
										<FontAwesomeIcon
											icon={faHomeLgAlt as IconProp}
											style={{ color: "red" }}
										/>
									</Icon>
									<span>:</span>

									<Skipped>{data?.JobsSkipped}</Skipped>
								</Row>
								<Row>
									<Icon>
										<FontAwesomeIcon
											icon={faMountains as IconProp}
											style={{ color: "#c1c132" }}
										/>
									</Icon>
									<span>:</span>

									<Skipped>{data?.TrussesSkipped}</Skipped>
								</Row>
								<Row>
									<Icon>
										<FontAwesomeIcon
											icon={faUser as IconProp}
											style={{ color: "brown" }}
										/>
									</Icon>
									<span>:</span>

									<Skipped>{data?.CustomersSkipped}</Skipped>
								</Row>
							</span>
						)}
					</Column>
					{data?.IsFilterActive && (
						<Tooltip
							title={t(translationPath(lang.common.cancelFilter).path)}
							placement={"bottom"}
						>
							<span className="fa-layers fa-fw" onClick={resetTree}>
								<FontAwesomeIcon
									icon={faSlashSolid as IconProp}
									transform={"left-1 rotate-8"}
									mask={faFilter}
								/>
								<FontAwesomeIcon
									icon={faSlash}
									transform={"up-1 left-2 rotate-8"}
								/>
							</span>
						</Tooltip>
					)}
					&nbsp; &nbsp;
					{data?.IsSkipped && (
						<Tooltip
							title={t(translationPath(lang.common.cancelSelection).path)}
							placement={"bottom"}
						>
							<span className="fa-layers fa-fw" onClick={resetSelection}>
								<FontAwesomeIcon icon={faEyeSlash as IconProp} />
							</span>
						</Tooltip>
					)}
				</ActiveFilter>
			)}
		</>
	);
};

const Skipped = styled.span`
	margin-left: 4px;
`;

const Row = styled(ContentRow)`
	margin: 5px 3px;
`;

const Icon = styled.span`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	width: 25px;
	padding-right: 4px;

	svg {
		cursor: auto;
	}
`;
