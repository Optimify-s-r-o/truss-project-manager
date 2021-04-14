import ExternalTable from '../../../../../components/Table/ExternalTable';
import Moment from 'react-moment';
import React from 'react';
import { Action } from '../_styles';
import { CardMiddleTableWrapper } from '../../../../../constants/globalStyles';
import { Checkbox } from '../../Jobs/Component';
import { Customer, CustomerProxy } from '../../../Customer/_types';
import { DeleteCustomer, Edit } from '../../../../../components/Button';
import { DeleteRequest } from '../_types';
import { getFilterActiveContent } from '../../_services';
import { JobType, Page, TreeType } from '../../../../../types/_types';
import { lastPathMember } from '../../../../../utils/getPath';
import { Routes } from '../../../../../constants/routes';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Table {
	activeFilter: boolean;
	checked: Checkbox[];
	customers: Customer[];
	activeFilterContent: any;
	initSort: number[];
	initSortOrder: number[];
	columns: Checkbox[];
	getCustomers: (data: Page) => void;
	firstRecordOnPage: number | null;
	lastRecordOnPage: number | null;
	currentPage: number | null;
	totalPages: number | null;
	totalRecords: number | null;
	pending: boolean;
	pageSize: string | null;
	deleteCustomer: (data: DeleteRequest) => void;
	resetHeaderSettings: (data: string) => void;
	settingsPageSize: number | null;
}

export const CustomerTable = ({
	activeFilter,
	deleteCustomer,
	checked,
	customers,
	activeFilterContent,
	initSort,
	initSortOrder,
	columns,
	getCustomers,
	firstRecordOnPage,
	lastRecordOnPage,
	currentPage,
	totalPages,
	totalRecords,
	pending,
	pageSize,
	resetHeaderSettings,
	settingsPageSize,
}: Table) => {
	const { t } = useTranslation();
	const history = useHistory();

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

	const navigate = (customer: Customer) => {
		history.push(Routes.EDIT_CUSTOMER_LINK + customer.Id);
	};

	const getValue = (value: Customer, item: Checkbox) => {
		switch (item?.name) {
			case lastPathMember(CustomerProxy.DateOfCreation).path:
				return <Moment format="DD/MM/YYYY">{value[item?.name]}</Moment>;
			case "Open":
				return (
					<Action>
						<Edit edit={() => navigate(value)} />
						&nbsp;
						<DeleteCustomer
							remove={remove(value.Id)}
							hasProject={value.ProjectCount > 0}
							name={value?.Name}
						/>
					</Action>
				);
			default:
				if (!value[item?.name]) {
					return "-";
				}
				return value[item?.name];
		}
	};
	return (
		<CardMiddleTableWrapper>
			<ExternalTable
				headers={checked?.map((value: Checkbox, index: number) => value?.title)}
				names={checked?.map((value: Checkbox, index: number) => value?.name)}
				data={
					customers
						? customers.map((value: Customer, index: number) => [
								...checked?.map((item: Checkbox, index: number) =>
									getValue(value, item)
								),
								value,
						  ])
						: []
				}
				renderers={checked?.map(
					(item: Checkbox, index: number) => (
						value: any,
						key: number,
						parent: JobType
					) => {
						return value;
					}
				)}
				sortable={checked?.map((value: Checkbox, index: number) =>
					value?.name === "Open" ? false : true
				)}
				columnNames={checked?.map((value: Checkbox) => value?.name)}
				filterContent={getFilterActiveContent(
					checked,
					columns,
					activeFilterContent
				)}
				onPageRequired={(requiredPage: Page) => {
					getCustomers(requiredPage);
				}}
				pageSize={settingsPageSize}
				firstRecordOnPage={firstRecordOnPage}
				lastRecordOnPage={lastRecordOnPage}
				currentPage={currentPage}
				totalPages={totalPages}
				totalRecords={totalRecords}
				isLoading={pending || !currentPage}
				initSort={initSort}
				initSortOrder={initSortOrder}
				activeFilter={activeFilter}
				resetHeaderSettings={resetHeaderSettings}
				type={TreeType.CUSTOMER}
			/>
		</CardMiddleTableWrapper>
	);
};
