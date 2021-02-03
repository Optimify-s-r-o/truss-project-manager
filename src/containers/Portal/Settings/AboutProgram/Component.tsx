import * as React from 'react';
import Data from '../../../../components/Data/Data';
import styled from 'styled-components';
import { Box } from '../../../../components/Box';
import { Button } from '../../../../components/Optimify/Button';
import { faCog } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { lang } from '../../../../translation/i18n';
import { translationPath } from '../../../../utils/getPath';
import { UnitType } from '../../../../components/Data/Unit';
import { useTranslation } from 'react-i18next';
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

	React.useEffect(() => {
		const electron = window.require("electron");
		electron.ipcRenderer.send("app_version");
		const fs = electron.remote.require("fs");
		electron.ipcRenderer.on("app_version", (event, text) => {
			setVersion(text?.version);
		});
	}, []);

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

export const Setting = styled(Button)`
	color: ${(props) => props.theme.colors.background.content};
	background-color: ${(props) => props.theme.colors.primary.default};
	border: none;
	box-shadow: none;
	padding: 0.5em 0.9em;
	border-radius: 4px;

	&:hover {
		color: ${(props) => props.theme.colors.background.content};
		background-color: ${(props) => props.theme.colors.primary.default};
		border: none;
		box-shadow: none;
	}
`;

const Link = styled.div`
	text-decoration: underline;
	color: ${(props) => props.theme.colors.secondaryText.hover};
	cursor: pointer;
`;
