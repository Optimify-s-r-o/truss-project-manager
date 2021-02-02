import * as React from 'react';
import styled from 'styled-components';
import { IAddJsonToProject } from './_types';
import { ProjectUploadFileRequest } from '../../_types';
import { translationPath } from '../../../../../../utils/getPath';
import { Upload } from '../../../../../../components/Button';
import { uploadProjectFileCall } from '../../../../../../sagas/Fetch/actions';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import {
	lang,
	WithTranslation,
	withTranslation,
} from "../../../../../../translation/i18n";

export enum FileEnum {
	UPLOAD_PROJECT = "UPLOAD_PROJECT",
	UPLOAD_JSON_PROJECT_JOB = "UPLOAD_JSON_PROJECT_JOB",
}
export interface OwnProps {
	addJsonRequest?: (data: IAddJsonToProject) => void;
	uploadProjectFile?: (data: ProjectUploadFileRequest) => void;
	Id: string;
	type: FileEnum;
	filesUploading?: boolean;
}

const dropzoneRef = React.createRef();
const openDialog = () => {
	// Note that the ref is set async,
	// so it might be null at some point
	if (dropzoneRef.current) {
		(dropzoneRef.current as any).open();
	}
};

const File = (props: WithTranslation & OwnProps) => {
	const { t } = useTranslation();
	const onDrop = React.useCallback((acceptedFiles) => {
		readFile(acceptedFiles);
	}, null);

	let fileReader: any;

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
	});

	const readFile = (files: File[]) => {
		handleFileChosen(files);
	};

	const uploadFileProject = (content: any) => {
		props.uploadProjectFile(uploadProjectFileCall(content, props.Id));
	};

	const handleFileRead = () => {
		const content: any = fileReader.result;
	};

	const handleFileChosen = (files: File[]) => {
		if (props.type == FileEnum.UPLOAD_PROJECT) {
			uploadFileProject(files);
			return;
		}
		fileReader = new FileReader();
		fileReader.onloadend = handleFileRead;
		fileReader.readAsText(files[0]);
	};

	return (
		<Span {...getRootProps()}>
			<input {...getInputProps()} hidden />
			<Upload
				upload={() => openDialog()}
				title={t(translationPath(lang.common.upload).path)}
				uploading={props.filesUploading}
			/>
		</Span>
	);
};

export default withTranslation()(File);

export const Span = styled.span`
	margin-right: 4px;
`;
