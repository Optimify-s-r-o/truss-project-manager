import { Alert, Button as SButton, Modal } from "antd";
import { useFormik } from "formik";
import _ from "lodash";
import moment from "moment";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Enter } from "src/components/KeyBoardEventHandler";
import { Customer } from "src/containers/Portal/Customer/_types";
import { formatCurrency } from "src/utils/currencyFormat";
import * as Yup from "yup";
import { Button } from "../../../../../components/Optimify/Button";
import DataRow from "../../../../../components/Optimify/Form/DataRow";
import FormikRow from "../../../../../components/Optimify/Form/FormikRow";
import RouteLeavingGuard from "../../../../../components/Prompt";
import { Input } from "../../../../../constants/enum";
import {
	ContentCard,
	Form,
	GridItem,
	GridRow,
	Header2,
} from "../../../../../constants/globalStyles";
import { CreateJobFromTrussFile } from "../../../../../sagas/CreateJobFromFile/_types";
import { FileRequest } from "../../../../../sagas/DownloadFile/_actions";
import { EditTruss, OpenTruss } from "../../../../../sagas/Truss/_actions";
import {
	lang,
	t,
	WithTranslation,
	withTranslation,
} from "../../../../../translation/i18n";
import {
	Folder,
	Page,
	Project,
	ProjectProxy,
	Settings,
	TreeType,
} from "../../../../../types/_types";
import { lastPathMember, translationPath } from "../../../../../utils/getPath";
import { UserData } from "../../../Accounts/_types";
import { CreateCustomer } from "../../../Customer/_types";
import { CustomersAll } from "../../../Lists/Customers/_types";
import { DeleteProject } from "../../../Project/_types";
import {
	MainTreeContent,
	TreeButtonsRow,
	TreeContent,
	TreeScreen,
} from "../../../_styles";
import { DeleteJob, RequestDownloadLink, Unlock } from "../../Job/_types";
import { SelectedProjectsRequest } from "../../Projects/_types";
import { Header } from "../components/Header";
import {
	ProjectFile,
	ProjectFileRequest,
	ProjectLog,
	ProjectLogsRequest,
	ProjectUploadFileRequest,
} from "../_types";
import { DateWithCheckbox } from "./components/DateWithCheckbox";
import { IAddJsonToProject } from "./File/_types";
import { Files } from "./Files";
import Jobs from "./Jobs";
export interface StateProps {
	all: CustomersAll[];
	activeTree: TreeType;
	project: Project;
	routerState: any;
	users: UserData[];
	settings: Settings;
	customers: Customer[];
	pending: boolean;
	files: ProjectFile;
	history: any;
	logs: ProjectLog[];
	duplicateId: string;
	duplicatePending: boolean;
	selectedKeys?: string[];
	filesUploading: boolean;
	loadingCustomerAction: boolean;
	loadingCustomers: boolean;
	newCustomer: Customer;
	updatingCustomer: boolean;
	folders: Folder;
}

