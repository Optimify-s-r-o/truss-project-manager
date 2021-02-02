import React from 'react';
import { ActionButton, ActionSection } from '../../../../components/Quotations';
import { Empty } from 'antd';
import { faPlusCircle } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { lang, t } from '../../../../translation/i18n';
import { QuotationColumn } from '../../../../constants/globalStyles';
import { translationPath } from '../../../../utils/getPath';

interface EmptyTemplate {
  addPriceList: () => void;
}
export const EmptyTemplate = ({ addPriceList }: EmptyTemplate) => {
  const handleAddPriceList = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    addPriceList();
  };
  return (
    <QuotationColumn>
      <Empty description={''} />
      <br />
      <ActionSection>
        <ActionButton onClick={handleAddPriceList}>
          <FontAwesomeIcon icon={faPlusCircle} />
          {t(translationPath(lang.priceLists.addPriceList))}
        </ActionButton>
      </ActionSection>
    </QuotationColumn>
  );
};
