import _ from 'lodash';
import React, { useEffect } from 'react';
import SectionsPanel from '../../../components/Optimify/Panel/SectionsPanel';
import { DeleteJob, Unlock } from '../TreeView/Job/_types';
import { DeleteProject } from '../Project/_types';
import { Fetch, Page, TreeType } from '../../../types/_types';
import { Hub } from '../../../constants/hub';
import { HubConnection } from '@microsoft/signalr';
import { lang } from '../../../translation/i18n';
import { OpenTruss } from '../../../sagas/Truss/_actions';
import { Sidebar } from '../Sidebar';
import { SideMenu } from '../_styles';
import { translationPath } from '../../../utils/getPath';
import { useTranslation } from 'react-i18next';
import {
	faFolders,
	faHomeLgAlt,
	faMountains,
	faUsers,
} from "@fortawesome/pro-duotone-svg-icons";

interface ISidePanel {
	activeTree: TreeType;
	connect: HubConnection;
	currentPage: number;
	totalPages: number;
	totalRecords: number;
	changeTree: (data: TreeType) => void;
	expandedKeys?: string[];
	selectedKeys?: string[];
	setExpandedKeys: (data: string[]) => void;
	setSelectedKeys: (data: string[]) => void;
	treeReset: (data: Fetch) => void;
	removeJob: (data: DeleteJob) => void;
	removeProject: (data: DeleteProject) => void;
	createTruss: (data: OpenTruss) => void;
	editTruss: (data: OpenTruss) => void;
	unlockJob: (data: Unlock) => void;
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

export const SidePanel = ({
	getCustomers,
	getTrusses,
	getProjects,
	getJobs,
	activeTree,
	connect,
	currentPage,
	changeTree,
	totalPages,
	totalRecords,
	expandedKeys,
	selectedKeys,
	setExpandedKeys,
	setSelectedKeys,
	treeReset,
	removeJob,
	removeProject,
	createTruss,
	editTruss,
	unlockJob,
	setSelectedPageSize,
	selectedPageSize,
	setTreePending,
	treePending,
	removeFromSelection,
	addToSelection,
	resetSelectionAction,
}: ISidePanel) => {
	const { t } = useTranslation();
	const [tree, setTree] = React.useState(null);

	useEffect(() => {
		expandTree();
	}, [tree]);

	const dfs = (obj: any, targetId: string, toExpand: string[]) => {
		if (obj.key === targetId) {
			return { value: obj, toExpand: toExpand };
		}
		if (obj.children) {
			for (let item of obj.children) {
				let check = dfs(item, targetId, [...toExpand, obj.key]);
				if (check) {
					return check;
				}
			}
		}
		return null;
	};

	const expandTree = () => {
		if (tree) {
			selectedKeys.forEach((key: string) => {
				for (let obj of tree) {
					const result = dfs(obj, key, []);
					if (result) {
						const toExpand = _.union(expandedKeys, result.toExpand);
						setExpandedKeys(toExpand);
					}
				}
			});
		}
	};

	const invokeHub = async (tree: TreeType) => {
		try {
			if (selectedKeys?.length > 0) {
				connect.invoke(
					Hub.RequestTreeWithSelection,
					tree,
					selectedPageSize,
					""
				);
			} else {
				connect.invoke(Hub.RequestNewTree, tree, 0, selectedPageSize, "");
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<SectionsPanel
			activeFilter={true}
			direction="right"
			initialSize={300}
			minSize={200}
			maxSize={900}
			sections={[
				{
					icon: faFolders,
					tooltip: t(translationPath(lang.common.projects).path),
					callback: (e) => {
						invokeHub(TreeType.PROJECT);
						changeTree(TreeType.PROJECT);
					},
					isActive: activeTree === TreeType.PROJECT,
				},
				{
					icon: faHomeLgAlt,
					tooltip: t(translationPath(lang.common.jobs).path),
					callback: (e) => {
						invokeHub(TreeType.JOB);
						changeTree(TreeType.JOB);
					},
					isActive: activeTree === TreeType.JOB,
				},
				{
					icon: faMountains,
					tooltip: t(translationPath(lang.common.trusses).path),
					callback: (e) => {
						invokeHub(TreeType.TRUSS);
						changeTree(TreeType.TRUSS);
					},
					isActive: activeTree === TreeType.TRUSS,
				},
				{
					icon: faUsers,
					tooltip: t(translationPath(lang.common.customers).path),
					callback: (e) => {
						invokeHub(TreeType.CUSTOMER);
						changeTree(TreeType.CUSTOMER);
					},
					isActive: activeTree === TreeType.CUSTOMER,
				},
			]}
			hideThreshold={100}
		>
			<SideMenu>
				<Sidebar
					currentPage={currentPage}
					totalPages={totalPages}
					totalRecords={totalRecords}
					connect={connect}
					activeTree={activeTree}
					expandedKeys={expandedKeys}
					selectedKeys={selectedKeys}
					setExpandedKeys={setExpandedKeys}
					setSelectedKeys={setSelectedKeys}
					treeReset={treeReset}
					removeJob={removeJob}
					removeProject={removeProject}
					editTruss={editTruss}
					createTruss={createTruss}
					unlockJob={unlockJob}
					tree={tree}
					setTree={setTree}
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
			</SideMenu>
		</SectionsPanel>
	);
};
