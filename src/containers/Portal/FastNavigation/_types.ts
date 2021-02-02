import { Customer, Fetch, FetchStateType } from '../../../types/_types';

export interface Project {
  Id: string;
  Name: string;
  Description: string;
  Currency: string;
  CustomerId: string;
  Customer: string;
  CountryIso: string;
}

export interface Job {
  Id: string;
  JobName: string;
  Customer: string;
  Project: string;
}

export interface SearchRootObject {
  Projects: Project[];
  Jobs: Job[];
  Customers: Customer[];
}

export type SearchStateType = FetchStateType &
  Readonly<{
    searched: SearchRootObject;
  }>;

export interface QuickSearchRequest extends Fetch {
  data?: string;
}
