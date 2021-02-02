import ExternalTable from '../../../../components/Optimify/Table/ExternalTable';
import Moment from 'react-moment';
import React, { useEffect } from 'react';
import Tooltip from '../../../../components/Optimify/Tooltip';
import { faIdCard } from '@fortawesome/pro-light-svg-icons';
import { faSuitcase } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatCurrency } from '../../../../utils/currencyFormat';
import { get } from 'lodash';
import { getPath, translationPath } from '../../../../utils/getPath';
import { IconButton } from '../../../../components/Optimify/Button';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Link, RouteComponentProps, useHistory } from 'react-router-dom';
import { Main } from './_styles';
import { Routes } from '../../../../constants/routes';
import {
	CreateEvidenceCustomer,
	CreateLegalCustomer,
	CreateNaturalCustomer,
	Delete,
	Edit,
} from "../../../../components/Button";
import {
	CardEndTableWrapper,
	ContentCard,
	ContentFilter,
	ContentInline,
	ContentRow,
	ContentSpaceBetweenWithPadding,
	Header1,
	SAlert,
} from "../../../../constants/globalStyles";
import {
	lang,
	t,
	WithTranslation,
	withTranslation,
} from "../../../../translation/i18n";
import {
	Customer,
	FilterSettings,
	Page,
	TreeType,
} from "../../../../types/_types";
import {
	CustomersAll,
	CustomersAllFilterRequest,
	CustomersAllProxy,
	CustomerType,
	DeleteRequest,
} from "./_types";

export interface StateProps {
	activeTree: TreeType;
	filter: FilterSettings;
	customers: CustomersAll[];
	path: string;
	pending: boolean;
	firstRecordOnPage: number | null;
	lastRecordOnPage: number | null;
	currentPage: number | null;
	totalPages: number | null;
	totalRecords: number | null;
	pageSize: string | null;
	recordsBeforeFilter: string | null;
	isFiltered: boolean;
}

export interface DispatchProps {
	getCustomers: (data: Page) => void;
	filterCustomers: (data: CustomersAllFilterRequest) => void;
	deleteCustomer: (data: DeleteRequest) => void;
}

