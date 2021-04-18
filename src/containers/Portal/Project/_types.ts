import { Fetch, FetchStateType, Location } from '../../../types/_types';

export interface TrussFile {
	file: any;
}

export type FileStateType = FetchStateType &
	Readonly<{
		file: any;
		filePresent: boolean;
		project: ProjectResponse;
	}>;

export type ProjectStateType = FetchStateType &
	Readonly<{
		project: Project;
	}>;

export type ProjectRequestStateType = FetchStateType &
	Readonly<{
		project: ProjectRequest;
	}>;

export interface CreateInEvidence {
	Name: string;
}

export interface Project {
	Files: File[];
	Id: string;
	Name: string;
	Description: string;
	TimeOfCreation: Date | string;
	DateOfLastUpdate: Date | string;
	QuotationDate?: any;
	ConstructionDate?: any;
	Notes: string;
	CustomerId?: any;
	Customer: string;
	AssignedUser: string;
	Location: Location;
	QuotationFinished?: boolean;
	ConstructionFinished?: boolean;
}

export type Clustering = {
	EnableClustering: boolean;
};

export type ProjectRequest = Omit<Project, "Id"> & {
	openTruss3D?: boolean;
	openTruss2D?: boolean;
	trussExe?: string;
	callback: any;
};

export type createfromJson = Omit<Project, "Id"> & {
	Json: any;
	callback: any;
};

export interface ProjectResponse {
	Name: string;
	Description: string;
	Currency: string;
	Standard: string;
	Country: string;
	Notes: string;
}

export interface FileRequest extends Fetch {
	data?: string | object;
}

export interface DeleteProject extends Fetch {}
