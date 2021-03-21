import Component, { DispatchProps, StateProps } from './Component';
import { calculateJob, getJobQuotations, selectedJob } from '../_actions';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { JobsSelectedRequest } from '../_types';
import { QuotationCalculate } from '../../Project/_types';
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
	calculateJob: (data: QuotationCalculate) =>
		dispatch(calculateJob.request(data)),
	quotationSelectionVariableDeleteAction: (data: QuotationParam) =>
		dispatch(quotationSelectionVariableDeleteAction.request(data)),
	quotationDownloadQuotationAction: (data: QuotationParam) =>
		dispatch(quotationDownloadQuotationAction.request(data)),
	quotationSelectionSectionDeleteAction: (data: QuotationParam) =>
		dispatch(quotationSelectionSectionDeleteAction.request(data)),
	selectedJob: (data: JobsSelectedRequest) =>
		dispatch(selectedJob.request(data)),
	quotationListGetAction: (data: QuotationParam) =>
		dispatch(quotationListGetAction.request(data)),
	getJobQuotations: (data: string) => dispatch(getJobQuotations.request(data)),
});

const mapStateToProps = (state: any): StateProps => ({
	quotations: state.QuotationReducer.quotations,
	quotationsInfo: state.JobReducer.quotations,
	quotationCalculating: state.JobReducer.quotationCalculating,
	quotationList: state.QuotationReducer.quotationList,
	priceLists: state.PriceListsReducer.priceLists,
	pending: state.QuotationReducer.pending,
});

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Component);
