import * as React from 'react';
import * as Yup from 'yup';
import FormikRow from '../../../../components/Optimify/Form/FormikRow';
import { ApiURL } from '../../../../constants/api';
import { Button } from '../../../../components/Optimify/Button';
import { editUser } from '../_actions';
import { faUserPlus } from '@fortawesome/pro-light-svg-icons';
import { Fetch } from '../../../../types/_types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getUserByUsernameCall } from '../../../../sagas/Fetch/actions';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Input, Method } from '../../../../constants/enum';
import { lang } from '../../../../translation/i18n';
import { Routes } from '../../../../constants/routes';
import { translationPath } from '../../../../utils/getPath';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import { User, UserData } from '../_types';
import { useTranslation } from 'react-i18next';
import {
	ContentCard,
	Form,
	GridItem,
	GridRow,
	PageHeader,
	PageTitle,
	TitleName,
	TitleSection,
} from "../../../../constants/globalStyles";
import {
	MainTree,
	MainTreeContent,
	TreeButtonsRow,
	TreeContent,
	TreeScreen,
} from "../../_styles";

interface OwnProps {
	push: any;
}

export interface StateProps {
	routerState: any;
	users: UserData[];
	pending: boolean;
	toast: any;
	user: UserData;
}

export interface DispatchProps {
	editUserCall: (data: User) => void;
	clearToast: () => void;
	getUserByUsername: (data: Fetch) => void;
	push: any;
}

export const Component = ({
	editUserCall,
	pending,
	user,
	getUserByUsername,
}: OwnProps & StateProps & DispatchProps) => {
	const { t } = useTranslation();
	const { username } = useParams<{ username: string }>();
	React.useEffect(() => {
		if (username) {
			getUserByUsername(getUserByUsernameCall(username));
		}
	}, [username]);

	const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
	const formik = useFormik({
		initialValues:
			username && user
				? user
				: {
						Id: null,
						Username: "",
						Email: "",
						Name: "",
						Surname: "",
						PhoneNumber: "",
						Password: "",
						Role: "DESIGNENGINEER",
				  },
		enableReinitialize: true,
		validationSchema: Yup.object({
			Name: Yup.string()
				.min(1, t(translationPath(lang.validation.min).path, { count: 1 }))
				.max(200, t(translationPath(lang.validation.max).path, { count: 200 }))
				.required(t(translationPath(lang.validation.required).path)),
			Surname: Yup.string()
				.min(1, t(translationPath(lang.validation.min).path, { count: 1 }))
				.max(200, t(translationPath(lang.validation.max).path, { count: 200 }))
				.required(t(translationPath(lang.validation.required).path)),
			Email: Yup.string()
				.email(t(translationPath(lang.validation.email).path))
				.min(1, t(translationPath(lang.validation.min).path, { count: 1 }))
				.max(200, t(translationPath(lang.validation.max).path, { count: 200 }))
				.required(t(translationPath(lang.validation.required).path)),
			Password: Yup.string().test(
				"password",
				t(translationPath(lang.validation.required).path),
				(value) => {
					return formik.values.Id || (value && value?.length !== 0);
				}
			),
			PhoneNumber: Yup.string().matches(
				phoneRegExp,
				t(translationPath(lang.validation.phone).path)
			),
		}),
		onSubmit: (values: UserData) => {
			editUserCall({
				action: editUser,
				data: {
					Id: values.Id,
					Username: values.Username,
					Email: values.Email,
					Name: values.Name,
					Surname: values.Surname,
					PhoneNumber: values.PhoneNumber,
					Password: values.Password,
					Role: values.Role,
				},
				method: Method.PUT,
				url: ApiURL.USERS,
				successMessage: true,
				path: Routes.USERS,
			});
		},
	});

	return (
		<MainTree>
			<MainTreeContent>
				<Form onSubmit={formik.handleSubmit}>
					<TreeScreen>
						<PageHeader>
							<PageTitle>
								<TitleSection>
									<FontAwesomeIcon icon={faUserPlus as IconProp} />
									<TitleName>
										{username
											? t(translationPath(lang.common.editAccount).path)
											: t(translationPath(lang.common.addAccount).path)}
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
											name="Name"
											title={t(translationPath(lang.common.forename).path)}
											type={Input.TEXT}
										/>
										<FormikRow
											formik={formik}
											name="Surname"
											title={t(translationPath(lang.common.surname).path)}
											type={Input.TEXT}
										/>
										<FormikRow
											formik={formik}
											name="PhoneNumber"
											title={t(translationPath(lang.common.phone).path)}
											type={Input.PHONE}
										/>
										<FormikRow
											formik={formik}
											name="Role"
											title={t(translationPath(lang.common.account.role).path)}
											type={Input.SELECT}
											options={
												formik.values?.Role === "ORGANIZATIONADMIN"
													? [
															{
																value: "ORGANIZATIONADMIN",
																label: t(
																	translationPath(
																		lang.common.account["ORGANIZATIONADMIN"]
																	).path
																),
															},
													  ]
													: [
															{
																value: "DESIGNENGINEER",
																label: t(
																	translationPath(
																		lang.common.account["DESIGNENGINEER"]
																	).path
																),
															},
															{
																value: "VIEWER",
																label: t(
																	translationPath(lang.common.account["VIEWER"])
																		.path
																),
															},
													  ]
											}
										/>
										<FormikRow
											formik={formik}
											name="Email"
											title={t(translationPath(lang.common.emailUsername).path)}
											type={Input.TEXT}
										/>
										{formik.values && formik.values.Id ? (
											<></>
										) : (
											<FormikRow
												formik={formik}
												name="Password"
												title={t(translationPath(lang.common.password).path)}
												type={Input.PASSWORD}
											/>
										)}
									</ContentCard>
								</GridItem>
							</GridRow>
						</TreeContent>
						<TreeButtonsRow>
							<Button level={2} loading={pending}>
								{username
									? t(translationPath(lang.common.save).path)
									: t(translationPath(lang.common.createAccount).path)}
							</Button>
						</TreeButtonsRow>
					</TreeScreen>
				</Form>
			</MainTreeContent>
		</MainTree>
	);
};

export default Component;
