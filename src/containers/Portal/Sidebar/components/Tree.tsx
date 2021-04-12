import PaginationTree from '../../../../components/PaginationTree';
import React from 'react';
import { CustomerType } from '../../Lists/Customers/_types';
import { Page, TreeType } from '../../../../types/_types';
import { Routes } from '../../../../constants/routes';
import { SDirectoryTree } from '../_styles';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';

interface IActiveActions {
	setSelectedKeys: (data: string[]) => void;
	setExpandedKeys: (data: string[]) => void;
	setX: React.Dispatch<React.SetStateAction<number>>;
	setY: React.Dispatch<React.SetStateAction<number>>;
	setNodeId: React.Dispatch<React.SetStateAction<any>>;
	setNodeType: React.Dispatch<React.SetStateAction<any>>;
	setTrussType: React.Dispatch<React.SetStateAction<any>>;
	setProjectName: React.Dispatch<React.SetStateAction<any>>;
	setJobName: React.Dispatch<React.SetStateAction<any>>;
	setJobLocked: React.Dispatch<React.SetStateAction<any>>;
	setJobLockedByMe: React.Dispatch<React.SetStateAction<any>>;
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
	data: any;
	onPageRequired: (requiredPage: Page) => void;
	activeTree: TreeType;
	expandedKeys?: string[];
	selectedKeys?: string[];
	tree: any;
	selectedPageSize: number;
	setSelectedPageSize: React.Dispatch<React.SetStateAction<number>>;
}
export const Tree = ({
	setSelectedKeys,
	setExpandedKeys,
	setX,
	setY,
	setNodeId,
	setNodeType,
	setTrussType,
	setProjectName,
	setJobName,
	setJobLocked,
	setJobLockedByMe,
	setIsVisible,
	data,
	activeTree,
	expandedKeys,
	selectedKeys,
	tree,
	selectedPageSize,
	onPageRequired,
	setSelectedPageSize,
}: IActiveActions) => {
	const { t } = useTranslation();
	const history = useHistory();
	const location = useLocation();

	const onSelect = (keys, event) => {
		const path = location.pathname;
		setSelectedKeys([...keys]);
		if (keys?.length > 1 && event?.node?.treeType === TreeType.JOB) {
			history.push(Routes.TREE_LINK_JOB_MULTIPLE + keys);
		} else if (keys?.length > 1 && event?.node?.treeType === TreeType.TRUSS) {
			history.push(Routes.TREE_LINK_TRUSS_MULTIPLE + keys);
		} else if (keys?.length > 1 && event?.node?.treeType === TreeType.PROJECT) {
			history.push(Routes.TREE_LINK_PROJECT_MULTIPLE + keys);
		} else if (
			event?.node?.treeType === TreeType.CUSTOMER &&
			keys.length === 1 &&
			event?.node.customerType === CustomerType.Legal
		) {
			history.push(Routes.LINK_NEW_LEGAL_CUSTOMER + keys);
		} else if (
			event?.node?.treeType === TreeType.CUSTOMER &&
			keys.length === 1 &&
			event?.node.customerType === CustomerType.Natural
		) {
			history.push(Routes.LINK_NEW_NATURAL_CUSTOMER + keys);
		} else if (
			event?.node?.treeType === TreeType.CUSTOMER &&
			keys.length === 1 &&
			event?.node.customerType === CustomerType.Evidence
		) {
			history.push(Routes.LINK_NEW_EVIDENCE_CUSTOMER + keys);
		} else if (event?.node?.treeType === TreeType.PROJECT) {
			if (path.includes("quotations")) {
				history.push(Routes.TREE_LINK_PROJECT + keys + "/quotations/persist");
			} else {
				history.push(Routes.TREE_LINK_PROJECT + keys);
			}
		} else if (event?.node?.treeType === TreeType.JOB) {
			if (path.includes("material")) {
				history.push(Routes.TREE_LINK_JOB + keys + "/material/persist");
			} else if (path.includes("quotations")) {
				history.push(Routes.TREE_LINK_JOB + keys + "/quotations/persist");
			} else {
				history.push(Routes.TREE_LINK_JOB + keys);
			}
		} else if (event?.node?.treeType === TreeType.TRUSS) {
			console.log(path);
			if (path.includes("material")) {
				history.push(Routes.TREE_LINK_TRUSS + keys + "/material/persist");
			} else if (path.includes("quotations")) {
				history.push(Routes.TREE_LINK_TRUSS + keys + "/quotations/persist");
			} else {
				history.push(Routes.TREE_LINK_TRUSS + keys);
			}
		} else if (event?.node?.treeType === TreeType.CUSTOMER) {
			history.push(Routes.EDIT_CUSTOMER_LINK + keys);
		}
	};

	const onExpand = (exp, { expanded, node }) => {
		if (!expanded) {
			setExpandedKeys(
				expandedKeys.filter((key) => {
					if (node.children.find((e) => e.key === key) || key === node.key) {
						return false;
					}
					return true;
				})
			);
			return;
		}
		setExpandedKeys(exp);
	};

	const onRigthContextClick = (info: {
		event: React.MouseEvent<Element, MouseEvent>;
		node: any;
	}) => {
		const sidebarWidth = document.getElementById("sidebar").offsetWidth;
		const key = info.node?.key;
		const treeType = info.node?.treeType;
		if (!selectedKeys?.includes(key)) {
			setSelectedKeys([info.node?.key]);
			if (treeType === TreeType.PROJECT) {
				history.push(Routes.TREE_LINK_PROJECT + key);
			} else if (treeType === TreeType.JOB) {
				history.push(Routes.TREE_LINK_JOB + key);
			} else if (treeType === TreeType.TRUSS) {
				history.push(Routes.TREE_LINK_TRUSS + key);
			}
		}

		setX(
			info.event.pageX + 210 > sidebarWidth
				? sidebarWidth - 170
				: info.event.pageX
		);
		setY(info.event.pageY);
		setNodeId(info.node.key);
		setNodeType(info.node.treeType);
		setTrussType(info.node.trussType);
		setJobName(info.node.jobName);
		setProjectName(info.node.projectName);
		setJobLocked(info.node.lock);
		setJobLockedByMe(info.node.lockedByMe);
		setIsVisible(true);
	};
	const handlePaseSizeChange = (value: any) => {
		setSelectedPageSize(value);
		onPageRequired({
			PageSize: value,
			Page: 0,
		});
	};

	return (
		<>
			{data && data.Data.length ? (
				<>
					<SDirectoryTree
						expandedKeys={expandedKeys}
						selectedKeys={selectedKeys}
						autoExpandParent={false}
						onSelect={onSelect}
						onExpand={onExpand}
						treeData={tree}
						showLine={{ showLeafIcon: false }}
						multiple={data.Treetype != "Customer" ? true : false}
						expandAction={false}
						onRightClick={onRigthContextClick}
					/>
					<PaginationTree
						pageSize={selectedPageSize}
						currentPage={data?.CurrentPage}
						totalPages={data?.TotalPages}
						totalRecords={data?.TotalRecords}
						onPageRequired={onPageRequired}
						onSizeChanged={handlePaseSizeChange}
					/>
				</>
			) : (
				""
			)}
		</>
	);
};
