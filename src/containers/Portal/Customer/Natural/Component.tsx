import * as React from 'react';
import * as Yup from 'yup';
import FormikRow from '../../../../components/Optimify/Form/FormikRow';
import { Button } from '../../../../components/Optimify/Button';
import {
	Customer,
	Fetch,
	Settings,
	TreeType
	} from '../../../../types/_types';
import { CustomerFetch } from '../_types';
import { faIdCard } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Input } from '../../../../constants/enum';
import { lang, WithTranslation } from '../../../../translation/i18n';
import { NaturalPerson } from './_types';
import { RouteComponentProps, useParams } from 'react-router-dom';
import { translationPath } from '../../../../utils/getPath';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import {
	ContentCard,
	Form,
	GridItem,
	GridRow,
	Header1,
	PageHeader,
	PageTitle,
	TitleName,
	TitleSection,
} from "../../../../constants/globalStyles";
import {
	getNaturalPersonByIdCall,
	getSettingsAction,
} from "../../../../sagas/Fetch/actions";
import {
	MainTree,
	MainTreeContent,
	TreeButtonsRow,
	TreeContent,
	TreeScreen,
} from "../../_styles";

export interface StateProps {
	activeTree: TreeType;
	pending: boolean;
	settings: Settings;
	customer: Customer;
	toast: any;
	natural: NaturalPerson;
}

export interface DispatchProps {
	save: (data: Customer) => void;
	clearCustomer: () => void;
	getCustomer: (data: CustomerFetch) => void;
	getSettings: (data: Fetch) => void;
	clearToast: () => void;
	getNaturalPersonById: (data: Fetch) => void;
}

const Index = ({
	activeTree,
	getSettings,
	save,
	pending,
	settings,
	natural,
	getNaturalPersonById,
}: WithTranslation & StateProps & DispatchProps & RouteComponentProps) => {
	const { id, evidence } = useParams<{ id: string; evidence: string }>();
	const { t } = useTranslation();
	const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
	const formik = useFormik({
		initialValues:
			id && natural && !evidence
				? natural
				: {
						Id: "",
						Forename: "",
						Surname: "",
						Email: "",
						PhoneNumber: "",
						Address: {
							Country: "",
							CountryId: "",
							RegionName: "",
							CityName: "",
							StreetName: "",
							Zip: "",
							PlaceNumber: "",
						},
				  },
		enableReinitialize: true,
		validationSchema: Yup.object({
			Surname: Yup.string()
				.min(1, t(translationPath(lang.validation.min).path, { count: 1 }))
				.max(200, t(translationPath(lang.validation.max).path, { count: 200 }))
				.required(t(translationPath(lang.validation.required).path)),
			Phone: Yup.string().matches(
				phoneRegExp,
				t(translationPath(lang.validation.phone).path)
			),
		}),
		onSubmit: (values: any) => {
			save({
				Evidence: null,
				Person: values,
				Company: null,
				Redirect: true,
			});
		},
	});

	React.useEffect(() => {
		getSettings(getSettingsAction());
		if (evidence && id) {
			formik.setValues({ ...formik.values, Surname: evidence, Id: id });
		} else if (id) {
			getNaturalPersonById(getNaturalPersonByIdCall(id));
		}
	}, [id, evidence]);

	return (
		<MainTree>
			<MainTreeContent>
				<Form onSubmit={formik.handleSubmit}>
					<TreeScreen>
						<PageHeader>
							<PageTitle>
								<TitleSection>
									<FontAwesomeIcon icon={faIdCard as IconProp} />
									<TitleName>
										{formik.values && formik.values.Id
											? t(translationPath(lang.common.editNaturalPerson).path)
											: t(
													translationPath(lang.common.createNaturalPerson).path
											  )}
									</TitleName>
								</TitleSection>
							</PageTitle>
						</PageHeader>

						<TreeContent>
							<GridRow columns={1}>
								<GridItem fill>
									<ContentCard fullSize>
										<Header1>
											{t(translationPath(lang.common.generalInformation).path)}
										</Header1>
										<FormikRow
											formik={formik}
											name="Forename"
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
											name="Email"
											title={t(translationPath(lang.common.email).path)}
											type={Input.TEXT}
										/>
										<FormikRow
											formik={formik}
											name={"Address"}
											title={t(translationPath(lang.common.address).path)}
											type={Input.ADDRESS_GOOGLE}
										/>
									</ContentCard>
								</GridItem>
							</GridRow>
						</TreeContent>
						<TreeButtonsRow>
							<Button level={1} loading={pending}>
								{id
									? t(translationPath(lang.common.save).path)
									: t(translationPath(lang.common.createNewNatural).path)}
							</Button>
						</TreeButtonsRow>
					</TreeScreen>
				</Form>
			</MainTreeContent>
		</MainTree>
	);
};

export default Index;
