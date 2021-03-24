import React, { FC } from 'react';
import styled from 'styled-components';
import Tooltip from '../../../../../../../components/Optimify/Tooltip';
import { ContentRow } from 'src/constants/globalStyles';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Icon } from 'src/components/Icon';
import { isElectron } from '../../../../../../../utils/electron';
import { Open } from '../../_styles';
import { OpenTruss } from '../../../../../../../sagas/Truss/_actions';
import { translationPath } from '../../../../../../../utils/getPath';
import {
	lang,
	t,
	WithTranslation,
	withTranslation,
} from "../../../../../../../translation/i18n";
import {
	Project,
	TrussAction,
	TrussExe,
} from "../../../../../../../types/_types";

export interface OwnProps {
	openTruss: (data: OpenTruss) => void;
	leavingGuard?: (callback) => void;
	id: string;
	title?: string;
	project?: Project;
	trussExe: TrussExe;
	jobName: string;
	projectName: string;
	contextMenu?: boolean;
}

export interface JobName {
	jobName: string;
}

const Index: FC<WithTranslation & OwnProps> = ({
	title,
	trussExe,
	id,
	openTruss,
	contextMenu,
	jobName,
	projectName,
	leavingGuard,
}) => {
	const [truss3DExe, setTruss3DExe] = React.useState("");
	const [truss2DExe, setTruss2DExe] = React.useState("");

	React.useEffect(() => {
		if (isElectron()) {
			const electron = window.require("electron");
			electron.ipcRenderer.send("truss3DExePath");
			electron.ipcRenderer.send("truss2DExePath");
			const fs = electron.remote.require("fs");
			electron.ipcRenderer.on("truss3DExePath", (event, text) => {
				setTruss3DExe(text);
			});
			electron.ipcRenderer.on("truss2DExePath", (event, text) => {
				setTruss2DExe(text);
			});
		}
	}, []);

	const openEditTruss = (_event: React.MouseEvent<HTMLElement, MouseEvent>) => {
		if (leavingGuard) {
			leavingGuard(() =>
				openTruss({
					jobId: id,
					trussExe: trussExe === TrussExe.TRUSS_3D ? truss3DExe : truss2DExe,
					fileType: trussExe,
					projectName: projectName,
					jobName: jobName,
				})
			);
		} else {
			openTruss({
				jobId: id,
				trussExe: trussExe === TrussExe.TRUSS_3D ? truss3DExe : truss2DExe,
				fileType: trussExe,
				projectName: projectName,
				jobName: jobName,
			});
		}
	};

	return (
		<>
			{contextMenu ? (
				<ContentRow onClick={openEditTruss}>
					<span>{title}</span>
					<Icon icon={faEdit} />
				</ContentRow>
			) : (
				<Tooltip
					title={t(translationPath(lang.common.modalEditJobTitle))}
					placement={"bottom"}
				>
					{title && <span>{title}</span>}
					<Open
						onClick={openEditTruss}
						action={TrussAction.EDIT}
						truss={trussExe}
					/>
				</Tooltip>
			)}
		</>
	);
};

export const Exe = styled.div`
	margin-top: 14px;
	margin-left: 7px;
	color: ${(props) => props.theme.colors.primary.default};
	font-size: 0.6rem;
`;

export default withTranslation()(Index);
