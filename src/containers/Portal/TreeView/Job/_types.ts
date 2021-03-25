import { createProxy } from '../../../../utils/getPath';
import { Customer } from '../../Customer/_types';
import { Location } from '../../Customer/Create/_types';
import { Plank } from '../Truss/_types';
import {
	Fetch,
	FetchStateType,
	JobType,
	QuotationsSelection,
	RoofInfo,
	TrussExe,
} from "../../../../types/_types";

export interface CopyJob {
	ProjectId: string;
	JobId: string;
}

export interface RequestDownloadLink {
	Id: string;
	Path: string;
}
export interface DownloadLink {
	Url: string;
}
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

export interface Details {}

export interface JobRootObject {
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
	Price: number;
	PlatesOnPlanks: number;
	PlatesOnArea: number;
	PlanksOnArea: number;
	PriceOnArea: number;
	RoofingArea: number;
	CeilingArea: number;
	Pitch: number;
	Centres: number;
	TrussTypesCount: number;
	TrussCount: number;
	TrussTypes: number;
	Load: Load;
	LastChange: Date;
	Altitude: number;
	MergedDocumentation: boolean;
	ProjectId: string;
	ProjectName: string;
	TrussType: TrussExe;
	PlatesWeightOnArea: number;
	PlatesWeightOnPlanksVolume: number;
	PlatesWeight: number;
	PlanksVolume: number;
	PriceOnPlanks: number;
	Material: Material;
	Documents: Document[];
	Location: Location;
	CustomerContainer: Customer;
	RoofInfo: RoofInfo;
	Id: string;
}

export const JobProxy = createProxy<JobRootObject>();

export type JobStateType = FetchStateType &
	Readonly<{
		jobs: JobRootObject;
		image: any;
		quotationCalculating: boolean;
		trusses: JobTrusses;
		quotations: QuotationsInfo;
		materials: Materials;
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
	Quotations: QuotationsSelection[];
	DefaultQuotationTitle: string;
	DefaultQuotationGenerated: boolean;
	DefaultQuotationTemplateId: string;
	DefaultQuotationId: string;
}

export interface GetTrusses {
	jobId: string;
	templateId?: string;
}

export interface Materials {
	Id: string;
	JobName: string;
	Phases: string[];
	Trusses: Truss[];
	Models: Model[];
	NailPlates: NailPlate[];
	Members: Member[];
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
	Name: string;
	Count: number;
	Type: string;
	Width: number;
	Length: number;
	Thickness: number;
}

export interface Member {
	Name: string;
	Count: number;
}

export const PlankProxy = createProxy<Plank>();
export const MemberProxy = createProxy<Member>();
export const ModelProxy = createProxy<Model>();
export const NailPlateProxy = createProxy<NailPlate>();

export interface Quotation {
	Title: string;
	Generated: boolean;
	IsDefault: boolean;
	TemplateId: string;
	Id: string;
	Created: Date;
	IsDefaultSelect: boolean;
}

export interface QuotationsInfo {
	Quotations: Quotation[];
	DefaultQuotationTitle: string;
	DefaultQuotationGenerated: boolean;
	DefaultQuotationTemplateId: string;
	DefaultQuotationId: string;
	DefaultQuotationCreated: Date;
	Id: string;
	JobName: string;
	Status: string;
}
