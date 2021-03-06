import KeyboardEventHandler from 'react-keyboard-event-handler';
import Routing from '../../components/Routes';
import { ApiURL } from '../../constants/api';
import { CustomersTreeType } from './TreeView/_types';
import { darkTheme, GlobalStyles, lightTheme } from '../../constants/theme';
import { DeleteProject } from './Project/_types';
import { EditTruss, OpenTruss } from '../../sagas/Truss/_actions';
import { Filter } from './SidebarFilter';
import { FilterProjectRequest } from './SidebarFilter/Projects/_types';
import { getProjectFilesAction } from '../../sagas/Fetch/actions';
import { GlobalNotification } from '../../components/Toast/_types';
import { Hub } from '../../constants/hub';
import { HubComponent } from './HubComponent';
import { HubConnection } from '@microsoft/signalr';
import { IconMenu } from './FastNavigation/Component';
import { isElectron } from '../../utils/electron';
import { memo, useEffect, useState } from 'react';
import { Method } from '../../constants/enum';
import { NavigationSetting } from './Navigation/NavigationSetting';
import { ProjectFileRequest } from './TreeView/Project/_types';
import { QuickSearchRequest } from './FastNavigation/_types';
import { RouteComponentProps } from 'react-router';
import { settings, settingsFilter } from './_actions';
import { SidePanel } from './Sidebar/SidePanel';
import { ThemeProvider } from 'styled-components';
import { Truss } from './TreeView/Truss/_types';
import { useLocation } from 'react-router-dom';
import { UserData } from './Accounts/_types';
import { useToasts } from 'react-toast-notifications';
import { WithTranslation, withTranslation } from '../../translation/i18n';
import {
	ELECTRON_STORE_GET,
	ELECTRON_STORE_SET,
} from "src/constants/ipcConstants";
import {
	Data,
	Fetch,
	FilterSettings,
	Page,
	Project,
	Tree,
	TreeType,
} from "../../types/_types";
import {
	CopyJob,
	DeleteJob,
	JobRootObject,
	Unlock,
} from "./TreeView/Job/_types";
import {
	ContentHeight,
	ContentRow,
	FullHeightExceptHeader,
	WindowWrapper,
} from "./_styles";

export interface StateProps {
	activeTree: TreeType;
	customerTree: CustomersTreeType;
	jobTree: Data<Tree>;
	pending: boolean;
	router: any;
	pathname: string;
	activeFilter: boolean;
	filterPending: boolean;
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
	treeHub: any;
	copiedJob: string;
	activeFilterContent: string;
	showFilterSidebar: boolean;
	settingsHub: any;
	userSettings: any;
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
	setCloud: (data: boolean) => void;
	setExpandedKeys: (data: string[]) => void;
	setSelectedKeys: (data: string[]) => void;
	treeReset: (data: Fetch) => void;
	removeJob: (data: DeleteJob) => void;
	removeProject: (data: DeleteProject) => void;
	createTruss: (data: OpenTruss) => void;
	editTruss: (data: EditTruss) => void;
	unlockJob: (data: Unlock) => void;
	clearToast: () => void;
	quickSearchRequest: (data: QuickSearchRequest) => void;
	getUsers: (data: Page) => void;
	projectFilterRequest: (data: FilterProjectRequest) => void;
	getCustomers: (data: Page) => void;
	getTrusses: (data: Page) => void;
	getProjects: (data: Page) => void;
	getJobs: (data: Page) => void;
	filterEntities: (data: any) => void;
	removeFromSelection: (data: string) => void;
	addToSelection: (data: string) => void;
	resetSelectionAction: (data: void) => void;
	getFiles: (data: ProjectFileRequest) => void;
	getJobImage: (data: string) => void;
	setJob: (data: JobRootObject) => void;
	getTrussImage: (data: string) => void;
	setTruss: (data: Truss) => void;
	priceListsGetAction: (data: void) => void;
	setProject: (data: Project) => void;
	setLoading: (data: boolean) => void;
	duplicateJob: (data: string) => void;
	setCopiedJob: (data: string) => void;
	copyJob: (data: CopyJob) => void;
	setActiveFilterContent: (data: any) => void;
	setActive: (data: boolean) => void;
	showFilter: (data: boolean) => void;
	setHubSettings: (data: any) => void;
	clearFilteredData: () => void;
}

