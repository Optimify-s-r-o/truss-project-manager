import * as _ from 'lodash';
import * as React from 'react';
import * as Yup from 'yup';
import AttachedFiles, { FileEnum } from './AttachedFiles';
import FormikRow from '../../../components/Optimify/Form/FormikRow';
import moment from 'moment';
import { Button } from '../../../components/Optimify/Button';
import { createfromJson, CreateInEvidence, ProjectRequest } from './_types';
import { CustomersAll } from '../Lists/Customers/_types';
import { faFolderPlus } from '@fortawesome/pro-light-svg-icons';
import { Files } from './Files';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Input } from '../../../constants/enum';
import { isElectron } from '../../../utils/electron';
import { lastPathMember, translationPath } from '../../../utils/getPath';
import { RouteComponentProps } from 'react-router-dom';
import { useFormik } from 'formik';
import { UserData } from '../Accounts/_types';
import {
	ContentCard,
	Form,
	GridItem,
	GridRow,
	InputRow,
	PageHeader,
	PageTitle,
	TitleName,
	TitleSection,
} from "../../../constants/globalStyles";
import {
	lang,
	t,
	WithTranslation,
	withTranslation,
} from "../../../translation/i18n";
import {
	Customer,
	Evidence,
	Page,
	ProjectProxy,
	Settings,
} from "../../../types/_types";
import {
	MainTree,
	MainTreeContent,
	TreeButtonsRow,
	TreeContent,
	TreeScreen,
} from "../_styles";
export interface StateProps {
	all: CustomersAll[];
	projectPending: boolean;
	project: ProjectRequest;
	customersPending: boolean;
	customers: Customer[];
	settings: Settings;
	users: UserData[];
	connect?: any;
	username?: string;
	loadingCustomerAction: boolean;
	loadingCustomers: boolean;
	createdEvidence: Evidence;
	updatingCustomer: boolean;
}

export interface DispatchProps {
	saveProject: (data: ProjectRequest) => void;
	getCustomers: (data: Page) => void;
	saveProjectFromJson: (data: createfromJson) => void;
	createInEvidenceAction: (data: CreateInEvidence) => void;
	saveEvidenceCustomer: (data: Customer) => void;
	clearEvidenceAction: (data: void) => void;
}

