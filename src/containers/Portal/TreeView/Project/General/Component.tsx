import * as React from 'react';
import * as Yup from 'yup';
import _ from 'lodash';
import DataRow from '../../../../../components/Optimify/Form/DataRow';
import FormikRow from '../../../../../components/Optimify/Form/FormikRow';
import Jobs from './Jobs';
import moment from 'moment';
import RouteLeavingGuard from '../../../../../components/Prompt';
import { Button } from '../../../../../components/Optimify/Button';
import { CreateJobFromTrussFile } from '../../../../../sagas/CreateJobFromFile/_types';
import { CustomersAll } from '../../../Lists/Customers/_types';
import { DeleteJob, Unlock } from '../../Job/_types';
import { FileRequest } from '../../../../../sagas/DownloadFile/_actions';
import { Files } from './Files';
import { formatCurrency } from 'src/utils/currencyFormat';
import { IAddJsonToProject } from './File/_types';
import { Input } from '../../../../../constants/enum';
import { lastPathMember, translationPath } from '../../../../../utils/getPath';
import { OpenTruss } from '../../../../../sagas/Truss/_actions';
import { RouteComponentProps } from 'react-router-dom';
import { SelectedProjectsRequest } from '../../Projects/_types';
import { useFormik } from 'formik';
import { UserData } from '../../../Accounts/_types';
import {
	ContentCard,
	Form,
	GridItem,
	GridRow,
	Header2,
} from "../../../../../constants/globalStyles";
import {
	getProjectFilesAction,
	getProjectLog,
	getSelectedProjectTreeFetch,
	updateProjectWithoutLoadingEntity,
} from "../../../../../sagas/Fetch/actions";
import {
	lang,
	t,
	WithTranslation,
	withTranslation,
} from "../../../../../translation/i18n";
import {
	Customer,
	Evidence,
	Page,
	Project,
	ProjectProxy,
	Settings,
	TreeType,
} from "../../../../../types/_types";
import {
	MainTreeContent,
	TreeButtonsRow,
	TreeContent,
	TreeScreen,
} from "../../../_styles";
import {
	IProjectDuplicate,
	IProjectUpdate,
	ProjectFile,
	ProjectFileRequest,
	ProjectLog,
	ProjectLogsRequest,
	ProjectUploadFileRequest,
} from "../_types";
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
	createdEvidence: Evidence;
	updatingCustomer: boolean;
}

export interface DispatchProps {
	updateProjectRequest: (data: IProjectUpdate) => void;
	addJsonRequest: (data: IAddJsonToProject) => void;
	editTruss: (data: OpenTruss) => void;
	createTruss: (data: OpenTruss) => void;
	duplicateJob: (data: IProjectDuplicate) => void;
	removeJob: (data: DeleteJob) => void;
	removeFile: (data: ProjectFileRequest) => void;
	getFiles: (data: ProjectFileRequest) => void;
	downloadFile: (data: FileRequest) => void;
	uploadProjectFile: (data: ProjectUploadFileRequest) => void;
	selectedProjectRequest: (data: SelectedProjectsRequest) => void;
	getUsers: (data: Page) => void;
	getCustomers: (data: Page) => void;
	getLogs: (data: ProjectLogsRequest) => void;
	setSelectedKeys: (data: string[]) => void;
	setExpandedKeys: (data: string[]) => void;
	createJobFromTrussFile?: (data: CreateJobFromTrussFile) => void;
	unlockJob: (data: Unlock) => void;
	saveEvidenceCustomer: (data: Customer) => void;
}

export interface JobName {
	jobName: string;
}
const Index = ({
	selectedProjectRequest,
	getUsers,
	getCustomers,
	getLogs,
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
	updateProjectRequest,
	project,
	users,
	all,
	customers,
	pending,
	setSelectedKeys,
	setExpandedKeys,
	selectedKeys,
	createJobFromTrussFile,
	unlockJob,
	saveEvidenceCustomer,
	filesUploading,
	loadingCustomerAction,
	loadingCustomers,
	updatingCustomer,
	createdEvidence,
}: WithTranslation & StateProps & DispatchProps & RouteComponentProps) => {
	const [customerDialog, setCustomerDialog] = React.useState(false);
	const [adressDialog, setAdressDialog] = React.useState(false);

	const formik = useFormik({
		initialValues: project,
		enableReinitialize: true,
		validationSchema: Yup.object({}),
		onSubmit: (values: Project) => {
			updateProjectRequest(
				updateProjectWithoutLoadingEntity({
					...values,
					ConstructionDate: moment(formik.values.ConstructionDate).isValid()
						? moment(formik.values.ConstructionDate).format()
						: null,
					QuotationDate: moment(formik.values.QuotationDate).isValid()
						? moment(formik.values.QuotationDate).format()
						: null,
				})
			);
		},
	});

	const addCustomer = (data: string) => {
		saveEvidenceCustomer({
			Evidence: { Name: data },
			Person: null,
			Company: null,
		});
	};

	const handleSync = (_event: React.MouseEvent<HTMLElement, MouseEvent>) => {
		const id = formik.values.Id;
		selectedProjectRequest(getSelectedProjectTreeFetch(id, activeTree));
		getFiles(getProjectFilesAction(id));
		getUsers({
			PageSize: 25,
			Page: 0,
			Sort: null,
		});
		getLogs(getProjectLog(id));
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

	return (
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
					update={updateProjectRequest}
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
										name={lastPathMember(ProjectProxy.CustomerId).path}
										title={t(translationPath(lang.common.customer))}
										type={Input.CUSTOMER}
										customers={customers}
										loading={
											loadingCustomerAction ||
											loadingCustomers ||
											updatingCustomer
										}
										createdEvidence={createdEvidence}
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
											users
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
									<FormikRow
										formik={formik}
										titleWidth={40}
										name={lastPathMember(ProjectProxy.QuotationDate).path}
										title={t(translationPath(lang.common.quotationDate))}
										type={Input.DATE}
									/>
									<FormikRow
										formik={formik}
										titleWidth={40}
										name={lastPathMember(ProjectProxy.ConstructionDate).path}
										title={t(translationPath(lang.common.constructionDate))}
										type={Input.DATE}
									/>
									{/* <FormikRow
										formik={formik}
										name={lastPathMember(ProjectProxy.QuotationFinished).path}
										title={t(translationPath(lang.common.QuotationFinished))}
										type={Input.SWITCH}
									/>
									<FormikRow
										formik={formik}
										name={
											lastPathMember(ProjectProxy.ConstructionFinished).path
										}
										title={t(translationPath(lang.common.ConstructionFinished))}
										type={Input.SWITCH}
									/> */}
								</ContentCard>
							</GridItem>
							<GridItem fill>
								<ContentCard fullSize>
									<Header2>
										{t(translationPath(lang.templates.templates))}
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
							handleSync={handleSync}
							history={history}
							duplicateId={duplicateId}
							duplicatePending={duplicatePending}
							setExpandedKeys={setExpandedKeys}
							setSelectedKeys={setSelectedKeys}
							createJobFromTrussFile={createJobFromTrussFile}
							unlockJob={unlockJob}
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
		</MainTreeContent>
	);
};

export default withTranslation()(Index);
