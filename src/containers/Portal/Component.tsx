import KeyboardEventHandler from 'react-keyboard-event-handler';
import React, { useState } from 'react';
import Routing from '../../components/Routes';
import { ApiURL } from '../../constants/api';
import { CustomersTreeType } from './TreeView/_types';
import { darkTheme, GlobalStyles, lightTheme } from '../../constants/theme';
import { DeleteJob, Unlock } from './TreeView/Job/_types';
import { DeleteProject } from './Project/_types';
import { Filter } from './SidebarFilter';
import { FilterProjectRequest } from './SidebarFilter/Projects/_types';
import { GlobalNotification } from '../../components/Toast/_types';
import { HubComponent } from './HubComponent';
import { HubConnection } from '@microsoft/signalr';
import { IconMenu } from './FastNavigation/Component';
import { isElectron } from '../../utils/electron';
import { Method } from '../../constants/enum';
import { NavigationSetting } from './Navigation/NavigationSetting';
import { OpenTruss } from '../../sagas/Truss/_actions';
import { QuickSearchRequest } from './FastNavigation/_types';
import { RouteComponentProps } from 'react-router';
import { settings, settingsFilter } from './_actions';
import { SidePanel } from './Sidebar/SidePanel';
import { ThemeProvider } from 'styled-components';
import { UserData } from './Accounts/_types';
import { useToasts } from 'react-toast-notifications';
import { WithTranslation, withTranslation } from '../../translation/i18n';
import {
	Data,
	Fetch,
	FilterSettings,
	Page,
	Tree,
	TreeType,
} from "../../types/_types";
import {
	ContentHeight,
	ContentRow,
	FullHeightExceptHeader,
	WindowWrapper,
} from "./_styles";
const Store = window.require("electron-store");

export interface StateProps {
	activeTree: TreeType;
	customerTree: CustomersTreeType;
	jobTree: Data<Tree>;
	pending: boolean;
	router: any;
	pathname: string;
	local: boolean;
	token: string;
	currentPage: number;
	totalPages: number;
	totalRecords: number;
	expandedKeys?: string[];
	selectedKeys?: string[];
	toast: GlobalNotification;
	filter: FilterSettings;
	path: string;
	users: UserData[];
	projectPending: boolean;
	jobPending: boolean;
	trussPending: boolean;
	customerPending: boolean;
}

export interface DispatchProps {
	setHubTree: (data: any) => void;
	setHubProject: (data: any) => void;
	setHubJob: (data: any) => void;
	setHubTruss: (data: any) => void;
	settingsCall: (data: Fetch) => void;
	filterSettingsCall: (data: Fetch) => void;
	customerTree: (data: Fetch) => void;
	jobTree: (data: Fetch) => void;
	trussTree: (data: Fetch) => void;
	changeTree: (data: TreeType) => void;
	setLocal: (data: boolean) => void;
	setCloud: (data: boolean) => void;
	setExpandedKeys: (data: string[]) => void;
	setSelectedKeys: (data: string[]) => void;
	treeReset: (data: Fetch) => void;
	removeJob: (data: DeleteJob) => void;
	removeProject: (data: DeleteProject) => void;
	createTruss: (data: OpenTruss) => void;
	editTruss: (data: OpenTruss) => void;
	unlockJob: (data: Unlock) => void;
	clearToast: () => void;
	quickSearchRequest: (data: QuickSearchRequest) => void;
	getUsers: (data: Fetch) => void;
	projectFilterRequest: (data: FilterProjectRequest) => void;
	getCustomers: (data: Page) => void;
	getTrusses: (data: Page) => void;
	getProjects: (data: Page) => void;
	getJobs: (data: Page) => void;
	filterEntities: (data: any) => void;
	removeFromSelection: (data: string) => void;
	addToSelection: (data: string) => void;
	resetSelectionAction: (data: void) => void;
}