export interface DispatchProps {
	updateProject: (data: Project) => void;
	addJsonRequest: (data: IAddJsonToProject) => void;
	editTruss: (data: EditTruss) => void;
	createTruss: (data: OpenTruss) => void;
	duplicateJob: (data: string) => void;
	removeJob: (data: DeleteJob) => void;
	removeFile: (data: ProjectFileRequest) => void;
	getFiles: (data: ProjectFileRequest) => void;
	downloadFile: (data: FileRequest) => void;
	uploadProjectFile: (data: ProjectUploadFileRequest) => void;
	selectedProjectRequest: (data: SelectedProjectsRequest) => void;
	getUsers: (data: Page) => void;
	getLogs: (data: ProjectLogsRequest) => void;
	setSelectedKeys: (data: string[]) => void;
	setExpandedKeys: (data: string[]) => void;
	createJobFromTrussFile?: (data: CreateJobFromTrussFile) => void;
	unlockJob: (data: Unlock) => void;
	createCustomerAction: (data: CreateCustomer) => void;
	removeProject: (data: DeleteProject) => void;
	downloadJob: (data: RequestDownloadLink) => void;
}
let globalCallback = null;
export interface JobName {
	jobName: string;
}
const Index = ({
	removeProject,
	addJsonRequest,
	activeTree,
	duplicateJob,
	files,
	history,
	createTruss,
	editTruss,
	removeJob,
	removeFile,
	downloadFile,
	uploadProjectFile,
	getFiles,
	duplicateId,
	duplicatePending,
	settings,
	updateProject,
	project,
	users,
	all,
	customers,
	pending,
	setSelectedKeys,
	setExpandedKeys,
	downloadJob,
	createJobFromTrussFile,
	unlockJob,
	createCustomerAction,
	filesUploading,
	loadingCustomerAction,
	loadingCustomers,
	updatingCustomer,
	newCustomer,
	folders,
}: WithTranslation & StateProps & DispatchProps & RouteComponentProps) => {
	const [alertDialog, setAlertDialog] = React.useState(false);
	const formik = useFormik({
		initialValues: project,
		enableReinitialize: true,
		validationSchema: Yup.object({}),
		onSubmit: (values: Project) => {
			updateProject({
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

	const addCustomer = (data: string) => {
		createCustomerAction({
			Company: data,
			Redirect: false,
			Address: {
				Country: "",
				CountryId: "",
				RegionName: "",
				CityName: "",
				StreetName: "",
				Zip: "",
				PlaceNumber: "",
			},
		});
	};

	const equal = (var1: Project, var2: Project, location?: any): boolean => {
		if (
			var1?.Name === var2?.Name &&
			var1?.Description === var2?.Description &&
			var1?.Notes === var2?.Notes &&
			var1?.CustomerId === var2?.CustomerId &&
			_.isEqual(var1?.Location, var2?.Location) &&
			var1?.AssignedUser === var2?.AssignedUser &&
			var1?.DateOfLastUpdate === var2?.DateOfLastUpdate &&
			var1?.QuotationDate === var2?.QuotationDate &&
			var1?.ConstructionDate === var2?.ConstructionDate &&
			var1?.ConstructionFinished === var2?.ConstructionFinished &&
			var1?.QuotationFinished === var2?.QuotationFinished &&
			_.isEqual(var1?.Jobs, var2?.Jobs)
		) {
			return true;
		}

		return false;
	};

	const leavingGuard = (callback) => {
		if (equal(formik.values, project)) {
			callback && callback();
			return;
		}
		globalCallback = callback;
		setAlertDialog(true);
	};

	const leave = () => {
		if (globalCallback) {
			globalCallback();
			setAlertDialog(false);
		}
	};

	const saveAndLeave = () => {
		if (globalCallback) {
			updateProject({
				...formik.values,
				ConstructionDate: moment(formik.values.ConstructionDate).isValid()
					? moment(formik.values.ConstructionDate).format()
					: null,
				QuotationDate: moment(formik.values.QuotationDate).isValid()
					? moment(formik.values.QuotationDate).format()
					: null,
				callback: globalCallback,
			});
			setAlertDialog(false);
		}
	};

	return (
		<Enter formik={formik}>
			<Header
				removeProject={removeProject}
				createTruss={createTruss}
				project={project}
				leavingGuard={leavingGuard}
			/>
			<MainTreeContent>
				<Form onSubmit={formik.handleSubmit}>
					<RouteLeavingGuard
						when={!equal(formik.values, project)}
						shouldBlockNavigation={(location) => {
							if (!equal(formik.values, project, location)) {
								return true;
							}
							return false;
						}}
						formik={formik}
						update={updateProject}
						setSelectedKeys={setSelectedKeys}
						type={TreeType.PROJECT}
					/>
					<TreeScreen>
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
											name={lastPathMember(ProjectProxy.Customer).path}
											title={t(translationPath(lang.common.customer))}
											type={Input.CUSTOMER}
											customers={customers}
											loading={
												loadingCustomerAction ||
												loadingCustomers ||
												updatingCustomer
											}
											newCustomer={newCustomer}
											addCustomer={addCustomer}
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
											title={t(translationPath(lang.common.user))}
											type={Input.SELECT}
											options={
												users && users?.length > 0
													? users?.map((value: UserData) => {
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
									project={project}
									files={files}
									uploadProjectFile={uploadProjectFile}
									downloadFile={downloadFile}
									removeFile={removeFile}
									filesUploading={filesUploading}
									folders={folders}
								/>
							</GridRow>
							<GridRow columns={2}>
								<GridItem fill>
									<ContentCard fullSize>
										<FormikRow
											formik={formik}
											titleWidth={40}
											disabled
											name={lastPathMember(ProjectProxy.TimeOfCreation).path}
											title={t(
												translationPath(lang.common.projectTimeOfCreation)
											)}
											type={Input.DATE}
										/>
										<DateWithCheckbox
											formik={formik}
											name={lastPathMember(ProjectProxy.QuotationDate).path}
											checkboxName={
												lastPathMember(ProjectProxy.QuotationFinished).path
											}
											title={t(translationPath(lang.common.quotationDate))}
										/>
										<DateWithCheckbox
											formik={formik}
											name={lastPathMember(ProjectProxy.ConstructionDate).path}
											checkboxName={
												lastPathMember(ProjectProxy.ConstructionFinished).path
											}
											title={t(translationPath(lang.common.constructionDate))}
										/>
									</ContentCard>
								</GridItem>
								<GridItem fill>
									<ContentCard fullSize>
										<Header2>
											{t(translationPath(lang.common.designPrice))}
										</Header2>
										<DataRow title={t(translationPath(lang.common.quotation))}>
											{formatCurrency(project?.QuotationPrice)}
										</DataRow>
										<DataRow title={t(translationPath(lang.common.production))}>
											{formatCurrency(project?.ProductionPrice)}
										</DataRow>
									</ContentCard>
								</GridItem>
							</GridRow>
							<Jobs
								activeTree={activeTree}
								project={project}
								formik={formik}
								createTruss={createTruss}
								editTruss={editTruss}
								addJsonRequest={addJsonRequest}
								duplicate={duplicateJob}
								removeJob={removeJob}
								history={history}
								duplicateId={duplicateId}
								duplicatePending={duplicatePending}
								setExpandedKeys={setExpandedKeys}
								setSelectedKeys={setSelectedKeys}
								createJobFromTrussFile={createJobFromTrussFile}
								unlockJob={unlockJob}
								equal={equal}
								leavingGuard={leavingGuard}
								folders={folders}
								downloadJob={downloadJob}
							/>
						</TreeContent>
						{!equal(formik.values, project) && (
							<TreeButtonsRow>
								<Button level={1} loading={pending}>
									{t(translationPath(lang.common.save))}
								</Button>
							</TreeButtonsRow>
						)}
					</TreeScreen>
				</Form>
				<Modal
					centered
					visible={alertDialog}
					onCancel={() => setAlertDialog(false)}
					cancelText={t(translationPath(lang.common.no))}
					okText={t(translationPath(lang.common.yes))}
					footer={[
						<SButton onClick={leave}>
							{t(translationPath(lang.common.cancel))}
						</SButton>,
						<SButton onClick={saveAndLeave} type="primary">
							{t(translationPath(lang.common.saveChanges))}
						</SButton>,
						,
					]}
				>
					<br />
					<p>
						<Alert
							message={t(translationPath(lang.common.actionWithoutSavingTitle))}
							description={t(
								translationPath(lang.common.actionWithoutSavingMessage)
							)}
							type="warning"
							showIcon
						/>
					</p>
				</Modal>
			</MainTreeContent>
		</Enter>
	);
};

export default withTranslation()(Index);
