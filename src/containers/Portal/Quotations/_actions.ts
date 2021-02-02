import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';
import { Error } from '../../../sagas/_sagas';
import { QuotationCalculate } from '../TreeView/Project/_types';
import {
	DeleteEpression,
	QuotationFileImport,
	QuotationList,
	QuotationParam,
	QuotationRequest,
	Quotations,
	QuotationTemplatePut,
	SectionVariableRequest,
	TemplateSection,
	TemplateSectionRequest,
	Variable,
	VariableRequest,
} from "./_types";

export const quotationGetAction = createAsyncAction(
	"QUOTATION_GET_REQUEST",
	"QUOTATION_GET_SUCCESS",
	"QUOTATION_GET_FAILED"
)<QuotationParam, Quotations, Error>();

export const quotationListGetAction = createAsyncAction(
	"QUOTATION_LIST_GET_REQUEST",
	"QUOTATION_LIST_GET_SUCCESS",
	"QUOTATION_LIST_GET_FAILED"
)<QuotationParam, QuotationList[], Error>();

export const quotationSelectionGetAction = createAsyncAction(
	"QUOTATION_SELECTION_GET_REQUEST",
	"QUOTATION_SELECTION_GET_SUCCESS",
	"QUOTATION_SELECTION_GET_FAILED"
)<QuotationCalculate, Quotations, Error>();

export const quotationVariablesGetAction = createAsyncAction(
	"QUOTATION_VARIABLES_GET_REQUEST",
	"QUOTATION_VARIABLES_GET_SUCCESS",
	"QUOTATION_VARIABLES_GET_FAILED"
)<QuotationParam, Array<Variable>, Error>();

export const quotationPostAction = createAsyncAction(
	"QUOTATION_POST_REQUEST",
	"QUOTATION_POST_SUCCESS",
	"QUOTATION_POST_FAILED"
)<TemplateSectionRequest, TemplateSection, Error>();

export const quotationAddTemplatePostAction = createAsyncAction(
	"QUOTATION_TEMPLATE_POST_REQUEST",
	"QUOTATION_TEMPLATE_POST_SUCCESS",
	"QUOTATION_TEMPLATE_POST_FAILED"
)<QuotationParam, Quotations, Error>();

export const quotationTemplateExportGetAction = createAsyncAction(
	"QUOTATION_TEMPLATE_EXPORT_GET_REQUEST",
	"QUOTATION_TEMPLATE_EXPORT_GET_SUCCESS",
	"QUOTATION_TEMPLATE_EXPORT_GET_FAILED"
)<string, any, Error>();

export const quotationTemplateImportPostAction = createAsyncAction(
	"QUOTATION_TEMPLATE_IMPORT_POST_REQUEST",
	"QUOTATION_TEMPLATE_IMPORT_POST_SUCCESS",
	"QUOTATION_TEMPLATE_IMPORT_POST_FAILED"
)<QuotationFileImport, any, Error>();

export const quotationExpressionPostAction = createAsyncAction(
	"QUOTATION_EXPRESSION_POST_REQUEST",
	"QUOTATION_EXPRESSION_POST_SUCCESS",
	"QUOTATION_EXPRESSION_POST_FAILED"
)<SectionVariableRequest, void, Error>();

export const quotationVariablePostAction = createAsyncAction(
	"QUOTATION_VARIABLE_POST_REQUEST",
	"QUOTATION_VARIABLE_POST_SUCCESS",
	"QUOTATION_VARIABLE_POST_FAILED"
)<VariableRequest, void, Error>();

export const quotationPutAction = createAsyncAction(
	"QUOTATION_PUT_REQUEST",
	"QUOTATION_PUT_SUCCESS",
	"QUOTATION_PUT_FAILED"
)<TemplateSectionRequest, TemplateSection, Error>();

export const quotationTemplateDuplicatePutAction = createAsyncAction(
	"QUOTATION_TEMPLATE_DUPLICATE_PUT_REQUEST",
	"QUOTATION_TEMPLATE_DUPLICATE_PUT_SUCCESS",
	"QUOTATION_TEMPLATE_DUPLICATE_PUT_FAILED"
)<QuotationParam, Quotations, Error>();

export const quotationTemplatePutAction = createAsyncAction(
	"QUOTATION_TEMPLATE_PUT_REQUEST",
	"QUOTATION_TEMPLATE_PUT_SUCCESS",
	"QUOTATION_TEMPLATE_PUT_FAILED"
)<QuotationTemplatePut, Quotations, Error>();

export const quotationSummaryPutAction = createAsyncAction(
	"QUOTATION_PUT_SUMMARY_REQUEST",
	"QUOTATION_PUT_SUMMARY_SUCCESS",
	"QUOTATION_PUT_SUMMARY_FAILED"
)<QuotationRequest, Quotations, Error>();

