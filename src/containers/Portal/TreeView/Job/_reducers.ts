import { getType } from 'typesafe-actions';
import { JobStateType } from './_types';
import {
	calculateJob,
	deleteJob,
	getJobMaterials,
	getJobQuotations,
	getTrusses,
	jobImage,
	jobImageByName,
	selectedJob,
	selectedJobType,
	setJob,
	unlockJob,
	updateSelectedJob,
} from "./_actions";

const initialState: JobStateType = {
	error: null,
	pending: false,
	jobs: null,
	image: null,
	quotationCalculating: false,
	trusses: null,
	quotations: null,
	materials: null,
};

export default (
	state: JobStateType = initialState,
	action: selectedJobType
): JobStateType => {
	switch (action.type) {
		case getType(setJob):
			return {
				...state,
				jobs: action.payload,
			};
		case getType(selectedJob.request):
		case getType(getTrusses.request):
		case getType(unlockJob.request):
		case getType(getJobMaterials.request):
		case getType(getJobQuotations.request):
			return {
				...state,
				error: null,
				pending: true,
			};
		case getType(selectedJob.success):
			return {
				...state,
				pending: false,
				jobs: action.payload,
			};
		case getType(getJobMaterials.success):
			return {
				...state,
				pending: false,
				materials: action.payload,
			};
		case getType(getJobQuotations.success):
			return {
				...state,
				pending: false,
				quotations: action.payload,
			};
		case getType(selectedJob.failure):
			return {
				...state,
				error: action.payload.ErrorMessage,
				pending: false,
			};
		case getType(updateSelectedJob.request):
			return {
				...state,
				error: null,
				pending: true,
			};
		case getType(updateSelectedJob.success):
		case getType(unlockJob.success):
			return {
				...state,
				pending: false,
			};
		case getType(updateSelectedJob.failure):
			return {
				...state,
				error: action.payload.ErrorMessage,
				pending: false,
			};
		case getType(calculateJob.request):
			return {
				...state,
				quotationCalculating: true,
			};
		case getType(calculateJob.success):
			return {
				...state,
				pending: false,
				quotationCalculating: false,
			};
		case getType(calculateJob.failure):
			return {
				...state,
				error: action.payload.ErrorMessage,
				pending: false,
				quotationCalculating: false,
			};
		case getType(jobImage.success):
		case getType(jobImageByName.success):
			return {
				...state,
				image: action.payload,
			};

		case getType(deleteJob.request):
			return {
				...state,
				pending: true,
			};
		case getType(deleteJob.failure):
		case getType(unlockJob.failure):
		case getType(getTrusses.failure):
			return {
				...state,
				error: action.payload.ErrorMessage,
				pending: false,
			};
		case getType(deleteJob.success):
			return {
				...state,
				pending: false,
			};
		case getType(getTrusses.success):
			return {
				...state,
				trusses: action.payload,
				pending: false,
			};
		default:
			return state;
	}
};
