import lang from '../../../../../translation/lang';
import Loading from '../../../../../components/Optimify/Loading';
import Navigation from '../../../../../components/NavigationCalculated';
import React from 'react';
import { Empty, Popconfirm } from 'antd';
import { faServer, faSync } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { JobsSelectedRequest } from '../_types';
import { JobType } from '../../../../../types/_types';
import { MainTreeContent, TreeContent, TreeScreen } from '../../../_styles';
import { PriceList } from '../../../PriceLists/_types';
import { QuotationCalculate } from '../../Project/_types';
import { QuotationColumn } from '../../../../../constants/globalStyles';
import { QuotationList, QuotationType } from '../../../Quotations/_types';
import { SelectionQuotation } from '../../../../../components/Quotations';
import { translationPath } from '../../../../../utils/getPath';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import {
	ActionButton,
	ActionSection,
} from "../../../../../components/Quotations";
import {
	QuotationParam,
	QuotationRequest,
	QuotationSelection,
	Quotations,
	SectionVariableRequest,
} from "../../../Quotations/_types";

export interface StateProps {
	quotations: Quotations;
	job: JobType;
	quotationCalculating: boolean;
	quotationList: QuotationList;
	priceLists: PriceList[];
	pending: boolean;
}

export interface DispatchProps {
	quotationSelectionGetAction: (data: QuotationCalculate) => void;
	quotationSelectionPutAction: (data: SectionVariableRequest) => void;
	quotationSelectionSummaryPutAction: (data: QuotationRequest) => void;
	clearQuotation: (data: void) => void;
	calculateJob: (data: QuotationCalculate) => void;
	quotationSelectionVariableDeleteAction: (data: QuotationParam) => void;
	quotationSelectionSectionDeleteAction: (data: QuotationParam) => void;
	quotationDownloadQuotationAction: (data: QuotationParam) => void;
	selectedJob: (data: JobsSelectedRequest) => void;
	quotationListGetAction: (data: QuotationParam) => void;
}

export default ({
	quotations,
	quotationSelectionGetAction,
	quotationSelectionPutAction,
	quotationSelectionSummaryPutAction,
	clearQuotation,
	job,
	quotationCalculating,
	calculateJob,
	quotationSelectionVariableDeleteAction,
	quotationSelectionSectionDeleteAction,
	quotationDownloadQuotationAction,
	priceLists,
	quotationList,
	quotationListGetAction,
	pending,
}: StateProps & DispatchProps) => {
	const { t } = useTranslation();
	const [selected, setSelected] = useState(null);
	const { id } = useParams<{ id: string }>();

	useEffect(() => {
		quotationListGetAction({ Type: QuotationType.JOB });
	}, []);

	useEffect(() => {
		if (quotationList) {
			const defaultId = job?.DefaultQuotationTemplateId
				? job?.DefaultQuotationTemplateId
				: quotationList?.DefaultId;

			if (defaultId && job?.Id) {
				setSelected(defaultId);
				quotationSelectionGetAction({
					type: QuotationType.JOB,
					entityId: job?.Id,
					templateId: defaultId,
				});
			}
		}
	}, [quotationList, job]);

	const quotationPutAction = (node: SectionVariableRequest) => {
		quotationSelectionPutAction({
			...node,
		});
	};

	const quotationSummaryPutAction = (newValue: string) => {
		if (newValue != quotations?.Summary) {
			quotationSelectionSummaryPutAction({
				...quotations,
				Summary: newValue,
				Id: quotations?.Id,
			});
		}
	};

	const handleQuotationCalculation = (
		event: React.MouseEvent<HTMLElement, MouseEvent>
	) => {
		calculateJob({
			entityId: job.Id,
			recursiveRecreate: false,
			templateId: selected,
			type: QuotationType.JOB,
		});
	};

	const handleQuotationCalculationLoadData = (
		event: React.MouseEvent<HTMLElement, MouseEvent>
	) => {
		calculateJob({
			entityId: job.Id,
			recursiveRecreate: true,
			templateId: selected,
			type: QuotationType.JOB,
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
			type: QuotationType.JOB,
			entityId: job?.Id,
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
								id={job?.Id}
								quotationPutAction={quotationPutAction}
								quotationSummaryPutAction={quotationSummaryPutAction}
								type={QuotationSelection.JOB}
								quotationType={QuotationType.JOB}
								calculate={calculateJob}
								pendingCalculation={quotationCalculating}
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
								</ActionSection>
							</QuotationColumn>
						)}
					</TreeContent>
				</TreeScreen>
			</Loading>
		</MainTreeContent>
	);
};