const Index = ({
	removeFromSelection,
	addToSelection,
	local,
	token,
	setCloud,
	setLocal,
	currentPage,
	totalPages,
	totalRecords,
	changeTree,
	expandedKeys,
	selectedKeys,
	setExpandedKeys,
	setSelectedKeys,
	treeReset,
	removeJob,
	removeProject,
	editTruss,
	createTruss,
	unlockJob,
	quickSearchRequest,
	filter,
	path,
	users,
	getUsers,
	filterSettingsCall,
	settingsCall,
	toast,
	clearToast,
	filterEntities,
	projectPending,
	jobPending,
	trussPending,
	customerPending,
	getTrusses,
	getProjects,
	getJobs,
	pending,
	setHubTree,
	setHubProject,
	setHubJob,
	setHubTruss,
	getCustomers,
	resetSelectionAction,
}: StateProps & DispatchProps & WithTranslation & RouteComponentProps) => {
	const { addToast } = useToasts();
	const [treePending, setTreePending] = React.useState(true);
	const [selectedPageSize, setSelectedPageSize] = React.useState(25);
	const [connect, setHubConnection] = useState<HubConnection>();
	const [mode, setTheme] = React.useState<"light" | "dark">("light");
	const [activeFilter, setActiveFilter] = React.useState<boolean>(false);
	const [activeTree, setActiveTree] = React.useState<TreeType>(
		TreeType.PROJECT
	);
	const [activeFilterContent, setActiveFilterContent] = useState(null);
	const [active, setActive] = useState(false);
	const [store, setStore] = React.useState(null);

	React.useEffect(() => {
		setStore(new Store());
	}, []);

	React.useEffect(() => {
		if (isElectron() && store) {
			setTheme(store.get("app-theme"));
		}
	}, [store]);

	React.useEffect(() => {
		if (isElectron() && store && mode) {
			store.delete("app-theme");
			store.set("app-theme", mode);
		}
	}, [mode]);

	React.useEffect(() => {
		if (toast) {
			addToast(toast.message, {
				appearance: toast.code,
				autoDismiss: true,
			});
			clearToast();
		}
	}, [toast]);
	React.useEffect(() => {
		getCustomers({ Page: 0, PageSize: 25, Sort: "" });
		settingsCall({
			action: settings,
			method: Method.GET,
			url: ApiURL.SETTINGS,
		});
		filterSettingsCall({
			action: settingsFilter,
			method: Method.GET,
			url: ApiURL.SETTINGS_FILTER,
		});
		return () => {
			setExpandedKeys([]);
			setSelectedKeys([]);
		};
	}, []);

	return (
		<HubComponent
			setHubConnection={setHubConnection}
			token={token}
			local={local}
			connect={connect}
			setActiveTree={setActiveTree}
			setActive={setActive}
			setActiveFilterContent={setActiveFilterContent}
			setTreePending={setTreePending}
			setHubTree={setHubTree}
			setHubProject={setHubProject}
			setHubJob={setHubJob}
			setHubTruss={setHubTruss}
		>
			<KeyboardEventHandler
				handleKeys={["f8"]}
				onKeyEvent={(key, e) => setActiveFilter(!activeFilter)}
			/>
			<ThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
				<GlobalStyles />
				<WindowWrapper>
					<FullHeightExceptHeader>
						<NavigationSetting
							setLocal={setLocal}
							local={local}
							setCloud={setCloud}
							setTheme={setTheme}
							mode={mode}
							connect={connect}
							setActiveFilter={setActiveFilter}
							selectedKeys={selectedKeys}
							selectedPageSize={selectedPageSize}
							setSelectedPageSize={setSelectedPageSize}
						/>
						<IconMenu
							quickSearchRequest={quickSearchRequest}
							setFilter={setActiveFilter}
							filter={activeFilter}
							connect={connect}
							setActiveFilter={setActiveFilter}
							selectedKeys={selectedKeys}
							selectedPageSize={selectedPageSize}
						/>
						<ContentHeight>
							<SidePanel
								activeTree={activeTree}
								connect={connect}
								currentPage={currentPage}
								totalPages={totalPages}
								totalRecords={totalRecords}
								changeTree={changeTree}
								expandedKeys={expandedKeys}
								selectedKeys={selectedKeys}
								setExpandedKeys={setExpandedKeys}
								setSelectedKeys={setSelectedKeys}
								treeReset={treeReset}
								removeJob={removeJob}
								removeProject={removeProject}
								createTruss={createTruss}
								editTruss={editTruss}
								unlockJob={unlockJob}
								selectedPageSize={selectedPageSize}
								setSelectedPageSize={setSelectedPageSize}
								setTreePending={setTreePending}
								treePending={treePending}
								getJobs={getJobs}
								getTrusses={getTrusses}
								getProjects={getProjects}
								getCustomers={getCustomers}
								addToSelection={addToSelection}
								removeFromSelection={removeFromSelection}
								resetSelectionAction={resetSelectionAction}
							/>
							<ContentRow>
								<Routing token={token} connect={connect} />
							</ContentRow>
							<Filter
								filterEntities={filterEntities}
								getCustomers={getCustomers}
								filter={filter}
								activeTree={activeTree}
								path={path}
								users={users}
								getUsers={getUsers}
								connect={connect}
								activeFilterContent={activeFilterContent}
								active={active}
								pending={pending}
								projectPending={projectPending}
								jobPending={jobPending}
								trussPending={trussPending}
								customerPending={customerPending}
								activeFilter={activeFilter}
								selectedKeys={selectedKeys}
								getJobs={getJobs}
								getProjects={getProjects}
							/>
						</ContentHeight>
					</FullHeightExceptHeader>
				</WindowWrapper>
			</ThemeProvider>
		</HubComponent>
	);
};

export default withTranslation()(React.memo(Index));
