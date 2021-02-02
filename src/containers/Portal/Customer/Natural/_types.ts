import { Fetch, FetchStateType } from '../../../../types/_types';

export interface NaturalPerson {
  Id: string;
  EvidenceId: string;
  Forename: string;
  Surname: string;
  Phone: string;
  Email: string;
  CountryId: string;
  Region: string;
  City: string;
  Street: string;
  StreetNumber: string;
  Zip: string;
}

export interface NaturalPersonRequest extends Fetch {
  data?: NaturalPerson;
}
export type NaturalPersonStateType = FetchStateType & {
  natural: NaturalPerson;
};
