import { Customer } from "src/containers/Portal/Customer/_types";
import { Plate } from "src/containers/Portal/TreeView/Truss/_types";
import { ApiURL } from "../constants/api";
import { Method } from "../constants/enum";
import { Routes } from "../constants/routes";
import { CustomerSimplified } from "../containers/Portal/Customer/_types";
import { Quotations } from "../containers/Portal/Quotations/_types";
import {
	ProjectFile,
	ProjectLog,
} from "../containers/Portal/TreeView/Project/_types";
import { Plank } from "../containers/Portal/TreeView/Truss/_types";
import { createProxy } from "../utils/getPath";

export type FetchStateType = Readonly<{
	error: string;
	pending: boolean;
}>;

export type Fetch = {
	action: any;
	actionsOnSuccess?: Fetch[] | null;
	method: Method;
	path?: Routes;
	url: ApiURL;
	param?: object | string | number | string[];
	paramObject?: object;
	successMessage?: boolean;
	body?: EnumBody;
	close?: boolean;
};

export enum EnumBody {
	FORM_DATA = "FORM_DATA",
}

export enum CustomerEnum {
	EVIDENCE = "0",
	LEGAL = "1",
	PERSON = "2",
	ALL = "4",
}

export enum JobStatus {
	NotCalculated = "NotCalculated",
	Succeeded = "Succeeded",
	Failed = "Failed",
}

