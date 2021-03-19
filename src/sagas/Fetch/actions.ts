import { addJsonToProject } from '../../containers/Portal/TreeView/Project/General/File/_actions';
import { ApiURL } from '../../constants/api';
import { deleteProject } from '../../containers/Portal/Project/_actions';
import { getEvidenceCustomer } from '../../containers/Portal/Customer/Evidence/_actions';
import { getLegalPersonById } from '../../containers/Portal/Customer/Legal/_actions';
import { getNaturalPersonById } from '../../containers/Portal/Customer/Natural/_actions';
import { getProjects } from './../../containers/Portal/SidebarFilter/_actions';
import { getUserByUsername } from '../../containers/Portal/Accounts/_actions';
import { Method } from '../../constants/enum';
import { ProjectNameJobName } from '../../containers/Portal/TreeView/Job/_types';
import { Routes } from '../../constants/routes';
import { settings, settingsFilter } from '../../containers/Portal/_actions';
import { updateCustomerAction } from '../../containers/Portal/Customer/_actions';
import {
	deleteCustomer,
	filterCustomersEvidence,
	filterCustomersLegal,
	filterCustomersPerson,
	getCustomersEvidence,
	getCustomersLegal,
	getCustomersPerson,
} from "../../containers/Portal/Lists/Customers/_actions";
import {
	CustomersEvidenceFilter,
	CustomersLegalFilter,
	CustomersPersonFilter,
} from "../../containers/Portal/Lists/Customers/_types";
import {
	deleteJob,
	selectedJob,
	unlockJob,
	updateSelectedJob,
} from "../../containers/Portal/TreeView/Job/_actions";
import {
	deleteFile,
	duplicateJob,
	projectUpdate,
} from "../../containers/Portal/TreeView/Project/General/_actions";
import {
	getProjectFiles,
	getProjectLogs,
	getSelectedProject,
	uploadProjectFile,
} from "../../containers/Portal/TreeView/Project/_actions";
import {
	customerTree,
	jobTree,
	projectTree,
	treeReset,
	trussTree,
} from "../../containers/Portal/TreeView/_actions";
import {
	Customer,
	CustomerEnum,
	EnumBody,
	JobType,
	Project,
	TreeType,
} from "../../types/_types";

export const duplicateJobAction = (id: string, activeTree: TreeType) => {
	return {
		action: duplicateJob,
		method: Method.POST,
		url: ApiURL.JOB_DUPLICATE,
		param: id,
	};
};

export const removeJobAction = (id: string, activeTree: TreeType) => {
	return {
		action: deleteJob,
		url: ApiURL.JOBS,
		method: Method.DELETE,
		param: id,
		path: Routes.PROJECT_NEW,
	};
};

export const deleteCustomerAction = (
	id: string,
	activeTree: TreeType,
	type: CustomerEnum
) => {
	return {
		action: deleteCustomer,
		actionsOnSuccess: [getFiltersSettings()],
		method: Method.DELETE,
		url: ApiURL.CUSTOMERS,
		param: id,
	};
};

export const saveLegalCustomerAction = (
	value: Customer,
	activeTree: TreeType
) => {
	return {
		action: updateCustomerAction,
		actionsOnSuccess: [getFiltersSettings()],
		data: value,
		method: Method.PUT,
		url: ApiURL.CUSTOMERS,
		successMessage: true,
		path: Routes.CUSTOMER_ALL,
	};
};

export const saveNaturalCustomerAction = (
	value: Customer,
	activeTree: TreeType
) => {
	return {
		action: updateCustomerAction,
		actionsOnSuccess: [getFiltersSettings()],
		data: value,
		method: Method.PUT,
		url: ApiURL.CUSTOMERS,
		successMessage: true,
		path: Routes.CUSTOMER_ALL,
	};
};

export const getNaturalPersonByIdCall = (id: string) => {
	return {
		action: getNaturalPersonById,
		param: id,
		method: Method.GET,
		url: ApiURL.CUSTOMERS_PERSON,
	};
};

export const saveEvidenceCustomerAction = (
	value: Customer,
	activeTree?: TreeType
) => {
	return {
		action: updateCustomerAction,
		actionsOnSuccess: [getFiltersSettings()],
		data: value,
		method: Method.PUT,
		url: ApiURL.CUSTOMERS,
		successMessage: true,
		path: Routes.CUSTOMER_ALL,
	};
};

export const saveEvidenceAction = (value: Customer, activeTree?: TreeType) => {
	return {
		action: updateCustomerAction,
		data: value,
		method: Method.PUT,
		url: ApiURL.CUSTOMERS,
	};
};

