import Dropzone from 'react-dropzone';
import File, { FileEnum } from './File';
import Moment from 'react-moment';
import React from 'react';
import { Delete, Download, Open } from '../../../../../components/Button';
import { fixed } from '../../../../../utils/formating';
import { Folder, Project, ProjectProxy } from '../../../../../types/_types';
import { get } from 'lodash';
import { getPath, translationPath } from '../../../../../utils/getPath';
import { lang, t } from '../../../../../translation/i18n';
import { Span } from './File/index';
import {
	ActionsColumn,
	ScrollableTable,
} from "../../../../../components/Optimify/Table";
import {
	CardEndTableWrapper,
	ContentCard,
	ContentRow,
	ContentSpaceBetween,
	GridItem,
	Title,
} from "../../../../../constants/globalStyles";
import {
	FileOperation,
	FileRequest,
} from "../../../../../sagas/DownloadFile/_actions";
import {
	removeFileAction,
	uploadProjectFileCall,
} from "../../../../../sagas/Fetch/actions";
import {
	FileContent,
	ProjectFile,
	ProjectFileRequest,
	ProjectUploadFileRequest,
} from "../_types";

export interface IFile {
	removeFile: (data: ProjectFileRequest) => void;
	downloadFile: (data: FileRequest) => void;
	uploadProjectFile: (data: ProjectUploadFileRequest) => void;
	project: Project;
	files: ProjectFile;
	filesUploading: boolean;
	folders: Folder;
}

export const Files = ({
	files,
	removeFile,
	downloadFile,
	uploadProjectFile,
	project,
	filesUploading,
	folders,
}: IFile) => {
	const [myFiles, setMyFiles] = React.useState([]);

	const dropzoneRef = React.createRef();

	const openDialog = () => {
		// Note that the ref is set async,
		// so it might be null at some point
		if (dropzoneRef.current) {
			(dropzoneRef.current as any).open();
		}
	};

	const onDrop = (acceptedFiles) => {
		setMyFiles([...myFiles, ...acceptedFiles]);
		readFile(acceptedFiles);
	};

	console.log(project);

	const readFile = (files: File[]) => {
		handleFileChosen(files);
	};

	const uploadFileProject = (content: any) => {
		uploadProjectFile(uploadProjectFileCall(content, project?.Id));
	};

	const handleFileChosen = (files: File[]) => {
		uploadFileProject(files);
	};

	const removeFileCall = (id: string) => {
		removeFile(removeFileAction(encodeURIComponent(id), project?.Id));
	};

	const download = (fileId: string, name: string, extension: string) => {
		let options = {
			title: "Truss Project Manager",
			defaultPath:
				folders && folders?.downloads
					? folders?.downloads + `\\${name}`
					: `C:\\${name}`,
			buttonLabel: "Save",
		};
		const { remote } = window.require("electron");
		const WIN = remote.getCurrentWindow();
		remote.dialog.showSaveDialog(WIN, options).then((result) => {
			if (result.filePath) {
				downloadFile({
					id: fileId,
					path: result.filePath,
					type: FileOperation.DOWNLOAD,
				});
			}
		});
	};

	const open = (fileId: string) => {
		downloadFile({ id: fileId, type: FileOperation.OPEN });
	};

	return (
		<GridItem fill>
			<Dropzone onDrop={(acceptedFiles) => onDrop(acceptedFiles)}>
				{({ getRootProps, getInputProps }) => (
					<Span {...getRootProps()}>
						<input {...getInputProps()} hidden />
						<ContentCard fullSize>
							<ContentSpaceBetween>
								<Title>{t(translationPath(lang.common.files))}</Title>

								<ContentRow>
									<File
										Id={get(project, getPath(ProjectProxy.Id))}
										uploadProjectFile={uploadProjectFile}
										type={FileEnum.UPLOAD_PROJECT}
										filesUploading={filesUploading}
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
										files.Files &&
										files.Files.length > 0 &&
										files.Files?.map((value: FileContent, index: number) => {
											return [
												value.Name,
												value.Extension,
												value.LastEdit,
												value.Size,
												value,
												value,
											];
										})
									}
									renderers={[
										(value: any, key: number, parent: FileContent) => {
											return value;
										},
										(value: any, key: number, parent: FileContent) => {
											return value;
										},
										(value: any, key: number, parent: FileContent) => {
											return <Moment format="DD/MM/YYYY">{value}</Moment>;
										},
										(value: any, key: number, parent: FileContent) => {
											return fixed(value / 1024, 3) + " KB";
										},
										(value: any, key: number, parent: FileContent) => {
											return (
												<ActionsColumn>
													<Open open={() => open(parent && parent.Path)} />
													&nbsp;
													<Download
														download={() =>
															download(
																parent && parent.Path,
																parent.Name,
																parent.Extension
															)
														}
													/>
													&nbsp;
													<Delete
														remove={() => removeFileCall(parent && parent.Path)}
														title={t(translationPath(lang.remove.file), {
															name: parent?.Name,
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
				)}
			</Dropzone>
		</GridItem>
	);
};
