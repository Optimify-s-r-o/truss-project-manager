import { Customer } from '../Customer/_types';
import {
	CustomerEnum,
	Data,
	FetchStateType,
	Tree,
} from "../../../types/_types";

export type TreeStateType = FetchStateType &
	Readonly<{
		projectTree: Data<Tree>;
		customerTree: Data<Tree>;
		jobTree: Data<Tree>;
		trussTree: Data<Tree>;
		firstRecordOnPage: number | null;
		lastRecordOnPage: number | null;
		currentPage: number | null;
		totalPages: number | null;
		totalRecords: number | null;
		isFilterActive: boolean;
		selectedKeys?: string[];
		expandedKeys?: string[];
	}>;

export interface Member {
	Checked: boolean;
	Open: boolean;
	Show: boolean;
	Id: string;
	Name: string;
	NextLayer: boolean;
}

export interface Cuttings {
	Checked: boolean;
	Open: boolean;
	AdditionalInformation: any;
	Show: boolean;
	Id: string;
	Name: string;
	NextLayer: boolean;
	Members: Member[];
	Scabs: any;
}

export interface NailPlates {
	Checked: boolean;
	Open: boolean;
	AdditionalInformation: any;
	Show: boolean;
	Id: string;
	Name: string;
	NextLayer: boolean;
}

export interface Part {
	AdditionalInformation: any[];
	Checked: boolean;
	Open: boolean;
	Show: boolean;
	Id: string;
	Name: string;
	NextLayer: boolean;
	Cuttings: Cuttings[];
	NailPlates: NailPlates[];
}

export interface Ply {
	AdditionalInformation: any[];
	Checked: boolean;
	Open: boolean;
	Show: boolean;
	Id: string;
	Name: string;
	NextLayer: boolean;
	Parts: Part[];
}

export interface Model {
	AdditionalInformation: any[];
	Checked: boolean;
	Open: boolean;
	Show: boolean;
	Id: string;
	Name?: any;
	NextLayer: boolean;
	Plies: Ply[];
}

export interface Truss {
	Navigation: boolean;
	AdditionalInformation: any[];
	Checked: boolean;
	Open: boolean;
	Show: boolean;
	Id: string;
	Name: string;
	Status: string;
	NextLayer: boolean;
	Models: Model[];
}

export interface Job {
	AdditionalInformation: any[];
	Checked: boolean;
	Open: boolean;
	Show: boolean;
	Id: string;
	Name: string;
	Status: string;
	NextLayer: boolean;
	Trusses: Truss[];
}

export interface Truss {
	AdditionalInformation: any[];
	Checked: boolean;
	Open: boolean;
	Show: boolean;
	Id: string;
	Name: string;
	Status: string;
	NextLayer: boolean;
	Models: Model[];
}

export interface Customers {
	Data: CustomerTree;
	PageSize: number;
	Page: number;
}

export interface CustomerTree {
	Show: boolean;
	Navigation: boolean;
	NextLayer: boolean;
	Checked: boolean;
	Open: boolean;
	Id: string;
	Name: string;
	AdditionalInformation: number[];
	Projects: Tree[];
	Customer: Customer;
	Type: CustomerEnum;
}

export interface CustomersTreeType {
	Customers: CustomerTree[];
}

export type JobTreeType = FetchStateType &
	Readonly<{
		customerTree: CustomersTreeType[];
	}>;
