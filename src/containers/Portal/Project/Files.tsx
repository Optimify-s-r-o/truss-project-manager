import * as React from 'react';
import AttachedFiles, { FileEnum } from './AttachedFiles';
import Moment from 'react-moment';
import styled from 'styled-components';
import { Delete } from '../../../components/Button';
import { fixed } from '../../../utils/formating';
import { lang, t } from '../../../translation/i18n';
import { translationPath } from '../../../utils/getPath';
import { useDropzone } from 'react-dropzone';
import {
	ActionsColumn,
	ScrollableTable,
} from "../../../components/Optimify/Table";
import {
	CardEndTableWrapper,
	ContentCard,
	ContentRow,
	ContentSpaceBetween,
	GridItem,
	Title,
} from "../../../constants/globalStyles";

export interface IFile {
	removeFile: (index: number) => void;
	saveAttachedFiles: (attachedFiles: File[]) => void;
	files: File[];
}

export const Files = ({ files, removeFile, saveAttachedFiles }: IFile) => {
	const [myFiles, setMyFiles] = React.useState([]);

	const dropzoneRef = React.createRef();
	const openDialog = () => {
		// Note that the ref is set async,
		// so it might be null at some point
		if (dropzoneRef.current) {
			(dropzoneRef.current as any).open();
		}
	};

	const onDrop = React.useCallback((acceptedFiles) => {
		setMyFiles([...myFiles, ...acceptedFiles]);
		readFile(acceptedFiles);
	}, null);

	const { getRootProps, getInputProps } = useDropzone({
		noClick: true,
		accept:
			"image/*, .txt, .json, .xml, .docx, .xls, .xlsx, .csv, .pdf, .dvg, .zip, .rar, .svg, .mp3, .mp4",
		onDrop,
	});

	const readFile = (files: File[]) => {
		handleFileChosen(files);
	};

	const uploadFileProject = (content: any) => {
		saveAttachedFiles(content);
	};

	const handleFileChosen = (files: File[]) => {
		uploadFileProject(files);
	};

	return (
		<GridItem fill>
			<Span {...getRootProps()}>
				<input {...getInputProps()} hidden />
				<ContentCard fullSize>
					<ContentSpaceBetween>
						<Title>{t(translationPath(lang.common.files))}</Title>
						<ContentRow>
							<AttachedFiles
								saveAttachedFiles={saveAttachedFiles}
								type={FileEnum.BUTTON}
							/>
						</ContentRow>
					</ContentSpaceBetween>
					<CardEndTableWrapper>
						<ScrollableTable
							height={250}
							headers={[
								t(translationPath(lang.common.name)),
								t(translationPath(lang.common.extension)),
								t(translationPath(lang.common.dateOfCreation)),
								t(translationPath(lang.common.size)),
								t(translationPath(lang.common.actions)),
							]}
							data={
								files &&
								files &&
								files.length > 0 &&
								files?.map((value: any, index: number) => {
									return [
										value.name,
										value.extension,
										value.lastModified,
										value.size,
										null,
										value,
									];
								})
							}
							renderers={[
								(value: any, key: number, parent: File) => {
									return value;
								},
								(value: any, key: number, parent: File) => {
									return value;
								},
								(value: any, key: number, parent: File) => {
									return <Moment format="DD/MM/YYYY">{value}</Moment>;
								},
								(value: any, key: number, parent: File) => {
									return fixed(value / 1024, 3) + " KB";
								},
								(value: any, key: number, parent: any) => {
									return (
										<ActionsColumn>
											<Delete
												remove={() => removeFile(key)}
												title={t(translationPath(lang.remove.file), {
													name: parent?.name,
												})}
											/>
										</ActionsColumn>
									);
								},
							]}
						/>
					</CardEndTableWrapper>
				</ContentCard>
			</Span>
		</GridItem>
	);
};

export const Span = styled.span`
	margin-right: 4px;
`;
