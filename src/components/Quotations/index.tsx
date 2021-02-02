import Loading from '../Optimify/Loading';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { CategoryHeader } from '../../containers/Portal/Quotations/components/CategoryHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatCurrency } from 'src/utils/currencyFormat';
import { lang } from '../../translation/i18n';
import { Popconfirm } from 'antd';
import { PriceList } from '../../containers/Portal/PriceLists/_types';
import { QuotationCalculate } from '../../containers/Portal/TreeView/Project/_types';
import { translationPath } from '../../utils/getPath';
import { useTranslation } from 'react-i18next';
import { VariableTable } from './VariableTable';
import {
	faFileExport,
	faServer,
	faSync,
} from "@fortawesome/pro-light-svg-icons";
import {
	ContentCard,
	ContentRow,
	ContentRowEnd,
	GridItem,
	GridRow,
} from "../../constants/globalStyles";
import {
	TemplateContent,
	Variables,
} from "../../containers/Portal/Quotations/_styles";
import {
	QuotationParam,
	Quotations,
	QuotationSelection,
	QuotationType,
	SectionVariableRequest,
	TemplateSection,
} from "../../containers/Portal/Quotations/_types";
import {
	MainTree,
	MainTreeContent,
	TreeContent,
	TreeScreen,
} from "../../containers/Portal/_styles";

export interface SelectionQuotation {
	quotationPutAction: (node: SectionVariableRequest) => void;
	quotationSummaryPutAction: (newValue: string) => void;
	quotations: Quotations;
	type: QuotationSelection;
	quotationType: QuotationType;
	calculate: (data: QuotationCalculate) => void;
	id: string;
	pendingCalculation: boolean;
	quotationSelectionVariableDeleteAction: (data: QuotationParam) => void;
	quotationSelectionSectionDeleteAction: (data: QuotationParam) => void;
	quotationDownloadAction: (data: QuotationParam) => void;
	selected: string;
	priceLists: PriceList[];
}

export const SelectionQuotation = ({
	quotationPutAction,
	quotations,
	quotationSummaryPutAction,
	type,
	calculate,
	id,
	pendingCalculation,
	quotationDownloadAction,
	quotationSelectionVariableDeleteAction,
	quotationSelectionSectionDeleteAction,
	selected,
	priceLists,
	quotationType,
}: SelectionQuotation) => {
	const [sections, setSections] = React.useState<Array<TemplateSection>>([]);
	const { t } = useTranslation();

	useEffect(() => {
		if (quotations) {
			setSections(quotations?.Sections);
		}
	}, [quotations]);

	const handleQuotationCalculation = (
		event: React.MouseEvent<HTMLElement, MouseEvent>
	) => {
		calculate({
			entityId: id,
			recursiveRecreate: false,
			templateId: selected,
			type: QuotationType.TRUSS,
		});
	};

	const handleQuotationCalculationLoadData = (
		event?: React.MouseEvent<HTMLElement, MouseEvent>
	) => {
		calculate({
			entityId: id,
			recursiveRecreate: true,
			templateId: selected,
			type: QuotationType.TRUSS,
		});
	};

	const handleQuotationExport = (
		event: React.MouseEvent<HTMLElement, MouseEvent>
	) => {
		quotationDownloadAction({ Id: quotations.Id });
	};

	return (
		<MainTree>
			<Loading
				text={t(translationPath(lang.common.loading).path)}
				pending={pendingCalculation}
				margin
			>
				<MainTreeContent>
					<TreeScreen>
						<TemplateContent>
							<TreeContent>
								<ActionSection>
									<ActionButton onClick={handleQuotationCalculation}>
										<FontAwesomeIcon icon={faSync} />
										{t(
											translationPath(lang.templates.generateNewQuotation).path
										)}
									</ActionButton>
									<Popconfirm
										title={t(
											translationPath(lang.templates.warningQuotation).path
										)}
										onConfirm={handleQuotationCalculationLoadData}
										okText={t(translationPath(lang.common.yes).path)}
										cancelText={t(translationPath(lang.common.no).path)}
									>
										<ActionButton>
											<FontAwesomeIcon icon={faServer} />
											{t(
												translationPath(
													lang.templates.generateNewQuotationFromNewData
												).path
											)}
										</ActionButton>
									</Popconfirm>

									<ActionButton onClick={handleQuotationExport}>
										<FontAwesomeIcon icon={faFileExport} />
										{t(translationPath(lang.common.export).path)}
									</ActionButton>
								</ActionSection>
								<GridRow columns={1}>
									{sections?.map(
										(section: TemplateSection, sectionKey: number) => {
											return (
												<GridItem key={sectionKey}>
													<ContentCard>
														<CategoryHeader
															draggable={false}
															title={section.Title}
															value={section.Value}
															disabled={pendingCalculation}
														/>
														<Variables>
															<VariableTable
																section={section}
																quotationPutAction={quotationPutAction}
																priceLists={priceLists}
																id={quotations?.Id}
																type={quotationType}
																entityId={id}
																selected={selected}
															/>
														</Variables>
														<SummarySection>
															<SummarySectionPrice>
																<div>
																	{t(
																		translationPath(lang.templates.sectionSum)
																			.path
																	)}
																	:
																</div>
																<TotalPrice>{section.Summary}</TotalPrice>
															</SummarySectionPrice>
														</SummarySection>
													</ContentCard>
												</GridItem>
											);
										}
									)}
									<Summary>
										<SummaryPrice>
											<div>
												{t(translationPath(lang.common.priceTotal).path)}:
											</div>
											<TotalPrice>
												{formatCurrency(parseInt(quotations.Summary))}
											</TotalPrice>
										</SummaryPrice>
									</Summary>
								</GridRow>
							</TreeContent>
						</TemplateContent>
					</TreeScreen>
				</MainTreeContent>
			</Loading>
		</MainTree>
	);
};

export const ActionButton = styled.button`
	background: transparent;
	border: none;
	color: ${(props) => props.theme.colors.secondaryText.hover};

	cursor: pointer;

	svg {
		margin: 0 0.5rem -2px 0;

		font-size: 1.25rem;
	}

	&:hover {
		color: ${(props) => props.theme.colors.primary.hover};
	}

	& + & {
		margin-left: 1rem;
	}
`;

export const ActionSection = styled(ContentRowEnd)`
	padding: 0 8px 10px 0px;
`;

export const Summary = styled(ContentRowEnd)`
	padding-top: 35px;
	text-align: end;
`;

export const SummarySection = styled(ContentRowEnd)`
	padding-top: 20px;
	text-align: end;
`;

export const SummaryPrice = styled(ContentRow)`
	font-size: 1.4em;
	padding: 7px 10px 0px 25px;
	margin-right: 15px;
	border-top: 3px solid #17785e;
	text-align: end;
`;

export const SummarySectionPrice = styled(ContentRow)`
	font-size: 1.1em;
	padding: 7px 10px 0px 25px;
	margin-right: 15px;
	border-top: 1px solid #17785e;
	text-align: end;
`;

export const TotalPrice = styled.div`
	margin-left: 8px;
`;
