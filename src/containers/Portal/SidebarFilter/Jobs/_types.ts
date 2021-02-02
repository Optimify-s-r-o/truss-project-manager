import { FetchStateType, JobType, Pagination } from '../../../../types/_types';

export type JobsAllType = FetchStateType &
	Pagination &
	Readonly<{
		jobs: JobType[];
		jobPending: boolean;
	}>;

export interface JobsType {
	jobs: JobType[];
}
