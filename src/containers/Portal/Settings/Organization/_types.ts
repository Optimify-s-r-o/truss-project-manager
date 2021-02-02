import { createProxy } from '../../../../utils/getPath';
import { FetchStateType } from '../../../../types/_types';

export interface Organization {
  Id: string;
  Name: string;
  Crn: string;
  VatRegNo: string;
  CountryId: string;
  RegionName: string;
  CityName: string;
  StreetName: string;
  Zip: string;
  PlaceNumber: string;
}

export interface OrganizationState extends FetchStateType {
  organization: Organization;
}

export const OrganizationProxy = createProxy<Organization>();
