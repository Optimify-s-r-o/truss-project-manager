import * as React from 'react';
import Data from '../../../../components/Data/Data';
import isElectron from 'is-electron';
import styled from 'styled-components';
import { ApiURL } from '../../../../constants/api';
import { Box } from '../../../../components/Box';
import { Button } from '../../../../components/Optimify/Button';
import { faCog } from '@fortawesome/pro-light-svg-icons';
import { Fetch, Settings, UserRole } from '../../../../types/_types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { lang } from '../../../../translation/i18n';
import { Method } from '../../../../constants/enum';
import { settings } from '../../_actions';
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
const Store = window.require("electron-store");

export interface StateProps {
	routerState: any;
	settingsEntity: Settings;
	cloud: boolean;
	local: boolean;
	role: string;
}

export interface DispatchProps {
	fileChangeRootPath: (data: string) => void;
	settingsCall: (data: Fetch) => void;
}

export const Component = ({
	local,
	fileChangeRootPath,
	settingsCall,
	settingsEntity,
	role,
}: StateProps & DispatchProps) => {
	const admin = role == UserRole.OrganizationAdmin ? true : false;
	const { t } = useTranslation();
	const [truss3DExe, setTruss3DExe] = React.useState("");
	const [truss2DExe, setTruss2DExe] = React.useState("");
	const [store, setStore] = React.useState(null);

	React.useEffect(() => {
		settingsCall({
			action: settings,
			method: Method.GET,
			url: ApiURL.SETTINGS,
		});
	}, []);

	React.useEffect(() => {
		setStore(new Store());
	}, []);

	React.useEffect(() => {
		if (isElectron() && store) {
			setTruss3DExe(store.get("truss3DExePath"));
			setTruss2DExe(store.get("truss2DExePath"));
		}
	}, [store]);

	const handleFileRootChagne = () => {
		const { remote } = window.require("electron"),
			WIN = remote.getCurrentWindow();

		remote.dialog
			.showOpenDialog(WIN, {
				properties: ["openDirectory"],
			})
			.then((result) => {
				if (result && result.filePaths[0])
					fileChangeRootPath(result.filePaths[0]);
			})
			.catch((...args) => {
				console.warn("failed/rejected with", args);
			});
	};

	const handleTruss3D = () => {
		const { remote } = window.require("electron");
		remote.dialog
			.showOpenDialog({ properties: ["openFile"] })
			.then((result) => {
				if (result && result.filePaths && result.filePaths[0]) {
					setTruss3DExe(result.filePaths[0]);
					store.set("truss3DExePath", result.filePaths[0]);
				}
			});
	};

	const handleTruss2D = () => {
		if (isElectron()) {
			const { remote } = window.require("electron");
			remote.dialog
				.showOpenDialog({ properties: ["openFile"] })
				.then((result) => {
					if (result && result.filePaths && result.filePaths[0]) {
						setTruss2DExe(result.filePaths[0]);
						store.set("truss2DExePath", result.filePaths[0]);
					}
				});
		}
	};

	return (
		<MainTree>
			<PageHeader>
				<PageTitle>
					<TitleSection>
						<FontAwesomeIcon icon={faCog as IconProp} />
						<TitleName>
							{" "}
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
								<Box title={t(translationPath(lang.settings.system).path)}>
									{local && (
										<Data
											title={t(
												translationPath(lang.common.changeRootPath).path
											)}
											unit={UnitType.EMPTY}
											data={
												<Setting
													level={1}
													loading={false}
													onClick={handleFileRootChagne}
												>
													{settingsEntity?.FolderPath}
												</Setting>
											}
										/>
									)}
									<Data
										title={t(
											translationPath(lang.common.changeTruss3DPath).path
										)}
										unit={UnitType.EMPTY}
										data={
											<Setting
												level={1}
												loading={false}
												onClick={handleTruss3D}
											>
												{truss3DExe}
											</Setting>
										}
									/>
									<Data
										title={t(
											translationPath(lang.common.changeTruss2DPath).path
										)}
										unit={UnitType.EMPTY}
										data={
											<Setting
												level={1}
												loading={false}
												onClick={handleTruss2D}
											>
												{truss2DExe}
											</Setting>
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
