import React, { useEffect, useState } from 'react';
import { ActiveActions } from './components/ActiveActions';
import { Bar, ContextMenu } from './_styles';
import { CopyJob, DeleteJob, Unlock } from '../TreeView/Job/_types';
import { createTree } from './_services';
import { DeleteProject } from '../Project/_types';
import { EditTruss, OpenTruss } from '../../../sagas/Truss/_actions';
import { Events } from './components/Events';
import { Fetch, Page, TreeType } from '../../../types/_types';
import { Hub } from '../../../constants/hub';
import { HubConnection } from '@microsoft/signalr';
import { isElectron } from '../../../utils/electron';
import { RightContext } from './components/RightContext';
import { SSpin } from '../../../constants/globalStyles';
import { Tree } from './components/Tree';
import { useTranslation } from 'react-i18next';

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
	editTruss: (data: EditTruss) => void;
	unlockJob: (data: Unlock) => void;
	setTree: React.Dispatch<any>;
	setSelectedPageSize: React.Dispatch<React.SetStateAction<number>>;
	selectedPageSize: number;
	setTreePending: React.Dispatch<React.SetStateAction<boolean>>;
	treePending: boolean;
	getCustomers: (data: Page) => void;
	getTrusses: (data: Page) => void;
	getProjects: (data: Page) => void;
	getJobs: (data: Page) => void;
	removeFromSelection: (data: string) => void;
	addToSelection: (data: string) => void;
	resetSelectionAction: (data: void) => void;
	duplicateJob: (data: string) => void;
	setCopiedJob: (data: string) => void;
	copiedJob: string;
	copyJob: (data: CopyJob) => void;
}

export const Sidebar = ({
	getCustomers,
	getTrusses,
	getProjects,
	getJobs,
	currentPage,
	copiedJob,
	setCopiedJob,
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
	duplicateJob,
	copyJob,
}: Sidebar) => {
	const { t } = useTranslation();
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
								json?.SelectedKey && setSelectedKeys([json?.SelectedKey]);
								setSelectedPageSize(json.SettingsPageSize);
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
		if (isElectron()) {
			const electron = window.require("electron");
			electron.ipcRenderer.send("truss3DExePath");
			electron.ipcRenderer.send("truss2DExePath");
			const fs = electron.remote.require("fs");
			electron.ipcRenderer.on("truss3DExePath", (event, text) => {
				setTruss3DExe(text);
			});
			electron.ipcRenderer.on("truss2DExePath", (event, text) => {
				setTruss2DExe(text);
			});
		}
	}, []);

	const onPageRequired = (requiredPage: Page) => {
		if (connect && connect?.state === "Connected") {
			connect.invoke(
				Hub.RequestNewTree,
				activeTree,
				requiredPage.Page,
				requiredPage.PageSize,
				requiredPage.Sort || ""
			);
		}
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
			{isVisible && nodeType != "Customer" && nodeType != "Truss" && (
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
						duplicateJob={duplicateJob}
						copiedJob={copiedJob}
						setCopiedJob={setCopiedJob}
						copyJob={copyJob}
					/>
				</ContextMenu>
			)}
		</Bar>
	);
};
