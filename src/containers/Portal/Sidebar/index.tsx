import { HubConnection } from "@microsoft/signalr";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SSpin } from "../../../constants/globalStyles";
import { Hub } from "../../../constants/hub";
import { OpenTruss } from "../../../sagas/Truss/_actions";
import { Fetch, Page, TreeType } from "../../../types/_types";
import { isElectron } from "../../../utils/electron";
import { DeleteProject } from "../Project/_types";
import { DeleteJob, Unlock } from "../TreeView/Job/_types";
import { ActiveActions } from "./components/ActiveActions";
import { Events } from "./components/Events";
import { RightContext } from "./components/RightContext";
import { Tree } from "./components/Tree";
import { createTree } from "./_services";
import { Bar, ContextMenu } from "./_styles";
const Store = window.require("electron-store");

interface Sidebar {
	activeTree: TreeType;
	defaultPageSize?: number;
	currentPage: number;
	totalPages: number;
	totalRecords: number;
	connect: HubConnection;
	expandedKeys?: string[];
	selectedKeys?: string[];
	tree: any;
	setExpandedKeys: (data: string[]) => void;
	setSelectedKeys: (data: string[]) => void;
	treeReset: (data: Fetch) => void;
	removeJob: (data: DeleteJob) => void;
	removeProject: (data: DeleteProject) => void;
	createTruss: (data: OpenTruss) => void;
	editTruss: (data: OpenTruss) => void;
	unlockJob: (data: Unlock) => void;
	setTree: React.Dispatch<any>;
	setSelectedPageSize: React.Dispatch<React.SetStateAction<number>>;
	selectedPageSize: number;
	setTreePending: React.Dispatch<React.SetStateAction<boolean>>;
	treePending: boolean;
	getCustomers: (data: Page) => void;
	getTrusses: (data: Page) => void;
	getProjects: (data: Fetch) => void;
	getJobs: (data: Page) => void;
	removeFromSelection: (data: string) => void;
	addToSelection: (data: string) => void;
	resetSelectionAction: (data: void) => void;
}

