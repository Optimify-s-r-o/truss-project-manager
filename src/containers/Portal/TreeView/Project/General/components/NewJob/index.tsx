import React, { FC } from 'react';
import styled from 'styled-components';
import Tooltip from '../../../../../../../components/Optimify/Tooltip';
import { isElectron } from '../../../../../../../utils/electron';
import { Open } from '../../_styles';
import { OpenTruss } from '../../../../../../../sagas/Truss/_actions';
import { translationPath } from '../../../../../../../utils/getPath';
import { TrussAction, TrussExe } from '../../../../../../../types/_types';
import {
	lang,
	t,
	WithTranslation,
	withTranslation,
} from "../../../../../../../translation/i18n";

export interface OwnProps {
	projectId: string;
	projectName: string;
	openTruss: (data: OpenTruss) => void;
	trussExe: TrussExe;
	leavingGuard?: (callback) => void;
}

export interface JobName {
	jobName: string;
}

const Index: FC<WithTranslation & OwnProps> = ({
	trussExe,
	openTruss,
	projectId,
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

	const openNewTruss = (_event: React.MouseEvent<HTMLElement, MouseEvent>) => {
		if (leavingGuard) {
			leavingGuard(() =>
				openTruss({
					projectId: projectId,
					jobName: projectName,
					trussExe: trussExe === TrussExe.TRUSS_3D ? truss3DExe : truss2DExe,
					fileType: trussExe,
				})
			);
		} else {
			openTruss({
				projectId: projectId,
				jobName: projectName,
				trussExe: trussExe === TrussExe.TRUSS_3D ? truss3DExe : truss2DExe,
				fileType: trussExe,
			});
		}
	};

	return (
		<Tooltip
			title={
				trussExe === TrussExe.TRUSS_3D
					? t(translationPath(lang.common.createJobInTruss3D))
					: t(translationPath(lang.common.createJobInTruss2D))
			}
			placement={"bottom"}
			sideMargin
		>
			<Open onClick={openNewTruss} action={TrussAction.ADD} truss={trussExe} />
		</Tooltip>
	);
};

export const Button = styled.button`
	border: 1px solid;
	cursor: pointer;
	border-color: ${(props) => props.theme.colors.primary.default};
	border-radius: 3px;
	background: ${(props) => props.theme.colors.background.secondaryMenu};
	margin-top: 14px;
	padding: 7px 14px;
	color: ${(props) => props.theme.colors.primary.default};
	&:hover {
		background: ${(props) => props.theme.colors.primary.default};
		color: ${(props) => props.theme.colors.background.content};
	}
`;

export const Exe = styled.div`
	margin-top: 14px;
	margin-left: 7px;
	color: ${(props) => props.theme.colors.primary.default};
	font-size: 0.6rem;
`;

export default withTranslation()(Index);
