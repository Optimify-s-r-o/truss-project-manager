import { all, fork } from 'redux-saga/effects';
import { watchCalculateProjectQuotationAction } from '../containers/Portal/TreeView/Project/_sagas';
import { watchCloudLogin } from '../containers/Home/Cloud/_sagas';
import { watchCreateJobFromTrussFileSaga } from './CreateJobFromFile/_sagas.';
import { watchCreateTruss, watchEditTruss } from './Truss/_sagas';
import { watchResetPassword } from '../containers/Home/LostPassword/_sagas';
import { watchSagaCall } from './Fetch/call';
import {
	watchGetUsersAction,
	watchRemoveUsersAction,
} from "../containers/Portal/Accounts/_sagas";
import {
	watchAresGetAction,
	watchCreateCustomerAction,
	watchGetCustomerByIdAction,
	watchGetCustomerSimplifiedAction,
	watchRemoveCustomerAction,
	watchUpdateCustomerAction,
} from "../containers/Portal/Customer/_sagas";
import {
	watchAddItemToPriceListPostAction,
	watchCreateEmptyPriceListPostAction,
	watchGetPriceListByIdAction,
	watchGetPriceListsAction,
	watchPriceListDeleteAction,
	watchPriceListDeleteItemAction,
	watchPriceListDuplicatePostAction,
	watchPriceListEditItemPutAction,
	watchPriceListPlatesGetAction,
	watchPriceListPutAction,
} from "../containers/Portal/PriceLists/_sagas";
import {
	watchProjectFromJsonSave,
	watchProjectSave,
} from "../containers/Portal/Project/_sagas";
import {
	watchQuotationAddTemplatePostAction,
	watchQuotationDeleteAction,
	watchQuotationDownloadAction,
	watchQuotationExportGetAction,
	watchQuotationExpressionPostAction,
	watchQuotationGetAction,
	watchQuotationImportPostAction,
	watchQuotationListGetAction,
	watchQuotationPostAction,
	watchQuotationPutAction,
	watchQuotationPutExpressionAction,
	watchQuotationSectionDeleteAction,
	watchQuotationSelectionGetAction,
	watchQuotationSelectionPutExpressionAction,
	watchQuotationSelectionSectionDeleteAction,
	watchQuotationSelectionSummaryPutExpressionAction,
	watchQuotationSelectionVariableDeleteAction,
	watchQuotationSummaryPutAction,
	watchQuotationTemplateDeleteAction,
	watchQuotationTemplateDuplicatePutAction,
	watchQuotationTemplatePutAction,
	watchQuotationVariableDeleteAction,
	watchQuotationVariablePostAction,
	watchQuotationVariablesGetAction,
} from "../containers/Portal/Quotations/_sagas";
import {
	watchGetOrganization,
	watchUpdateOrganization,
} from "../containers/Portal/Settings/Organization/_sagas";
import {
	watchAddToSelection,
	watchRemoveFromSelection,
	watchResetSelection,
} from "../containers/Portal/Sidebar/_sagas";
import {
	watchFilterEntitiesAction,
	watchGetCustomersAction,
	watchGetJobsAction,
	watchGetProjectsAction,
	watchGetTrussesAction,
} from "../containers/Portal/SidebarFilter/_sagas";
import {
	watchDeleteModelAction,
	watchEditModelPutAction,
	watchUploadModelPostAction,
	watchViewerGetAction,
} from "../containers/Portal/TreeView/Job/Viewer/_sagas";
import {
	watchCalculateJobQuotationAction,
	watchGetJobMaterialsAction,
	watchGetJobQuotationsAction,
	watchGetJobTrussesAction,
	watchJobImage,
	watchJobImageByName,
} from "../containers/Portal/TreeView/Job/_sagas";
import {
	watchCalculateTrussQuotationAction,
	watchGetTrussesGetAction,
	watchGetTrussMaterialsAction,
	watchGetTrussQuotationsAction,
	watchTrussImage,
} from "../containers/Portal/TreeView/Truss/_sagas";
import {
	watchDownloadFile,
	watchFileChangeRootPath,
} from "./DownloadFile/_sagas";

export const rootSaga = [
	watchCreateTruss,
	watchEditTruss,
	watchSagaCall,
	watchProjectSave,
	watchProjectFromJsonSave,
	watchDownloadFile,
	watchJobImage,
	watchTrussImage,
	watchJobImageByName,
	watchFileChangeRootPath,
	watchCreateJobFromTrussFileSaga,
	watchQuotationPostAction,
	watchQuotationPutAction,
	watchQuotationGetAction,
	watchQuotationDeleteAction,
	watchQuotationVariablesGetAction,
	watchQuotationSectionDeleteAction,
	watchQuotationVariableDeleteAction,
	watchQuotationPutExpressionAction,
	watchQuotationVariablePostAction,
	watchQuotationExpressionPostAction,
	watchQuotationSummaryPutAction,
	watchQuotationSelectionGetAction,
	watchQuotationSelectionSummaryPutExpressionAction,
	watchQuotationSelectionPutExpressionAction,
	watchCalculateProjectQuotationAction,
	watchCalculateJobQuotationAction,
	watchCalculateTrussQuotationAction,
	watchQuotationSelectionVariableDeleteAction,
	watchQuotationSelectionSectionDeleteAction,
	watchQuotationDownloadAction,
	watchUpdateOrganization,
	watchGetOrganization,
	watchViewerGetAction,
	watchUploadModelPostAction,
	watchEditModelPutAction,
	watchDeleteModelAction,
	watchGetJobTrussesAction,
	watchQuotationListGetAction,
	watchQuotationAddTemplatePostAction,
	watchQuotationTemplatePutAction,
	watchQuotationTemplateDuplicatePutAction,
	watchQuotationTemplateDeleteAction,
	watchGetPriceListsAction,
	watchGetPriceListByIdAction,
	watchCreateEmptyPriceListPostAction,
	watchAddItemToPriceListPostAction,
	watchPriceListDuplicatePostAction,
	watchPriceListPutAction,
	watchPriceListEditItemPutAction,
	watchPriceListDeleteAction,
	watchPriceListDeleteItemAction,
	watchPriceListPlatesGetAction,
	watchQuotationExportGetAction,
	watchQuotationImportPostAction,
	watchCloudLogin,
	watchResetPassword,
	watchFilterEntitiesAction,
	watchGetCustomersAction,
	watchGetProjectsAction,
	watchGetJobsAction,
	watchGetTrussesAction,
	watchAddToSelection,
	watchRemoveFromSelection,
	watchUpdateCustomerAction,
	watchCreateCustomerAction,
	watchResetSelection,
	watchGetCustomerByIdAction,
	watchGetCustomerSimplifiedAction,
	watchRemoveCustomerAction,
	watchGetTrussesGetAction,
	watchAresGetAction,
	watchRemoveUsersAction,
	watchGetUsersAction,
	watchGetTrussQuotationsAction,
	watchGetTrussMaterialsAction,
	watchGetJobMaterialsAction,
	watchGetJobQuotationsAction,
];

export type SagasType = typeof rootSaga;

export const combineSagas = (sagas: SagasType) =>
	function* appSaga() {
		yield all(sagas.map((saga) => fork(saga)));
	};
