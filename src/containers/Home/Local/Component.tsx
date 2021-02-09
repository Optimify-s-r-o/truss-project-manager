import * as React from 'react';
import * as Yup from 'yup';
import BottomLink from '../components/BottomLink';
import FormikRow from '../../../components/Optimify/Form/FormikRow';
import Loading from '../../../components/Optimify/Loading';
import { Button } from '../../../components/Optimify/Button';
import { Container, Headline } from './_styles';
import { Credentials } from '../Cloud/_types';
import { Form } from '../../../constants/globalStyles';
import { Input } from '../../../constants/enum';
import { isElectron } from '../../../utils/electron';
import { RouteComponentProps } from 'react-router-dom';
import { translationPath } from '../../../utils/getPath';
import { useFormik } from 'formik';
import { UserData } from '../../Portal/Accounts/_types';
import {
	ELECTRON_STORE_GET,
	ELECTRON_STORE_SET,
} from "src/constants/ipcConstants";
import {
	lang,
	t,
	WithTranslation,
	withTranslation,
} from "../../../translation/i18n";

interface OwnProps {
	push: any;
}

export interface StateProps {
	loadingUsers: boolean;
	pending: boolean;
	local: boolean;
	users: UserData[];
}

export interface DispatchProps {
	localLogin: (data: Credentials) => void;
	localUsers: (data: void) => void;
}

const Component = ({
	local,
	localUsers,
	localLogin,
	pending,
	users,
	loadingUsers,
}: OwnProps &
	StateProps &
	DispatchProps &
	WithTranslation &
	RouteComponentProps) => {
	const [credentials, setCredentials] = React.useState([]);

	const initialValues: Credentials = {
		username: "",
		password: "",
	};

	React.useEffect(() => {
		if (local) {
			localUsers();
		}
	}, [local]);

	React.useEffect(() => {
		if (isElectron()) {
			const electron = window.require("electron");
			electron.ipcRenderer.send(ELECTRON_STORE_GET, "local-credentials");
			const fs = electron.remote.require("fs");
			electron.ipcRenderer.on(ELECTRON_STORE_GET, (event, text) => {
				if (text) {
					setCredentials(text);
				}
			});
		}
	}, []);

	React.useEffect(() => {
		if (users && users.length > 0) {
			let password = "";
			formik.setFieldValue("username", users[0].Username);
			credentials?.forEach((value) => {
				if (value.username === users[0].Username) {
					password = value.password;
				}
			});
			formik.setFieldValue("password", password);
		}
	}, [users, credentials]);

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
				if (credentials && credentials.length > 0) {
					let found = false;
					const newCredentials = credentials?.map((value) => {
						if (value?.username === values?.username) {
							found = true;
							return {
								username: values?.username,
								password: values?.password,
							};
						}
						return value;
					});

					if (found) {
						electron.ipcRenderer.send(ELECTRON_STORE_SET, {
							name: "local-credentials",
							value: newCredentials,
						});
					} else {
						electron.ipcRenderer.send(ELECTRON_STORE_SET, {
							name: "local-credentials",
							value: [...newCredentials, values],
						});
					}
				} else {
					electron.ipcRenderer.send(ELECTRON_STORE_SET, {
						name: "local-credentials",
						value: [values],
					});
				}
			}

			localLogin(values);
		},
	});

	React.useEffect(() => {
		if (users && users.length > 0) {
			let password = "";
			formik.setFieldValue("username", formik.values.username);
			credentials?.forEach((value) => {
				if (value.username === formik.values.username) {
					password = value.password;
				}
			});
			formik.setFieldValue("password", password);
		}
	}, [formik.values.username, credentials]);

	return (
		<>
			<Container>
				<Headline> {t(translationPath(lang.common.loginLocal))}</Headline>
				<Loading
					pending={loadingUsers}
					text={t(translationPath(lang.common.loading))}
				>
					<Form onSubmit={formik.handleSubmit}>
						<FormikRow
							formik={formik}
							name="username"
							title={t(translationPath(lang.common.username))}
							titleWidth={40}
							type={Input.SELECT}
							options={
								users
									? users.map((value: UserData) => {
											return { value: value.Username, label: value.Username };
									  })
									: []
							}
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
				</Loading>
			</Container>
			<BottomLink />
		</>
	);
};

export default withTranslation()(Component);
