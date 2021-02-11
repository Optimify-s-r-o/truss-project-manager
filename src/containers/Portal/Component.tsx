import { HubConnection } from "@microsoft/signalr";
import React, { useState } from "react";
import KeyboardEventHandler from "react-keyboard-event-handler";
import { RouteComponentProps } from "react-router";
import { useToasts } from "react-toast-notifications";
import {
	ELECTRON_STORE_GET,
	ELECTRON_STORE_SET,
} from "src/constants/ipcConstants";
import { ThemeProvider } from "styled-components";
import Routing from "../../components/Routes";
import { GlobalNotification } from "../../components/Toast/_types";
import { ApiURL } from "../../constants/api";
import { Method } from "../../constants/enum";
import { darkTheme, GlobalStyles, lightTheme } from "../../constants/theme";
import {
	getPortalUsers,
	getProjectFilesAction,
} from "../../sagas/Fetch/actions";
import { OpenTruss } from "../../sagas/Truss/_actions";
import { WithTranslation, withTranslation } from "../../translation/i18n";
import {
	Data,
	Fetch,
	FilterSettings,
	Page,
	Project,
	Tree,
	TreeType,
} from "../../types/_types";
import { isElectron } from "../../utils/electron";
import { UserData } from "./Accounts/_types";
import { IconMenu } from "./FastNavigation/Component";
import { QuickSearchRequest } from "./FastNavigation/_types";
import { HubComponent } from "./HubComponent";
import { NavigationSetting } from "./Navigation/NavigationSetting";
import { DeleteProject } from "./Project/_types";
import { SidePanel } from "./Sidebar/SidePanel";
import { Filter } from "./SidebarFilter";
import { FilterProjectRequest } from "./SidebarFilter/Projects/_types";
import { DeleteJob, JobRootObject, Unlock } from "./TreeView/Job/_types";
import { ProjectFileRequest } from "./TreeView/Project/_types";
import { Truss } from "./TreeView/Truss/_types";
import { CustomersTreeType } from "./TreeView/_types";
import { settings, settingsFilter } from "./_actions";
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
	treeHub: any;
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
	getFiles: (data: ProjectFileRequest) => void;
	getJobImage: (data: string) => void;
	setJob: (data: JobRootObject) => void;
	getTrussImage: (data: string) => void;
	setTruss: (data: Truss) => void;
	priceListsGetAction: (data: void) => void;
	setProject: (data: Project) => void;
	setLoading: (data: boolean) => void;
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
	treeHub,
	getFiles,
	setJob,
	getJobImage,
	setTruss,
	getTrussImage,
	priceListsGetAction,
	setProject,
	setLoading,
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

	React.useEffect(() => {}, [mode]);

	React.useEffect(() => {
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
	}, []);

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

	const getProject = (id: string) => {
		getFiles(getProjectFilesAction(id));
		getUsers(getPortalUsers());
	};

	const getTruss = (id: string) => {
		getTrussImage(id);
		priceListsGetAction();
	};

	const toggleTheme = () => {
		if (isElectron() && mode) {
			const electron = window.require("electron");
			const fs = electron.remote.require("fs");
			console.log(mode);
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
			setProject={setProject}
			getProject={getProject}
			setJob={setJob}
			getJobImage={getJobImage}
			setTruss={setTruss}
			getTruss={getTruss}
			setLoading={setLoading}
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
							toggleTheme={toggleTheme}
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
								treeHub={treeHub}
							/>
						</ContentHeight>
					</FullHeightExceptHeader>
				</WindowWrapper>
			</ThemeProvider>
		</HubComponent>
	);
};

export default withTranslation()(React.memo(Index));
