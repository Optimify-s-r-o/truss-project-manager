import * as React from 'react';
import * as Yup from 'yup';
import Dialog from './components/Dialog';
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
	const [openDialog, setOpenDialog] = React.useState(false);
	const [contacts, setContacts] = React.useState<Contact[]>([]);
	const [contactIndex, setContactIndex] = React.useState<number>(null);
	const { id, evidence } = useParams<{ id: string; evidence: string }>();
	const { t } = useTranslation();
	const formik = useFormik({
		initialValues: legal
			? legal
			: {
					Id: "",
					Name: "",
					Crn: "",
					VatRegNo: "",
					Address: {
						CountryId: "",
						RegionName: "",
						CityName: "",
						StreetName: "",
						Zip: "",
						PlaceNumber: "",
					},
					Contacts: [],
			  },
		enableReinitialize: true,
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
		}
	}, [id, evidence]);

	React.useEffect(() => {
		return () => {
			clearLegal();
		};
	}, []);

	React.useEffect(() => {
		if (legal) {
			setContacts(legal?.Contacts);
		}
	}, [legal]);

	React.useEffect(() => {
		if (arestResponse) {
			formik.setValues(arestResponse);
		}
	}, [arestResponse]);

	const handleDialog = (index?: number) => {
		if (index != null) {
			setContactIndex(index);
		} else {
			setContactIndex(null);
		}
		setOpenDialog(!openDialog);
	};

	const handleClose = () => {
		setOpenDialog(!openDialog);
	};

	const removeContact = (index: number) => {
		const temp = formik.values.Contacts ? formik.values.Contacts : [];
		temp.splice(index, 1);
		formik.setFieldValue("Contacts", temp);
	};
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
												? t(translationPath(lang.common.editLegalPerson).path)
												: t(
														translationPath(lang.common.createLegalPerson).path
												  )}
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
												title={t(translationPath(lang.common.name).path)}
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
												<Add add={() => handleDialog(null)} />
											</ContentSpaceBetween>
											<CardEndTableWrapper>
												<ScrollableTable
													headers={[
														t(translationPath(lang.common.forename).path),
														t(translationPath(lang.common.email).path),
														t(translationPath(lang.common.phone).path),
														t(translationPath(lang.common.actions).path),
													]}
													sortable={[true, true, true, false]}
													data={
														contacts?.length > 0
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
														(value: any, key: number, parent: Customer) => {
															return value;
														},
														(value: any, key: number, parent: Customer) => {
															return value;
														},
														(value: any, key: number, parent: Customer) => {
															return value;
														},
														(value: any, key: number, parent: Customer) => {
															return (
																<div>
																	<Edit edit={() => handleDialog(value)} />
																	&nbsp;
																	<Delete
																		remove={() => removeContact(value)}
																		title={t(
																			translationPath(
																				lang.common.modalAccountTitle
																			).path
																		)}
																	/>
																</div>
															);
														},
													]}
												/>
											</CardEndTableWrapper>

											<Dialog
												open={openDialog}
												setContact={setContacts}
												contact={contacts}
												contactIndex={contactIndex}
												close={handleClose}
												formik={formik}
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
