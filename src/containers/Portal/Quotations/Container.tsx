import Component, { DispatchProps, StateProps } from './Component';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  priceListsGetAction,
  priceListGetByIdAction,
} from '../PriceLists/_actions';
import {
  DeleteEpression,
  QuotationParam,
  QuotationRequest,
  SectionVariableRequest,
  TemplateSectionRequest,
  VariableRequest,
  QuotationTemplatePut,
  QuotationFileImport,
} from './_types';
import {
  clearQuotation,
  quotationDeleteAction,
  quotationExpressionPostAction,
  quotationGetAction,
  quotationPostAction,
  quotationPutAction,
  quotationPutExpressionAction,
  quotationSectionDeleteAction,
  quotationSummaryPutAction,
  quotationVariableDeleteAction,
  quotationVariablePostAction,
  quotationVariablesGetAction,
  quotationListGetAction,
  quotationAddTemplatePostAction,
  quotationTemplatePutAction,
  quotationTemplateDeleteAction,
  quotationTemplateDuplicatePutAction,
  quotationTemplateExportGetAction,
  quotationTemplateImportPostAction,
} from './_actions';

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  priceListGetByIdAction: (data: string) =>
    dispatch(priceListGetByIdAction.request(data)),
  priceListsGetAction: (data: void) =>
    dispatch(priceListsGetAction.request(data)),
  quotationTemplateExportGetAction: (data: string) =>
    dispatch(quotationTemplateExportGetAction.request(data)),
  quotationTemplateImportPostAction: (data: QuotationFileImport) =>
    dispatch(quotationTemplateImportPostAction.request(data)),
  quotationGetAction: (data: QuotationParam) =>
    dispatch(quotationGetAction.request(data)),
  quotationTemplateDeleteAction: (data: QuotationParam) =>
    dispatch(quotationTemplateDeleteAction.request(data)),
  quotationTemplateDuplicatePutAction: (data: QuotationParam) =>
    dispatch(quotationTemplateDuplicatePutAction.request(data)),
  quotationVariablesGetAction: (data: QuotationParam) =>
    dispatch(quotationVariablesGetAction.request(data)),
  quotationListGetAction: (data: QuotationParam) =>
    dispatch(quotationListGetAction.request(data)),
  quotationPostAction: (data: TemplateSectionRequest) =>
    dispatch(quotationPostAction.request(data)),
  quotationVariablePostAction: (data: VariableRequest) =>
    dispatch(quotationVariablePostAction.request(data)),
  quotationExpressionPostAction: (data: SectionVariableRequest) =>
    dispatch(quotationExpressionPostAction.request(data)),
  quotationPutAction: (data: TemplateSectionRequest) =>
    dispatch(quotationPutAction.request(data)),
  quotationPutExpressionAction: (data: SectionVariableRequest) =>
    dispatch(quotationPutExpressionAction.request(data)),
  quotationDeleteAction: (data: QuotationParam) =>
    dispatch(quotationDeleteAction.request(data)),
  quotationSectionDeleteAction: (data: DeleteEpression) =>
    dispatch(quotationSectionDeleteAction.request(data)),
  quotationVariableDeleteAction: (data: QuotationParam) =>
    dispatch(quotationVariableDeleteAction.request(data)),
  quotationAddTemplatePostAction: (data: QuotationParam) =>
    dispatch(quotationAddTemplatePostAction.request(data)),
  quotationSummaryPutAction: (data: QuotationRequest) =>
    dispatch(quotationSummaryPutAction.request(data)),
  quotationTemplatePutAction: (data: QuotationTemplatePut) =>
    dispatch(quotationTemplatePutAction.request(data)),
  clearQuotation: (data: void) => dispatch(clearQuotation(data)),
});

const mapStateToProps = (state: any): StateProps => ({
  quotations: state.QuotationReducer.quotations,
  variables: state.QuotationReducer.variables,
  quotationList: state.QuotationReducer.quotationList,
  priceLists: state.PriceListsReducer.priceLists,
  priceList: state.PriceListsReducer.priceList,
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Component);
