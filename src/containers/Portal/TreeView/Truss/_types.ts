import { createProxy } from '../../../../utils/getPath';
import {
	Fetch,
	FetchStateType,
	QuotationsSelection,
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
	Id: string;
	Name: string;
	Count: number;
	Plies: number;
	Thickness: number;
	Centres: number;
	Phase: string;
	Type: string;
	ModelCount: number;
	PlateWeight: number;
	AveragePlateWeight: number;
	Planks: number;
	AveragePlanks: number;
	TransportWeight: number;
	Price: number;
	PriceSum: number;
	PlatesOnPlanks: number;
	PlatesOnArea: number;
	PlanksOnArea: number;
	PriceOnPlanks: number;
	PriceOnArea: number;
	Width: number;
	Height: number;
	Pitch: number;
	MembersCount: number;
	PlatesCount: number;
	SupportsCount: number;
	AverageSupportsCount: number;
	Load: Load;
	Status: string;
	PlateWeightOnArea: number;
	PlatesWeighOnPlanksVolume: number;
	Kind: string;
	RoofingLoad: number;
	CeilingLoad: number;
	SnowRegion: string;
	SnowLoad: number;
	WindRegion: string;
	WindLoad: number;
	RoofingName: string;
	CeilingName: string;
}

export interface Member {
	Name: string;
	Count: number;
}

export interface Plate {
	Id: string;
	Name: string;
	Count: number;
}

export interface Plank {
	Id: string;
	Size: string;
	Quality: string;
	Quantity: number;
	Length: number;
	B: number;
	H: number;
}

export interface Material {
	Members: Member[];
	Plates: Plate[];
	Planks: Plank[];
}

export interface Truss {
	General: General;
	Material: Material;
	Name: string;
	Names: string[];
	Phases: string[];
	Quotations: QuotationsSelection[];
	DefaultQuotationTitle: string;
	DefaultQuotationGenerated: boolean;
	DefaultQuotationTemplateId: string;
	DefaultQuotationId: string;
}

export const TrussProxy = createProxy<Truss>();

export type TrussStateType = FetchStateType &
	Readonly<{
		truss: Truss;
		image: string;
		quotationCalculating: boolean;
	}>;

export interface TrussRequest extends Fetch {
	data?: string;
}
