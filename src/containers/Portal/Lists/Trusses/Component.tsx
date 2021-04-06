import React from 'react';
import { Checkbox } from '../Jobs/Component';
import { Main } from '../../SidebarFilter/Jobs/_styles';
import { PutHeaderSettings } from '../_types';
import { RouteComponentProps } from 'react-router';
import { translationPath } from '../../../../utils/getPath';
import { TrussColumnSelector } from './components/ColumnSelector';
import { TrussTable } from './components/Table';
import { useTranslation } from 'react-i18next';
import {
	ContentCard,
	ContentFilter,
	ContentInline,
	SAlert,
} from "../../../../constants/globalStyles";
import {
	lang,
	WithTranslation,
	withTranslation,
} from "../../../../translation/i18n";
import {
	Data,
	FilterSettings,
	Page,
	Tree,
	TreeType,
	Truss,
} from "../../../../types/_types";

export interface StateProps {
	activeFilter: boolean;
	firstRecordOnPage: number | null;
	lastRecordOnPage: number | null;
	currentPage: number | null;
	totalPages: number | null;
	totalRecords: number | null;
	trusses: Truss[];
	path: string;
	filter: FilterSettings;
	pending: boolean;
	projectTree: Data<Tree>;
	customerTree: Data<Tree>;
	jobTree: Data<Tree>;
	activeTree: TreeType;
	pageSize: string | null;
	trussTree: Data<Tree>;
	local: boolean;
	token: string;
	isFiltered: boolean;
	recordsBeforeFilter: number;
	activeFilterContent: any;
	initSort: number[];
	initSortOrder: number[];
	initHeaders: string[];
}

interface DispatchProps {
	getTrusses: (data: Page) => void;
	getUsers: (data: Page) => void;
	setSelectedKeys: (data: string[]) => void;
	setExpandedKeys: (data: string[]) => void;
	putHeaderSettings: (data: PutHeaderSettings) => void;
	getHeaderSettings: (data: string) => void;
	resetHeaderSettings: (data: string) => void;
}

const Index = ({
	activeFilter,
	pageSize,
	activeFilterContent,
	firstRecordOnPage,
	lastRecordOnPage,
	currentPage,
	totalPages,
	totalRecords,
	getTrusses,
	getUsers,
	setSelectedKeys,
	setExpandedKeys,
	recordsBeforeFilter,
	isFiltered,
	initHeaders,
	initSort,
	initSortOrder,
	getHeaderSettings,
	putHeaderSettings,
	trusses,
	pending,
	resetHeaderSettings,
}: StateProps & DispatchProps & WithTranslation & RouteComponentProps) => {
	const { t } = useTranslation();
	const [checked, setChecked] = React.useState<Checkbox[]>([]);
	const [columns, setColumns] = React.useState<Checkbox[]>([]);

	React.useEffect(() => {
		getTrusses({ Page: 0, PageSize: 25 });
		getUsers({ Paginate: false });
		getHeaderSettings(TreeType.TRUSS);
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
						<TrussColumnSelector
							checked={checked}
							setChecked={setChecked}
							setColumns={setColumns}
							initHeaders={initHeaders}
							putHeaderSettings={putHeaderSettings}
							resetHeaderSettings={resetHeaderSettings}
						/>
						<TrussTable
							setSelectedKeys={setSelectedKeys}
							setExpandedKeys={setExpandedKeys}
							checked={checked}
							trusses={trusses}
							activeFilterContent={activeFilterContent}
							initSort={initSort}
							initSortOrder={initSortOrder}
							columns={columns}
							getTrusses={getTrusses}
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

export default withTranslation()(React.memo(Index));
