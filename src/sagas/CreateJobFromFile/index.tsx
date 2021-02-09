import * as React from 'react';
import lang from '../../translation/lang';
import styled from 'styled-components';
import { CreateJobFromTrussFile } from './_types';
import { isElectron } from '../../utils/electron';
import { translationPath } from '../../utils/getPath';
import { TrussExe } from '../../types/_types';
import { Upload } from '../../components/Button';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
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
