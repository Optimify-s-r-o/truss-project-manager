import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Active, ActiveFilter } from '../_styles';
import { Column } from 'src/styles/global';
import { ContentRow } from 'src/constants/globalStyles';
import { faSlash as faSlashSolid } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Hub } from '../../../../constants/hub';
import { HubConnection } from '@microsoft/signalr';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { lang } from '../../../../translation/i18n';
import { Page, TreeType } from '../../../../types/_types';
import { Tooltip } from 'antd';
import { translationPath } from '../../../../utils/getPath';
import { useTranslation } from 'react-i18next';
import {
	faFolder,
	faHomeLgAlt,
	faMountains,
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
	getProjects: (data: Page) => void;
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

	useEffect(() => {
		if (connect) {
			connect.on(Hub.TreeResetFinished, (message) => {
				resetLists();
			});
		}
	}, []);

	const resetLists = () => {
		if (activeTree === TreeType.CUSTOMER) {
			getCustomers({ Page: 0, PageSize: 25, Sort: "" });
		} else if (activeTree === TreeType.JOB) {
			getJobs({ Page: 0, PageSize: 25, Sort: "" });
		} else if (activeTree === TreeType.TRUSS) {
			getTrusses({ Page: 0, PageSize: 25, Sort: "" });
		} else if (activeTree === TreeType.PROJECT) {
			getProjects({
				Page: 0,
				PageSize: 25,
				Sort: null,
			});
		}
	};
	const resetTree = () => {
		try {
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
						) : data?.IsFilterActive ? (
							<span>{t(translationPath(lang.common.activeFilter).path)}</span>
						) : (
							""
						)}
						<ContentRow>
							{data?.IsSkipped ||
								(data?.IsFilterActive && (
									<ContentRow>
										<SkippedSpan>
											{t(translationPath(lang.common.activeSelection).path)}
										</SkippedSpan>
										<Row>
											<Icon>
												<FontAwesomeIcon
													icon={faFolder as IconProp}
													style={{ color: "#d08f1a" }}
												/>
											</Icon>
											<Skipped>({data?.ProjectsSkipped})</Skipped>
										</Row>
										<Row>
											<Icon>
												<FontAwesomeIcon
													icon={faHomeLgAlt as IconProp}
													style={{ color: "red" }}
												/>
											</Icon>
											<Skipped>({data?.JobsSkipped})</Skipped>
										</Row>
										<Row>
											<Icon>
												<FontAwesomeIcon
													icon={faMountains as IconProp}
													style={{ color: "#c1c132" }}
												/>
											</Icon>
											<Skipped>({data?.TrussesSkipped})</Skipped>
										</Row>
									</ContentRow>
								))}
						</ContentRow>
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
const SkippedSpan = styled.span`
	margin-right: 3px;
`;

const Row = styled(ContentRow)`
	margin: 5px 3px;
`;

const Icon = styled.span`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	width: 20px;
	padding-right: 1px;

	svg {
		cursor: auto;
	}
`;
