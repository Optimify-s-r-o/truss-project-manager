import { Fetch, FetchStateType } from '../../../types/_types';

export type ResetPasswordRequestType = FetchStateType & ResetPassword;

export interface ResetPassword {
  email: string;
}

export interface ResetPasswordRequest extends Fetch {
  data?: ResetPassword;
}
