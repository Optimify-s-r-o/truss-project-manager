import lang from '../../../../../translation/lang';
import Loading from '../../../../../components/Optimify/Loading';
import Navigation from '../../../../../components/NavigationCalculated';
import React, { useEffect, useState } from 'react';
import { EditTruss } from '../../../../../sagas/Truss/_actions';
import { Empty, Popconfirm } from 'antd';
import { faServer, faSync } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Header } from '../components/Header';
import { JobType } from 'src/types/_types';
import { MainTreeContent, TreeContent, TreeScreen } from '../../../_styles';
import { PriceList } from '../../../PriceLists/_types';
import { QuotationCalculate } from '../../Project/_types';
import { QuotationColumn } from '../../../../../constants/globalStyles';
import { translationPath } from '../../../../../utils/getPath';
import { useParams } from 'react-router';
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
import {
	DeleteJob,
	JobsSelectedRequest,
	QuotationsInfo,
	Unlock,
} from "../_types";

export interface StateProps {
	quotations: Quotations;
	quotationsInfo: QuotationsInfo;
	quotationCalculating: boolean;
	quotationList: QuotationList;
	priceLists: PriceList[];
	pending: boolean;
	job: JobType;
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
	getJobQuotations: (data: string) => void;
	removeJob: (data: DeleteJob) => void;
	unlockJob: (data: Unlock) => void;
	editTruss: (data: EditTruss) => void;
}

export default ({
	quotations,
	quotationSelectionGetAction,
	quotationSelectionPutAction,
	quotationSelectionSummaryPutAction,
	clearQuotation,
	quotationCalculating,
	calculateJob,
	quotationSelectionVariableDeleteAction,
	quotationSelectionSectionDeleteAction,
	quotationDownloadQuotationAction,
	priceLists,
	quotationList,
	quotationListGetAction,
	pending,
	getJobQuotations,
	quotationsInfo,
	unlockJob,
	editTruss,
	removeJob,
	job,
}: StateProps & DispatchProps) => {
	const { t } = useTranslation();
	const [selected, setSelected] = useState(null);
	const { id } = useParams<{ id: string }>();

	useEffect(() => {
		quotationListGetAction({ Type: QuotationType.JOB });
	}, []);

	React.useEffect(() => {
		if (id) {
			getJobQuotations(id);
		}
	}, [id]);
	useEffect(() => {
		if (quotationList) {
			const defaultId = quotationsInfo?.DefaultQuotationTemplateId
				? quotationsInfo?.DefaultQuotationTemplateId
				: quotationList?.DefaultId;

			if (defaultId && quotationsInfo?.Id) {
				setSelected(defaultId);
				quotationSelectionGetAction({
					type: QuotationType.JOB,
					entityId: quotationsInfo?.Id,
					templateId: defaultId,
				});
			}
		}
	}, [quotationList, quotationsInfo]);

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
			entityId: id,
			recursiveRecreate: false,
			templateId: selected,
			type: QuotationType.JOB,
		});
	};

	const handleQuotationCalculationLoadData = (
		event: React.MouseEvent<HTMLElement, MouseEvent>
	) => {
		calculateJob({
			entityId: id,
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
			entityId: quotationsInfo?.Id,
			templateId: id,
		});
	};

	return (
		<>
			<Header
				removeJob={removeJob}
				unlockJob={unlockJob}
				editTruss={editTruss}
				job={job}
			/>
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
									id={quotationsInfo?.Id}
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
												translationPath(lang.templates.generateNewQuotation)
													.path
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
		</>
	);
};
