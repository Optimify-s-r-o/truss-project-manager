import React from 'react';
import { ActionButton, ActionSection } from '../../../../components/Quotations';
import { Empty } from 'antd';
import { faPlusCircle } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { lang, t } from '../../../../translation/i18n';
import { QuotationColumn } from '../../../../constants/globalStyles';
import { translationPath } from '../../../../utils/getPath';

interface EmptyTemplate {
  addQuotationTemplate: () => void;
}
export const EmptyTemplate = ({ addQuotationTemplate }: EmptyTemplate) => {
  const handleAddTemplate = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    addQuotationTemplate();
  };
  return (
    <QuotationColumn>
      <Empty description={''} />
      <br />
      <ActionSection>
        <ActionButton onClick={handleAddTemplate}>
          <FontAwesomeIcon icon={faPlusCircle} />
          {t(translationPath(lang.templates.addDefaultTemplate))}
        </ActionButton>
      </ActionSection>
    </QuotationColumn>
  );
};
