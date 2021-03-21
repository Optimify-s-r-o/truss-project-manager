import Component, { DispatchProps, StateProps } from './Component';
import { calculateTruss, getTruss, getTrussQuotations } from '../_actions';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { QuotationCalculate } from '../../Project/_types';
import { TrussRequest } from '../_types';
import { withRouter } from 'react-router-dom';
import {
	clearQuotation,
	quotationDownloadQuotationAction,
	quotationListGetAction,
	quotationSelectionGetAction,
	quotationSelectionPutAction,
	quotationSelectionSectionDeleteAction,
	quotationSelectionSummaryPutAction,
	quotationSelectionVariableDeleteAction,
} from "../../../Quotations/_actions";
import {
	QuotationParam,
	QuotationRequest,
	SectionVariableRequest,
} from "../../../Quotations/_types";

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
	quotationSelectionGetAction: (data: QuotationCalculate) =>
		dispatch(quotationSelectionGetAction.request(data)),
	quotationSelectionPutAction: (data: SectionVariableRequest) =>
		dispatch(quotationSelectionPutAction.request(data)),
	quotationSelectionSummaryPutAction: (data: QuotationRequest) =>
		dispatch(quotationSelectionSummaryPutAction.request(data)),
	clearQuotation: (data: void) => dispatch(clearQuotation(data)),
	calculateTruss: (data: QuotationCalculate) =>
		dispatch(calculateTruss.request(data)),
	quotationSelectionVariableDeleteAction: (data: QuotationParam) =>
		dispatch(quotationSelectionVariableDeleteAction.request(data)),
	quotationDownloadQuotationAction: (data: QuotationParam) =>
		dispatch(quotationDownloadQuotationAction.request(data)),
	quotationSelectionSectionDeleteAction: (data: QuotationParam) =>
		dispatch(quotationSelectionSectionDeleteAction.request(data)),
	getTruss: (data: TrussRequest) => dispatch(getTruss.request(data)),
	quotationListGetAction: (data: QuotationParam) =>
		dispatch(quotationListGetAction.request(data)),
	getTrussQuotations: (data: string) =>
		dispatch(getTrussQuotations.request(data)),
});

const mapStateToProps = (state: any): StateProps => ({
	quotations: state.QuotationReducer.quotations,
	truss: state.TrussReducer.truss,
	quotationsInfo: state.TrussReducer.quotations,
	quotationCalculating: state.TrussReducer.quotationCalculating,
	pending: state.QuotationReducer.pending,
	quotationList: state.QuotationReducer.quotationList,
	priceLists: state.PriceListsReducer.priceLists,
});

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Component);
