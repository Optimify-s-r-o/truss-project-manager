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
import { ApiURL } from '../../../../constants/api';
import { arest } from './_actions';
import { Button } from '../../../../components/Optimify/Button';
import { CustomerFetch } from '../_types';
import { CustomerRootObject, IArest } from './_types';
import { faSuitcase } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getLegalPersonByIdCall } from '../../../../sagas/Fetch/actions';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Input, Method } from '../../../../constants/enum';
import { lang, WithTranslation } from '../../../../translation/i18n';
import { Modal } from './components/Dialog';
import { RouteComponentProps, useParams } from 'react-router-dom';
import { ScrollableTable } from '../../../../components/Optimify/Table';
import { translationPath } from '../../../../utils/getPath';
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
	Company,
	Contact,
	Customer,
	Fetch,
	Settings,
	TreeType,
} from "../../../../types/_types";
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
	pendingArest: boolean;
	arestResponse: Company;
	settings: Settings;
	customer: Customer;
	customerPending: boolean;
	toast: any;
	legal: Company;
}

export interface DispatchProps {
	loadData: (data: IArest) => void;
	saveLegalPerson: (data: CustomerRootObject) => void;
	getCustomer: (data: CustomerFetch) => void;
	save: (data: Customer) => void;
	clearCustomer: () => void;
	clearArest: () => void;
	getSettings: (data: Fetch) => void;
	clearToast: () => void;
	getLegalPersonById: (data: Fetch) => void;
	clearLegal: () => void;
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
	arestResponse,
	activeTree,
	getSettings,
	settings,
	loadData,
	pending,
	pendingArest,
	save,
	legal,
	customerPending,
	clearLegal,
	getLegalPersonById,
}: WithTranslation & StateProps & DispatchProps & RouteComponentProps) => {
	const [isModalVisible, setIsModalVisible] = React.useState(false);
	const [editedPerson, setEditedPerson] = React.useState(null);
	const [contacts, setContacts] = React.useState([]);
	const { id, evidence } = useParams<{ id: string; evidence: string }>();
	const { t } = useTranslation();
	const formik = useFormik({
		initialValues:
			legal && id
				? legal
				: {
						Id: "",
						Name: "",
						Crn: "",
						VatRegNo: "",
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
			Name: Yup.string()
				.min(1, t(translationPath(lang.validation.min).path, { count: 1 }))
				.max(200, t(translationPath(lang.validation.max).path, { count: 200 }))
				.required(t(translationPath(lang.validation.required).path)),
			Crn: Yup.string()
				.min(1, t(translationPath(lang.validation.min).path, { count: 1 }))
				.max(200, t(translationPath(lang.validation.max).path, { count: 200 }))
				.required(t(translationPath(lang.validation.required).path)),
		}),
		enableReinitialize: true,
		onSubmit: (values: Company) => {
			save({
				Evidence: null,
				Person: null,
				Company: { ...values, Contacts: contacts },
				Redirect: true,
			});
		},
	});

	React.useEffect(() => {
		if (evidence && id) {
			formik.setValues({ ...formik.values, Name: evidence, Id: id });
		} else if (id) {
			getLegalPersonById(getLegalPersonByIdCall(id));
		} else {
			formik.resetForm();
		}
	}, [id, evidence]);

	React.useEffect(() => {
		return () => {
			clearLegal();
		};
	}, []);
	React.useEffect(() => {
		setContacts(legal?.Contacts || []);
	}, [legal]);

	React.useEffect(() => {
		if (arestResponse) {
			formik.setValues(arestResponse);
		}
	}, [arestResponse]);

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
				pending={customerPending}
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
												name="Crn"
												title={t(translationPath(lang.common.crn).path)}
												type={Input.TEXT}
											>
												<Upload
													upload={() =>
														loadData({
															action: arest,
															url: ApiURL.ARES,
															method: Method.GET,
															param: formik.values.Crn,
														})
													}
													title={t(translationPath(lang.common.ares).path)}
												/>
											</FormikRow>
											<FormikRow
												formik={formik}
												name="VatRegNo"
												title={t(translationPath(lang.common.vatRegNo).path)}
												type={Input.TEXT}
											/>
											<FormikRow
												formik={formik}
												name="Name"
												title={t(translationPath(lang.common.companyName).path)}
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
										: t(translationPath(lang.common.createLegalPerson).path)}
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