export const getEvidenceCustomerById = (id: string) => {
	return {
		action: getEvidenceCustomer,
		param: id,
		method: Method.GET,
		url: ApiURL.CUSTOMERS_EVIDENCE,
	};
};
export const updateProject = (value: Project, activeTree: TreeType) => {
	return {
		action: projectUpdate,
		actionsOnSuccess: [
			getFiltersSettings(),
			getProjectLog(value.Id),
			getSelectedProjectAction(value.Id),
		],
		method: Method.PUT,
		url: ApiURL.PROJECTS,
		data: value,
		successMessage: true,
	};
};

export const updateProjectWithoutLoadingEntity = (
	value: Project,
	activeTree?: TreeType
) => {
	return {
		action: projectUpdate,
		actionsOnSuccess: [getFiltersSettings()],
		method: Method.PUT,
		url: ApiURL.PROJECTS,
		data: value,
		successMessage: true,
	};
};

export const getJob = (id: string) => {
	return {
		action: selectedJob,
		url: ApiURL.JOB,
		method: Method.GET,
		param: id,
	};
};

export const getJobByNameWithTree = (
	paramObject: ProjectNameJobName,
	activeTree: TreeType
) => {
	return {
		action: selectedJob,
		actionsOnSuccess: [getFiltersSettings()],
		url: ApiURL.JOB,
		method: Method.GET,
		paramObject: paramObject,
	};
};

export const getJobByName = (
	paramObject: ProjectNameJobName,
	activeTree: TreeType
) => {
	return {
		action: selectedJob,
		url: ApiURL.JOB,
		method: Method.GET,
		paramObject: paramObject,
	};
};

export const getJobFetchTree = (id: string, activeTree: TreeType) => {
	return {
		action: selectedJob,
		actionsOnSuccess: [getFiltersSettings()],
		url: ApiURL.JOB,
		method: Method.GET,
		param: id,
	};
};

export const updateJob = (value: JobType, activeTree: TreeType) => {
	return {
		action: updateSelectedJob,
		actionsOnSuccess: [getFiltersSettings()],
		method: Method.PUT,
		url: ApiURL.JOBS,
		data: value,
		successMessage: true,
	};
};

export const updateJobWithoutUpdate = (value: JobType) => {
	return {
		action: updateSelectedJob,
		method: Method.PUT,
		url: ApiURL.JOBS,
		data: value,
		successMessage: true,
	};
};

export const getProjectLog = (id: string) => {
	return {
		url: ApiURL.PROJECT_LOG,
		action: getProjectLogs,
		method: Method.GET,
		param: id,
	};
};

export const getLegalCustomers = () => {
	return {
		url: ApiURL.CUSTOMERS_LEGAL,
		action: getCustomersLegal,
		method: Method.GET,
	};
};
export const getLegalPersonByIdCall = (id: string) => {
	return {
		url: ApiURL.CUSTOMERS_LEGAL,
		action: getLegalPersonById,
		param: id,
		method: Method.GET,
	};
};
export const getPersonCustomers = () => {
	return {
		url: ApiURL.CUSTOMERS_PERSON,
		action: getCustomersPerson,
		method: Method.GET,
	};
};

export const getEvidenceCustomers = () => {
	return {
		url: ApiURL.CUSTOMERS_EVIDENCE,
		action: getCustomersEvidence,
		method: Method.GET,
	};
};

export const filterLegalCustomers = (value: CustomersLegalFilter) => {
	return {
		action: filterCustomersLegal,
		method: Method.POST,
		url: ApiURL.CUSTOMERS_FILTER_COMPANY,
		data: value,
	};
};

export const filterPersonCustomers = (value: CustomersPersonFilter) => {
	return {
		action: filterCustomersPerson,
		method: Method.POST,
		url: ApiURL.CUSTOMERS_FILTER_PERSON,
		data: value,
	};
};

export const filterEvidenceCustomers = (value: CustomersEvidenceFilter) => {
	return {
		action: filterCustomersEvidence,
		method: Method.POST,
		url: ApiURL.CUSTOMERS_FILTER_EVIDENCE,
		data: value,
	};
};

export const getFiltersSettings = () => {
	return {
		action: settingsFilter,
		method: Method.GET,
		url: ApiURL.SETTINGS_FILTER,
	};
};

export const getSettingsAction = () => {
	return {
		action: settings,
		method: Method.GET,
		url: ApiURL.SETTINGS,
	};
};

export const deleteProjectRoute = (id: string, activeTree: TreeType) => {
	return {
		action: deleteProject,
		actionsOnSuccess: [getFiltersSettings()],
		url: ApiURL.PROJECTS,
		method: Method.DELETE,
		param: id,
		path: Routes.PROJECT_NEW,
	};
};

