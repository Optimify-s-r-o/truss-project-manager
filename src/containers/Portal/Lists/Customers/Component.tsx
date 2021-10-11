import React, { useEffect } from 'react';
import { Checkbox } from '../Jobs/Component';
import { Customer } from '../../Customer/_types';
import { CustomerColumnSelector } from './components/ColumnSelector';
import { CustomersAllFilterRequest, DeleteRequest } from './_types';
import { CustomerTable } from './components/Table';
import { FilterSettings, Page, TreeType } from '../../../../types/_types';
import { Main } from './_styles';
import { PutHeaderSettings } from '../_types';
import { RouteComponentProps } from 'react-router-dom';
import { translationPath } from '../../../../utils/getPath';
import {
	ContentCard,
	ContentFilter,
	ContentInline,
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
	settingsPageSize: number | null;
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
	activeFilter: boolean;
}

export interface DispatchProps {
	getCustomers: (data: Page) => void;
	filterCustomers: (data: CustomersAllFilterRequest) => void;
	deleteCustomer: (data: DeleteRequest) => void;
	putHeaderSettings: (data: PutHeaderSettings) => void;
	getHeaderSettings: (data: string) => void;
	resetHeaderSettings: (data: string) => void;
	setSort: (data: number[]) => void;
	setSortOrder: (data: number[]) => void;
	setSelectedKeys: (data: string[]) => void;
}

const Index = ({
	activeFilter,
	activeFilterContent,
	initHeaders,
	deleteCustomer,
	putHeaderSettings,
	setSelectedKeys,
	settingsPageSize,
	customers,
	getCustomers,
	resetHeaderSettings,
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
	setSort,
	setSortOrder,
}: WithTranslation & StateProps & DispatchProps & RouteComponentProps) => {
	const [checked, setChecked] = React.useState<Checkbox[]>([]);
	const [columns, setColumns] = React.useState<Checkbox[]>([]);

	useEffect(() => {
		getCustomers({ Paginate: true });
		getHeaderSettings(TreeType.CUSTOMER);
	}, []);

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
						<CustomerColumnSelector
							checked={checked}
							setChecked={setChecked}
							setColumns={setColumns}
							initHeaders={initHeaders}
							putHeaderSettings={putHeaderSettings}
							resetHeaderSettings={resetHeaderSettings}
							setSort={setSort}
							setSortOrder={setSortOrder}
							sort={initSort}
							getCustomers={getCustomers}
						/>
						<CustomerTable
							checked={checked}
							customers={customers}
							activeFilterContent={activeFilterContent}
							initSort={initSort}
							initSortOrder={initSortOrder}
							columns={columns}
							getCustomers={getCustomers}
							deleteCustomer={deleteCustomer}
							firstRecordOnPage={firstRecordOnPage}
							lastRecordOnPage={lastRecordOnPage}
							currentPage={currentPage}
							totalPages={totalPages}
							totalRecords={totalRecords}
							pending={pending}
							pageSize={pageSize}
							activeFilter={activeFilter}
							resetHeaderSettings={resetHeaderSettings}
							settingsPageSize={settingsPageSize}
							setSelectedKeys={setSelectedKeys}
						/>
					</ContentCard>
				</ContentFilter>
			</Main>
		</ContentInline>
	);
};

export default withTranslation()(Index);