const Index = ({
	activeFilter,
	copiedJob,
	setCopiedJob,
	removeFromSelection,
	addToSelection,
	setCloud,
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
	filterPending,
	setHubTree,
	setHubProject,
	setHubJob,
	setHubTruss,
	getCustomers,
	resetSelectionAction,
	treeHub,
	getFiles,
	setJob,
	getJobImage,
	setTruss,
	getTrussImage,
	priceListsGetAction,
	setProject,
	setLoading,
	duplicateJob,
	copyJob,
	setActiveFilterContent,
	activeFilterContent,
	setActive,
	showFilter,
	showFilterSidebar,
	setHubSettings,
	settingsHub,
	userSettings,
	clearFilteredData,
}: StateProps & DispatchProps & WithTranslation & RouteComponentProps) => {
	const { addToast } = useToasts();
	const location = useLocation();
	const [treePending, setTreePending] = useState(true);
	const [selectedPageSize, setSelectedPageSize] = useState(25);
	const [connect, setHubConnection] = useState<HubConnection>();
	const [mode, setTheme] = useState<"light" | "dark">("light");
	const [activeTree, setActiveTree] = useState<TreeType>(null);

	useEffect(() => {
		const jobHandler = async () => {
			if (settingsHub?.state === "Connected") {
				try {
					settingsHub.invoke(
						Hub.WriteSettings,
						JSON.stringify({
							...userSettings,
							location: location?.pathname,
						})
					);
				} catch (err) {
					console.log(err);
				}
			}
		};
		jobHandler();
	}, [settingsHub, location]);

	useEffect(() => {
		if (isElectron()) {
			const electron = window.require("electron");
			electron.ipcRenderer.send(ELECTRON_STORE_GET, "app-theme");
			const fs = electron.remote.require("fs");
			electron.ipcRenderer.on(ELECTRON_STORE_GET, (event, text) => {
				if (text) {
					setTheme(text);
				}
			});
		}

		return () => {
			clearFilteredData();
		};
	}, []);

	useEffect(() => {
		if (toast) {
			addToast(toast.message, {
				appearance: toast.code,
				autoDismiss: true,
			});
			clearToast();
		}
	}, [toast]);

	useEffect(() => {
		getCustomers({ Paginate: false });
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

	const getProject = (id: string) => {
		getFiles(getProjectFilesAction(id));
		getUsers({
			Paginate: false,
		});
	};

	const getTruss = (id: string) => {
		getTrussImage(id);
		priceListsGetAction();
	};

	const toggleTheme = () => {
		if (isElectron() && mode) {
			const electron = window.require("electron");
			const fs = electron.remote.require("fs");
			electron.ipcRenderer.send(ELECTRON_STORE_SET, {
				name: "app-theme",
				value: mode === "light" ? "dark" : "light",
			});
		}
		setTheme(mode === "light" ? "dark" : "light");
	};

	return (
		<HubComponent
			setHubConnection={setHubConnection}
			filterSettingsCall={filterSettingsCall}
			connect={connect}
			setActiveTree={setActiveTree}
			setActive={setActive}
			setActiveFilterContent={setActiveFilterContent}
			setTreePending={setTreePending}
			setHubTree={setHubTree}
			setHubProject={setHubProject}
			setHubJob={setHubJob}
			setHubTruss={setHubTruss}
			setProject={setProject}
			getProject={getProject}
			setJob={setJob}
			getJobImage={getJobImage}
			setTruss={setTruss}
			getTruss={getTruss}
			setLoading={setLoading}
			setHubSettings={setHubSettings}
		>
			<KeyboardEventHandler
				handleKeys={["f8"]}
				onKeyEvent={(key, e) => showFilter(!showFilterSidebar)}
			/>
			<ThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
				<GlobalStyles />
				<WindowWrapper>
					<FullHeightExceptHeader>
						<NavigationSetting
							setCloud={setCloud}
							setTheme={setTheme}
							mode={mode}
							connect={connect}
							setActiveFilter={showFilter}
							selectedKeys={selectedKeys}
							selectedPageSize={selectedPageSize}
							setSelectedPageSize={setSelectedPageSize}
							toggleTheme={toggleTheme}
						/>
						<IconMenu
							quickSearchRequest={quickSearchRequest}
							showFilter={showFilter}
							filter={showFilterSidebar}
							connect={connect}
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
								duplicateJob={duplicateJob}
								copiedJob={copiedJob}
								setCopiedJob={setCopiedJob}
								copyJob={copyJob}
								setActiveFilterContent={setActiveFilterContent}
							/>
							<ContentRow>
								<Routing connect={connect} />
							</ContentRow>
							<Filter
								currentPage={currentPage}
								selectedPageSize={selectedPageSize}
								filterEntities={filterEntities}
								getCustomers={getCustomers}
								filter={filter}
								activeTree={activeTree}
								path={path}
								users={users}
								getUsers={getUsers}
								connect={connect}
								activeFilterContent={activeFilterContent}
								active={activeFilter}
								pending={filterPending}
								projectPending={projectPending}
								jobPending={jobPending}
								trussPending={trussPending}
								customerPending={customerPending}
								activeFilter={showFilterSidebar}
								selectedKeys={selectedKeys}
								getJobs={getJobs}
								getProjects={getProjects}
								treeHub={treeHub}
							/>
						</ContentHeight>
					</FullHeightExceptHeader>
				</WindowWrapper>
			</ThemeProvider>
		</HubComponent>
	);
};

export default withTranslation()(memo(Index));
