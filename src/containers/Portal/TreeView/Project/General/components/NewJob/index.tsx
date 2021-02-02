import React, { FC } from 'react';
import styled from 'styled-components';
import Tooltip from '../../../../../../../components/Optimify/Tooltip';
import { Open } from '../../_styles';
import { translationPath } from '../../../../../../../utils/getPath';
import { TrussAction, TrussExe } from '../../../../../../../types/_types';
import {
	lang,
	t,
	WithTranslation,
	withTranslation,
} from "../../../../../../../translation/i18n";
import {
	OpenTruss,
	OpenTrussOption,
} from "../../../../../../../sagas/Truss/_actions";
import {
	getIpcRenderer,
	isElectron,
} from "../../../../../../../utils/electron";
const Store = window.require("electron-store");

export interface OwnProps {
	projectId: string;
	projectName: string;
	openTruss: (data: OpenTruss) => void;
	trussExe: TrussExe;
}

export interface JobName {
	jobName: string;
}

const Index: FC<WithTranslation & OwnProps> = ({
	trussExe,
	openTruss,
	projectId,
	projectName,
}) => {
	const [truss3DExe, setTruss3DExe] = React.useState("");
	const [truss2DExe, setTruss2DExe] = React.useState("");
	const [store, setStore] = React.useState(null);

	React.useEffect(() => {
		setStore(new Store());
	}, []);

	React.useEffect(() => {
		if (isElectron() && store) {
			setTruss3DExe(store.get("truss3DExePath"));
			setTruss2DExe(store.get("truss2DExePath"));
		}
	}, [store]);

	const openNewTruss = (_event: React.MouseEvent<HTMLElement, MouseEvent>) => {
		openTruss({
			projectId: projectId,
			jobName: projectName,
			trussExe: trussExe === TrussExe.TRUSS_3D ? truss3DExe : truss2DExe,
			fileType: trussExe,
		});
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
