import { createProxy } from '../../../../utils/getPath';
import { CustomerTypeFilter } from '../../Lists/components/_types';
import {
	Data,
	Fetch,
	Tree,
	Truss
	} from '../../../../types/_types';
import {
	CrnFilter,
	DateSlider,
	EvidenceNameFilter,
	FirstNameFilter,
	LastNameFilter,
	VatNumberFilter,
} from "../../Lists/Customers/_types";

export interface TrussFilter {
	Trusses: Truss[];
	TrussTree: Data<Tree>;
	JobTree: Data<Tree>;
	CustomerTree: Data<Tree>;
	ProjectTree: Data<Tree>;
}

export interface InputFilter {
	Name: string;
	IncludeNotSet: boolean;
	Active: boolean;
	ExactMatch: boolean;
}

export interface StatusFilter {
	Active: boolean;
	Statuses: number[];
}

export interface SnowArea {
	SnowAreas: string[];
	IncludeNotSet: boolean;
	Active: boolean;
}

export interface WindAreaFilter {
	WindAreas: string[];
	IncludeNotSet: boolean;
	Active: boolean;
}

export interface TypeFilter {
	Types: number[];
	Active: boolean;
}

export interface Slider {
	From: number;
	To: number;
	Active: boolean;
}

export interface KindsFilter {
	Active: boolean;
	Kinds: string[];
}

export interface Filter {
	PersistTree: boolean;
	CeilingLoadFilter: Slider;
	CeilingNameFilter: InputFilter;
	CentresFilter: Slider;
	HeightFilter: Slider;
	LengthFilter: Slider;
	ModelCountFilter: Slider;
	PliesFilter: Slider;
	RoofingLoadFilter: Slider;
	RoofingNameFilter: InputFilter;
	SpanFilter: Slider;
	StatusFilter: StatusFilter;
	SupportsQuantityFilter: Slider;
	ThicknessFilter: Slider;
	TransportWeightFilter: Slider;
	NameFilter: InputFilter;
	PriceFilter: Slider;
	SnowAreaFilter: SnowArea;
	SnowLoadFilter: Slider;
	WindAreaFilter: WindAreaFilter;
	WindLoadFilter: Slider;
	TypeFilter: TypeFilter;
	WeightFilter: Slider;
	KindsFilter: KindsFilter;
}

export interface FilterTrussesRequest extends Fetch {
	data?: Filter;
}

export const FilterProxy = createProxy<Filter>();

export interface CompanyNameFilter {
	Name: string;
	Active: boolean;
	IncludeNotSet: boolean;
}
export interface CustomersAllFilter {
	CustomerTypeFilter: CustomerTypeFilter;
	CompanyNameFilter: CompanyNameFilter;
	FirstNameFilter: FirstNameFilter;
	LastNameFilter: LastNameFilter;
	EvidenceNameFilter: EvidenceNameFilter;
	CustomerDateOfCreationFilter: DateSlider;
	NumberOfProjectsFilter: Slider;
	AveragePricePerProjectFilter: Slider;
	SumOfProjectPricesFilter: Slider;
	NumberOfQuotationsFilter: Slider;
	NumberOfProductionsFilter: Slider;
	ProductionsPerQuotationsFilter: Slider;
	ActiveTree: string;
	CrnFilter: CrnFilter;
	VatNumberFilter: VatNumberFilter;
}

export const CustomersAllFilterProxy = createProxy<CustomersAllFilter>();