const Index = ({
	activeTree,
	deleteCustomer,
	filter,
	filterCustomers,
	customers,
	getCustomers,
	path,
	pending,
	firstRecordOnPage,
	lastRecordOnPage,
	currentPage,
	totalPages,
	totalRecords,
	pageSize,
	isFiltered,
	recordsBeforeFilter,
}: WithTranslation & StateProps & DispatchProps & RouteComponentProps) => {
	const history = useHistory();

	useEffect(() => {
		getCustomers({ Page: 0, PageSize: 25, Sort: "" });
	}, []);

	const remove = (id: string) => (
		_event: React.MouseEvent<HTMLElement, MouseEvent>
	) => {
		deleteCustomer({
			id,
			requiredPage: {
				PageSize: parseInt(pageSize),
				Page: currentPage - 1,
				Sort: "",
			},
		});
	};

	const navigate = (customer: CustomersAll) => {
		const id =
			customer.Type === 0
				? get(customer, getPath(CustomersAllProxy.Customer.Evidence.Id))
				: customer.Type === 1
				? get(customer, getPath(CustomersAllProxy.Customer.Company.Id))
				: get(customer, getPath(CustomersAllProxy.Customer.Person.Id));
		history.push(
			customer.Type === CustomerType.Evidence
				? Routes.LINK_NEW_EVIDENCE_CUSTOMER + id
				: customer.Type === CustomerType.Legal
				? Routes.LINK_NEW_LEGAL_CUSTOMER + id
				: Routes.LINK_NEW_NATURAL_CUSTOMER + id
		);
	};

	const columns = [
		"Name",
		"Type",
		"ProjectsCount",
		"DateOfCreation",
		"Crn",
		"VatRegNum",
		"SumOfProjectPrices",
		"QuotationCount",
		"ProductionCount",
	];

	return (
		<ContentInline>
			<Main>
				<ContentFilter>
					{isFiltered && (
						<SAlert
							message={t(translationPath(lang.common.tooltip.filtered), {
								totalRecords: totalRecords,
								recordsBeforeFilter: recordsBeforeFilter,
							})}
							type="info"
							showIcon
							closable
						/>
					)}
					<ContentCard>
						<ContentSpaceBetweenWithPadding>
							<Header1>{t(translationPath(lang.common.customersList))}</Header1>
							<ContentRow>
								<CreateLegalCustomer />
								<CreateNaturalCustomer />
								<CreateEvidenceCustomer />
							</ContentRow>
						</ContentSpaceBetweenWithPadding>

						<CardEndTableWrapper>
							<ExternalTable
								columnNames={columns}
								onPageRequired={(requiredPage: Page) => {
									getCustomers(requiredPage);
								}}
								pageSize={parseInt(pageSize)}
								firstRecordOnPage={firstRecordOnPage}
								lastRecordOnPage={lastRecordOnPage}
								currentPage={currentPage}
								totalPages={totalPages}
								totalRecords={totalRecords}
								isLoading={pending}
								sortable={[
									true,
									true,
									true,
									true,
									true,
									true,
									true,
									true,
									true,
									false,
								]}
								headers={[
									t(translationPath(lang.common.name)),
									t(translationPath(lang.common.projectNumber)),
									t(translationPath(lang.common.type)),
									t(translationPath(lang.common.dateOfCreation)),
									t(translationPath(lang.common.crn)),
									t(translationPath(lang.common.vatRegNo)),
									t(translationPath(lang.common.sumOfProjects)),
									t(translationPath(lang.common.numberOfQuotationsFilter)),
									t(translationPath(lang.common.productionsCount)),
									t(translationPath(lang.common.actions)),
								]}
								data={
									customers
										? customers?.map((value: CustomersAll, key: number) => [
												value.Name,
												value.ProjectsCount,
												value.Type,
												value.DateOfCreation,
												value.Crn,
												value.VatNumber,
												value.SumOfProjectPrices,
												value.QuotationsCount,
												value.ProductionsCount,
												value,
												value,
										  ])
										: []
								}
								renderers={[
									(value: CustomersAll, key: number, parent: Customer) => {
										return value;
									},
									(value: CustomersAll, key: number, parent: Customer) => {
										return value;
									},
									(value: number, key: number, parent: Customer) => {
										return value == 0
											? t(translationPath(lang.common.evidencePerson))
											: value == 1
											? t(translationPath(lang.common.legalPerson))
											: t(translationPath(lang.common.naturalPerson));
									},
									(value: string, key: number, parent: Customer) => {
										return <Moment format="DD/MM/YYYY">{value}</Moment>;
									},
									(value: CustomersAll, key: number, parent: Customer) => {
										return value;
									},
									(value: CustomersAll, key: number, parent: Customer) => {
										return value;
									},
									(value: CustomersAll, key: number, parent: Customer) => {
										return formatCurrency(value);
									},
									(value: CustomersAll, key: number, parent: Customer) => {
										return value;
									},
									(value: CustomersAll, key: number, parent: Customer) => {
										return value;
									},
									(value: CustomersAll, key: number, parent: Customer) => {
										return (
											<div>
												<Edit edit={() => navigate(value)} />
												{value.Type === CustomerType.Evidence && (
													<>
														<Tooltip
															title={t(
																translationPath(lang.common.createLegalPerson)
															)}
															placement={"bottom"}
														>
															<span style={{ marginLeft: 5 }}>
																<Link
																	to={{
																		pathname:
																			Routes.LINK_NEW_LEGAL_CUSTOMER +
																			value.Id +
																			"/" +
																			value.Name,
																	}}
																>
																	<IconButton iconOnly>
																		<FontAwesomeIcon
																			icon={faSuitcase as IconProp}
																			color={"#bb9e00"}
																		/>
																	</IconButton>
																</Link>
															</span>
														</Tooltip>
														<Tooltip
															title={t(
																translationPath(lang.common.createNaturalPerson)
															)}
															placement={"bottom"}
															sideMargin
														>
															<span style={{ marginLeft: 5, marginRight: 2 }}>
																<Link
																	to={{
																		pathname:
																			Routes.LINK_NEW_NATURAL_CUSTOMER +
																			value.Id +
																			"/" +
																			value.Name,
																	}}
																>
																	<IconButton iconOnly>
																		<FontAwesomeIcon
																			icon={faIdCard as IconProp}
																			color={"green"}
																		/>
																	</IconButton>
																</Link>
															</span>
														</Tooltip>
													</>
												)}
												&nbsp;
												<Delete
													title={t(translationPath(lang.remove.customer), {
														name: value?.Name,
													})}
													remove={remove(value.Id)}
												/>
											</div>
										);
									},
								]}
							/>
						</CardEndTableWrapper>
					</ContentCard>
				</ContentFilter>
			</Main>
		</ContentInline>
	);
};

export default withTranslation()(Index);
