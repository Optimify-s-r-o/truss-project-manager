import { Fetch } from '../../../../../../types/_types';

export interface Json {
  Id: string;
  Json: any;
}

export interface IAddJsonToProject extends Fetch {
  data?: Json;
}
