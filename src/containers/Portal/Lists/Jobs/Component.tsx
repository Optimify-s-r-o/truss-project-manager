import React, { useEffect } from 'react';
import { EditTruss } from '../../../../sagas/Truss/_actions';
import { FilterContentType } from '../../SidebarFilter/_types';
import { FilterRequest } from '../components/_types';
import { Job } from '../../TreeView/_types';
import { JobColumnSelector } from './components/ColumnSelector';
import { JobTable } from './components/Table';
import { lang, WithTranslation } from '../../../../translation/i18n';
import { Main } from '../../SidebarFilter/Jobs/_styles';
import { PutHeaderSettings } from '../_types';
import { RouteComponentProps } from 'react-router';
import { translationPath } from '../../../../utils/getPath';
import { UserData } from '../../Accounts/_types';
import { useTranslation } from 'react-i18next';
import {
	ContentCard,
	ContentFilter,
	ContentInline,
	SAlert,
} from "../../../../constants/globalStyles";
import {
	Data,
	FilterSettings,
	JobType,
	Page,
	Tree,
	TreeType,
} from "../../../../types/_types";

export interface StateProps {
	activeFilter: boolean;
	firstRecordOnPage: number | null;
	lastRecordOnPage: number | null;
	currentPage: number | null;
	totalPages: number | null;
	totalRecords: number | null;
	jobs: JobType[];
	path: string;
	filter: FilterSettings;
	pending: boolean;
	projectTree: Data<Tree>;
	customerTree: Data<Tree>;
	jobTree: Data<Job>;
	trussTree: Data<Tree>;
	activeTree: TreeType;
	users: UserData[];
	pageSize: string | null;
	local: boolean;
	token: string;
	recordsBeforeFilter: string;
	isFiltered: boolean;
	activeFilterContent: any;
	initSort: number[];
	initSortOrder: number[];
	initHeaders: string[];
}

interface DispatchProps {
	getJobs: (data: Page) => void;
	jobFilterRequest: (data: FilterRequest) => void;
	editTruss: (data: EditTruss) => void;
	getUsers: (data: Page) => void;
	setSelectedKeys: (data: string[]) => void;
	setExpandedKeys: (data: string[]) => void;
	putHeaderSettings: (data: PutHeaderSettings) => void;
	getHeaderSettings: (data: string) => void;
	resetHeaderSettings: (data: string) => void;
}

export interface Checkbox {
	name: string;
	title: string;
	position?: number;
	section: string;
	filter?: any | null;
	filterType?: FilterContentType;
	round?: boolean;
}

const Index = ({
	activeFilter,
	pageSize,
	getUsers,
	firstRecordOnPage,
	lastRecordOnPage,
	currentPage,
	totalPages,
	totalRecords,
	setSelectedKeys,
	setExpandedKeys,
	activeFilterContent,
	isFiltered,
	recordsBeforeFilter,
	initHeaders,
	initSort,
	initSortOrder,
	getHeaderSettings,
	putHeaderSettings,
	getJobs,
	editTruss,
	jobs,
	pending,
	resetHeaderSettings,
}: StateProps & DispatchProps & WithTranslation & RouteComponentProps) => {
	const { t } = useTranslation();
	const [checked, setChecked] = React.useState<Checkbox[]>([]);
	const [columns, setColumns] = React.useState<Checkbox[]>([]);

	useEffect(() => {
		getJobs({ Paginate: true });
		getUsers({ Paginate: false });
		getHeaderSettings(TreeType.JOB);
	}, []);

	console.log(activeFilterContent);
	return (
		<ContentInline>
			<Main>
				<ContentFilter>
					{isFiltered && (
						<SAlert
							message={t(translationPath(lang.common.tooltip.filtered).path, {
								totalRecords: totalRecords,
								recordsBeforeFilter: recordsBeforeFilter,
							})}
							type="info"
							showIcon
							closable
						/>
					)}
					<ContentCard>
						<JobColumnSelector
							checked={checked}
							setChecked={setChecked}
							setColumns={setColumns}
							initHeaders={initHeaders}
							putHeaderSettings={putHeaderSettings}
							resetHeaderSettings={resetHeaderSettings}
						/>
						<JobTable
							setSelectedKeys={setSelectedKeys}
							setExpandedKeys={setExpandedKeys}
							editTruss={editTruss}
							checked={checked}
							jobs={jobs}
							activeFilterContent={activeFilterContent}
							initSort={initSort}
							initSortOrder={initSortOrder}
							columns={columns}
							getJobs={getJobs}
							firstRecordOnPage={firstRecordOnPage}
							lastRecordOnPage={lastRecordOnPage}
							currentPage={currentPage}
							totalPages={totalPages}
							totalRecords={totalRecords}
							pending={pending}
							pageSize={pageSize}
							activeFilter={activeFilter}
							resetHeaderSettings={resetHeaderSettings}
						/>
					</ContentCard>
				</ContentFilter>
			</Main>
		</ContentInline>
	);
};

export default React.memo(Index);
