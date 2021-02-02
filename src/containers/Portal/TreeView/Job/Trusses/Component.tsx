import * as React from 'react';
import Data from '../../../../../components/Data/Data';
import FormRow from '../../../../../components/Optimify/Form/FormRow';
import Loading from '../../../../../components/Optimify/Loading';
import Moment from 'react-moment';
import { faMountains } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatCurrency } from 'src/utils/currencyFormat';
import { GetTrusses, JobTruss, JobTrusses } from '../_types';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { IconTableCell } from './_styles';
import { JobType, QuotationsSelection } from '../../../../../types/_types';
import { MainTreeContent, TreeContent, TreeScreen } from '../../../_styles';
import { RouteComponentProps, useHistory, useParams } from 'react-router-dom';
import { Routes } from '../../../../../constants/routes';
import { Select } from 'antd';
import { StyledDiv } from '../../../Sidebar/_styles';
import { translationPath } from '../../../../../utils/getPath';
import { UnitType } from '../../../../../components/Data/Unit';
import {
	ScrollableTable,
	TABLE_STYLE_CONDENSED,
} from "../../../../../components/Optimify/Table";
import {
	ContentCard,
	FullCardEndTableWrapper,
	GridColumn,
	GridItem,
	GridRow,
	Header2,
	MaterialTitleSection,
} from "../../../../../constants/globalStyles";
import {
	lang,
	t,
	WithTranslation,
	withTranslation,
} from "../../../../../translation/i18n";
const { Option } = Select;

export interface StateProps {
	jobs: JobType;
	history: any;
	trusses: JobTrusses;
}

export interface DispatchProps {
	getTrusses: (data: GetTrusses) => void;
	setSelectedKeys: (data: string[]) => void;
	setExpandedKeys: (data: string[]) => void;
}

