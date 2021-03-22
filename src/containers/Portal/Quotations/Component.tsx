import Navigation from '../../../components/Navigation';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import VariablesBar from './components/VariablesBar';
import { ContentInline, PageHeader } from '../../../constants/globalStyles';
import { EmptyTemplate } from './components/EmpyTemplate';
import { Main } from '../SidebarFilter/Jobs/_styles';
import { PriceList } from '../PriceLists/_types';
import { QuotationEditor } from './components/QuotationEditor';
import { RouteComponentProps, useParams } from 'react-router-dom';
import { Select } from 'antd';
import { translationPath } from '../../../utils/getPath';
import { TreeContent } from '../_styles';
import {
	lang,
	t,
	WithTranslation,
	withTranslation,
} from "../../../translation/i18n";
import {
	ContentTemplate,
	PageTitle,
	QuotationTitle,
	TemplateContent,
} from "./_styles";
import {
	DeleteEpression,
	QuotationFileImport,
	QuotationList,
	QuotationParam,
	QuotationRequest,
	Quotations,
	QuotationTemplatePut,
	SectionVariableRequest,
	TemplateSection,
	TemplateSectionRequest,
	Variable as IVariable,
	VariableRequest,
} from "./_types";

const { Option } = Select;

export interface StateProps {
	quotations: Quotations;
	variables: Array<IVariable>;
	quotationList: QuotationList;
	priceLists: PriceList[];
	priceList: PriceList;
}

export interface DispatchProps {
	priceListsGetAction: (data: void) => void;
	quotationGetAction: (data: QuotationParam) => void;
	quotationPostAction: (data: TemplateSectionRequest) => void;
	quotationPutAction: (data: TemplateSectionRequest) => void;
	quotationDeleteAction: (data: QuotationParam) => void;
	quotationVariablesGetAction: (data: QuotationParam) => void;
	quotationSectionDeleteAction: (data: DeleteEpression) => void;
	quotationVariableDeleteAction: (data: QuotationParam) => void;
	quotationPutExpressionAction: (data: SectionVariableRequest) => void;
	quotationVariablePostAction: (data: VariableRequest) => void;
	quotationExpressionPostAction: (data: SectionVariableRequest) => void;
	quotationSummaryPutAction: (data: QuotationRequest) => void;
	clearQuotation: (data: void) => void;
	quotationListGetAction: (data: QuotationParam) => void;
	quotationAddTemplatePostAction: (data: QuotationParam) => void;
	quotationTemplatePutAction: (data: QuotationTemplatePut) => void;
	quotationTemplateDeleteAction: (data: QuotationParam) => void;
	quotationTemplateDuplicatePutAction: (data: QuotationParam) => void;
	quotationTemplateImportPostAction: (data: QuotationFileImport) => void;
	quotationTemplateExportGetAction: (data: string) => void;
	priceListGetByIdAction: (data: string) => void;
}

