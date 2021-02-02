import { createProxy } from '../../../../../utils/getPath';
import { Fetch, TreeType } from '../../../../../types/_types';

export interface CustomerFilter {
  Query: string;
  ContainsNotSet: boolean;
  IncludeNotSet: boolean;
  Companies: boolean;
  Person: boolean;
  Evidence: boolean;
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

export interface Filter {
  ActiveTree: TreeType;
  AltitudeFilter: Slider;
  CoveredAreaFilter: Slider;
  CustomerFilter: CustomerFilter;
  DateOfCreationFilter: DateOfCreationFilter;
  DateOfLastUpdateFilter: DateOfLastUpdateFilter;
  HipLengthFilter: Slider;
  NameFilter: NameFilter;
  PriceFilter: Slider;
  RidgeLengthFilter: Slider;
  SnowAreaFilter: SnowAreaFilter;
  UserFilter: UserFilter;
  WindAreaFilter: WindAreaFilter;
}

export interface FilterRequest extends Fetch {
  data?: Filter;
}

export const FilterProxy = createProxy<Filter>();
