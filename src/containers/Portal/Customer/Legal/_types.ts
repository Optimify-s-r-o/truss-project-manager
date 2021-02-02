import {
  Company,
  Contact,
  Fetch,
  FetchStateType,
} from '../../../../types/_types';

export interface Location {
  CountryId: string;
  CountryName: string;
  RegionName: string;
  CityName: string;
  StreetName: string;
  Zip: string;
  PlaceNumber: string;
}

export type LoadedDataStateType = FetchStateType &
  Readonly<{
    arest: Company;
    pendingArest: boolean;
    legal: Company;
  }>;

export interface CustomerRootObject {
  EvidenceId: string;
  ContactPersons: Contact[];
  Id: string;
  Crn: string;
  VatRegNo: string;
  Name: string;
  City: string;
  Street: string;
  StreetNumber: string;
  Zip: string;
  Region: string;
  CountryId: string;
}

export interface IArest extends Fetch {
  data?: string;
}
