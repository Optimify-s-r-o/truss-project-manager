import * as React from 'react';
import * as Yup from 'yup';
import BottomLink from '../components/BottomLink';
import FormikRow from '../../../components/Optimify/Form/FormikRow';
import { Button, PlainButton } from '../../../components/Optimify/Button';
import { Center, Form } from '../../../constants/globalStyles';
import { Container, Headline } from './_styles';
import { Enter } from 'src/components/KeyBoardEventHandler';
import { Input } from '../../../constants/enum';
import { Link } from 'react-router-dom';
import { Routes } from '../../../constants/routes';
import { translationPath } from '../../../utils/getPath';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import {
	lang,
	WithTranslation,
	withTranslation,
} from "../../../translation/i18n";

export interface StateProps {
	pending: boolean;
}
export interface DispatchProps {
	resetPasswordAction: (data: string) => void;
}

export const Index = (props: WithTranslation & DispatchProps & StateProps) => {
	const { t } = useTranslation();

	const formik = useFormik({
		initialValues: { email: "" },
		enableReinitialize: true,
		validationSchema: Yup.object({
			email: Yup.string()
				.min(1, t(translationPath(lang.validation.min).path, { count: 1 }))
				.max(200, t(translationPath(lang.validation.max).path, { count: 200 }))
				.email(t(translationPath(lang.validation.email).path))
				.required(t(translationPath(lang.validation.required).path)),
		}),
		onSubmit: (values: { email: string }) => {
			props.resetPasswordAction(values.email);
		},
	});

	return (
		<Enter formik={formik}>
			<Container>
				<Headline>{t(translationPath(lang.common.lostPassword).path)}</Headline>
				<Form onSubmit={formik.handleSubmit}>
					<FormikRow
						formik={formik}
						name="email"
						title={t(translationPath(lang.common.email).path)}
						type={Input.TEXT}
					/>
					<Button
						loading={props.pending}
						fullWidth={true}
						level={1}
						noLeftMargin
					>
						{t(translationPath(lang.common.sendNewPassword).path)}
					</Button>
				</Form>
				<Center>
					<Link to={Routes.HOME}>
						<PlainButton level={1} noLeftMargin>
							{t(translationPath(lang.common.main).path)}
						</PlainButton>
					</Link>
				</Center>
			</Container>
			<BottomLink />
		</Enter>
	);
};

export default withTranslation()(Index);
