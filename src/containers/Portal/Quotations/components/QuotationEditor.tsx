import * as _ from 'lodash';
import React, { useEffect } from 'react';
import Variable from './Variable';
import { CategoryHeader } from './CategoryHeader';
import { faPlusCircle } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { lang } from '../../../../translation/i18n';
import { PriceList } from '../../PriceLists/_types';
import { quotationExpressionPostAction } from '../_actions';
import { QuotationTitle } from './QuotationTitle';
import { translationPath } from '../../../../utils/getPath';
import { useTranslation } from 'react-i18next';
import {
	ContentCard,
	GridItem,
	GridRow,
} from "../../../../constants/globalStyles";
import {
	AddSectionButton,
	VariableAdd,
	VariableLine,
	Variables,
} from "../_styles";

import {
	QuotationRequest,
	Quotations,
	SectionVariable,
	SectionVariableRequest,
	TemplateSection,
	VariableRequest,
} from "../_types";
import {
	Variable as IVariable,
	QuotationParam,
	TemplateSectionRequest,
	QuotationList,
	QuotationTemplatePut,
	QuotationFileImport,
} from "../_types";
interface QuotationEditor {
	quotations: Quotations;
	variables: Array<IVariable>;
	quotationList: QuotationList;
	quotationGetAction: (data: QuotationParam) => void;
	quotationPostAction: (data: TemplateSectionRequest) => void;
	quotationPutAction: (data: TemplateSectionRequest) => void;
	quotationDeleteAction: (data: QuotationParam) => void;
	quotationVariablesGetAction: (data: QuotationParam) => void;
	quotationVariableDeleteAction: (data: QuotationParam) => void;
	quotationPutExpressionAction: (data: SectionVariableRequest) => void;
	quotationVariablePostAction: (data: VariableRequest) => void;
	quotationExpressionPostAction: (data: SectionVariableRequest) => void;
	quotationSummaryPutAction: (data: QuotationRequest) => void;
	clearQuotation: (data: void) => void;
	quotationListGetAction: (data: QuotationParam) => void;
	setSections: React.Dispatch<React.SetStateAction<TemplateSection[]>>;
	setActiveVariable: React.Dispatch<any>;
	setActivePrice: React.Dispatch<any>;
	sections: TemplateSection[];
	type: string;
	quotationTemplatePutAction: (data: QuotationTemplatePut) => void;
	quotationTemplateDeleteAction: (data: QuotationParam) => void;
	quotationTemplateDuplicatePutAction: (data: QuotationParam) => void;
	priceLists: PriceList[];
	quotationTemplateImportPostAction: (data: QuotationFileImport) => void;
	quotationTemplateExportGetAction: (data: string) => void;
	priceListGetByIdAction: (data: string) => void;
	priceList: PriceList;
	activeConfiguration: string;
}

