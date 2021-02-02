import React, { FC } from 'react';
import styled from 'styled-components';
import Tooltip from '../../../../../../../components/Optimify/Tooltip';
import { ContentRow } from 'src/constants/globalStyles';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Icon } from 'src/components/Icon';
import { Open } from '../../_styles';
import { translationPath } from '../../../../../../../utils/getPath';
import {
	Project,
	TrussAction,
	TrussExe,
} from "../../../../../../../types/_types";
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
	openTruss: (data: OpenTruss) => void;
	id: string;
	title?: string;
	handleSync?: (_event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
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
	handleSync,
	trussExe,
	id,
	openTruss,
	contextMenu,
	jobName,
	projectName,
}) => {
	const [, setOpen] = React.useState(false);
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

	const openEditTruss = (_event: React.MouseEvent<HTMLElement, MouseEvent>) => {
		setOpen(true);
		openTruss({
			jobId: id,
			trussExe: trussExe === TrussExe.TRUSS_3D ? truss3DExe : truss2DExe,
			fileType: trussExe,
			projectName: projectName,
			jobName: jobName,
		});
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
