import * as React from 'react';
import styled from 'styled-components';
import Tooltip from '../../../../../../components/Optimify/Tooltip';
import { ActionButton } from '../../../../../../components/Quotations';
import { faUpload } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { lang } from '../../../../../../translation/i18n';
import { translationPath } from '../../../../../../utils/getPath';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { ViewerRequest } from '../_types';

interface Files {
  uploadModelPostAction: (data: ViewerRequest) => void;
  id: string;
}

const dropzoneRef = React.createRef();
const openDialog = () => {
  // Note that the ref is set async,
  // so it might be null at some point
  if (dropzoneRef.current) {
    (dropzoneRef.current as any).open();
  }
};

export const File = ({ uploadModelPostAction, id }: Files) => {
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
    uploadModelPostAction({ Id: id, Files: content });
  };

  const handleFileRead = () => {
    const content: any = fileReader.result;
  };

  const handleFileChosen = (files: File[]) => {
    uploadFileProject(files);
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(files[0]);
  };

  return (
    <Span {...getRootProps()}>
      <input {...getInputProps()} hidden />
      <Tooltip
        title={t(translationPath(lang.common.upload).path)}
        placement={'bottom'}
      >
        <ActionButton onClick={openDialog}>
          <FontAwesomeIcon icon={faUpload} />
          {t(translationPath(lang.viewer.upload).path)}
        </ActionButton>
      </Tooltip>
    </Span>
  );
};

export const Span = styled.span`
  margin-right: 4px;
`;
