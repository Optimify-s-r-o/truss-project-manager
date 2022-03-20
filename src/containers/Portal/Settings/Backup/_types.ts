import { FetchStateType } from '../../../../types/_types';

export interface BackupRequest {
	directory: string;
}

export interface BackupResponse {
	Projects: BackupProject[];
	Count: number;
	FetchTime: string;
}

export interface BackupProject {
	Name: string;
	Id: string;
	CreatedAt: string;
	Jobs: BackupJob[];
}

export interface BackupJob {
	Name: string;
	Id: string;
}

export type BackupRequestStateType = FetchStateType &
	Readonly<{
		list: BackupResponse;
		status: number;
		downloadingText: string;
	}>;