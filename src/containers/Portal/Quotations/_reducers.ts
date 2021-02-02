import { getType } from 'typesafe-actions';
import { QuotationStateType } from './_types';
import {
  QuotationType,
  clearQuotation,
  quotationDeleteAction,
  quotationDownloadQuotationAction,
  quotationExpressionPostAction,
  quotationGetAction,
  quotationPostAction,
  quotationPutAction,
  quotationPutExpressionAction,
  quotationSectionDeleteAction,
  quotationSelectionGetAction,
  quotationSelectionPutAction,
  quotationSelectionSectionDeleteAction,
  quotationSelectionSummaryPutAction,
  quotationSelectionVariableDeleteAction,
  quotationVariableDeleteAction,
  quotationVariablePostAction,
  quotationVariablesGetAction,
  quotationListGetAction,
  quotationAddTemplatePostAction,
  quotationTemplateDeleteAction,
  quotationTemplateDuplicatePutAction,
  quotationTemplateExportGetAction,
  quotationTemplateImportPostAction,
} from './_actions';

const initialState: QuotationStateType = {
  error: null,
  pending: false,
  quotations: null,
  variables: null,
  quotationList: null,
  newTemplate: null,
};

export default (
  state: QuotationStateType = initialState,
  action: QuotationType
): QuotationStateType => {
  switch (action.type) {
    case getType(clearQuotation):
      return initialState;
    case getType(quotationGetAction.request):
    case getType(quotationSelectionGetAction.request):
    case getType(quotationSelectionPutAction.request):
    case getType(quotationSelectionSummaryPutAction.request):
    case getType(quotationPostAction.request):
    case getType(quotationPutAction.request):
    case getType(quotationVariablesGetAction.request):
    case getType(quotationSectionDeleteAction.request):
    case getType(quotationDeleteAction.request):
    case getType(quotationVariableDeleteAction.request):
    case getType(quotationPutExpressionAction.request):
    case getType(quotationExpressionPostAction.request):
    case getType(quotationVariablePostAction.request):
    case getType(quotationSelectionVariableDeleteAction.request):
    case getType(quotationSelectionSectionDeleteAction.request):
    case getType(quotationDownloadQuotationAction.request):
    case getType(quotationAddTemplatePostAction.request):
    case getType(quotationTemplateDuplicatePutAction.request):
    case getType(quotationTemplateExportGetAction.request):
    case getType(quotationTemplateImportPostAction.request):
      return {
        ...state,
        pending: true,
      };
    case getType(quotationListGetAction.request):
      return {
        ...state,
        pending: true,
      };
    case getType(quotationGetAction.success):
    case getType(quotationSelectionGetAction.success):
      return {
        ...state,
        pending: false,
        quotations: action.payload,
      };
    case getType(quotationVariablesGetAction.success):
      return {
        ...state,
        pending: false,
        variables: action.payload,
      };
    case getType(quotationAddTemplatePostAction.success):
      return {
        ...state,
        pending: false,
        quotations: action.payload,
      };
    case getType(quotationListGetAction.success):
      return {
        ...state,
        pending: false,
        quotationList: action.payload,
      };
    case getType(quotationPostAction.success):
    case getType(quotationPutAction.success):
    case getType(quotationPutExpressionAction.success):
    case getType(quotationDeleteAction.success):
    case getType(quotationVariableDeleteAction.success):
    case getType(quotationSectionDeleteAction.success):
    case getType(quotationExpressionPostAction.success):
    case getType(quotationVariablePostAction.success):
    case getType(quotationSelectionPutAction.success):
    case getType(quotationSelectionSummaryPutAction.success):
    case getType(quotationSelectionVariableDeleteAction.success):
    case getType(quotationSelectionSectionDeleteAction.success):
    case getType(quotationDownloadQuotationAction.success):
    case getType(quotationTemplateDeleteAction.success):
    case getType(quotationTemplateDuplicatePutAction.success):
    case getType(quotationTemplateExportGetAction.success):
    case getType(quotationTemplateImportPostAction.success):
      return {
        ...state,
        pending: false,
      };
    case getType(quotationGetAction.failure):
    case getType(quotationPostAction.failure):
    case getType(quotationPutAction.failure):
    case getType(quotationDeleteAction.failure):
    case getType(quotationVariablesGetAction.failure):
    case getType(quotationSectionDeleteAction.failure):
    case getType(quotationVariableDeleteAction.failure):
    case getType(quotationPutExpressionAction.failure):
    case getType(quotationExpressionPostAction.failure):
    case getType(quotationVariablePostAction.failure):
    case getType(quotationSelectionGetAction.failure):
    case getType(quotationSelectionPutAction.failure):
    case getType(quotationSelectionSummaryPutAction.failure):
    case getType(quotationSelectionVariableDeleteAction.failure):
    case getType(quotationSelectionSectionDeleteAction.failure):
    case getType(quotationDownloadQuotationAction.failure):
    case getType(quotationListGetAction.failure):
    case getType(quotationAddTemplatePostAction.failure):
    case getType(quotationTemplateDeleteAction.failure):
    case getType(quotationTemplateDuplicatePutAction.failure):
    case getType(quotationTemplateExportGetAction.failure):
    case getType(quotationTemplateImportPostAction.failure):
      return {
        ...state,
        error: action.payload.ErrorMessage,
        pending: false,
      };
    default:
      return state;
  }
};