export const quotationSelectionPutAction = createAsyncAction(
	"QUOTATION_PUT_SELECTION_REQUEST",
	"QUOTATION_PUT_SELECTION_SUCCESS",
	"QUOTATION_PUT_SELECTION_FAILED"
)<SectionVariableRequest, TemplateSection, Error>();

export const quotationSelectionSummaryPutAction = createAsyncAction(
	"QUOTATION_PUT_SELECTION_SUMMARY_REQUEST",
	"QUOTATION_PUT_SELECTION_SUMMARY_SUCCESS",
	"QUOTATION_PUT_SELECTION_SUMMARY_FAILED"
)<QuotationRequest, Quotations, Error>();

export const quotationPutExpressionAction = createAsyncAction(
	"QUOTATION_PUT_EXPRESSION_REQUEST",
	"QUOTATION_PUT_EXPRESSION_SUCCESS",
	"QUOTATION_PUT_EXPRESSION_FAILED"
)<SectionVariableRequest, TemplateSection, Error>();

export const quotationDeleteAction = createAsyncAction(
	"QUOTATION_DELETE_SECTION_REQUEST",
	"QUOTATION_DELETE_SECTION_SUCCESS",
	"QUOTATION_DELETE_SECTION_FAILED"
)<QuotationParam, TemplateSection, Error>();

export const quotationTemplateDeleteAction = createAsyncAction(
	"QUOTATION_TEMPLATE_DELETE_REQUEST",
	"QUOTATION_TEMPLATE_DELETE_SUCCESS",
	"QUOTATION_TEMPLATE_DELETE_FAILED"
)<QuotationParam, TemplateSection, Error>();

export const quotationSectionDeleteAction = createAsyncAction(
	"QUOTATION_SECTION_EXPRESSION_PUT_REQUEST",
	"QUOTATION_SECTION_EXPRESSION_PUT_SUCCESS",
	"QUOTATION_SECTION_EXPRESSION_PUT_FAILED"
)<DeleteEpression, TemplateSection, Error>();

export const quotationVariableDeleteAction = createAsyncAction(
	"QUOTATION_VARIABLE_PUT_REQUEST",
	"QUOTATION_VARIABLE_PUT_SUCCESS",
	"QUOTATION_VARIABLE_PUT_FAILED"
)<QuotationParam, TemplateSection, Error>();

export const quotationSelectionVariableDeleteAction = createAsyncAction(
	"QUOTATION_SELECTION_VARIABLE_PUT_REQUEST",
	"QUOTATION_SELECTION_VARIABLE_PUT_SUCCESS",
	"QUOTATION_SELECTION_VARIABLE_PUT_FAILED"
)<QuotationParam, TemplateSection, Error>();

export const quotationSelectionSectionDeleteAction = createAsyncAction(
	"QUOTATION_SELECTION_SECTION_PUT_REQUEST",
	"QUOTATION_SELECTION_SECTION_PUT_SUCCESS",
	"QUOTATION_SELECTION_SECTION_PUT_FAILED"
)<QuotationParam, TemplateSection, Error>();

export const quotationDownloadQuotationAction = createAsyncAction(
	"QUOTATION_DOWNLOAD_REQUEST",
	"QUOTATION_DOWNLOAD_SUCCESS",
	"QUOTATION_DOWNLOAD_FAILED"
)<QuotationParam, string, Error>();

export const clearQuotation = createAction("CLEAR_QUOTATION")<void>();

export type QuotationType = ActionType<
	| typeof quotationGetAction
	| typeof quotationSelectionGetAction
	| typeof quotationVariablesGetAction
	| typeof quotationPutAction
	| typeof quotationSelectionPutAction
	| typeof quotationSelectionSummaryPutAction
	| typeof quotationDeleteAction
	| typeof quotationPostAction
	| typeof quotationSectionDeleteAction
	| typeof quotationVariableDeleteAction
	| typeof quotationPutExpressionAction
	| typeof quotationExpressionPostAction
	| typeof quotationVariablePostAction
	| typeof quotationTemplateExportGetAction
	| typeof quotationTemplateImportPostAction
	| typeof quotationSummaryPutAction
	| typeof clearQuotation
	| typeof quotationSelectionVariableDeleteAction
	| typeof quotationSelectionSectionDeleteAction
	| typeof quotationDownloadQuotationAction
	| typeof quotationListGetAction
	| typeof quotationAddTemplatePostAction
	| typeof quotationTemplateDeleteAction
	| typeof quotationTemplateDuplicatePutAction
>;
