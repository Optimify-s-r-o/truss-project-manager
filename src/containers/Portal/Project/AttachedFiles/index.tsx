import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faUpload } from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { useDropzone } from "react-dropzone";
import { IcondButtonElement } from "../../../../components/Optimify/Button/index";
import Tooltip from "../../../../components/Optimify/Tooltip";
import {
	lang,
	t,
	WithTranslation,
	withTranslation,
} from "../../../../translation/i18n";
import { translationPath } from "../../../../utils/getPath";
import { Container, Section } from "./_styles";

export enum FileEnum {
	BUTTON = "BUTTON",
	DRAG = "DRAG",
}

interface OwnProps {
	saveAttachedFiles: (files: File[]) => void;
	type: FileEnum;
}

const File = (props: WithTranslation & OwnProps) => {
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
		accept:
			"image/*, .txt, .json, .xml, .docx, .xls, .xlsx, .csv, .pdf, .dvg, .zip, .rar, .svg",
		onDrop,
	});

	const readFile = (files: File[]) => {
		handleFileChosen(files);
	};

	const handleFileChosen = (files: File[]) => {
		props.saveAttachedFiles(files);
	};

	if (props.type === FileEnum.BUTTON) {
		return (
			<span {...getRootProps()}>
				<input {...getInputProps()} hidden />
				<Tooltip
					title={t(translationPath(lang.common.upload))}
					placement={"top"}
				>
					<div>
						<IcondButtonElement type="button" iconOnly onClick={openDialog}>
							<FontAwesomeIcon icon={faUpload as IconProp} color={"#6d4b0c"} />
						</IcondButtonElement>
					</div>
				</Tooltip>
			</span>
		);
	}

	return (
		<Section>
			<Container {...getRootProps({ className: "dropzone" })}>
				<input {...getInputProps()} />
				<strong>
					<p>{t(translationPath(lang.common.attachedFiles))}</p>
				</strong>
			</Container>
		</Section>
	);
};

export default withTranslation()(File);
