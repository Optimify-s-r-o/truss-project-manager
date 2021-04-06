import React, { useEffect } from 'react';
import { Checkbox } from '../Jobs/Component';
import { FilterProjectRequest } from '../../SidebarFilter/Projects/_types';
import { lang } from '../../../../translation/i18n';
import { Main } from '../../SidebarFilter/Jobs/_styles';
import { OpenTruss } from '../../../../sagas/Truss/_actions';
import { ProjectColumnSelector } from './components/ColumnSelector';
import { ProjectTable } from './components/Table';
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
	Project,
	Settings,
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
	projects: Project[];
	filter: FilterSettings;
	pending: boolean;
	projectTree: Data<Tree>;
	customerTree: Data<Tree>;
	jobTree: Data<Tree>;
	activeTree: TreeType;
	users: UserData[];
	pageSize: string | null;
	trussTree: Data<Tree>;
	token: string;
	local: boolean;
	recordsBeforeFilter: string | null;
	isFiltered: boolean;
	settings: Settings;
	activeFilterContent: any;
	initSort: number[];
	initSortOrder: number[];
	initHeaders: string[];
}

interface DispatchProps {
	getProjects: (data: Page) => void;
	projectFilterRequest: (data: FilterProjectRequest) => void;
	openTruss: (data: OpenTruss) => void;
	getUsers: (data: Page) => void;
	setSelectedKeys: (data: string[]) => void;
	putHeaderSettings: (data: PutHeaderSettings) => void;
	getHeaderSettings: (data: string) => void;
	resetHeaderSettings: (data: string) => void;
}

const Index = ({
	activeFilter,
	activeFilterContent,
	getUsers,
	pageSize,
	firstRecordOnPage,
	lastRecordOnPage,
	currentPage,
	totalPages,
	totalRecords,
	setSelectedKeys,
	recordsBeforeFilter,
	isFiltered,
	resetHeaderSettings,
	initHeaders,
	initSort,
	initSortOrder,
	getHeaderSettings,
	putHeaderSettings,
	getProjects,
	pending,
	projects,
}: StateProps & DispatchProps & RouteComponentProps) => {
	const { t } = useTranslation();
	const [columns, setColumns] = React.useState<Checkbox[]>([]);
	const [checked, setChecked] = React.useState<Checkbox[]>([]);

	useEffect(() => {
		getProjects({
			PageSize: 25,
			Page: 0,
		});
		getUsers({
			Paginate: false,
		});
		getHeaderSettings(TreeType.PROJECT);
	}, []);

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
						<ProjectColumnSelector
							checked={checked}
							setChecked={setChecked}
							setColumns={setColumns}
							initHeaders={initHeaders}
							putHeaderSettings={putHeaderSettings}
							resetHeaderSettings={resetHeaderSettings}
						/>
						<ProjectTable
							setSelectedKeys={setSelectedKeys}
							checked={checked}
							projects={projects}
							activeFilterContent={activeFilterContent}
							initSort={initSort}
							initSortOrder={initSortOrder}
							columns={columns}
							getProjects={getProjects}
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
