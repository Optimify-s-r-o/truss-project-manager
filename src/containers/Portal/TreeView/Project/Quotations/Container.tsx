import Component, { DispatchProps, StateProps } from './Component';
import { calculateProject, getSelectedProject } from '../_actions';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { QuotationCalculate } from '../_types';
import { quotationListGetAction } from '../../../Quotations/_actions';
import { SelectedProjectsRequest } from '../../Projects/_types';
import { withRouter } from 'react-router-dom';
import {
  QuotationParam,
  QuotationRequest,
  SectionVariableRequest,
} from '../../../Quotations/_types';
import {
  clearQuotation,
  quotationDownloadQuotationAction,
  quotationSelectionGetAction,
  quotationSelectionPutAction,
  quotationSelectionSectionDeleteAction,
  quotationSelectionSummaryPutAction,
  quotationSelectionVariableDeleteAction,
} from '../../../Quotations/_actions';

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  quotationSelectionGetAction: (data: QuotationCalculate) =>
    dispatch(quotationSelectionGetAction.request(data)),
  quotationSelectionPutAction: (data: SectionVariableRequest) =>
    dispatch(quotationSelectionPutAction.request(data)),
  quotationSelectionSummaryPutAction: (data: QuotationRequest) =>
    dispatch(quotationSelectionSummaryPutAction.request(data)),
  calculateProject: (data: QuotationCalculate) =>
    dispatch(calculateProject.request(data)),
  quotationSelectionVariableDeleteAction: (data: QuotationParam) =>
    dispatch(quotationSelectionVariableDeleteAction.request(data)),
  quotationSelectionSectionDeleteAction: (data: QuotationParam) =>
    dispatch(quotationSelectionSectionDeleteAction.request(data)),
  quotationDownloadQuotationAction: (data: QuotationParam) =>
    dispatch(quotationDownloadQuotationAction.request(data)),
  getSelectedProject: (data: SelectedProjectsRequest) =>
    dispatch(getSelectedProject.request(data)),
  clearQuotation: (data: void) => dispatch(clearQuotation(data)),
  quotationListGetAction: (data: QuotationParam) =>
    dispatch(quotationListGetAction.request(data)),
});

const mapStateToProps = (state: any): StateProps => ({
  quotations: state.QuotationReducer.quotations,
  project: state.ProjectViewReducer.project,
  quotationCalculating: state.ProjectViewReducer.quotationCalculating,
  quotationList: state.QuotationReducer.quotationList,
  priceLists: state.PriceListsReducer.priceLists,
  pending: state.QuotationReducer.pending,
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Component);
