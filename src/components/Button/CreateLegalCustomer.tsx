import React from 'react';
import Tooltip from '../Optimify/Tooltip';
import { faSuitcase } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '../Optimify/Button';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { lang } from '../../translation/i18n';
import { Link } from 'react-router-dom';
import { Routes } from '../../constants/routes';
import { translationPath } from '../../utils/getPath';
import { useTranslation } from 'react-i18next';

export const CreateLegalCustomer = () => {
  const { t } = useTranslation();
  return (
    <Tooltip
      title={t(translationPath(lang.common.createLegalPerson).path)}
      placement={'bottom'}
    >
      <Link
        to={{
          pathname: Routes.LINK_NEW_LEGAL_CUSTOMER,
        }}
      >
        <IconButton iconOnly>
          <FontAwesomeIcon icon={faSuitcase as IconProp} color={'#bb9e00'} />
        </IconButton>
      </Link>
    </Tooltip>
  );
};
