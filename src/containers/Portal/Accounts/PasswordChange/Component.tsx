import * as React from 'react';
import * as Yup from 'yup';
import FormikRow from '../../../../components/Optimify/Form/FormikRow';
import Loading from '../../../../components/Optimify/Loading';
import { ApiURL } from '../../../../constants/api';
import { Button } from '../../../../components/Optimify/Button';
import { ChangePassword, NewPassword, UserData } from '../_types';
import { editUser } from '../_actions';
import { faLock } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Input, Method } from '../../../../constants/enum';
import { Routes } from '../../../../constants/routes';
import { translationPath } from '../../../../utils/getPath';
import { useFormik } from 'formik';
import {
  PageHeader,
  PageTitle,
  TitleSection,
} from '../../../../constants/globalStyles';
import {
  ContentCard,
  Form,
  GridItem,
  GridRow,
  TitleName,
} from '../../../../constants/globalStyles';
import {
  lang,
  t,
  WithTranslation,
  withTranslation,
} from '../../../../translation/i18n';
import {
  MainTree,
  MainTreeContent,
  TreeButtonsRow,
  TreeContent,
  TreeScreen,
} from '../../_styles';
interface OwnProps {
  push: any;
}

export interface StateProps {
  routerState: any;
  users: UserData[];
  pending: boolean;
  toast: any;
}

export interface DispatchProps {
  changeLocalPasswordAction: (data: ChangePassword) => void;
  clearToast: () => void;
  push: any;
}

export const Component = (
  props: OwnProps & WithTranslation & StateProps & DispatchProps
) => {
  const { changeLocalPasswordAction, pending } = props;

  const formik = useFormik({
    initialValues: { oldPassword: '', newPassword: '', verifyPassword: '' },
    enableReinitialize: true,
    validationSchema: Yup.object({
      newPassword: Yup.string().required(
        t(translationPath(lang.common.required))
      ),
      verifyPasswor: Yup.string().oneOf(
        [Yup.ref('newPassword'), null],
        t(translationPath(lang.common.passwordMatch))
      ),
    }),
    onSubmit: (values: NewPassword) => {
      changeLocalPasswordAction({
        action: editUser,
        data: {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
          verifyPassword: values.verifyPassword,
        },
        method: Method.POST,
        url: ApiURL.USER_NEW_PASSWORD,
        successMessage: true,
        path: Routes.USERS,
      });
    },
  });

  return (
    <MainTree>
      <MainTreeContent>
        <Loading
          text={t(translationPath(lang.common.loading))}
          pending={props.pending}
          margin
        >
          <Form onSubmit={formik.handleSubmit}>
            <TreeScreen>
              <PageHeader>
                <PageTitle>
                  <TitleSection>
                    <FontAwesomeIcon icon={faLock as IconProp} />
                    <TitleName>
                      {t(translationPath(lang.common.changePassword))}
                    </TitleName>
                  </TitleSection>
                </PageTitle>
              </PageHeader>
              <TreeContent>
                <GridRow columns={1}>
                  <GridItem fill>
                    <ContentCard fullSize>
                      <FormikRow
                        formik={formik}
                        name="oldPassword"
                        title={t(translationPath(lang.common.oldPassword))}
                        type={Input.PASSWORD}
                      />
                      <FormikRow
                        formik={formik}
                        name="newPassword"
                        title={t(translationPath(lang.common.newPassword))}
                        type={Input.PASSWORD}
                      />
                      <FormikRow
                        formik={formik}
                        name="verifyPassword"
                        title={t(translationPath(lang.common.verifyPassword))}
                        type={Input.PASSWORD}
                      />
                    </ContentCard>
                  </GridItem>
                </GridRow>
              </TreeContent>
              <TreeButtonsRow>
                <Button level={2} loading={pending}>
                  {t(translationPath(lang.common.save))}
                </Button>
              </TreeButtonsRow>
            </TreeScreen>
          </Form>
        </Loading>
      </MainTreeContent>
    </MainTree>
  );
};

export default withTranslation()(Component);
