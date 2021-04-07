import * as React from 'react';
import * as Yup from 'yup';
import BottomLink from '../components/BottomLink';
import FormikRow from '../../../components/Optimify/Form/FormikRow';
import styled from 'styled-components';
import { Button } from '../../../components/Optimify/Button';
import { Container, Headline } from './_styles';
import { Credentials } from './_types';
import { Enter } from 'src/components/KeyBoardEventHandler';
import { Folder } from 'src/types/_types';
import { Form } from '../../../constants/globalStyles';
import { Input } from '../../../constants/enum';
import { isElectron } from '../../../utils/electron';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Routes } from '../../../constants/routes';
import { translationPath } from '../../../utils/getPath';
import { useFormik } from 'formik';
import {
	ELECTRON_APP_GET_PATH,
	ELECTRON_STORE_GET,
	ELECTRON_STORE_SET,
} from "src/constants/ipcConstants";
import {
	lang,
	t,
	WithTranslation,
	withTranslation,
} from "../../../translation/i18n";

export interface OwnProps {
	push: any;
}

export interface StateProps {
	pending: boolean;
}

export interface DispatchProps {
	login: (data: Credentials) => void;
	setFolders: (data: Folder) => void;
}

const Component = (
	props: OwnProps &
		StateProps &
		DispatchProps &
		WithTranslation &
		RouteComponentProps
) => {
	const { login, pending, setFolders } = props;

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
			if (isElectron()) {
				const electron = window.require("electron");
				const fs = electron.remote.require("fs");
				if (process.env.NODE_ENV === "development") {
					electron.ipcRenderer.send(ELECTRON_STORE_SET, {
						name: "credentials",
						value: { username: values.username, password: values.password },
					});
				} else {
					electron.ipcRenderer.send(ELECTRON_STORE_SET, {
						name: "credentials",
						value: { username: values.username },
					});
				}
			}
			login(values);
		},
	});

	React.useEffect(() => {
		if (isElectron()) {
			const electron = window.require("electron");
			electron.ipcRenderer.send(ELECTRON_STORE_GET, "credentials");
			electron.ipcRenderer.on(ELECTRON_STORE_GET, (event, text) => {
				formik.setValues({
					username: text?.username,
					password: text?.password,
				});
			});

			electron.ipcRenderer.send(ELECTRON_APP_GET_PATH);
			electron.ipcRenderer.on(ELECTRON_APP_GET_PATH, (event, text) => {
				setFolders(text);
			});
		}
	}, []);

	return (
		<Enter formik={formik}>
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
		</Enter>
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
