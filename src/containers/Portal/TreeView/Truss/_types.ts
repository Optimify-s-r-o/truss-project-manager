import { createProxy } from '../../../../utils/getPath';
import { Fetch, FetchStateType } from '../../../../types/_types';

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

export interface Member {
	Name: string;
	CountSum: number;
	Count: number;
}

export interface Plate {
	Id: string;
	Name: string;
	Count: number;
	CountSum: number;
	Length: number;
	Thickness: number;
	Type: string;
	Width: string;
}

export interface Plank {
	Id: string;
	Size: string;
	Grade: string;
	Count: number;
	CountSum: number;
	Length: number;
	Thickness: number;
	Width: number;
}

export const PlankProxy = createProxy<Plank>();
export const MemberProxy = createProxy<Member>();
export const PlateProxy = createProxy<Plate>();

export interface Material {
	Members: Member[];
	Plates: Plate[];
	Planks: Plank[];
}

export interface Truss {
	Id: string;
	TrussName: string;
	Status: string;
	Quantity: string;
	PliesCount: string;
	Thickness: number;
	Centres: number;
	Kind: string;
	Type: string;
	ModelsCount: number;
	PlateWeight: number;
	Volume: number;
	TransportWeight: number;
	Price: number;
	PriceSum: number;

	PlateWeightOnArea: number;
	PlateWeightOnVolume: number;
	VolumeOnArea: number;
	PriceOnVolume: number;
	PriceOnArea: number;

	Span: number;
	Height: number;
	Pitch: number;
	MembersCount: number;
	JointsCount: number;
	SupportsQuantity: number;

	RoofingLoad: number;
	CeilingLoad: number;
	SnowLoad: number;
	WindLoad: number;
	SnowArea: string;
	WindArea: string;

	Names: string[];
}

export interface Trusses extends Truss {
	Members: Member[];
	Plates: Plate[];
	Planks: Plank[];
	Count: number;
	Plies: number;
	AveragePlateWeight: number;
	AveragePlanks: number;
	PlatesOnPlanks: number;
	PlatesOnArea: number;
	PlanksOnArea: number;
	PriceOnPlanks: number;
	Width: number;
	PlatesCount: number;
	AverageSupportsCount: number;
	Load: Load;
	SnowRegion: string;
	WindRegion: string;
	RoofingName: string;
	CeilingName: string;
	Names: string[];
	Phases: string[];
}
export interface TrussQuotationInfo {
	Quotations: any;
	DefaultQuotationTitle: string;
	DefaultQuotationGenerated: boolean;
	DefaultQuotationTemplateId: string;
	DefaultQuotationId: string;
}
export const TrussProxy = createProxy<Truss>();
export const TrussesProxy = createProxy<Trusses>();

export type TrussStateType = FetchStateType &
	Readonly<{
		truss: Truss;
		image: string;
		quotationCalculating: boolean;
		materials: Material;
		quotations: TrussQuotationInfo;
	}>;

export interface TrussRequest extends Fetch {
	data?: string;
}
