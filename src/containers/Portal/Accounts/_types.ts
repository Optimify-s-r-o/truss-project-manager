import { Data, Fetch, FetchStateType } from "../../../types/_types";
import { createProxy } from "../../../utils/getPath";

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

export interface Users {
	users: UserData[];
}

export type UsersType = FetchStateType &
	Readonly<{
		users: UserData;
		usersWithPagination: Data<UserData>;
		edit: UserData | null;
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
