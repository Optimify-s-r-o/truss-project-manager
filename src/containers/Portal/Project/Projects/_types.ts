import { FetchStateType, Pagination, Project } from '../../../../types/_types';

export type ProjectStateType = FetchStateType &
	Pagination &
	Readonly<{
		project: Project[];
		projectPending: boolean;
	}>;
