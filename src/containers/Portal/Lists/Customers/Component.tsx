import ExternalTable from '../../../../components/Optimify/Table/ExternalTable';
import Moment from 'react-moment';
import React, { useEffect } from 'react';
import { Customer, CustomerProxy } from '../../Customer/_types';
import { CustomersAllFilterRequest, DeleteRequest } from './_types';
import { FilterSettings, Page, TreeType } from '../../../../types/_types';
import { lastPathMember, translationPath } from '../../../../utils/getPath';
import { Main } from './_styles';
import { PutHeaderSettings } from '../_types';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { Routes } from '../../../../constants/routes';
import {
	CreateCustomer,
	DeleteCustomer,
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

export interface StateProps {
	activeTree: TreeType;
	filter: FilterSettings;
	customers: Customer[];
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
	activeFilterContent: any;
	initSort: number[];
	initSortOrder: number[];
	initHeaders: string[];
}

export interface DispatchProps {
	getCustomers: (data: Page) => void;
	filterCustomers: (data: CustomersAllFilterRequest) => void;
	deleteCustomer: (data: DeleteRequest) => void;
	putHeaderSettings: (data: PutHeaderSettings) => void;
	getHeaderSettings: (data: string) => void;
}

const Index = ({
	activeFilterContent,
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
	initSort,
	initSortOrder,
	getHeaderSettings,
}: WithTranslation & StateProps & DispatchProps & RouteComponentProps) => {
	const history = useHistory();

	useEffect(() => {
		getCustomers({ Page: 0, PageSize: 25, Sort: "", Paginate: true });
		getHeaderSettings(TreeType.CUSTOMER);
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
	console.log(activeFilterContent);
	const navigate = (customer: Customer) => {
		history.push(Routes.EDIT_CUSTOMER_LINK + customer.Id);
	};

	const columns = [
		lastPathMember(CustomerProxy.Company).path,
		lastPathMember(CustomerProxy.Crn).path,
		lastPathMember(CustomerProxy.VatRegNo).path,
		lastPathMember(CustomerProxy.Forename).path,
		lastPathMember(CustomerProxy.Surname).path,
		lastPathMember(CustomerProxy.DateOfCreation).path,
		lastPathMember(CustomerProxy.ProjectCount).path,
		lastPathMember(CustomerProxy.FinishedQuotationCount).path,
		lastPathMember(CustomerProxy.FinishedProductionCount).path,
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
								<CreateCustomer />
							</ContentRow>
						</ContentSpaceBetweenWithPadding>

						<CardEndTableWrapper>
							<ExternalTable
								initSort={initSort}
								initSortOrder={initSortOrder}
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
									t(translationPath(lang.common.companyName)),
									t(translationPath(lang.common.crn)),
									t(translationPath(lang.common.vatRegNo)),
									t(translationPath(lang.common.surname)),
									t(translationPath(lang.common.forename)),
									t(translationPath(lang.common.customerDateOfCreationFilter)),
									t(translationPath(lang.common.numberOfProjectsFilter)),
									t(translationPath(lang.common.finishedQuotationCount)),
									t(translationPath(lang.common.finishedProductionCount)),
									t(translationPath(lang.common.actions)),
								]}
								data={
									customers
										? customers?.map((value: Customer, key: number) => [
												value.Company,
												value.Crn,
												value.VatRegNo,
												value.Surname,
												value.Forename,
												value.DateOfCreation,
												value.ProjectCount,
												value.FinishedQuotationCount,
												value.FinishedProductionCount,
												value,
												value,
										  ])
										: []
								}
								renderers={[
									(value: Customer, key: number, parent: Customer) => {
										return value;
									},
									(value: Customer, key: number, parent: Customer) => {
										return value;
									},
									(value: number, key: number, parent: Customer) => {
										return value;
									},
									(value: number, key: number, parent: Customer) => {
										return value;
									},
									(value: number, key: number, parent: Customer) => {
										return value;
									},
									(value: string, key: number, parent: Customer) => {
										return <Moment format="DD/MM/YYYY">{value}</Moment>;
									},
									(value: Customer, key: number, parent: Customer) => {
										return value;
									},
									(value: Customer, key: number, parent: Customer) => {
										return value;
									},
									(value: Customer, key: number, parent: Customer) => {
										return value;
									},
									(value: Customer, key: number, parent: Customer) => {
										return (
											<div>
												<Edit edit={() => navigate(value)} />
												&nbsp;
												<DeleteCustomer
													remove={remove(value.Id)}
													hasProject={value.ProjectCount > 0}
													name={value?.Name}
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
