import * as React from 'react';
import lang from '../../translation/lang';
import styled from 'styled-components';
import { CreateJobFromTrussFile } from './_types';
import { getIpcRenderer, isElectron } from '../../utils/electron';
import { translationPath } from '../../utils/getPath';
import { TrussExe } from '../../types/_types';
import { Upload } from '../../components/Button';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
const Store = window.require("electron-store");
export interface OwnProps {
	createJobFromTrussFile?: (data: CreateJobFromTrussFile) => void;
	projectId: string;
}

const dropzoneRef = React.createRef();
const openDialog = () => {
	if (dropzoneRef.current) {
		(dropzoneRef.current as any).open();
	}
};

export const CreateJobFromFile = ({
	createJobFromTrussFile,
	projectId,
}: OwnProps) => {
	const { t } = useTranslation();
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

	const onDrop = React.useCallback((acceptedFiles) => {
		readFile(acceptedFiles);
	}, null);

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
	});

	const readFile = (files: any[]) => {
		createJobFromTrussFile({
			path: files[0]?.path,
			jobName: files[0]?.name,
			projectId: projectId,
			trussExe: files[0]?.path?.includes("tr3") ? truss3DExe : truss2DExe,
			fileType: files[0]?.path?.includes("tr3")
				? TrussExe.TRUSS_3D
				: files[0]?.path?.includes("tr2")
				? TrussExe.TRUSS_2D
				: TrussExe.NONE,
		});
	};

	return (
		<Span {...getRootProps()}>
			<input {...getInputProps()} hidden />
			<Upload
				upload={() => openDialog()}
				title={t(translationPath(lang.common.createJobFromTrussFile).path)}
			/>
		</Span>
	);
};

export const Span = styled.span`
	margin-right: 4px;
`;
