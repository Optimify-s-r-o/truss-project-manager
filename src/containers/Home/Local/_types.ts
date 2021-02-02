import { FetchStateType } from '../../../types/_types';
import { UserData } from '../../Portal/Accounts/_types';

export interface Users {
  users: UserData[];
}

export type UsersStateType = FetchStateType &
  Users & {
    local: boolean;
    token: string;
    organizationId: string;
    username: string;
    role: string;
    validUntil: string;
  };
