import { createProxy } from '../../../../utils/getPath';
import { Fetch } from '../../../../types/_types';

export interface QueryFilter {
	Query: string;
	ContainsNotSet: boolean;
	IncludeNotSet: boolean;
	Active: boolean;
}
export interface CustomerTypeFilter {
	Customers: string[];
	IncludeNotSet: boolean;
	Active: boolean;
}

export interface DateOfCreationFilter {
	From: Date;
	To: Date;
	Active: boolean;
}

export interface DateOfLastUpdateFilter {
	From: Date;
	To: Date;
	Active: boolean;
}

export interface NameFilter {
	Name: string;
	ExactMatch: boolean;
	Active: boolean;
}

export interface SnowAreaFilter {
	SnowAreas: string[];
	IncludeNotSet: boolean;
	Active: boolean;
}

export interface UserFilter {
	Name: string;
	IncludeNotSet: boolean;
	Active: boolean;
}

export interface Slider {
	From: number;
	To: number;
	IncludeNotSet: boolean;
	Active: boolean;
}

export interface WindAreaFilter {
	WindAreas: string[];
	IncludeNotSet: boolean;
	Active: boolean;
}

export interface JobTypeFilter {
	JobTypes: string[];
	IncludeNotSet: boolean;
	Active: boolean;
}
export interface JobStateFilter {
	JobStates: string[];
	IncludeNotSet: boolean;
	Active: boolean;
}

export interface Filter {
	AltitudeFilter: Slider;
	CoveredAreaFilter: Slider;
	CustomerFilter: CustomerTypeFilter;
	QueryFilter: QueryFilter;
	DateOfCreationFilter: DateOfCreationFilter;
	DateOfLastUpdateFilter: DateOfLastUpdateFilter;
	HipLengthFilter: Slider;
	JobNameFilter: NameFilter;
	NameFilter: NameFilter;
	JobPriceFilter: Slider;
	PriceFilter: Slider;
	PricePerSquareMeterFilter: Slider;
	RidgeLengthFilter: Slider;
	SnowAreaFilter: SnowAreaFilter;
	UserFilter: UserFilter;
	WindAreaFilter: WindAreaFilter;
	PersistTree: boolean;
	JobTypeFilter: JobTypeFilter;
	JobStateFilter: JobStateFilter;
}

export interface FilterRequest extends Fetch {
	data?: Filter;
}

export const FilterProxy = createProxy<Filter>();