export const QuotationEditor = ({
	quotationPostAction,
	priceLists,
	quotationPutAction,
	quotationDeleteAction,
	quotationVariablesGetAction,
	quotations,
	quotationVariableDeleteAction,
	quotationPutExpressionAction,
	quotationVariablePostAction,
	quotationExpressionPostAction,
	quotationSummaryPutAction,
	quotationTemplateDuplicatePutAction,
	quotationTemplateDeleteAction,
	quotationList,
	setActiveVariable,
	setActivePrice,
	setSections,
	sections,
	type,
	quotationTemplatePutAction,
	quotationTemplateImportPostAction,
	quotationTemplateExportGetAction,
	priceListGetByIdAction,
	priceList,
	activeConfiguration,
}: QuotationEditor) => {
	const { t } = useTranslation();

	useEffect(() => {
		if (quotations) {
			setSections(quotations?.Sections);
		}
	}, [quotations]);

	const addSection = () => {
		quotationPostAction({
			ActiveConfiguration: activeConfiguration,
			Title: t(translationPath(lang.templates.customSection).path),
			DefaultExpressionTitle: t(
				translationPath(lang.templates.defaultVariable).path
			),
			Type: type,
			Id: quotations?.Id,
		});
	};

	const addVariableToSection = (sectionKey) => {
		quotationExpressionPostAction({
			ActiveConfiguration: activeConfiguration,
			Text: t(translationPath(lang.templates.customVariable).path),
			PriceExpression: "",
			Value: "",
			Section: sectionKey,
			Exported: false,
			Type: type,
			QuotationId: quotations?.Id,
		});
	};

	const onRemoveVariable = (sectionKey) => {
		quotationVariableDeleteAction({
			Id: sectionKey,
			Type: type,
			QuotationId: quotations?.Id,
			ActiveConfiguration: activeConfiguration,
		});
	};

	const onSectionTitleEdit = (newValue: string, sectionKey: string) => {
		quotationPutAction({
			ActiveConfiguration: activeConfiguration,
			Type: type,
			Section: sectionKey,
			Title: newValue,
			Id: quotations?.Id,
		});
	};

	const onTitleEdit = (newValue: string, variable: SectionVariable) => {
		if (variable?.Text != newValue) {
			quotationPutExpressionAction({
				...variable,
				Text: newValue,
				Type: type,
				QuotationId: quotations?.Id,
				ActiveConfiguration: activeConfiguration,
			});
		}
	};

	const onExpressionEdit = (
		edited: SectionVariable,
		previous: SectionVariable
	) => {
		if (!_.isEqual(edited, previous)) {
			quotationPutExpressionAction({
				...edited,
				QuotationId: quotations?.Id,
				Type: type,
				ActiveConfiguration: activeConfiguration,
			});
		}
	};

	const createVariable = (variable: SectionVariable) => {
		quotationVariablePostAction({
			...variable,
			Type: type,
			Id: quotations?.Id,
			ActiveConfiguration: activeConfiguration,
		});
	};

	const removeSection = (key) => {
		quotationDeleteAction({
			ActiveConfiguration: activeConfiguration,
			Section: key,
			Type: type,
			Id: quotations?.Id,
		});
	};

	return (
		<>
			<GridRow columns={1}>
				<QuotationTitle
					activeConfiguration={activeConfiguration}
					quotations={quotations}
					quotationTemplatePutAction={quotationTemplatePutAction}
					quotationTemplateDeleteAction={quotationTemplateDeleteAction}
					quotationTemplateDuplicatePutAction={
						quotationTemplateDuplicatePutAction
					}
					quotationTemplateImportPostAction={quotationTemplateImportPostAction}
					quotationTemplateExportGetAction={quotationTemplateExportGetAction}
					quotationList={quotationList}
					type={type}
				/>
				{sections?.map((section, sectionKey) => {
					return (
						<GridItem key={sectionKey}>
							<ContentCard>
								<CategoryHeader
									draggable={true}
									title={section.Title}
									value={section.Value}
									onRemoveSection={() => {
										removeSection(section.Id);
									}}
									onTitleEdit={(newTitle: string) => {
										onSectionTitleEdit(newTitle, section.Id);
									}}
								/>
								<Variables>
									{section?.Variables?.map(
										(variable: SectionVariable, variableKey: number) => (
											<Variable
												activeConfiguration={activeConfiguration}
												currency={false}
												variable={variable}
												sectionKey={sectionKey}
												onRemoveVariable={() => {
													onRemoveVariable(variable.Id);
												}}
												onTitleEdit={(newTitle: string) => {
													onTitleEdit(newTitle, variable);
												}}
												onExpressionEdit={(editedVariable) =>
													onExpressionEdit(editedVariable, variable)
												}
												onBlurExpression={(e) => {
													setActiveVariable(null);
												}}
												onFocusExpression={(e) => {
													setActiveVariable(variable);
												}}
												onBlurPrice={(e) => {
													setActivePrice(null);
												}}
												onFocusPrice={(e) => {
													setActiveVariable(null);
													setActivePrice(variable);
												}}
												createVariable={(v) => createVariable(v)}
												variableKey={variableKey}
												key={variableKey}
												priceLists={priceLists}
												priceList={priceList}
												priceListGetByIdAction={priceListGetByIdAction}
											/>
										)
									)}
									<VariableLine>
										<VariableAdd
											onClick={() => addVariableToSection(section.Id)}
										>
											<FontAwesomeIcon icon={faPlusCircle} color={"green"} />
											{t(translationPath(lang.templates.addVariable).path)}
										</VariableAdd>
									</VariableLine>
								</Variables>
							</ContentCard>
						</GridItem>
					);
				})}
			</GridRow>
			<GridRow>
				<AddSectionButton onClick={() => addSection()}>
					<FontAwesomeIcon icon={faPlusCircle} color={"green"} />{" "}
					{t(translationPath(lang.templates.addSection).path)}
				</AddSectionButton>
			</GridRow>
		</>
	);
};
