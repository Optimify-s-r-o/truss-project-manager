import { createProxy } from '../../../utils/getPath';
import { Data, Fetch, FetchStateType } from '../../../types/_types';

export interface UserData {
	Id: string;
	Username: string;
	Email: string;
	Name: string;
	Surname: string;
	PhoneNumber: string;
	Password: string;
	Role: string;
}

export const UserProxy = createProxy<UserData>();

export interface User extends Fetch {
	data: UserData;
}

export interface Users {
	users: User[];
}

export type UsersType = FetchStateType &
	Readonly<{
		users: Data<UserData>;
		edit: User | null;
		user: UserData | null;
	}>;

export type NewPassword = {
	oldPassword: string;
	newPassword: string;
	verifyPassword: string;
};

export interface ChangePassword extends Fetch {
	data?: NewPassword;
}
