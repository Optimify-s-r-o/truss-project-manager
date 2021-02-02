import * as React from 'react';
import styled from 'styled-components';
import { lang } from '../../../../translation/i18n';
import { QuotationFileImport } from '../_types';
import { translationPath } from '../../../../utils/getPath';
import { UploadPure } from '../../../../components/Button';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';

interface File {
  uploadFile?: (data: QuotationFileImport) => void;
  id: string;
  title: string;
  type: string;
}

const dropzoneRef = React.createRef();
const openDialog = () => {
  // Note that the ref is set async,
  // so it might be null at some point
  if (dropzoneRef.current) {
    (dropzoneRef.current as any).open();
  }
};

export const File = ({ id, uploadFile, title, type }: File) => {
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

  const importQuotation = (content: any) => {
    uploadFile({ File: content, Id: id, Type: type });
  };

  const handleFileRead = () => {
    const content: any = fileReader.result;
  };

  const handleFileChosen = (files: File[]) => {
    importQuotation(files);
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(files[0]);
  };

  return (
    <Span {...getRootProps()}>
      <input {...getInputProps()} hidden />
      <UploadPure
        upload={() => openDialog()}
        title={t(translationPath(lang.templates.uploadQuotationTemplate).path)}
        tooltipTitle={t(
          translationPath(lang.templates.uploadQuotationTemplateTitle).path,
          { title: title }
        )}
      />
    </Span>
  );
};

export const Span = styled.span`
  margin-right: 4px;
`;
