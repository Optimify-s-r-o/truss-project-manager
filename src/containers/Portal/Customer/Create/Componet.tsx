import * as React from 'react';
import * as Yup from 'yup';
import FormikRow from '../../../../components/Optimify/Form/FormikRow';
import Loading from '../../../../components/Optimify/Loading';
import {
	Add,
	Delete,
	Edit,
	Upload
	} from '../../../../components/Button';
import { Button } from '../../../../components/Optimify/Button';
import { Contact, Page } from '../../../../types/_types';
import { CreateCustomer, Customer, CustomerProxy } from '../_types';
import { faSuitcase } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Input } from '../../../../constants/enum';
import { lang, WithTranslation } from '../../../../translation/i18n';
import { lastPathMember, translationPath } from '../../../../utils/getPath';
import { Modal } from './components/Dialog';
import { RouteComponentProps, useParams } from 'react-router-dom';
import { ScrollableTable } from '../../../../components/Optimify/Table';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import {
	CardEndTableWrapper,
	ContentCard,
	ContentSpaceBetween,
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
	MainTree,
	MainTreeContent,
	TreeButtonsRow,
	TreeContent,
	TreeScreen,
} from "../../_styles";

export interface StateProps {
	customer: Customer;
	pending: boolean;
	ares: Customer;
	aresPending: boolean;
}

export interface DispatchProps {
	createCustomerAction: (data: CreateCustomer) => void;
	getAllCustomersSimplifiedAction: (data: Page) => void;
	getCustomerByIdAction: (data: string) => void;
	updateCustomerAction: (data: Customer) => void;
	deleteCustomerAction: (data: string) => void;
	loadCompanyDataFromAres: (data: string) => void;
	clearAres: () => void;
	clearCustomerAction: () => void;
	clearToast: () => void;
}

let guid = () => {
	let s4 = () => {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	};
	return (
		s4() +
		s4() +
		"-" +
		s4() +
		"-" +
		s4() +
		"-" +
		s4() +
		"-" +
		s4() +
		s4() +
		s4()
	);
};

