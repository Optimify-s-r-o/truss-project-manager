import { createProxy } from '../../../../utils/getPath';
import { Customer } from '../../Customer/_types';
import { Page } from './../../../../types/_types';
import {
	Company,
	Evidence,
	Fetch,
	FetchStateType,
	Pagination,
	Person,
} from "../../../../types/_types";

export type CustomersStateType = FetchStateType &
	Pagination &
	Readonly<{
		customers: Customer[];
		legal: Company[];
		person: Person[];
		evidence: Evidence[];
		all: CustomersAll[];
		customerPending: boolean;
	}>;

export interface DeleteRequest {
	id: string;
	requiredPage: Page;
}

export interface Filter {}

export interface FilterRequest extends Fetch {
	data?: Filter;
}

export interface Slider {
	From: number;
	To: number;
	Active: boolean;
}

export interface DateSlider {
	From: Date;
	To: Date;
	Active: boolean;
}

export interface CustomersAll {
	Id: string;
	Name: string;
	Type: number;
	DateOfCreation: Date;
	ProjectsCount: number;
	AveragePricePerProject: number;
	SumOfProjectPrices: number;
	ProductionsCount: number;
	QuotationsCount: number;
	ProductionsPerQuotations: number;
	Crn: string;
	VatNumber: string;
	FirstName: string;
	LastName: string;
	CountryId: string;
	City: string;
	Street: string;
	StreetNumber: number;
	Customer: Customer;
}

export const CustomersAllProxy = createProxy<CustomersAll>();

export interface CustomersAllFilter {
	CustomerDateOfCreationFilter: DateSlider;
	NumberOfProjectsFilter: Slider;
	AveragePricePerProjectFilter: Slider;
	SumOfProjectPricesFilter: Slider;
	NumberOfQuotationsFilter: Slider;
	NumberOfProductionsFilter: Slider;
	ProductionsPerQuotationsFilter: Slider;
	ActiveTree: string;
}

export const CustomersAllFilterProxy = createProxy<CustomersAllFilter>();

export interface CustomersAllFilterRequest extends Fetch {
	data: CustomersAllFilter;
}

export interface EvidenceNameFilter {
	Name: string;
}

export interface CustomersEvidenceFilter {
	EvidenceNameFilter: EvidenceNameFilter;
	CustomerDateOfCreationFilter: DateSlider;
	NumberOfProjectsFilter: Slider;
	AveragePricePerProjectFilter: Slider;
	SumOfProjectPricesFilter: Slider;
	NumberOfQuotationsFilter: Slider;
	NumberOfProductionsFilter: Slider;
	ProductionsPerQuotationsFilter: Slider;
	ActiveTree: string;
}

export const CustomersEvidenceFilterProxy = createProxy<CustomersEvidenceFilter>();

export interface CustomersEvidenceFilterRequest extends Fetch {
	data: CustomersEvidenceFilter;
}

export interface CrnFilter {
	Crn: string;
	Active: boolean;
}

export interface VatNumberFilter {
	VatNumber: string;
	Active: boolean;
}

export interface CustomersLegalFilter {
	CrnFilter: CrnFilter;
	VatNumberFilter: VatNumberFilter;
	CustomerDateOfCreationFilter: DateSlider;
	NumberOfProjectsFilter: Slider;
	AveragePricePerProjectFilter: Slider;
	SumOfProjectPricesFilter: Slider;
	NumberOfQuotationsFilter: Slider;
	NumberOfProductionsFilter: Slider;
	ProductionsPerQuotationsFilter: Slider;
	ActiveTree: string;
}

export const CustomersLegalFilterProxy = createProxy<CustomersLegalFilter>();

export interface CustomersLegalFilterRequest extends Fetch {
	data: CustomersLegalFilter;
}

export interface FirstNameFilter {
	FirstName: string;
	Active: boolean;
}

export interface LastNameFilter {
	LastName: string;
	Active: boolean;
}
export interface CustomersPersonFilter {
	FirstNameFilter: FirstNameFilter;
	LastNameFilter: LastNameFilter;
	CustomerDateOfCreationFilter: DateSlider;
	NumberOfProjectsFilter: Slider;
	AveragePricePerProjectFilter: Slider;
	SumOfProjectPricesFilter: Slider;
	NumberOfQuotationsFilter: Slider;
	NumberOfProductionsFilter: Slider;
	ProductionsPerQuotationsFilter: Slider;
	ActiveTree: string;
}

export const CustomersPersonFilterProxy = createProxy<CustomersPersonFilter>();
export interface CustomersPersonFilterRequest extends Fetch {
	data: CustomersPersonFilter;
}

export enum CustomerType {
	Evidence,
	Legal,
	Natural,
	All,
}
