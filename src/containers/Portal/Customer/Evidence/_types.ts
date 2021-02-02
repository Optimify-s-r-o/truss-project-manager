import { Fetch, FetchStateType } from '../../../../types/_types';

export interface Evidence {
  Id: string;
  Name: string;
}

export interface EvidenceCustomerRequest extends Fetch {
  data?: Evidence;
}
export type EvidenceStateType = FetchStateType & {
  evidence: Evidence;
};