const Index = ({
	customer,
	pending,
	ares,
	aresPending,
	createCustomerAction,
	getAllCustomersSimplifiedAction,
	getCustomerByIdAction,
	updateCustomerAction,
	deleteCustomerAction,
	loadCompanyDataFromAres,
	clearAres,
	clearCustomerAction,
	clearToast,
}: WithTranslation & StateProps & DispatchProps & RouteComponentProps) => {
	const [isModalVisible, setIsModalVisible] = React.useState(false);
	const [editedPerson, setEditedPerson] = React.useState(null);
	const [contacts, setContacts] = React.useState([]);
	const { id } = useParams<{ id: string }>();
	const { t } = useTranslation();

	const formik = useFormik({
		initialValues:
			customer && id
				? customer
				: {
						Id: "",
						Name: "",
						Crn: "",
						VatRegNo: "",
						Company: "",
						Forename: "",
						Surname: "",
						DateOfCreation: "",
						ProjectCount: "",
						FinishedQuotationCount: "",
						FinishedProductionCount: "",
						Note: "",
						Address: {
							Country: "",
							CountryId: "",
							RegionName: "",
							CityName: "",
							StreetName: "",
							Zip: "",
							PlaceNumber: "",
						},
						Contacts: [],
				  },
		validationSchema: Yup.object({
			Company: Yup.string().test(
				"Company",
				t(translationPath(lang.validation.companyOrSurnameRequired).path),
				(value) => {
					console.log(formik.values.Surname === "");
					console.log(formik.values.Company === "");
					console.log(!!!value || !!!formik.values.Surname);
					return formik.values.Surname != "" || formik.values.Company != "";
				}
			),
			Surname: Yup.string().test(
				"Surname",
				t(translationPath(lang.validation.companyOrSurnameRequired).path),
				(value) => {
					return formik.values.Surname != "" || formik.values.Company != "";
				}
			),
		}),
		enableReinitialize: true,
		onSubmit: (values: Customer) => {
			if (customer && id) {
				updateCustomerAction({ ...values, Contacts: contacts });
				return;
			}
			createCustomerAction({ ...values, Contacts: contacts, Redirect: true });
		},
	});

	React.useEffect(() => {
		console.log(id);
		if (id) {
			getCustomerByIdAction(id);
		} else {
			formik.resetForm();
		}
	}, [id]);

	React.useEffect(() => {
		return () => {
			clearCustomerAction();
		};
	}, []);
	React.useEffect(() => {
		setContacts(customer?.Contacts || []);
	}, [customer]);

	React.useEffect(() => {
		if (ares) {
			formik.setValues({
				...formik.values,
				Company: ares.Name,
				Address: ares.Address as any,
				VatRegNo: ares.VatRegNo,
			});
		}
	}, [ares]);

	const contactFormik = useFormik({
		initialValues: {
			Id: guid(),
			Name: "",
			Description: "",
			Email: "",
			Phone: "",
		},
		validationSchema: Yup.object({
			Name: Yup.string()
				.min(1, t(translationPath(lang.validation.min).path, { count: 1 }))
				.max(200, t(translationPath(lang.validation.max).path, { count: 200 }))
				.required(t(translationPath(lang.validation.required).path)),
			Phone: Yup.string().matches(
				/^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
				t(translationPath(lang.validation.phone).path)
			),
		}),
		onSubmit: (value: Contact) => {
			if (contacts?.length === 0) {
				setContacts([value]);
			} else if (contacts?.find((e) => e.Id === value.Id)) {
				setContacts(contacts?.map((e) => (e.Id !== value.Id ? e : value)));
			} else {
				setContacts([...contacts, value]);
			}
			setIsModalVisible(false);
			setEditedPerson(null);
			contactFormik.resetForm();
		},
	});

	const addContactPerson = () => {
		contactFormik.setValues({
			Id: guid(),
			Name: "",
			Description: "",
			Email: "",
			Phone: "",
		});
		setEditedPerson(null);
		setIsModalVisible(true);
	};

	const editContact = (value: Contact) => {
		contactFormik.setValues(value);
		setEditedPerson(value);
		setIsModalVisible(true);
	};

	const removeContact = (id: string) => {
		const filtered = contacts?.filter((e) => e.Id !== id);
	};

	React.useEffect(() => {
		contactFormik.setValues({
			Id: guid(),
			Name: "",
			Description: "",
			Email: "",
			Phone: "",
		});
	}, []);

	return (
		<MainTree>
			<Loading
				text={t(translationPath(lang.common.loading).path)}
				pending={pending}
				margin
			>
				<MainTreeContent>
					<Form onSubmit={formik.handleSubmit}>
						<TreeScreen>
							<PageHeader>
								<PageTitle>
									<TitleSection>
										<FontAwesomeIcon icon={faSuitcase as IconProp} />
										<TitleName>
											{formik.values && formik.values.Id
												? t(translationPath(lang.common.editCustomer).path)
												: t(translationPath(lang.common.newCustomer).path)}
										</TitleName>
									</TitleSection>
								</PageTitle>
							</PageHeader>
							<TreeContent>
								<GridRow columns={2}>
									<GridItem fill>
										<ContentCard fullSize>
											<Header1>
												{t(
													translationPath(lang.common.generalInformation).path
												)}
											</Header1>
											<FormikRow
												formik={formik}
												name={lastPathMember(CustomerProxy.Company).path}
												title={t(translationPath(lang.common.companyName).path)}
												type={Input.TEXT}
											/>
											<FormikRow
												formik={formik}
												name={lastPathMember(CustomerProxy.Crn).path}
												title={t(translationPath(lang.common.crn).path)}
												type={Input.TEXT}
											>
												<Upload
													upload={() =>
														loadCompanyDataFromAres(formik.values.Crn)
													}
													title={t(translationPath(lang.common.ares).path)}
													uploading={aresPending}
												/>
											</FormikRow>
											<FormikRow
												formik={formik}
												name={lastPathMember(CustomerProxy.VatRegNo).path}
												title={t(translationPath(lang.common.vatRegNo).path)}
												type={Input.TEXT}
											/>
											<FormikRow
												formik={formik}
												name={lastPathMember(CustomerProxy.Surname).path}
												title={t(translationPath(lang.common.surname).path)}
												type={Input.TEXT}
											/>
											<FormikRow
												formik={formik}
												name={lastPathMember(CustomerProxy.Forename).path}
												title={t(translationPath(lang.common.forename).path)}
												type={Input.TEXT}
											/>
											<FormikRow
												formik={formik}
												name={lastPathMember(CustomerProxy.PhoneNumber).path}
												title={t(translationPath(lang.common.phone).path)}
												type={Input.PHONE}
											/>
											<FormikRow
												formik={formik}
												name={lastPathMember(CustomerProxy.Email).path}
												title={t(translationPath(lang.common.email).path)}
												type={Input.EMAIL}
											/>
											<FormikRow
												formik={formik}
												name={lastPathMember(CustomerProxy.Address).path}
												title={t(translationPath(lang.common.address).path)}
												type={Input.ADDRESS_GOOGLE}
											/>
											<FormikRow
												formik={formik}
												name={lastPathMember(CustomerProxy.DateOfCreation).path}
												title={t(
													translationPath(
														lang.common.customerDateOfCreationFilter
													).path
												)}
												type={Input.DATE}
											/>
										</ContentCard>
									</GridItem>
									<GridItem fill>
										<ContentCard fullSize>
											<ContentSpaceBetween>
												<Header1>
													{t(translationPath(lang.common.contactPerson).path)}
												</Header1>
												<Add add={() => addContactPerson()} />
											</ContentSpaceBetween>
											<CardEndTableWrapper>
												<ScrollableTable
													headers={[
														t(translationPath(lang.common.forename).path),
														t(translationPath(lang.common.email).path),
														t(translationPath(lang.common.phone).path),
														t(translationPath(lang.common.actions).path),
													]}
													sortable={[false, false, false, false]}
													data={
														contacts?.length != 0
															? contacts?.map(
																	(value: Contact, index: number) => {
																		return [
																			value.Name,
																			value.Email,
																			value.Phone,
																			index,
																			value,
																		];
																	}
															  )
															: []
													}
													renderers={[
														(value: any, key: number, parent: Contact) => {
															return value;
														},
														(value: any, key: number, parent: Contact) => {
															return value;
														},
														(value: any, key: number, parent: Contact) => {
															return value;
														},
														(value: any, key: number, parent: Contact) => {
															return (
																<div>
																	<Edit edit={() => editContact(parent)} />
																	&nbsp;
																	<Delete
																		remove={() => removeContact(parent?.Id)}
																		title={t(
																			translationPath(lang.remove.contactPerson)
																				.path,
																			{ name: parent.Name }
																		)}
																	/>
																</div>
															);
														},
													]}
												/>
											</CardEndTableWrapper>
											<Modal
												isModalVisible={isModalVisible}
												contactFormik={contactFormik}
												setIsModalVisible={setIsModalVisible}
											/>
										</ContentCard>
									</GridItem>
								</GridRow>
							</TreeContent>
							<TreeButtonsRow>
								<Button level={1} loading={pending}>
									{id
										? t(translationPath(lang.common.save).path)
										: t(translationPath(lang.common.createCustomer).path)}
								</Button>
							</TreeButtonsRow>
						</TreeScreen>
					</Form>
				</MainTreeContent>
			</Loading>
		</MainTree>
	);
};

export default Index;
