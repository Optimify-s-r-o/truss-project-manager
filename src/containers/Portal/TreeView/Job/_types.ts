import { createProxy } from '../../../../utils/getPath';
import { Customer } from '../../Customer/_types';
import {
	Fetch,
	FetchStateType,
	JobType,
	RoofInfo,
	TrussExe,
} from "../../../../types/_types";

export interface Load {
	RoofingLoad: number;
	CeilingLoad: number;
	SnowRegion: string;
	SnowLoad: number;
	WindRegion: string;
	WindLoad: number;
	RoofingName: string;
	CeilingName: string;
}

export interface General {
	Name: string;
	Status: string;
	State: string;
	Place: string;
	Type: string;
	DateOfCreation: string;
	Description: string;
	LastEdit: string;
	RoofType: string;
	Complexity: string;
	PlatesWeight: number;
	PlanksVolume: number;
	Price: number;
	PlatesOnPlanks: number;
	PlatesOnArea: number;
	PlanksOnArea: number;
	PriceOnPlanks: number;
	PriceOnArea: number;
	RoofingArea: number;
	CeilingArea: number;
	Pitch: number;
	Centres: number;
	TrussTypesCount: number;
	TrussCount: number;
	Load: Load;
	LastChange: Date;
	Altitude: number;
	MergedDocumentation: boolean;
	PlatesWeightOnArea: number;
	PlatesWeightOnPlanksVolume: number;
	ProjectId: string;
	ProjectName: string;
	TrussType: TrussExe;
}

export interface Truss {
	Name: string;
	Count: number;
	ModelCount: number;
}

export interface Model {
	Name: string;
	Count: number;
	PlyCount: number;
}

export interface NailPlate {
	Id: string;
	Name: string;
	Count: number;
}

export interface Member {
	Name: string;
	Count: number;
}

export interface Material {
	Trusses: Truss[];
	Models: Model[];
	NailPlates: NailPlate[];
	Members: Member[];
}

export interface Document {
	Id: string;
	Name: string;
	Description: string;
	Date: Date;
	Valid: boolean;
}

export interface Contact {
	Id: string;
	Name: string;
	Description: string;
	Email: string;
	Phone: string;
}

export interface Details {
	Location: Location;
	CustomerContainer: Customer;
	Roof: RoofInfo;
	Load: Load;
}

export interface JobRootObject {
	General: General;
	Material: Material;
	Documents: Document[];
	Details: Details;
	Id: string;
}

export const JobProxy = createProxy<JobRootObject>();

export type JobStateType = FetchStateType &
	Readonly<{
		jobs: JobRootObject;
		image: any;
		quotationCalculating: boolean;
		trusses: JobTrusses;
	}>;

export interface JobsSelectedRequest extends Fetch {
	data?: string;
}

export interface UpdateJobRequest extends Fetch {
	data?: JobType;
}

export interface DeleteJob extends Fetch {}

export type ProjectNameJobName = {
	projectName: string;
	jobName: string;
};

export interface Unlock extends Fetch {}

export interface JobTruss {
	Id: string;
	Name: string;
	Quantity: number;
	Kind: string;
	Type: string;
	PriceIsNaN: boolean;
	PriceNotSet: true;
	Price: string;
}
export interface JobTrusses {
	Id: string;
	Trusses: JobTruss[];
	Name: string;
	ProjectId: string;
	ProjectName: string;
	PriceNotSet: boolean;
	PriceIsNan: boolean;
	LastEdit: string;
	LastEditName: string;
	LastEditSurname: string;
	LastEditEmail: string;
	Price: number;
	TemplateId?: string;
	TrussPriceSum: number;
	JobPriceWithoutTrusses: number;
	TrussQuantitySum: number;
	TrussTypesCount: number;
}

export interface GetTrusses {
	jobId: string;
	templateId?: string;
}