const Index = ({
	quotationTemplateImportPostAction,
	quotationTemplateExportGetAction,
	quotationPostAction,
	quotationGetAction,
	quotationPutAction,
	quotationDeleteAction,
	quotationVariablesGetAction,
	quotations,
	variables,
	quotationSectionDeleteAction,
	quotationVariableDeleteAction,
	quotationPutExpressionAction,
	quotationVariablePostAction,
	quotationExpressionPostAction,
	quotationSummaryPutAction,
	clearQuotation,
	quotationListGetAction,
	quotationList,
	quotationAddTemplatePostAction,
	quotationTemplatePutAction,
	quotationTemplateDeleteAction,
	quotationTemplateDuplicatePutAction,
	priceLists,
	priceListsGetAction,
	priceList,
	priceListGetByIdAction,
}: StateProps & DispatchProps & WithTranslation & RouteComponentProps) => {
	const { type } = useParams<{
		type: string;
		configuration?: string;
	}>();
	const [sections, setSections] = React.useState<Array<TemplateSection>>([]);
	const [activeVariable, setActiveVariable] = React.useState(null);
	const [activePrice, setActivePrice] = React.useState(null);
	const [activeConfiguration, setActiveConfiguration] = React.useState(null);
	const [typeParam, setTypeParam] = React.useState("Project");

	useEffect(() => {
		return () => {
			clearQuotation();
		};
	}, []);

	useEffect(() => {
		if (type) {
			setTypeParam(type);
			quotationGetAction({ Type: type });
			quotationListGetAction({ Type: type });
			priceListsGetAction();
			quotationVariablesGetAction({
				Type: type,
			});
		}
	}, [type]);

	useEffect(() => {
		if (!activeConfiguration) {
			setActiveConfiguration(quotationList?.DefaultTitle);
		}
	}, [quotationList]);

	useEffect(() => {}, []);

	const handleDoubleClick = (variable: string) => {
		if (activeVariable) {
			quotationPutExpressionAction({
				...activeVariable,
				QuantityExpression: activeVariable?.QuantityExpression + variable,
				QuotationId: quotations?.Id,
				Type: typeParam,
			});
		} else if (activePrice) {
			quotationPutExpressionAction({
				...activeVariable,
				PriceExpression: activePrice?.PriceExpression + variable,
				QuotationId: quotations?.Id,
				Type: typeParam,
			});
		}
	};

	const addQuotationTemplate = () => {
		quotationAddTemplatePostAction({ Type: typeParam });
	};

	const handleChangeTemplate = (title: string) => {
		setActiveConfiguration(title);
		quotationGetAction({ Type: typeParam, Id: title });
		quotationVariablesGetAction({ Type: typeParam, Id: title });
	};

	const handleQuotationTypeChange = (value: string) => {
		setTypeParam(value);
		quotationGetAction({ Type: value, Id: activeConfiguration });
		quotationVariablesGetAction({ Type: value, Id: activeConfiguration });
		quotationListGetAction({ Type: value });
		priceListsGetAction();
	};

	return (
		<ContentInline>
			<Main>
				<ContentTemplate>
					<PageHeader>
						<Navigation
							title={t(translationPath(lang.templates.configutarions))}
							handleChangeTemplate={handleChangeTemplate}
							quotationList={quotationList}
							quotation={quotations}
							addQuotationTemplate={addQuotationTemplate}
						/>
						<PageTitle>
							<QuotationTitle>
								{t(translationPath(lang.templates.template))}
							</QuotationTitle>
							<SSelect
								optionFilterProp="children"
								filterOption={(input, option) =>
									option.children.toLowerCase().indexOf(input.toLowerCase()) >=
									0
								}
								style={{ width: "300px", marginLeft: 10, marginTop: 10 }}
								placeholder={t(translationPath(lang.templates.template))}
								onChange={handleQuotationTypeChange}
								value={typeParam}
							>
								{["Project", "Job", "Truss"]?.map((p: string, i: number) => (
									<Option key={i} value={p}>
										{t(translationPath(lang.templates[p]))}
									</Option>
								))}
							</SSelect>
						</PageTitle>
					</PageHeader>

					<TemplateContent>
						<TreeContent>
							{quotationList?.DefaultId == null ? (
								<EmptyTemplate
									quotationTemplateImportPostAction={
										quotationTemplateImportPostAction
									}
									addQuotationTemplate={addQuotationTemplate}
									type={typeParam}
								/>
							) : (
								<QuotationEditor
									quotationTemplateImportPostAction={
										quotationTemplateImportPostAction
									}
									quotationTemplateExportGetAction={
										quotationTemplateExportGetAction
									}
									quotationTemplateDeleteAction={quotationTemplateDeleteAction}
									quotationTemplateDuplicatePutAction={
										quotationTemplateDuplicatePutAction
									}
									quotationTemplatePutAction={quotationTemplatePutAction}
									quotations={quotations}
									variables={variables}
									quotationList={quotationList}
									quotationGetAction={quotationGetAction}
									quotationPostAction={quotationPostAction}
									quotationPutAction={quotationPutAction}
									quotationDeleteAction={quotationDeleteAction}
									quotationVariablesGetAction={quotationVariablesGetAction}
									quotationVariableDeleteAction={quotationVariableDeleteAction}
									quotationPutExpressionAction={quotationPutExpressionAction}
									quotationVariablePostAction={quotationVariablePostAction}
									quotationExpressionPostAction={quotationExpressionPostAction}
									quotationSummaryPutAction={quotationSummaryPutAction}
									clearQuotation={clearQuotation}
									quotationListGetAction={quotationListGetAction}
									setSections={setSections}
									setActiveVariable={setActiveVariable}
									setActivePrice={setActivePrice}
									sections={sections}
									type={typeParam}
									priceLists={priceLists}
									priceList={priceList}
									priceListGetByIdAction={priceListGetByIdAction}
									activeConfiguration={activeConfiguration}
								/>
							)}
						</TreeContent>
					</TemplateContent>
				</ContentTemplate>
			</Main>
			<VariablesBar
				variables={variables}
				handleDoubleClick={handleDoubleClick}
			/>
		</ContentInline>
	);
};

const SSelect = styled(Select)`
	.ant-select-selector {
		background-color: ${(props) => props.theme.colors.forms.select} !important;
		color: ${(props) => props.theme.colors.secondaryText.default} !important;
	}

	.anticon svg {
		background-color: ${(props) => props.theme.colors.forms.select} !important;
	}
`;

export default withTranslation()(Index);
