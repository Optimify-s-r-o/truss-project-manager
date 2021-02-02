import { Fetch, FetchStateType } from '../../../types/_types';
import { UserData } from '../../Portal/Accounts/_types';

export interface Credentials {
	username: string;
	password: string;
}

export interface Login extends Fetch {
	data?: Credentials;
}

export type LoginStateType = FetchStateType &
	Readonly<{
		token: string;
		cloud: boolean;
		local: boolean;
		organizationId: string;
		username: string;
		role: string;
		validUntil: string;
		users: UserData[];
	}>;
