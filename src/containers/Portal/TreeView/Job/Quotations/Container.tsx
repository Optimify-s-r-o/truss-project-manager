import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose, Dispatch } from 'redux';

import { EditTruss, editTruss } from '../../../../../sagas/Truss/_actions';
import {
    clearQuotation,
    quotationDownloadQuotationAction,
    quotationListGetAction,
    quotationSelectionGetAction,
    quotationSelectionPutAction,
    quotationSelectionSectionDeleteAction,
    quotationSelectionSummaryPutAction,
    quotationSelectionVariableDeleteAction,
} from '../../../Quotations/_actions';
import { QuotationParam, QuotationRequest, SectionVariableRequest } from '../../../Quotations/_types';
import { QuotationCalculate } from '../../Project/_types';
import { calculateJob, deleteJob, getJobQuotations, selectedJob, unlockJob } from '../_actions';
import { DeleteJob, JobsSelectedRequest, Unlock } from '../_types';
import Component, { DispatchProps, StateProps } from './Component';

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
	removeJob: (data: DeleteJob) => dispatch(deleteJob.request(data)),
	editTruss: (data: EditTruss) => dispatch(editTruss.request(data)),
	unlockJob: (data: Unlock) => dispatch(unlockJob.request(data)),
});

const mapStateToProps = (state: any): StateProps => ({
	quotations: state.QuotationReducer.quotations,
	quotationsInfo: state.JobReducer.quotations,
	quotationCalculating: state.JobReducer.quotationCalculating,
	quotationList: state.QuotationReducer.quotationList,
	priceLists: state.PriceListsReducer.priceLists,
	pending: state.QuotationReducer.pending,
	job: state.JobReducer.jobs,
	token: state.AuthReducer.token,
});

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Component);
