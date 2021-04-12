import { AddressFilter, ProjectStateFilter } from './Projects/_types';
import { CompanyNameFilter } from './Customer/_types';
import { createProxy } from '../../../utils/getPath';
import { CustomersAll } from './../Lists/Customers/_types';
import { JobType, Project } from './../../../types/_types';
import {
	Data,
	FetchStateType,
	PaginationDto,
	Truss,
} from "../../../types/_types";
import {
	CustomerTypeFilter,
	DateOfCreationFilter,
	DateOfLastUpdateFilter,
	JobStateFilter,
	JobTypeFilter,
	NameFilter,
	SnowAreaFilter,
	UserFilter,
	WindAreaFilter,
} from "../Lists/components/_types";
import {
	CrnFilter,
	DateSlider,
	FirstNameFilter,
	LastNameFilter,
	VatNumberFilter,
} from "../Lists/Customers/_types";
import {
	InputFilter,
	KindsFilter,
	StatusFilter,
	TypeFilter,
} from "./Trusses/_types";

export type FilterType = FetchStateType &
	Readonly<{
		customers: Data<CustomersAll>;
		projects: Data<Project>;
		jobs: Data<JobType>;
		trusses: Data<Truss>;
		activeFilterContent: any;
		activeFilter: boolean;
		filterPending: boolean;
		showFilter: boolean;
	}>;

export type FilteredData = PaginationDto & {
	customers: Data<CustomersAll>;
	projects: Data<Project>;
	jobs: Data<JobType>;
	trusses: Data<Truss>;
};

export type Filter = {
	Customers: CustomersFilter;
	Projects: ProjectsFilter;
	Jobs: JobsFilter;
	Trusses: TrussesFilter;
	ActiveTree?: string;
	PersistTree?: boolean;
};

export const FilterProxy = createProxy<Filter>();

export type CustomersFilter = {
	FirstNameFilter: FirstNameFilter;
	LastNameFilter: LastNameFilter;
	CompanyNameFilter: CompanyNameFilter;
	CrnFilter: CrnFilter;
	VatNumberFilter: VatNumberFilter;
	CustomerTypeFilter: CustomerTypeFilter;
	AveragePricePerProjectFilter: Slider;
	SumOfProjectPricesFilter: Slider;
	NumberOfProjectsFilter: Slider;
	NumberOfQuotationsFilter: Slider;
	NumberOfProductionsFilter: Slider;
	ProductionsPerQuotationsFilter: Slider;
	CustomerDateOfCreationFilter: DateSlider;
};

export const CustomersFilterProxy = createProxy<CustomersFilter>();

export type ProjectsFilter = {
	NameFilter: NameFilter;
	UserFilter: UserFilter;
	AddressFilter: AddressFilter;
	ProjectStateFilter: ProjectStateFilter;
	ProductionPriceFilter: Slider;
	DateOfCreationFilter: Slider;
	ConstructionDateFilter: Slider;
	QuotationDateFilter: Slider;
	QuotationPriceFilter: Slider;
};
export const ProjectsFilterProxy = createProxy<ProjectsFilter>();

export type JobsFilter = {
	NameFilter: NameFilter;
	JobTypeFilter: JobTypeFilter;
	JobStateFilter: JobStateFilter;
	PriceFilter: Slider;
	PricePerSquareMeterFilter: Slider;
	AltitudeFilter: Slider;
	SnowAreaFilter: SnowAreaFilter;
	WindAreaFilter: WindAreaFilter;
	CeilingNameFilter: InputFilter;
	WindFilter: Slider;
	SnowFilter: Slider;
	CentresFilter: Slider;
	RoofingNameFilter: InputFilter;
	HipLengthFilter: Slider;
	CoveredAreaFilter: Slider;
	RidgeLengthFilter: Slider;
	DateOfCreationFilter: DateOfCreationFilter;
	DateOfLastUpdateFilter: DateOfLastUpdateFilter;
};
export const JobsFilterProxy = createProxy<JobsFilter>();

export type TrussesFilter = {
	NameFilter: InputFilter;
	StatusFilter: StatusFilter;
	TypeFilter: TypeFilter;
	KindsFilter: KindsFilter;
	PriceFilter: Slider;
	WindLoadFilter: Slider;
	SnowLoadFilter: Slider;
	CeilingLoadFilter: Slider;
	RoofingLoadFilter: Slider;
	HeightFilter: Slider;
	LengthFilter: Slider;
	SpanFilter: Slider;
	ThicknessFilter: Slider;
	WeightFilter: Slider;
	TransportWeightFilter: Slider;
	SupportsQuantityFilter: Slider;
	MembersCountFilter: Slider;
	PlatesCountFilter: Slider;
	ModelCountFilter: Slider;
	PliesFilter: Slider;
};
export const TrussesFilterProxy = createProxy<TrussesFilter>();

export interface Slider {
	From: number;
	To: number;
	IncludeNotSet: boolean;
	Active: boolean;
}

export enum FilterContentType {
	TEXT,
	DATE,
	ARRAY,
	RANGE,
}
