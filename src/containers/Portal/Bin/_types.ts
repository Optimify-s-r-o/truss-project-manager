import { createProxy } from '../../../utils/getPath';
import { Data, Page } from './../../../types/_types';
import { FetchStateType } from '../../../types/_types';

export type BinStateType = FetchStateType &
	Readonly<{
		data: Data<Bin> | null;
	}>;

export interface DeleteRequest {
	id: string;
	type: BinType;
	requiredPage: Page;
}

export interface Bin {
	Id: string;
	Name: string;
	Date: string;
}

export interface BinRequest extends Page {
	type: BinType;
}

export interface BinRestore extends Page {
	type: BinType;
	id: string;
}

export enum BinType {
	PROJECT = "projects",
	JOB = "jobs",
}

export const BinProxy = createProxy<Bin>();
