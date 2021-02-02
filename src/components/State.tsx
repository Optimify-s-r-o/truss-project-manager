import * as React from 'react';
import {
  lang,
  t,
  WithTranslation,
  withTranslation
  } from '../translation/i18n';
import { translationPath } from '../utils/getPath';

export interface OwnProps {
  state: number | null | undefined;
}

const Index = (props: OwnProps & WithTranslation) => {
  return <>{t(translationPath(lang.common[props.state]))}</>;
};

export default withTranslation()(Index);
