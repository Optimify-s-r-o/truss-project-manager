import _ from 'lodash';
import lang from '../../../../../translation/lang';
import Loading from '../../../../../components/Optimify/Loading';
import Navigation from '../../../../../components/NavigationCalculated';
import React from 'react';
import { Empty, Popconfirm } from 'antd';
import { faServer, faSync } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getSelectedProjectAction } from '../../../../../sagas/Fetch/actions';
import { MainTreeContent, TreeContent, TreeScreen } from '../../../_styles';
import { PriceList } from '../../../PriceLists/_types';
import { Project } from '../../../../../types/_types';
import { QuotationCalculate } from '../_types';
import { QuotationColumn } from '../../../../../constants/globalStyles';
import { QuotationList, QuotationType } from '../../../Quotations/_types';
import { SelectedProjectsRequest } from '../../Projects/_types';
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
	project: Project;
	quotationCalculating: boolean;
	quotationList: QuotationList;
	priceLists: PriceList[];
	pending: boolean;
}

export interface DispatchProps {
	getSelectedProject: (data: SelectedProjectsRequest) => void;
	quotationSelectionGetAction: (data: QuotationCalculate) => void;
	quotationSelectionPutAction: (data: SectionVariableRequest) => void;
	quotationSelectionSummaryPutAction: (data: QuotationRequest) => void;
	calculateProject: (data: QuotationCalculate) => void;
	clearQuotation: (data: void) => void;
	quotationSelectionVariableDeleteAction: (data: QuotationParam) => void;
	quotationSelectionSectionDeleteAction: (data: QuotationParam) => void;
	quotationDownloadQuotationAction: (data: QuotationParam) => void;
	quotationListGetAction: (data: QuotationParam) => void;
}

export default ({
	quotations,
	quotationSelectionGetAction,
	quotationSelectionPutAction,
	quotationSelectionSummaryPutAction,
	project,
	calculateProject,
	quotationCalculating,
	clearQuotation,
	quotationSelectionVariableDeleteAction,
	quotationSelectionSectionDeleteAction,
	quotationDownloadQuotationAction,
	getSelectedProject,
	quotationListGetAction,
	quotationList,
	priceLists,
	pending,
}: StateProps & DispatchProps) => {
	const { t } = useTranslation();

	const { id } = useParams<{ id: string }>();
	const [selected, setSelected] = useState(null);
	useEffect(() => {
		quotationListGetAction({ Type: QuotationType.PROJECT });
	}, []);

	useEffect(() => {
		if (id) {
			getSelectedProject(getSelectedProjectAction(id));
		}
	}, [id]);

	useEffect(() => {
		if (quotationList) {
			const defaultId = project?.DefaultQuotationTemplateId
				? project?.DefaultQuotationTemplateId
				: quotationList?.DefaultId;
			if (defaultId) {
				setSelected(defaultId);
				quotationSelectionGetAction({
					type: QuotationType.PROJECT,
					entityId: id,
					templateId: defaultId,
				});
			}
		}
	}, [quotationList, project]);

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
		calculateProject({
			entityId: project.Id,
			recursiveRecreate: false,
			templateId: selected,
			type: QuotationType.PROJECT,
		});
	};

	const handleQuotationCalculationLoadData = (
		event: React.MouseEvent<HTMLElement, MouseEvent>
	) => {
		calculateProject({
			entityId: project.Id,
			recursiveRecreate: true,
			templateId: selected,
			type: QuotationType.PROJECT,
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
			type: QuotationType.PROJECT,
			entityId: project?.Id,
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
								id={project?.Id}
								quotationPutAction={quotationPutAction}
								quotationSummaryPutAction={quotationSummaryPutAction}
								type={QuotationSelection.PROJECT}
								quotationType={QuotationType.PROJECT}
								calculate={calculateProject}
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