const Index = ({
	trusses,
	getTrusses,
	setExpandedKeys,
	setSelectedKeys,
	jobs,
}: WithTranslation & StateProps & DispatchProps & RouteComponentProps) => {
	const { id } = useParams<{ id: string }>();
	const history = useHistory();
	React.useEffect(() => {
		if (id) {
			getTrusses({ jobId: id });
		}
	}, [id]);

	const routeTruss = (trussId: string) => (
		_event: React.MouseEvent<HTMLElement, MouseEvent>
	) => {
		setExpandedKeys([trusses.ProjectId, id]);
		setSelectedKeys([trussId]);
		history.push(Routes.TREE_LINK_TRUSS + trussId);
	};

	const handleTemplateChange = (value: string) => {
		getTrusses({ jobId: id, templateId: value });
	};
	return (
		<MainTreeContent>
			<Loading
				text={t(translationPath(lang.common.loading))}
				pending={!trusses}
				margin
			>
				<TreeScreen>
					<TreeContent>
						<GridRow columns={2}>
							<GridItem fill>
								<ContentCard fullSize>
									<MaterialTitleSection>
										<Header2>{t(translationPath(lang.common.trusses))}</Header2>
									</MaterialTitleSection>
									<FullCardEndTableWrapper>
										<ScrollableTable
											style={TABLE_STYLE_CONDENSED}
											headers={[
												t(translationPath(lang.common.name)),
												t(translationPath(lang.common.trussType)),
												t(translationPath(lang.common.typeOfTruss)),
												t(translationPath(lang.common.quantity)),
												t(translationPath(lang.common.price)),
											]}
											sortable={[true, true, true, true, true]}
											data={trusses?.Trusses?.map(
												(value: JobTruss, key: number) => {
													return [
														value.Name,
														value.Type,
														value.Kind,
														value.Quantity,
														value.Price,
														value,
													];
												}
											)}
											renderers={[
												(value: any, key: number, parent: JobTruss) => {
													return (
														<IconTableCell>
															<FontAwesomeIcon icon={faMountains as IconProp} />{" "}
															<StyledDiv onClick={routeTruss(parent.Id)}>
																{value}
															</StyledDiv>
														</IconTableCell>
													);
												},
												(value: any, key: number, parent: JobTruss) => {
													return t(translationPath(lang.common[value]));
												},
												(value: any, key: number, parent: JobTruss) => {
													return t(translationPath(lang.common[value]));
												},
												(value: any, key: number, parent: JobTruss) => {
													return value;
												},
												(value: any, key: number, parent: JobTruss) => {
													return (
														<div>
															{parent?.PriceIsNaN
																? t(translationPath(lang.common.PriceIsNaN))
																: parent?.PriceNotSet
																? t(translationPath(lang.common.PriceNotSet))
																: formatCurrency(value)}
														</div>
													);
												},
												(value: any, key: number, parent: JobTruss) => {
													return value;
												},
											]}
										/>
									</FullCardEndTableWrapper>
								</ContentCard>
							</GridItem>
							<GridItem>
								<GridColumn columns={1}>
									<ContentCard fullSize>
										<FormRow
											title={t(translationPath(lang.templates.template))}
											titleWidth={40}
										>
											<div>
												<Select
													optionFilterProp="children"
													filterOption={(input, option) =>
														option.children
															.toLowerCase()
															.indexOf(input.toLowerCase()) >= 0
													}
													className="trusses"
													placeholder={t(
														translationPath(lang.templates.templates)
													)}
													onChange={handleTemplateChange}
													value={trusses?.TemplateId}
												>
													{jobs?.Quotations?.map(
														(p: QuotationsSelection, i: number) => (
															<Option key={i} value={p.TemplateId}>
																{p.Title}
															</Option>
														)
													)}
												</Select>
											</div>
										</FormRow>
										<Data
											title={t(translationPath(lang.common.name))}
											data={trusses?.Name}
											unit={UnitType.EMPTY}
										/>
										<Data
											title={t(translationPath(lang.common.project))}
											data={trusses?.ProjectName}
											unit={UnitType.EMPTY}
										/>
										<Data
											title={t(translationPath(lang.common.trussCount))}
											data={trusses?.TrussQuantitySum}
											unit={UnitType.EMPTY}
										/>
										<Data
											title={t(translationPath(lang.common.trussTypesCount))}
											data={trusses?.TrussTypesCount}
											unit={UnitType.EMPTY}
										/>
										<Data
											title={t(
												translationPath(lang.common.priceWithoutTrusses)
											)}
											data={
												trusses?.PriceIsNan
													? t(translationPath(lang.common.PriceIsNaN))
													: trusses?.PriceNotSet
													? t(translationPath(lang.common.PriceNotSet))
													: formatCurrency(trusses?.JobPriceWithoutTrusses)
											}
											unit={UnitType.EMPTY}
										/>
										<Data
											title={t(translationPath(lang.common.priceForTrusses))}
											data={
												trusses?.PriceIsNan
													? t(translationPath(lang.common.PriceIsNaN))
													: trusses?.PriceNotSet
													? t(translationPath(lang.common.PriceNotSet))
													: formatCurrency(trusses?.TrussPriceSum)
											}
											unit={UnitType.EMPTY}
										/>
										<Data
											title={t(translationPath(lang.common.price))}
											data={
												trusses?.PriceIsNan
													? t(translationPath(lang.common.PriceIsNaN))
													: trusses?.PriceNotSet
													? t(translationPath(lang.common.PriceNotSet))
													: formatCurrency(trusses?.Price)
											}
											unit={UnitType.EMPTY}
										/>
									</ContentCard>
									<br />
									<ContentCard>
										<Data
											title={t(translationPath(lang.common.lastChange))}
											data={
												<Moment format="DD/MM/YYYY HH:MM">
													{trusses?.LastEdit}
												</Moment>
											}
											unit={UnitType.EMPTY}
										/>
										<Data
											title={t(translationPath(lang.common.forename))}
											data={trusses?.LastEditName}
											unit={UnitType.EMPTY}
										/>
										<Data
											title={t(translationPath(lang.common.surname))}
											data={trusses?.LastEditSurname}
											unit={UnitType.EMPTY}
										/>
										<Data
											title={t(translationPath(lang.common.email))}
											data={trusses?.LastEditEmail}
											unit={UnitType.EMPTY}
										/>
									</ContentCard>
								</GridColumn>
							</GridItem>
						</GridRow>
					</TreeContent>
				</TreeScreen>
			</Loading>
		</MainTreeContent>
	);
};

export default withTranslation()(Index);
