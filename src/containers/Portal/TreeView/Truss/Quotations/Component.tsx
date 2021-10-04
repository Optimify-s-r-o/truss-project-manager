import lang from '../../../../../translation/lang';
import Loading from '../../../../../components/Optimify/Loading';
import Navigation from '../../../../../components/NavigationCalculated';
import React, { useEffect, useState } from 'react';
import { Empty } from 'antd';
import { faServer, faSync } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MainTreeContent, TreeContent, TreeScreen } from '../../../_styles';
import { PriceList } from '../../../PriceLists/_types';
import { QuotationCalculate } from '../../Project/_types';
import { QuotationColumn } from '../../../../../constants/globalStyles';
import { translationPath } from '../../../../../utils/getPath';
import { Truss, TrussQuotationInfo, TrussRequest } from '../_types';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
	ActionButton,
	ActionSection,
	SelectionQuotation,
} from "../../../../../components/Quotations";
import {
	QuotationList,
	QuotationParam,
	QuotationRequest,
	Quotations,
	QuotationSelection,
	QuotationType,
	SectionVariableRequest,
} from "../../../Quotations/_types";

export interface StateProps {
	quotations: Quotations;
	truss: Truss;
	quotationCalculating: boolean;
	quotationList: QuotationList;
	priceLists: PriceList[];
	pending: boolean;
	quotationsInfo: TrussQuotationInfo;
}

export interface DispatchProps {
	quotationSelectionGetAction: (data: QuotationCalculate) => void;
	quotationSelectionPutAction: (data: SectionVariableRequest) => void;
	quotationSelectionSummaryPutAction: (data: QuotationRequest) => void;
	clearQuotation: (data: void) => void;
	calculateTruss: (data: QuotationCalculate) => void;
	quotationSelectionVariableDeleteAction: (data: QuotationParam) => void;
	quotationSelectionSectionDeleteAction: (data: QuotationParam) => void;
	quotationDownloadQuotationAction: (data: QuotationParam) => void;
	getTruss: (data: TrussRequest) => void;
	quotationListGetAction: (data: QuotationParam) => void;
	getTrussQuotations: (data: string) => void;
}

export default ({
	quotations,
	quotationSelectionGetAction,
	quotationSelectionPutAction,
	quotationSelectionSummaryPutAction,
	clearQuotation,
	calculateTruss,
	quotationCalculating,
	quotationSelectionVariableDeleteAction,
	quotationSelectionSectionDeleteAction,
	truss,
	quotationDownloadQuotationAction,
	quotationListGetAction,
	quotationList,
	priceLists,
	pending,
	getTrussQuotations,
	quotationsInfo,
}: StateProps & DispatchProps) => {
	const { t } = useTranslation();
	const [selected, setSelected] = useState(null);
	const { id } = useParams<{ id: string }>();

	useEffect(() => {
		if (id) {
			getTrussQuotations(id);
		}
	}, [id]);
	useEffect(() => {
		quotationListGetAction({ Type: QuotationType.TRUSS });
	}, []);

	useEffect(() => {
		if (quotationList) {
			const defaultId = quotationsInfo?.DefaultQuotationTemplateId
				? quotationsInfo?.DefaultQuotationTemplateId
				: quotationList?.DefaultId;
			if (defaultId) {
				setSelected(defaultId);
				quotationSelectionGetAction({
					type: QuotationType.TRUSS,
					entityId: truss?.Id,
					templateId: defaultId,
				});
			}
		}
	}, [quotationList, truss]);

	const quotationPutAction = (node: SectionVariableRequest) => {
		quotationSelectionPutAction({
			...node,
		});
	};
	const quotationSummaryPutAction = (newValue: string) => {
		if (newValue != quotations?.Summary) {
			quotationSelectionSummaryPutAction({
				...quotations,
				Id: quotations?.Id,
				Summary: newValue,
			});
		}
	};
	const handleQuotationCalculation = (
		event: React.MouseEvent<HTMLElement, MouseEvent>
	) => {
		calculateTruss({
			entityId: truss?.Id,
			recursiveRecreate: false,
			templateId: selected,
			type: QuotationType.TRUSS,
		});
	};

	const handleQuotationCalculationLoadData = (
		event: React.MouseEvent<HTMLElement, MouseEvent>
	) => {
		calculateTruss({
			entityId: truss?.Id,
			recursiveRecreate: true,
			templateId: selected,
			type: QuotationType.TRUSS,
		});
	};

	useEffect(() => {
		return () => {
			clearQuotation();
		};
	}, []);

	const handleChangeTemplate = (id: string) => {
		setSelected(id);
		quotationSelectionGetAction({
			type: QuotationType.TRUSS,
			entityId: truss?.Id,
			templateId: id,
		});
	};
	return (
		<MainTreeContent>
			<Navigation
				title={t(translationPath(lang.templates.configutarions).path)}
				selected={selected}
				quotationList={quotationList}
				handleChangeTemplate={handleChangeTemplate}
				justify={"flex-end"}
			/>
			<Loading
				text={t(translationPath(lang.common.loading).path)}
				pending={quotationCalculating || pending}
				margin
			>
				<TreeScreen>
					<TreeContent>
						{quotations?.IsCalculated ? (
							<SelectionQuotation
								quotations={quotations}
								id={truss?.Id}
								entityId={truss?.Id}
								quotationPutAction={quotationPutAction}
								quotationSummaryPutAction={quotationSummaryPutAction}
								type={QuotationSelection.TRUSS}
								quotationType={QuotationType.TRUSS}
								calculate={calculateTruss}
								pendingCalculation={quotationCalculating || pending}
								quotationSelectionSectionDeleteAction={
									quotationSelectionSectionDeleteAction
								}
								quotationSelectionVariableDeleteAction={
									quotationSelectionVariableDeleteAction
								}
								quotationDownloadAction={quotationDownloadQuotationAction}
								selected={selected}
								priceLists={priceLists}
							/>
						) : (
							<QuotationColumn>
								<Empty description={""} />
								<br />
								<ActionSection>
									<ActionButton onClick={handleQuotationCalculation}>
										<FontAwesomeIcon icon={faSync} />
										{t(
											translationPath(lang.templates.generateNewQuotation).path
										)}
									</ActionButton>
									<ActionButton onClick={handleQuotationCalculationLoadData}>
										<FontAwesomeIcon icon={faServer} />
										{t(
											translationPath(
												lang.templates.generateNewQuotationFromNewData
											).path
										)}
									</ActionButton>
								</ActionSection>
							</QuotationColumn>
						)}
					</TreeContent>
				</TreeScreen>
			</Loading>
		</MainTreeContent>
	);
};