export const deleteProjectById = (id: string, activeTree: TreeType) => {
	return {
		action: deleteProject,
		actionsOnSuccess: [
			{
				action: getProjects,
				url: ApiURL.PROJECTS,
				method: Method.GET,
			},
			getFiltersSettings(),
		],
		url: ApiURL.PROJECTS,
		method: Method.DELETE,
		param: id,
	};
};

export const getUserByUsernameCall = (username: string) => {
	return {
		action: getUserByUsername,
		method: Method.GET,
		param: username,
		url: ApiURL.USERS,
	};
};

export const getProjectTree = () => {
	return {
		action: projectTree,
		method: Method.GET,
		param: {
			PageSize: 25,
			Page: 0,
			Sort: null,
		},
		url: ApiURL.PROJECT_TREE,
	};
};

export const resetTreeAction = (activeTree: TreeType) => {
	return {
		action: treeReset,
		method: Method.POST,
		url: ApiURL.TREE_RESET,
	};
};

export const getProjectsAction = (query: object) => {
	let param = query;
	if (!param) {
		param = {
			PageSize: 25,
			Page: 0,
			Sort: null,
		};
	}
	return {
		action: getProjects,
		url: ApiURL.PROJECTS,
		method: Method.GET,
		param: param,
	};
};

export const getProjectsCall = (query: object, activeTree: TreeType) => {
	return {
		action: getProjects,
		url: ApiURL.PROJECTS,
		method: Method.GET,
		param: query,
	};
};

export const getJobTree = () => {
	return {
		action: jobTree,
		method: Method.GET,
		param: {
			PageSize: 25,
			Page: 0,
			Sort: null,
		},
		url: ApiURL.JOB_TREE,
	};
};

export const getCustomerTree = () => {
	return {
		action: customerTree,
		method: Method.GET,
		param: {
			PageSize: 25,
			Page: 0,
			Sort: null,
		},
		url: ApiURL.CUSTOMER_TREE,
	};
};

export const getTrussTree = () => {
	return {
		action: trussTree,
		method: Method.GET,
		param: {
			PageSize: 25,
			Page: 0,
			Sort: null,
		},
		url: ApiURL.TRUSS_TREE,
	};
};

export const removeFileAction = (id: string, projectId: string) => {
	return {
		action: deleteFile,
		actionsOnSuccess: [
			getProjectFilesAction(projectId),
			getProjectLog(projectId),
		],
		url: ApiURL.FILES,
		method: Method.DELETE,
		param: id,
	};
};

export const getProjectFilesAction = (id: string) => {
	return {
		action: getProjectFiles,
		method: Method.GET,
		url: ApiURL.PROJECT_FILE,
		param: id,
	};
};

export const duplicateProjectJobAction = (id: string, projectId: string) => {
	return {
		action: duplicateJob,
		method: Method.POST,
		url: ApiURL.JOB_DUPLICATE,
		param: id,
	};
};

export const getSelectedProjectAction = (id: string) => {
	return {
		action: getSelectedProject,
		url: ApiURL.PROJECT_SELECTION,
		method: Method.GET,
		param: id,
	};
};

export const getSelectedProjectTreeFetch = (
	id: string,
	activeTree: TreeType
) => {
	return {
		action: getSelectedProject,
		actionsOnSuccess: [getFiltersSettings()],
		url: ApiURL.PROJECT_SELECTION,
		method: Method.GET,
		param: id,
	};
};

export const deleteJobRoute = (id: string) => {
	return {
		action: deleteJob,
		url: ApiURL.JOBS,
		method: Method.DELETE,
		param: id,
		path: Routes.PROJECT_NEW,
	};
};

export const deleteJobAction = (
	id: string,
	projectId: string,
	activeTree: TreeType
) => {
	return {
		action: deleteJob,
		actionsOnSuccess: [getProjectFilesAction(projectId)],
		url: ApiURL.JOBS,
		method: Method.DELETE,
		param: id,
	};
};

export const uploadProjectFileAction = (content: any, id: string) => {
	return {
		action: addJsonToProject,
		actionsOnSuccess: [getProjectFilesAction(id), getProjectLog(id)],
		body: EnumBody.FORM_DATA,
		url: ApiURL.PROJECT_FILE,
		method: Method.POST,
		data: { Files: content, Id: id },
	};
};

export const uploadProjectFileCall = (content: any, id: string) => {
	return {
		action: uploadProjectFile,
		actionsOnSuccess: [getProjectFilesAction(id), getProjectLog(id)],
		body: EnumBody.FORM_DATA,
		url: ApiURL.PROJECT_FILE,
		method: Method.POST,
		data: { Files: content, Id: id },
	};
};

export const unlockJobAction = (projectName: string, jobName: string) => {
	return {
		action: unlockJob,
		url: (ApiURL.JOBS +
			"/" +
			projectName +
			"/" +
			jobName +
			"/unlock") as ApiURL,
		method: Method.POST,
	};
};