export const Sidebar = ({
	getCustomers,
	getTrusses,
	getProjects,
	getJobs,
	currentPage,
	totalPages,
	totalRecords,
	connect,
	selectedKeys,
	expandedKeys,
	setSelectedKeys,
	setExpandedKeys,
	treeReset,
	removeJob,
	removeProject,
	createTruss,
	editTruss,
	unlockJob,
	activeTree,
	tree,
	setTree,
	setSelectedPageSize,
	selectedPageSize,
	setTreePending,
	treePending,
	removeFromSelection,
	addToSelection,
	resetSelectionAction,
}: Sidebar) => {
	const { t } = useTranslation();
	const [store, setStore] = React.useState(null);
	const [y, setY] = useState(0);
	const [x, setX] = useState(0);
	const [nodeId, setNodeId] = useState(null);
	const [nodeType, setNodeType] = useState(null);
	const [trussType, setTrussType] = useState(null);
	const [projectName, setProjectName] = useState(null);
	const [jobName, setJobName] = useState(null);
	const [data, setData] = useState(null);
	const [jobLocked, setJobLocked] = useState(false);
	const [jobLockedByMe, setJobLockedByMe] = useState(false);
	const [truss3DExe, setTruss3DExe] = React.useState("");
	const [truss2DExe, setTruss2DExe] = React.useState("");
	const [isVisible, setIsVisible] = useState(false);
	const wrapperRef = React.useRef(null);

	useEffect(() => {
		const invoke = async () => {
			if (connect) {
				try {
					connect.on(Hub.ReceivedTree, (message) => {
						if (message) {
							const json = message && JSON.parse(message);
							if (json) {
								console.log(json);
								setData(json);
								setTree(createTree(json.Data));
								setTreePending(false);
							}
						}
					});
					connect.on(Hub.TreeChanged, () => {
						setTreePending(true);
						connect.invoke(Hub.RequestTree);
					});
					connect.on(Hub.TreeLost, () => {
						if (activeTree) {
							connect.invoke(Hub.RequestNewTree, activeTree, 0, 25, "");
						}
					});
					connect.on(Hub.TreeSelection, (treeSelection, selectedEntityId) => {
						if (treeSelection && selectedEntityId) {
							connect.invoke(
								Hub.RequestTreeSelection,
								treeSelection,
								selectedEntityId
							);
						}
					});
				} catch (err) {
					console.log(err);
				}
			}
		};
		invoke();
	}, [connect]);

	React.useEffect(() => {
		setStore(new Store());
	}, []);

	React.useEffect(() => {
		if (isElectron() && store) {
			setTruss3DExe(store.get("truss3DExePath"));
			setTruss2DExe(store.get("truss2DExePath"));
		}
	}, [store]);

	React.useEffect(() => {
		if (connect) {
			selectedPageSize &&
				onPageRequired({
					PageSize: selectedPageSize,
					Page: 0,
					Sort: null,
				});
		}
	}, [selectedPageSize]);

	const onPageRequired = (requiredPage: Page) => {
		connect.invoke(
			Hub.RequestNewTree,
			activeTree,
			requiredPage.Page,
			requiredPage.PageSize,
			requiredPage.Sort
		);
	};

	const ref = React.useRef(null);

	const clickListener = React.useCallback(
		(e: MouseEvent) => {
			if (!(ref.current! as any)?.contains(e.target)) {
				setIsVisible(false);
			}
		},
		[ref.current]
	);

	useEffect(() => {
		document.addEventListener("click", clickListener);
		return () => {
			document.removeEventListener("click", clickListener);
		};
	}, []);

	if (treePending) {
		return <SSpin style={{ color: "green" }} />;
	}
	return (
		<Bar id="sidebar" ref={wrapperRef} isFilterActive={data?.IsFilterActive}>
			<Events
				setSelectedKeys={setSelectedKeys}
				selectedKeys={selectedKeys}
				tree={data?.Data}
				setExpandedKeys={setExpandedKeys}
				expandedKeys={expandedKeys}
			/>
			<ActiveActions
				data={data}
				activeTree={activeTree}
				getCustomers={getCustomers}
				getTrusses={getTrusses}
				getProjects={getProjects}
				getJobs={getJobs}
				connect={connect}
				resetSelectionAction={resetSelectionAction}
			/>
			<Tree
				setSelectedKeys={setSelectedKeys}
				setExpandedKeys={setExpandedKeys}
				setX={setX}
				setY={setY}
				setNodeId={setNodeId}
				setNodeType={setNodeType}
				setTrussType={setTrussType}
				setProjectName={setProjectName}
				setJobName={setJobName}
				setJobLocked={setJobLocked}
				setJobLockedByMe={setJobLockedByMe}
				setIsVisible={setIsVisible}
				data={data}
				activeTree={activeTree}
				expandedKeys={expandedKeys}
				selectedKeys={selectedKeys}
				tree={tree}
				selectedPageSize={selectedPageSize}
				onPageRequired={onPageRequired}
				setSelectedPageSize={setSelectedPageSize}
			/>
			{isVisible && nodeType != "Customer" && (
				<ContextMenu show={isVisible} x={x} y={y} ref={ref}>
					<RightContext
						isVisible={isVisible}
						x={x}
						y={y}
						ref={ref}
						nodeType={nodeType}
						setSelectedKeys={setSelectedKeys}
						unlockJob={unlockJob}
						projectName={projectName}
						jobName={jobName}
						setIsVisible={setIsVisible}
						nodeId={nodeId}
						trussType={trussType}
						truss3DExe={truss3DExe}
						truss2DExe={truss2DExe}
						removeJob={removeJob}
						createTruss={createTruss}
						editTruss={editTruss}
						removeProject={removeProject}
						jobLocked={jobLocked}
						jobLockedByMe={jobLockedByMe}
						addToSelection={addToSelection}
						removeFromSelection={removeFromSelection}
						selectedKeys={selectedKeys}
					/>
				</ContextMenu>
			)}
		</Bar>
	);
};
