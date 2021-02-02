import * as React from 'react';
import * as Yup from 'yup';
import BottomLink from '../components/BottomLink';
import FormikRow from '../../../components/Optimify/Form/FormikRow';
import styled from 'styled-components';
import { Button } from '../../../components/Optimify/Button';
import { Container, Headline } from './_styles';
import { Credentials } from './_types';
import { Form } from '../../../constants/globalStyles';
import { Input } from '../../../constants/enum';
import { isElectron } from '../../../utils/electron';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Routes } from '../../../constants/routes';
import { translationPath } from '../../../utils/getPath';
import { useFormik } from 'formik';
import {
	lang,
	t,
	WithTranslation,
	withTranslation,
} from "../../../translation/i18n";
const Store = window.require("electron-store");
export interface OwnProps {
	push: any;
}

export interface StateProps {
	pending: boolean;
}

export interface DispatchProps {
	login: (data: Credentials) => void;
}

const Component = (
	props: OwnProps &
		StateProps &
		DispatchProps &
		WithTranslation &
		RouteComponentProps
) => {
	const { login, pending } = props;
	const [store, setStore] = React.useState(null);
	const initialValues: Credentials = {
		username: "",
		password: "",
	};
	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: Yup.object({
			username: Yup.string()
				.min(1, t(translationPath(lang.common.min), { count: 1 }))
				.max(200, t(translationPath(lang.common.max), { count: 200 }))
				.required(t(translationPath(lang.common.required))),
			password: Yup.string()
				.min(1, t(translationPath(lang.common.min), { count: 1 }))
				.max(200, t(translationPath(lang.common.max), { count: 200 }))
				.required(t(translationPath(lang.common.required))),
		}),
		onSubmit: (values: Credentials) => {
			// TODO
			// if (isElectron()) {
			// 	const ipcRenderer = getIpcRenderer();
			// 	ipcRenderer.send("set-cloud-username", null, values.username, null);
			// }

			login(values);
		},
	});

	React.useEffect(() => {
		setStore(new Store());
	}, []);

	React.useEffect(() => {
		if (isElectron() && store) {
			formik.setFieldValue("username", store.get("cloud-username"));
		}
	}, [store]);

	return (
		<>
			<Container>
				<Headline> {t(translationPath(lang.common.loginCloud))}</Headline>
				<Form onSubmit={formik.handleSubmit}>
					<FormikRow
						formik={formik}
						name="username"
						title={t(translationPath(lang.common.username))}
						titleWidth={40}
						type={Input.TEXT}
					/>
					<FormikRow
						formik={formik}
						name="password"
						title={t(translationPath(lang.common.password))}
						titleWidth={40}
						type={Input.PASSWORD}
					/>
					<Button fullWidth={true} loading={pending} level={1} noLeftMargin>
						{t(translationPath(lang.common.submit))}
					</Button>
				</Form>
				<Row>
					<PasswordRecovery to={Routes.LOST_PASSWORD}>
						{t(translationPath(lang.common.passwordRecovery))}
					</PasswordRecovery>
				</Row>
			</Container>
			<BottomLink />
		</>
	);
};

export const Row = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
`;

const PasswordRecovery = styled(Link)`
	padding-top: 0.5em;
	text-align: start;
	color: ${(props) => props.theme.colors.primary.default};

	&:hover {
		color: ${(props) => props.theme.colors.secondaryText.hover};
		text-decoration: underline;
	}
`;

export default withTranslation()(Component);