const Index = (
	props: StateProps & DispatchProps & WithTranslation & RouteComponentProps
) => {
	const { all, clearEvidenceAction } = props;
	const [truss3DExe, setTruss3DExe] = React.useState("");
	const [truss2DExe, setTruss2DExe] = React.useState("");
	const [button, setButton] = React.useState(3);
	const [store, setStore] = React.useState(null);
	const [customerDialog, setCustomerDialog] = React.useState(false);
	const [adressDialog, setAdressDialog] = React.useState(false);

	const initialValues: ProjectRequest = {
		Files: undefined,
		Name: "",
		Description: "",
		TimeOfCreation: null,
		DateOfLastUpdate: null,
		QuotationDate: null,
		ConstructionDate: null,
		Notes: "",
		CustomerId: null,
		Customer: null,
		AssignedUser: "",
		Location: {
			CountryId: null,
			Country: "",
			RegionName: "",
			CityName: "",
			StreetName: "",
			Zip: "",
			PlaceNumber: "",
		},
		QuotationFinished: false,
		ConstructionFinished: false,
		openTruss3D: false,
		openTruss2D: false,
		trussExe: "",
	};

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: Yup.object({
			Name: Yup.string()
				.min(1, t(translationPath(lang.validation.min), { count: 1 }))
				.max(200, t(translationPath(lang.validation.max), { count: 200 }))
				.required(t(translationPath(lang.validation.required))),
		}),
		onSubmit: (values: ProjectRequest) => {
			props.saveProject({
				...values,
				ConstructionDate: moment(formik.values.ConstructionDate).isValid()
					? moment(formik.values.ConstructionDate).format()
					: null,
				QuotationDate: moment(formik.values.QuotationDate).isValid()
					? moment(formik.values.QuotationDate).format()
					: null,
			});
		},
	});

	React.useEffect(() => {
		return () => {
			clearEvidenceAction();
		};
	}, []);

	React.useEffect(() => {
		formik.setFieldValue("AssignedUser", props.username);
	}, [props.username]);

	React.useEffect(() => {
		if (isElectron()) {
			const electron = window.require("electron");
			electron.ipcRenderer.send("truss3DExePath");
			electron.ipcRenderer.send("truss2DExePath");
			const fs = electron.remote.require("fs");
			electron.ipcRenderer.on("truss3DExePath", (event, text) => {
				setTruss3DExe(text);
			});
			electron.ipcRenderer.on("truss2DExePath", (event, text) => {
				setTruss2DExe(text);
			});
		}
	}, []);

	const addCustomer = (data: string) => {
		props.saveEvidenceCustomer({
			Evidence: { Name: data },
			Person: null,
			Company: null,
		});
	};

	const saveAttachedFiles = (attachedFiles: File[]) => {
		const files = formik.values.Files;
		if (files) {
			files.concat(attachedFiles);
			formik.setFieldValue("Files", [...files, ...attachedFiles]);
		} else {
			formik.setFieldValue("Files", attachedFiles);
		}
	};

	const removeFile = (index: number) => {
		const files = formik.values.Files;
		_.pullAt(files, [index]);
		formik.setFieldValue("Files", files);
	};

	const createProjecrAndOpenTruss3D = () => {
		props.saveProject({
			...formik.values,
			ConstructionDate: moment(formik.values.ConstructionDate).isValid()
				? moment(formik.values.ConstructionDate).format()
				: null,
			QuotationDate: moment(formik.values.QuotationDate).isValid()
				? moment(formik.values.QuotationDate).format()
				: null,
			openTruss3D: true,
			trussExe: truss3DExe,
		});
	};
	const createProjecrAndOpenTruss2D = () => {
		props.saveProject({
			...formik.values,
			ConstructionDate: moment(formik.values.ConstructionDate).isValid()
				? moment(formik.values.ConstructionDate).format()
				: null,
			QuotationDate: moment(formik.values.QuotationDate).isValid()
				? moment(formik.values.QuotationDate).format()
				: null,
			openTruss2D: true,
			trussExe: truss2DExe,
		});
	};

	return (
		<MainTree>
			<MainTreeContent>
				<Form onSubmit={formik.handleSubmit}>
					<TreeScreen>
						<PageHeader>
							<PageTitle>
								<TitleSection>
									<FontAwesomeIcon
										icon={faFolderPlus as IconProp}
										color={"#fff"}
									/>
									<TitleName>
										{t(translationPath(lang.common.newProject))}
									</TitleName>
								</TitleSection>
							</PageTitle>
						</PageHeader>

						<TreeContent>
							<GridRow columns={2}>
								<GridItem fill>
									<ContentCard fullSize>
										<FormikRow
											formik={formik}
											name={lastPathMember(ProjectProxy.Name).path}
											title={t(translationPath(lang.common.projectName))}
											type={Input.TEXT}
										/>
										<FormikRow
											formik={formik}
											name={lastPathMember(ProjectProxy.Description).path}
											title={t(translationPath(lang.common.description))}
											type={Input.TEXT}
										/>
										<FormikRow
											formik={formik}
											name={lastPathMember(ProjectProxy.Notes).path}
											title={t(translationPath(lang.common.notes))}
											type={Input.TEXT}
										/>
										<FormikRow
											formik={formik}
											name={lastPathMember(ProjectProxy.CustomerId).path}
											title={t(translationPath(lang.common.customer))}
											type={Input.CUSTOMER}
											customers={props.customers}
											addCustomer={addCustomer}
											createdEvidence={props.createdEvidence}
											loading={
												props.loadingCustomerAction ||
												props.loadingCustomers ||
												props.updatingCustomer
											}
										/>
										<FormikRow
											formik={formik}
											name={lastPathMember(ProjectProxy.Location).path}
											title={t(translationPath(lang.common.address))}
											type={Input.ADDRESS_GOOGLE}
										/>
										<FormikRow
											formik={formik}
											name={lastPathMember(ProjectProxy.AssignedUser).path}
											title={t(translationPath(lang.common.assignee))}
											type={Input.SELECT}
											options={
												props.users
													? props.users?.map((value: UserData) => {
															return {
																value: value.Username,
																label: value.Username,
															};
													  })
													: []
											}
										/>
									</ContentCard>
								</GridItem>
								<Files
									removeFile={removeFile}
									saveAttachedFiles={saveAttachedFiles}
									files={formik.values.Files}
								/>
							</GridRow>

							<GridRow columns={2}>
								<GridItem fill>
									<ContentCard fullSize>
										<FormikRow
											formik={formik}
											name={lastPathMember(ProjectProxy.QuotationDate).path}
											title={t(translationPath(lang.common.quotationDate))}
											type={Input.DATE}
										/>
										<FormikRow
											formik={formik}
											name={lastPathMember(ProjectProxy.ConstructionDate).path}
											title={t(translationPath(lang.common.constructionDate))}
											type={Input.DATE}
										/>
									</ContentCard>
								</GridItem>
								<GridItem fill>
									<ContentCard fullSize>
										<InputRow>
											<AttachedFiles
												saveAttachedFiles={saveAttachedFiles}
												type={FileEnum.DRAG}
											/>
										</InputRow>
									</ContentCard>
								</GridItem>
							</GridRow>
						</TreeContent>
						<TreeButtonsRow>
							<Button
								level={2}
								loading={button === 1 && props.projectPending}
								onClick={() => {
									setButton(1);
									createProjecrAndOpenTruss3D();
								}}
								type="button"
							>
								{t(translationPath(lang.common.saveProjectAndOpenTruss3D))}
							</Button>
							{/* <Button
								level={2}
								loading={button === 2 && props.projectPending}
								onClick={() => {
									setButton(2);
									createProjecrAndOpenTruss2D();
								}}
								type="button"
							>
								{t(translationPath(lang.common.saveProjectAndOpenTruss2D))}
							</Button> */}
							<Button
								level={2}
								loading={button !== 1 && button !== 2 && props.projectPending}
							>
								{t(translationPath(lang.common.create))}
							</Button>
						</TreeButtonsRow>
					</TreeScreen>
				</Form>
			</MainTreeContent>
		</MainTree>
	);
};

export default withTranslation()(Index);
