import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCog } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { useTranslation } from "react-i18next";
import {
	APP_VERSION,
	CHECK_FOR_UPDATE_FAILURE,
	CHECK_FOR_UPDATE_PENDING,
	CHECK_FOR_UPDATE_SUCCESS,
	DOWNLOAD_UPDATE_FAILURE,
	DOWNLOAD_UPDATE_PENDING,
	DOWNLOAD_UPDATE_SUCCESS,
} from "src/constants/ipcConstants";
import { getIpcRenderer } from "src/utils/electron";
import {
	PageHeader,
	PageTitle,
	TitleName,
	TitleSection,
} from "../../../../constants/globalStyles";
import { lang } from "../../../../translation/i18n";
import { translationPath } from "../../../../utils/getPath";
import {
	MainTree,
	MainTreeContent,
	TreeContent,
	TreeScreen,
} from "../../_styles";
import { AboutProgram } from "./AboutProgram";
import { Update } from "./Update";

export enum State {
	PENDING,
	DOWNLOADING,
	NEW_VERSION_TO_DOWNLOAD,
	IS_UPDATED,
	DOWNLOADED,
	UPDATING,
	FAILURE,
}
export interface StateProps {}

export interface DispatchProps {}

export const Component = ({}: StateProps & DispatchProps) => {
	const { t } = useTranslation();
	const [currentAppVersion, setVersion] = React.useState(null);
	const [versionToDownload, setVersionToDownload] = React.useState(null);
	const [updatingState, setUpdatingState] = React.useState(State.PENDING);

	React.useEffect(() => {
		const ipcRenderer = getIpcRenderer();
		ipcRenderer.send(APP_VERSION);

		ipcRenderer.on(APP_VERSION, (event, text) => {
			setVersion(text?.version);
		});
	}, []);

	React.useEffect(() => {
		const ipcRenderer = getIpcRenderer();
		ipcRenderer.send(CHECK_FOR_UPDATE_PENDING);

		ipcRenderer.on(CHECK_FOR_UPDATE_SUCCESS, (event, updateInfo) => {
			const version = updateInfo && updateInfo.version;
			if (currentAppVersion && version && version !== currentAppVersion) {
				setVersionToDownload(version);
				setUpdatingState(State.NEW_VERSION_TO_DOWNLOAD);
			} else {
				setUpdatingState(State.IS_UPDATED);
			}
		});

		ipcRenderer.on(CHECK_FOR_UPDATE_FAILURE, () => {
			setUpdatingState(State.FAILURE);
		});

		ipcRenderer.on(DOWNLOAD_UPDATE_SUCCESS, () => {
			setUpdatingState(State.DOWNLOADED);
		});

		ipcRenderer.on(DOWNLOAD_UPDATE_FAILURE, () => {
			setUpdatingState(State.FAILURE);
		});
	}, [currentAppVersion]);

	const updateApp = () => {
		const ipcRenderer = getIpcRenderer();
		ipcRenderer.send(DOWNLOAD_UPDATE_PENDING);
		setUpdatingState(State.UPDATING);
		// ipcRenderer.send(QUIT_AND_INSTALL_UPDATE);
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
						<Update
							currentAppVersion={currentAppVersion}
							updateApp={updateApp}
							versionToDownload={versionToDownload}
							updatingState={updatingState}
						/>
						<AboutProgram currentAppVersion={currentAppVersion} />
					</TreeContent>
				</TreeScreen>
			</MainTreeContent>
		</MainTree>
	);
};

export default Component;
