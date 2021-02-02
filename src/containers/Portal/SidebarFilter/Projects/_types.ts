import { createProxy } from '../../../../utils/getPath';
import {
	Data,
	Fetch,
	FilterEvents,
	JobType,
	Project,
	Tree,
} from "../../../../types/_types";
export type JobsAllType = Readonly<{
	jobs: any;
}>;

export interface JobsType {
	jobs: JobType[];
}

export interface ProjectFilter {
	Projects: Project[];
	TrussTree: Data<Tree>;
	JobTree: Data<Tree>;
	CustomerTree: Data<Tree>;
	ProjectTree: Data<Tree>;
}

export interface CustomerNameFilter extends FilterEvents {
	Name: string;
}
export interface CustomerTypeFilter extends FilterEvents {
	Customers: string[];
}

export interface NameFilter {
	Name: string;
	ExactMatch: boolean;
	Active: boolean;
}

export interface Slider extends FilterEvents {
	From: number;
	To: number;
}

export interface UserFilter extends FilterEvents {
	Name: string;
}

export interface ProjectStateFilter extends FilterEvents {
	ProjectStates: string[];
}

export interface AddressFilter extends FilterEvents {
	Location: string;
}
export interface Filter {
	PersistTree: boolean;
	ConstructionDateFilter: Slider;
	ProductionPriceFilter: Slider;
	CustomerNameFilter: CustomerNameFilter;
	CustomerTypeFilter: CustomerTypeFilter;
	ProjectNameFilter: NameFilter;
	AddressFilter: AddressFilter;
	QuotationDateFilter: Slider;
	QuotationPriceFilter: Slider;
	DateOfCreationFilter: Slider;
	UserFilter: UserFilter;
	ProjectStateFilter: ProjectStateFilter;
}

export interface FilterProjectRequest extends Fetch {
	data?: Filter;
}

export const FilterProxy = createProxy<Filter>();
