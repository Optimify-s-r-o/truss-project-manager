import { addJsonToProject } from '../../containers/Portal/TreeView/Project/General/File/_actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import { customerAction } from '../../containers/Portal/Customer/_actions';
import { deleteProject } from '../../containers/Portal/Project/_actions';
import { EnumBody } from '../../types/_types';
import {
	Error,
	fetchSaga,
	FetchSagaReponseType,
	WildCards
	} from '../_sagas';
import { getNaturalPersonById } from '../../containers/Portal/Customer/Natural/_actions';
import { getSelectedJobs } from '../../containers/Portal/TreeView/Jobs/_actions';
import { getSelectedProjects } from '../../containers/Portal/TreeView/Projects/_actions';
import { getType } from 'typesafe-actions';
import { lang, t } from '../../translation/i18n';
import { makeFormData } from '../../utils/makeFormData';
import { Method } from '../../constants/enum';
import { push } from 'connected-react-router';
import { quickSearch } from '../../containers/Portal/FastNavigation/_actions';
import { Status } from '../../components/Toast/_types';
import { translationPath } from '../../utils/getPath';
import {
	clearNotificationAction,
	notificationAction,
} from "../../components/Toast/_actions";
import {
	changeLocalPasswordAction,
	deleteUser,
	editUser,
	getUserByUsername,
} from "../../containers/Portal/Accounts/_actions";
import {
	getEvidenceCustomer,
	saveEvidenceCustomer,
} from "../../containers/Portal/Customer/Evidence/_actions";
import {
	arest,
	getLegalPersonById,
} from "../../containers/Portal/Customer/Legal/_actions";
import {
	filterCustomers,
	filterCustomersEvidence,
	filterCustomersLegal,
	filterCustomersPerson,
	getCustomersEvidence,
	getCustomersLegal,
	getCustomersPerson,
} from "../../containers/Portal/Lists/Customers/_actions";
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
	settings,
	settingsFilter,
	usersAction,
} from "../../containers/Portal/_actions";

const setData = (
	method: Method,
	data: any,
	param: object | string | number,
	body: EnumBody,
	paramObject?: object
) => {
	if (body === EnumBody.FORM_DATA) {
		return { bodyFormData: makeFormData(data) };
	}
	switch (method) {
		case Method.POST:
		case Method.PUT:
		case Method.PATCH:
			if (!data && param) {
				return {
					param: param as string,
				};
			} else if (data && param) {
				return {
					bodyJSON: data,
					urlWildCards: param as WildCards,
				};
			} else {
				return {
					bodyJSON: data,
				};
			}
		case Method.GET:
		case Method.DELETE:
		case Method.POST:
			var isArray = param instanceof Array;
			if (typeof param === "object" && !isArray) {
				return {
					urlWildCards: param as WildCards,
				};
			} else if (paramObject) {
				return {
					paramObject: paramObject,
				};
			} else {
				return {
					param: param as string,
				};
			}
	}
};

/**
 * template for generic redux saga fetch call
 * @param action typesafe action
 * TODO add all action to action: Return...
 */
function* Call(action: ReturnType<typeof editUser.request>): Generator {
	let data: FetchSagaReponseType;
	try {
		data = yield call(
			fetchSaga,
			action.payload.url,
			action.payload.method,
			setData(
				action.payload.method,
				action.payload.data,
				action.payload.param,
				action.payload.body,
				action.payload.paramObject
			)
		);

		if (data.errorResponseData) {
			yield put(
				notificationAction({
					code: Status.ERROR,
					message: t(
						translationPath(
							lang.common[(data.errorResponseData as Error).ErrorMessage]
						)
					),
				})
			);
			yield put(action.payload.action.failure(null));
			return;
		}
		yield put(
			action.payload.action.success(
				data && data.response ? data.response : null
			)
		);
		if (
			action.payload.method !== Method.GET &&
			action.payload.successMessage === true
		) {
			yield put(
				notificationAction({
					code: Status.SUCCESS,
					message: t(translationPath(lang.common.successMessage)),
				})
			);
			if (action.payload.close) {
				window.require("electron").remote.getCurrentWindow().close();
			}
		}
		if (data && action.payload.path) yield put(push(action.payload.path));
		if (action.payload.actionsOnSuccess) {
			for (let successAction of action.payload.actionsOnSuccess) {
				yield successAction &&
					put((successAction.action as any).request({ ...successAction }));
			}
		}
	} catch (err) {
		console.log(err);
		if (action.payload.method !== Method.GET) {
			yield put(
				notificationAction({
					code: Status.ERROR,
					message: t(translationPath(lang.common.errorMessage)),
				})
			);
		}
		yield put(action.payload.action.failure(err));
	}

	yield put(clearNotificationAction());
}

export function* watchSagaCall() {
	yield takeEvery(getType(usersAction.request), Call);
	yield takeEvery(getType(settings.request), Call);
	yield takeEvery(getType(settingsFilter.request), Call);
	yield takeEvery(getType(editUser.request), Call);
	yield takeEvery(getType(deleteUser.request), Call);
	yield takeEvery(getType(customerAction.request), Call);
	yield takeEvery(getType(quickSearch.request), Call);
	yield takeEvery(getType(projectTree.request), Call);
	yield takeEvery(getType(customerTree.request), Call);
	yield takeEvery(getType(getSelectedJobs.request), Call);
	yield takeEvery(getType(getSelectedProject.request), Call);
	yield takeEvery(getType(getSelectedProjects.request), Call);
	yield takeEvery(getType(selectedJob.request), Call);
	yield takeEvery(getType(updateSelectedJob.request), Call);
	yield takeEvery(getType(projectUpdate.request), Call);
	yield takeEvery(getType(duplicateJob.request), Call);
	yield takeEvery(getType(addJsonToProject.request), Call);
	yield takeEvery(getType(deleteProject.request), Call);
	yield takeEvery(getType(arest.request), Call);
	yield takeEvery(getType(jobTree.request), Call);
	yield takeEvery(getType(deleteJob.request), Call);
	yield takeEvery(getType(getProjectFiles.request), Call);
	yield takeEvery(getType(deleteFile.request), Call);
	yield takeEvery(getType(uploadProjectFile.request), Call);
	yield takeEvery(getType(filterCustomers.request), Call);
	yield takeEvery(getType(getCustomersPerson.request), Call);
	yield takeEvery(getType(filterCustomersPerson.request), Call);
	yield takeEvery(getType(getCustomersLegal.request), Call);
	yield takeEvery(getType(filterCustomersLegal.request), Call);
	yield takeEvery(getType(getCustomersEvidence.request), Call);
	yield takeEvery(getType(filterCustomersEvidence.request), Call);
	yield takeEvery(getType(getProjectLogs.request), Call);
	yield takeEvery(getType(trussTree.request), Call);
	yield takeEvery(getType(saveEvidenceCustomer.request), Call);
	yield takeEvery(getType(treeReset.request), Call);
	yield takeEvery(getType(changeLocalPasswordAction.request), Call);
	yield takeEvery(getType(getLegalPersonById.request), Call);
	yield takeEvery(getType(getEvidenceCustomer.request), Call);
	yield takeEvery(getType(getNaturalPersonById.request), Call);
	yield takeEvery(getType(getUserByUsername.request), Call);
	yield takeEvery(getType(unlockJob.request), Call);
}
