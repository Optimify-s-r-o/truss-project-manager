import React from 'react';
import SectionsPanel from '../../../../../components/Optimify/Panel/SectionsPanel';
import { RouteComponentProps, withRouter } from 'react-router';
import { Routes } from '../../../../../constants/routes';
import { translationPath } from '../../../../../utils/getPath';
import {
  faClipboardList,
  faFilter,
  faIdCard,
  faSuitcase,
  faUsers,
} from '@fortawesome/pro-duotone-svg-icons';
import {
  lang,
  t,
  WithTranslation,
  withTranslation,
} from '../../../../../translation/i18n';

interface OwnProps {
  children: React.ReactNode;
  path: string;
}

const SidebarNavigation = withTranslation()(
  (props: OwnProps & WithTranslation & RouteComponentProps) => {
    return (
      <SectionsPanel
        direction={'left'}
        initialSize={300}
        minSize={300}
        maxSize={400}
        header={faFilter}
        sections={[
          {
            icon: faUsers,
            tooltip: t(translationPath(lang.common.customersList)),
            callback: () => {
              props.history.push(Routes.CUSTOMER_ALL);
            },
            isActive:
              props.path.includes(Routes.CUSTOMER_ALL) ||
              props.path.includes(Routes.CUSTOMER_LIST),
          },
          {
            icon: faSuitcase,
            tooltip: t(translationPath(lang.common.legalPerson)),
            callback: () => {
              props.history.push(Routes.CUSTOMER_LEGAL);
            },
            isActive: props.path.includes(Routes.CUSTOMER_LEGAL),
          },
          {
            icon: faIdCard,
            tooltip: t(translationPath(lang.common.naturalPerson)),
            callback: () => {
              props.history.push(Routes.CUSTOMER_PERSON);
            },
            isActive: props.path.includes(Routes.CUSTOMER_PERSON),
          },
          {
            icon: faClipboardList,
            tooltip: t(translationPath(lang.common.evidencePerson)),
            callback: () => {
              props.history.push(Routes.CUSTOMER_EVIDENCE);
            },
            isActive: props.path.includes(Routes.CUSTOMER_EVIDENCE),
          },
        ]}
        hideThreshold={150}
      >
        {props.children}
      </SectionsPanel>
    );
  }
);

export default withRouter((props: OwnProps & RouteComponentProps) => {
  return <SidebarNavigation {...props} />;
});
