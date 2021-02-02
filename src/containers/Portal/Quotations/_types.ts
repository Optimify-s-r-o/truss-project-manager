import { createProxy } from '../../../utils/getPath';
import { FetchStateType } from '../../../types/_types';
import { PriceList } from '../PriceLists/_types';

export interface Quotations {
	Id: string;
	Sections: Array<TemplateSection>;
	Summary: string;
	Title: string;
	SummaryValid?: boolean;
	NotCalculatedSummary?: string;
	IsCalculated?: string;
}

export interface QuotationRequest extends Quotations {
	Type?: string;
	ActiveConfiguration?: string;
}

export interface QuotationParam {
	Type?: any;
	Section?: string;
	Id?: string;
	QuotationId?: string;
	TemplateId?: string;
	EntityId?: string;
	ActiveConfiguration?: string;
}

export interface DeleteEpression {
	section?: string;
	expression?: string;
}
export interface TemplateSection extends QuotationParam {
	Id?: string;
	Title: string;
	Value?: string;
	DefaultExpressionTitle?: string;
	Variables?: Array<SectionVariable>;
	Exported?: boolean;
	Summary?: string;
}

export interface ExpressionPut {
	expression?: string;
}

export interface SectionVariable {
	Id?: string;
	Expression?: string;
	Exported?: boolean;
	Valid?: boolean;
	QuantityExpression?: string;
	Text?: string;
	Value?: string;
	QuantityValid?: boolean;
	PriceValid?: boolean;
	QuantityExpressionUnit?: string;
	SectionId?: string;
	Description?: string;
	PriceExpression?: string;
	PriceExpressionType?: PriceExpresionType;
	PriceListId?: string;
	PriceUnit?: string;
	PricePerUnitExpression?: string;
	PriceSumExpression?: string;
	TotalPriceExpression?: string;
	PriceListItemId?: string;
	PriceListItems?: PriceList[];
	ActiveConfiguration?: string;
}

export interface SectionVariableRequest
	extends SectionVariable,
		QuotationParam {
	QuotationId: string;
}

export interface TemplateSectionRequest
	extends QuotationParam,
		TemplateSection {}

export interface QuotationTemplatePut {
	id: string;
	title: string;
	isDefault: boolean;
	type: string;
	ActiveConfiguration?: string;
}
export interface VariableType {
	title: string;
}

export const QuotationSectionProxy = createProxy<TemplateSection>();
export const QuotationVariableProxy = createProxy<VariableType>();

export type QuotationStateType = FetchStateType &
	Readonly<{
		quotations: Quotations;
		variables: Array<Variable>;
		quotationList: QuotationList[];
		newTemplate: Quotations;
	}>;

export interface Variable {
	id?: string;
	value: string;
	text: any;
}

export interface VariableRequest extends QuotationParam, SectionVariable {}

export enum QuotationSelection {
	PROJECT = "project",
	JOB = "job",
	TRUSS = "truss",
}

export enum QuotationType {
	PROJECT = "Project",
	JOB = "Job",
	TRUSS = "Truss",
}

export type QuotationList = {
	Type: QuotationType;
	DefaultTitle: string;
	DefaultId: string;
	Quotations: ListQuotation[];
};

export type ListQuotation = {
	Id: string;
	Title: string;
	IsDefault: boolean;
};

export type QuotationFileImport = {
	Id: string;
	File: any;
	Type: string;
};

export enum PriceExpresionType {
	PriceSum = "PriceSum",
	PricePerUnit = "PricePerUnit",
	PriceList = "PriceList",
}
