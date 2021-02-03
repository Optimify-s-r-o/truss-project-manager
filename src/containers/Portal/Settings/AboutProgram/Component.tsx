import * as React from 'react';
import Data from '../../../../components/Data/Data';
import styled from 'styled-components';
import {
	Alert,
	Button,
	Progress,
	Space
	} from 'antd';
import { Box } from '../../../../components/Box';
import { faCog } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { lang } from '../../../../translation/i18n';
import { translationPath } from '../../../../utils/getPath';
import { UnitType } from '../../../../components/Data/Unit';
import { useTranslation } from 'react-i18next';
import { WindowsOutlined } from '@ant-design/icons';
import {
	GridItem,
	GridRow,
	PageHeader,
	PageTitle,
	TitleName,
	TitleSection,
} from "../../../../constants/globalStyles";
import {
	MainTree,
	MainTreeContent,
	TreeContent,
	TreeScreen,
} from "../../_styles";

export interface StateProps {}

export interface DispatchProps {}

export const Component = ({}: StateProps & DispatchProps) => {
	const { t } = useTranslation();
	const openFineUrl = (
		_event: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		const { shell } = window.require("electron");
		shell.openExternal("https://fine.cz/");
	};

	const openFineEmail = (
		_event: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		const { shell } = window.require("electron");
		shell.openExternal("mailto:hotline@finesoftware.eu");
	};

	const [version, setVersion] = React.useState("0.0.0");
	const [update, setUpdate] = React.useState(false);
	const [percent, setPercent] = React.useState(0);

	React.useEffect(() => {
		const electron = window.require("electron");
		electron.ipcRenderer.send("app_version");
		const fs = electron.remote.require("fs");
		electron.ipcRenderer.on("app_version", (event, text) => {
			setVersion(text?.version);
		});
		electron.ipcRenderer.on("update-available", (event, text) => {
			console.log("update je mozny");
		});
	}, []);

	React.useEffect(() => {
		const interval = setInterval(() => {
			if (update) {
				if (percent > 99) {
					setPercent(1);
					return;
				} else {
					setPercent((seconds) => seconds + 4);
				}
			}
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	const updateApp = () => {
		console.log("updateApp");
		setUpdate(true);
		const electron = window.require("electron");
		const fs = electron.remote.require("fs");
		electron.ipcRenderer.send("update-app");
	};

	return (
		<MainTree>
			<PageHeader>
				<PageTitle>
					<TitleSection>
						<FontAwesomeIcon icon={faCog as IconProp} />
						<TitleName>
							{t(translationPath(lang.common.settings).path)}
						</TitleName>
					</TitleSection>
				</PageTitle>
			</PageHeader>
			<MainTreeContent>
				<TreeScreen>
					<TreeContent>
						<GridRow columns={1}>
							<GridItem fill>
								<Box
									title={t(translationPath(lang.settings.aboutProgram).path)}
								>
									<AlertBox>
										<Alert
											message="Update is available"
											description="An update to the newest version is available. Update now to receive new features."
											type="info"
											showIcon
											closable
											action={
												<>
													{update && <Progress percent={percent} />}
													<Space direction="vertical" size="large">
														<SButton
															size="middle"
															type="primary"
															icon={<WindowsOutlined />}
															onClick={() => updateApp()}
														>
															Update now
														</SButton>
													</Space>
												</>
											}
										/>
									</AlertBox>
									<Data
										title={t(translationPath(lang.settings.programName).path)}
										unit={UnitType.EMPTY}
										data={<div>Truss Project Manager</div>}
									/>
									<Data
										title={t(
											translationPath(lang.settings.programVersion).path
										)}
										unit={UnitType.EMPTY}
										data={<div>v{version}</div>}
									/>
									<Data
										title={"Hotline"}
										unit={UnitType.EMPTY}
										data={<div>+420 233 324 889</div>}
									/>
									<Data
										title={t(translationPath(lang.common.phone).path)}
										unit={UnitType.EMPTY}
										data={<div>+420 233 324 890</div>}
									/>
									<Data
										title={"Internet"}
										unit={UnitType.EMPTY}
										data={
											<Link onClick={openFineUrl}>www.finesoftware.eu</Link>
										}
									/>
									<Data
										title={t(translationPath(lang.common.email).path)}
										unit={UnitType.EMPTY}
										data={
											<Link onClick={openFineEmail}>
												hotline@finesoftware.eu
											</Link>
										}
									/>
								</Box>
							</GridItem>
						</GridRow>
					</TreeContent>
				</TreeScreen>
			</MainTreeContent>
		</MainTree>
	);
};

export default Component;

const AlertBox = styled.div`
	margin: 1em 0;
	.anticon svg {
		background: #e6f7ff;
	}
`;

const Link = styled.div`
	text-decoration: underline;
	color: ${(props) => props.theme.colors.secondaryText.hover};
	cursor: pointer;
`;

const SButton = styled(Button)`
	margin: 0.7em 0 0.4em 0;
	.anticon svg {
		background: transparent;
	}
`;
