import _ from 'lodash';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import React from 'react';
import { CustomerType } from '../../Lists/Customers/_types';
import { Routes } from '../../../../constants/routes';
import { TreeType } from '../../../../types/_types';
import { useHistory, useLocation } from 'react-router-dom';

interface Events {
	setSelectedKeys: (data: string[]) => void;
	setExpandedKeys: (data: string[]) => void;
	tree: any;
	selectedKeys: string[];
	expandedKeys: string[];
}

export const Events = ({
	setSelectedKeys,
	tree,
	selectedKeys,
	setExpandedKeys,
	expandedKeys,
}: Events) => {
	const history = useHistory();
	const location = useLocation();
	const route = (node: any) => {
		const path = location.pathname;
		if (selectedKeys?.length > 1 && node?.treeType === TreeType.JOB) {
			history.push(Routes.TREE_LINK_JOB_MULTIPLE + selectedKeys);
		} else if (selectedKeys?.length > 1 && node?.treeType === TreeType.TRUSS) {
			history.push(Routes.TREE_LINK_TRUSS_MULTIPLE + selectedKeys);
		} else if (
			selectedKeys?.length > 1 &&
			node?.treeType === TreeType.PROJECT
		) {
			history.push(Routes.TREE_LINK_PROJECT_MULTIPLE + selectedKeys);
		} else if (
			node?.treeType === TreeType.CUSTOMER &&
			selectedKeys.length === 1 &&
			node.customerType === CustomerType.Legal
		) {
			history.push(Routes.LINK_NEW_LEGAL_CUSTOMER + node.id);
		} else if (
			node?.treeType === TreeType.CUSTOMER &&
			selectedKeys.length === 1 &&
			node.customerType === CustomerType.Natural
		) {
			history.push(Routes.LINK_NEW_NATURAL_CUSTOMER + node.id);
		} else if (
			node?.treeType === TreeType.CUSTOMER &&
			selectedKeys.length === 1 &&
			node.customerType === CustomerType.Evidence
		) {
			history.push(Routes.LINK_NEW_EVIDENCE_CUSTOMER + node.id);
		} else if (node?.treeType === TreeType.PROJECT) {
			if (path.includes("quotations")) {
				history.push(
					Routes.TREE_LINK_PROJECT + node.id + "/quotations/persist"
				);
			} else {
				history.push(Routes.TREE_LINK_PROJECT + node.id);
			}
		} else if (node?.treeType === TreeType.JOB) {
			if (path.includes("material")) {
				history.push(Routes.TREE_LINK_JOB + node.id + "/material/persist");
			} else if (path.includes("quotations")) {
				history.push(Routes.TREE_LINK_JOB + node.id + "/quotations/persist");
			} else {
				history.push(Routes.TREE_LINK_JOB + node.id);
			}
		} else if (node?.treeType === TreeType.TRUSS) {
			if (path.includes("material")) {
				history.push(Routes.TREE_LINK_TRUSS + node.id + "/material/persist");
			} else if (path.includes("quotations")) {
				history.push(Routes.TREE_LINK_TRUSS + node.id + "/quotations/persist");
			} else {
				history.push(Routes.TREE_LINK_TRUSS + node.id);
			}
		}
	};

	const routeMultiple = (node: any) => {
		if (node?.treeType === TreeType.JOB) {
			history.push(
				Routes.TREE_LINK_JOB_MULTIPLE + selectedKeys + "," + node.id
			);
		} else if (node?.treeType === TreeType.TRUSS) {
			history.push(
				Routes.TREE_LINK_TRUSS_MULTIPLE + selectedKeys + "," + node.id
			);
		} else if (node?.treeType === TreeType.PROJECT) {
			history.push(
				Routes.TREE_LINK_PROJECT_MULTIPLE + selectedKeys + "," + node.id
			);
		}
	};

	const dfs = (obj: any, targetId: string) => {
		if (obj.id === targetId) {
			return obj;
		}
		if (obj.children) {
			for (let item of obj.children) {
				let check = dfs(item, targetId);
				if (check) {
					return check;
				}
			}
		}
		return null;
	};

	const handleChange = (node: any) => {
		setSelectedKeys([...[(node as any)?.id]]);
		route(node);
	};

	const handleShiftDownChange = (node: any) => {
		setSelectedKeys([...selectedKeys, ...[(node as any)?.id]]);
		routeMultiple(node);
	};

	const handleShiftUpChange = (node: any) => {
		if (selectedKeys.includes(node.id)) {
			setSelectedKeys([...selectedKeys.filter((value) => value != node.id)]);
		} else {
			setSelectedKeys([...selectedKeys, ...[(node as any)?.id]]);
		}

		routeMultiple(node);
	};

	const getSelected = (tree: any) => {
		let result = null;
		for (let obj of tree) {
			result = dfs(obj, _.last(selectedKeys) as any);
			if (result) {
				break;
			}
		}
		return result;
	};

	const getFirstChildren = () => {
		const node = getSelected(tree);
		if (!_.isEmpty(node?.children)) {
			handleChange(_.first(node?.children));
		}
	};

	const isExpanded = () => {
		const index = _.findIndex(expandedKeys, (i) => i === _.last(selectedKeys));
		if (index > -1) {
			return true;
		}
		return false;
	};

	const up = () => {
		if (_.isEmpty(selectedKeys)) {
			handleChange(_.first(tree));
		} else {
			const node = getSelected(tree);
			if (node.previousNode) {
				handleChange(node.previousNode);
			}
		}
	};

	const shiftDown = () => {
		if (_.isEmpty(selectedKeys)) {
			handleChange(_.first(tree));
		} else {
			const node = getSelected(tree);
			handleShiftDownChange(node.nextNode);
		}
	};

	const shiftUp = () => {
		if (_.isEmpty(selectedKeys)) {
			handleChange(_.first(tree));
		} else {
			const node = getSelected(tree);
			handleShiftUpChange(node.previousNode);
		}
	};

	const down = () => {
		if (_.isEmpty(selectedKeys)) {
			handleChange(_.first(tree));
		} else if (isExpanded()) {
			getFirstChildren();
		}
		if (!isExpanded()) {
			const node = getSelected(tree);
			if (!node.nextNode && node.parent) {
				handleChange(node.parent);
			} else if (node.nextNode) {
				handleChange(node.nextNode);
			} else if (node.parentNode) {
				handleChange(_.first(getFirstNextNode(node.parentNode)));
			}
		}
	};

	const getFirstNextNode = (node: any) => {
		if (node.nextNode) {
			return node;
		} else {
			getFirstNextNode(node.parentNode);
		}
	};

	const left = () => {
		const node = getSelected(tree);
		if (
			(node.treeType === TreeType.TRUSS || node.treeType === TreeType.JOB) &&
			!isExpanded()
		) {
			handleChange(node.parent);
			return;
		}

		setExpandedKeys([
			..._.filter(expandedKeys, (i) => i != _.last(selectedKeys)),
		]);
	};

	const right = () => {
		setExpandedKeys([...expandedKeys, ...selectedKeys]);
	};

	const selectAll = () => {
		const treeType = (_.first(tree) as any)?.treeType;
		if (treeType === TreeType.CUSTOMER) return;

		const selected: string[] = [];
		tree?.forEach((node, key) => {
			selected.push(node.id);
		});
		setSelectedKeys(selected);

		if (treeType === TreeType.JOB) {
			history.push(Routes.TREE_LINK_JOB_MULTIPLE + selected);
		} else if (treeType === TreeType.TRUSS) {
			history.push(Routes.TREE_LINK_TRUSS_MULTIPLE + selected);
		} else if (treeType === TreeType.PROJECT) {
			history.push(Routes.TREE_LINK_PROJECT_MULTIPLE + selected);
		}
	};

	const keyDownHandler = (event) => {
		if (event.ctrlKey && event.code === "KeyA") {
			event.preventDefault();
		}
	};

	document.addEventListener("keydown", keyDownHandler);

	return (
		<span>
			<KeyboardEventHandler
				handleKeys={["left"]}
				onKeyEvent={(key, e) => left()}
			/>
			<KeyboardEventHandler
				handleKeys={["right"]}
				onKeyEvent={(key, e) => right()}
			/>
			<KeyboardEventHandler handleKeys={["up"]} onKeyEvent={(key, e) => up()} />
			<KeyboardEventHandler
				handleKeys={["down"]}
				onKeyEvent={(key, e) => down()}
			/>
			<KeyboardEventHandler
				handleKeys={["shift+up"]}
				onKeyEvent={(key, e) => shiftUp()}
			/>
			<KeyboardEventHandler
				handleKeys={["shift+down"]}
				onKeyEvent={(key, e) => shiftDown()}
			/>
			<KeyboardEventHandler
				handleKeys={["ctrl+a"]}
				onKeyEvent={(key, e) => selectAll()}
			/>
			<KeyboardEventHandler
				handleKeys={["ctrl+p"]}
				onKeyEvent={(key, e) => history.push(Routes.FILTER_PROJECT)}
			/>
			<KeyboardEventHandler
				handleKeys={["ctrl+n"]}
				onKeyEvent={(key, e) => history.push(Routes.PROJECT_NEW)}
			/>

			<KeyboardEventHandler
				handleKeys={["ctrl+w"]}
				onKeyEvent={(key, e) => history.push(Routes.NEW_CUSTOMER)}
			/>
			<KeyboardEventHandler
				handleKeys={["ctrl+l"]}
				onKeyEvent={(key, e) => history.push(Routes.CREATE_CUSTOMER)}
			/>
			<KeyboardEventHandler
				handleKeys={["ctrl+s"]}
				onKeyEvent={(key, e) => history.push(Routes.CUSTOMER_LIST)}
			/>
			<KeyboardEventHandler
				handleKeys={["ctrl+q"]}
				onKeyEvent={(key, e) => history.push(Routes.USERS)}
			/>
			<KeyboardEventHandler
				handleKeys={["ctrl+x"]}
				onKeyEvent={(key, e) => history.push(Routes.LINK_CREATE_USER)}
			/>
			<KeyboardEventHandler
				handleKeys={["ctrl+J"]}
				onKeyEvent={(key, e) => history.push(Routes.FILTER_JOB)}
			/>
			<KeyboardEventHandler
				handleKeys={["ctrl+t"]}
				onKeyEvent={(key, e) => history.push(Routes.FILTER_TRUSS)}
			/>
			<KeyboardEventHandler
				handleKeys={["ctrl+h"]}
				onKeyEvent={(key, e) => history.push(Routes.PRICE_LISTS_PLATES)}
			/>
			<KeyboardEventHandler
				handleKeys={["ctrl+g"]}
				onKeyEvent={(key, e) => history.push(Routes.PRICE_LISTS_CUSTOM)}
			/>
			<KeyboardEventHandler
				handleKeys={["ctrl+k"]}
				onKeyEvent={(key, e) => history.push(Routes.TEMPLATES_LINK + "Project")}
			/>
			<KeyboardEventHandler
				handleKeys={["ctrl+o"]}
				onKeyEvent={(key, e) => history.push(Routes.TEMPLATES_LINK + "Job")}
			/>
			<KeyboardEventHandler
				handleKeys={["ctrl+u"]}
				onKeyEvent={(key, e) => history.push(Routes.TEMPLATES_LINK + "Truss")}
			/>

			<KeyboardEventHandler
				handleKeys={["ctrl+d"]}
				onKeyEvent={(key, e) => history.push(Routes.SETTINGS_TRUSS)}
			/>
			<KeyboardEventHandler
				handleKeys={["ctrl+e"]}
				onKeyEvent={(key, e) => history.push(Routes.SETTINGS_ORGANIZATION)}
			/>
			<KeyboardEventHandler
				handleKeys={["ctrl+b"]}
				onKeyEvent={(key, e) => history.push(Routes.SETTINGS_ABOUT_PROGRAM)}
			/>
		</span>
	);
};
