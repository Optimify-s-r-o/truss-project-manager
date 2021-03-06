import { FetchStateType } from '../../../types/_types';

export interface HeaderSettings {
	Sorts: number[];
	SortOrder: number[];
	Headers: string[];
}

export interface PutHeaderSettings {
	Param: string;
	Headers: string[];
}

export type HeaderSettingsStateType = FetchStateType &
	Readonly<{
		sort: number[];
		sortOrder: number[];
		headers: string[];
		disabled: string[];
	}>;

export enum FilterType {
	Project = "project",
	Job = "job",
	Truss = "truss",
	Customer = "customer",
}