export enum CustomerType {
	EVIDENCE = "InEvidence",
	Company = "Company",
	PERSON = "Person",
}
export interface RoofInfo {
	Pitch: number;
	CoveredArea: number;
	RoofArea: number;
	FloorArea: number;
	FasciaLength: number;
	Ridge: number;
	HipLength: number;
	WallplateLength: number;
	Centres: number;
	TrussTypes: number;
	TrussCount: number;
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

export interface Location {
	CountryId?: string;
	Country?: string;
	RegionName: string;
	CityName: string;
	StreetName: string;
	Zip: string;
	PlaceNumber: string;
}

export interface Details {
	Location: Location;
}

export interface ProjectView {
	Name: string;
	Customer: string;
	User: string;
	QuotationPriceFrom: number;
	QuotationPriceTo: number;
	ProductionPriceFrom: number;
	ProductionPriceTo: number;
	DateOfQuotationFrom: Date;
	DateOfQuotationTo: Date;
	DateOfRealizationFrom: Date;
	DateOfRealizationTo: Date;
}

export interface ProjectFilter {
	CustomerTypes: string[];
	Name: string;
	Customer: string;
	User: string;
	ActiveTree: TreeType;
	QuotationPriceFrom: number;
	QuotationPriceTo: number;
	ProductionPriceFrom: number;
	ProductionPriceTo: number;
	DateOfQuotationFrom: Date;
	DateOfQuotationTo: Date;
	DateOfRealizationFrom: Date;
	DateOfRealizationTo: Date;
	ProjectStates: string[];
}

export const ProjectFilterProxy = createProxy<ProjectFilter>();

export type ProjectSettings = Omit<ProjectFilter, "Name" | "Customer" | "User">;

export enum TreeType {
	PROJECT = "Project",
	JOB = "Job",
	CUSTOMER = "Customer",
	TRUSS = "Truss",
}

export type SettingsType = Readonly<{
	settings: Settings;
	filter: FilterSettings;
	activeTree: TreeType;
	folders: Folder;
}>;

export type Folder = {
	downloads: string;
	documents: string;
};
export interface Countries {
	Id: string;
	ThreeLettersIsoName: string;
	EnglishName: string;
	CurrencyNative: string;
	CurrencyEnglish: string;
	CurrencySymbol: string;
}

export interface Settings {
	Countries: Countries[];
	FolderPath: string;
}

export interface TrussFilter {
	PliesFrom: number;
	PliesTo: number;
	ThicknessFrom: number;
	ThicknessTo: number;
	CentresFrom: number;
	CentresTo: number;
	ModelCountFrom: number;
	ModelCountTo: number;
	TransportWeightFrom: number;
	TransportWeightTo: number;
	SpanFrom: number;
	SpanTo: number;
	HeightFrom: number;
	HeightTo: number;
	PitchFrom: number;
	PitchTo: number;
	MembersCountFrom: number;
	MembersCountTo: number;
	PlatesCountFrom: number;
	PlatesCountTo: number;
	SupportsCountFrom: number;
	SupportsCountTo: number;
	RoofingLoadFrom: number;
	RoofingLoadTo: number;
	CeilingLoadFrom: number;
	CeilingLoadTo: number;
	SnowRegions: string[];
	WindRegions: string[];
	WindLoadFrom: number;
	WindLoadTo: number;
	PriceFrom: number;
	PriceTo: number;
	SnowLoadTo: number;
	SnowLoadFrom: number;
	WeightFrom: number;
	WeightTo: number;
	Types: string[];
	LengthTo: number;
	LengthFrom: number;
	Statuses: string[];
	Phase: string[];
	Kinds: string[];
}

export type TrussesType = FetchStateType &
	Pagination &
	Readonly<{
		trusses: Truss[];
		trussPending: boolean;
	}>;

export const SettingsProxy = createProxy<Settings>();

export interface CustomerFilter {
	NumberOfProjectsTo?: number;
	NumberOfProjectsFrom?: number;
	AveragePricePerProjectFrom?: number;
	AveragePricePerProjectTo?: number;
	SumOfProjectPricesTo?: number;
	SumOfProjectPricesFrom?: number;
	NumberOfQuotationsFrom?: number;
	NumberOfQuotationsTo?: number;
	NumberOfProductionsFrom?: number;
	NumberOfProductionsTo?: number;
}
export interface FilterSettings {
	Project: ProjectSettings;
	Truss: TrussFilter;
	Job: JobFilter;
	Customer: CustomerFilter;
}

export interface Trusses {
	Data: Truss[];
	PageSize: number;
	Page: number;
}

export interface Truss {
	Id: string;
	JobId: string;
	JobName: string;
	Name: string;
	Status: number;
	Count: number;
	Plies: number;
	Thickness: number;
	Centres: number;
	Phase: string;
	Type: string;
	ModelCount: number;
	PlateWeight: number;
	Planks: number;
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
	Length: number;
	MembersCount: number;
	PlatesCount: number;
	SupportsCount: number;
	RoofingLoad: number;
	CeilingLoad: number;
	SnowRegion: string;
	SnowLoad: number;
	WindRegion: string;
	WindLoad: number;
	RoofingName: string;
	CeilingName: string;
	ParentProjectId?: string;
	ParentClusterId?: string;
	ParentJobId?: string;
	Project: string;
	ProjectName: string;
	Kind: string;
	ParentCustomerId?: string;
	Quotations: QuotationsSelection[];
}

export const TrussProxy = createProxy<Truss>();

export const FilterSettingsProxy = createProxy<FilterSettings>();

export interface JobFilter {
	CustomerTypes: string[];
	DateOfCreationFrom: Date;
	DateOfCreationTo: Date;
	PriceFrom: number;
	PricePerSquareMeterFrom: number;
	PricePerSquareMeterTo: number;
	PriceTo: number;
	AltitudeFrom: number;
	AltitudeTo: number;
	SnowAreas: string[];
	SnowFrom: number;
	SnowTo: number;
	WindAreas: string[];
	WindFrom: number;
	WindTo: number;
	CoveredAreaFrom: number;
	CoveredAreaTo: number;
	RidgeLengthFrom: number;
	RidgeLengthTo: number;
	HipLengthTo: number;
	HipLengthFrom: number;
	JobTypes: string[];
	States: string[];
}

export interface User {
	Name: string;
	Role: string;
}

export interface Prices {
	Quotation: number;
	Production: number;
}

export interface Contact {
	Id: string;
	Forename: string;
	Surname: string;
	Description: string;
	Contact: {
		Email: string;
		Phone: string;
	};
}

export interface Company {
	Id?: string;
	Name: string;
	Crn: string;
	VatRegNo: string;
	Address: Location;
	Contacts?: Contact[];
}

export interface Person {
	Id: string;
	Forename: string;
	Surname: string;
	Email: string;
	PhoneNumber: string;
	Address: Location;
}

export interface Evidence {
	Id?: string;
	Name: string;
}

export interface CustomerRequest extends Fetch {
	data: Customer;
}
export const PersonProxy = createProxy<Person>();
export const CompanyProxy = createProxy<Company>();

export type CustomerStateType = FetchStateType &
	Readonly<{
		customer: Customer;
		ares: Customer;
		newCustomer: Customer;
		aresPending: boolean;
		customers: Data<Customer>;
		customersSimplified: Data<CustomerSimplified>;
	}>;

export interface Job {
	Id: string;
	JobName: string;
	JobState: string;
	Description: string;
	Customer: string;
	Project: string;
	Status: string;
	State: string;
	Type: string;
	LastChange: string;
	Price: number;
	TrussType: TrussExe;
	Lock: string;
	Url: string;
}

export interface Id {
	Id: string;
	ProjectId: string;
}

export interface Project {
	Id: string;
	Name: string;
	State: string;
	Status: string;
	Description: string;
	TimeOfCreation: Date | string;
	DateOfLastUpdate: Date | string;
	QuotationDate?: any;
	QuotationFinished?: boolean;
	ConstructionDate?: any;
	ConstructionFinished?: boolean;
	ClusteringEnabled: boolean;
	Units: number;
	Currency: string;
	Standard: number;
	NationalAnnex: number;
	Notes: string;
	CustomerId?: any;
	Customer: string;
	CustomerType: string;
	AssignedUser: string;
	AssignedUserRole: string;
	QuotationPrice: number;
	ProductionPrice: number;
	Location: Location;
	Jobs: Job[];
	ParentCustomerId?: string;
	ParentProjectId?: string;
	ParentClusterId?: string;
	Phases: string[];
	Quotations: QuotationsSelection[];
	DefaultQuotationTitle: string;
	DefaultQuotationGenerated: boolean;
	DefaultQuotationTemplateId: string;
	DefaultQuotationId: string;
	callback: any;
}

export type QuotationsSelection = {
	Title: string;
	Generated: boolean;
	Id: string;
	TemplateId?: string;
};

export const ProjectProxy = createProxy<Project>();

export type ProjectStateType = FetchStateType &
	Readonly<{
		project: Project;
		files: ProjectFile[];
		filesPending: boolean;
		logs: ProjectLog[];
		projectPending: boolean;
		duplicatePending: boolean;
		duplicateId: string;
		quotationCalculating: boolean;
		quotations: Quotations;
		filesUploading: boolean;
	}>;

export interface Planks {
	Id: string;
	Size: string;
	Quality: string;
	Quantity: number;
	Length: number;
	B: number;
	H: number;
}

export interface NailPlate {
	Id: string;
	Name: string;
	Count: number;
}

export interface JobsGeneral {
	PlatesWeight: number;
	AveragePlatesWeight: number;
	PlanksVolume: number;
	AveragePlanksVolume: number;
	Price: number;
	AveragePrice: number;
	PlatesWeightOnArea: number;
	PlatesWeightOnPlanksVolume: number;
	PriceOnPlanks: number;
	PriceOnArea: number;
	RoofingArea: number;
	AverageRoofingArea: number;
	CeilingArea: number;
	AverageCeilingArea: number;
	Pitch: number;
	Centres: number;
	TrussTypesCount: number;
	TrussCount: number;
	RoofingLoad: number;
	CeilingLoad: number;
	SnowLoad: number;
	WindLoad: number;
}

export interface JobRootObject {
	Name: string[];
	Plates: Plate[];
	Planks: Plank[];
	General: JobsGeneral;
}

export const JobsProxy = createProxy<JobRootObject>();

export type JobsStateType = FetchStateType &
	Readonly<{
		jobs: JobRootObject;
	}>;

export interface JobType {
	Id: string;
	JobName: string;
	Description: string;
	Customer: string;
	CustomerName: string;
	Project?: any;
	Status: string;
	State: string;
	Type: string;
	LastChange: string;
	Price: number;
	MergedDocumentation: boolean;
	Altitude: number;
	DateOfCreation: Date;
	Place: Location;
	RoofInfo: RoofInfo;
	Load: Load;
	ParentProjectId?: string;
	ParentCustomerId?: string;
	TrussType?: TrussExe;
	Phases: string[];
	Phase: any;
	Lock: string;
	Details: Details;
	Quotations: QuotationsSelection[];
	DefaultQuotationTitle: string;
	DefaultQuotationGenerated: boolean;
	DefaultQuotationTemplateId: string;
	DefaultQuotationId: string;
	callback: any;
}

export const JobTypeProxy = createProxy<JobType>();

export interface Data<T> extends PaginationDto {
	Data: T[];
}

export interface FilterData<T> extends PaginationDto {
	Data: T;
}

export interface Page {
	PageSize?: number | null;
	Page?: number | null;
	Sort?: string | null;
	Filtered?: boolean;
	All?: boolean;
	Paginate?: boolean;
	RewriteSort?: boolean;
	trusses?: any;
}

export interface Pagination {
	pageSize: number | null;
	firstRecordOnPage: number | null;
	lastRecordOnPage: number | null;
	currentPage: number | null;
	totalPages: number | null;
	totalRecords: number | null;
	isFiltered?: boolean | null;
	recordsBeforeFilter?: number | null;
}

export interface PaginationDto {
	Next: Page | null;
	PageSize: number | null;
	Page: number | null;
	Previous: Page | null;
	First: Page | null;
	Last: Page | null;
	FirstRecordOnPage: number | null;
	LastRecordOnPage: number | null;
	CurrentPage: number | null;
	TotalPages: number | null;
	TotalRecords: number | null;
	IsFilterActive: boolean;
	IsFiltered?: boolean;
	RecordsBeforeFilter?: number;
}

export interface Tree {
	Id: string;
	Name: string;
	Show: boolean;
	NextLayerExists: boolean;
	Checked: boolean;
	Open: boolean;
	Navigation: boolean;
	Status: string;
	Type: CustomerEnum;
	AdditionalInformation: any[];
	NextLayer: Tree[];
	Customer: Customer;
	PreviousLayerId: number;
	JobState: string;
	ProjectName: string;
	JobName: string;
	TrussType?: TrussExe;
}

export enum TrussExe {
	TRUSS_3D = "TRUSS_3D",
	TRUSS_2D = "TRUSS_2D",
	NONE = "NONE",
}

export enum TrussAction {
	EDIT = "EDIT",
	ADD = "ADD",
}

export interface UserInfo {
	Token: string;
	OrganizationId: string;
	Username: string;
	Role: string;
	ValidUntil: string;
	Location: string;
	Settings: any;
}

export enum UserRole {
	OrganizationAdmin = "ORGANIZATIONADMIN",
}

export interface FilterEvents {
	IncludeNotSet: boolean;
	Active: boolean;
}
