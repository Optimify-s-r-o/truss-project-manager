import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Icons } from './components/Icons';
import { TreeType } from '../../../types/_types';
import {
	faFolder,
	faHomeLgAlt,
	faMountains,
	faUser,
} from "@fortawesome/pro-duotone-svg-icons";

export const getIcon = (treeType: TreeType) => {
	if (treeType === TreeType.PROJECT)
		return (
			<FontAwesomeIcon
				icon={faFolder as IconProp}
				style={{ color: "#d08f1a" }}
			/>
		);
	else if (treeType === TreeType.JOB)
		return (
			<FontAwesomeIcon
				icon={faHomeLgAlt as IconProp}
				style={{ color: "red" }}
			/>
		);
	else if (treeType === TreeType.TRUSS)
		return (
			<FontAwesomeIcon
				icon={faMountains as IconProp}
				style={{ color: "#c1c132" }}
			/>
		);
	else if (treeType === TreeType.CUSTOMER)
		return (
			<FontAwesomeIcon icon={faUser as IconProp} style={{ color: "brown" }} />
		);
};

export const createTree = (treeData: any) => {
	return treeData?.map((layer) => {
		if (layer.children) {
			return {
				title: (
					<Icons
						status={layer.status}
						title={layer.title}
						id={layer.id}
						treeType={layer.treeType}
						lock={layer.lock}
						lockedByMe={layer.lockedByMe}
					/>
				),
				key: layer.id,
				id: layer.key,
				nextNode: layer.nextNode,
				previousNode: layer.previousNode,
				children: createTree(layer.children),
				treeType: layer.treeType,
				trussType: layer.trussType,
				jobName: layer.jobName,
				projectName: layer.projectName,
				lock: layer.lock,
				lockedByMe: layer.lockedByMe,
				customerType: layer.customerType,
				icon: getIcon(layer.treeType),
			};
		}

		return {
			title: (
				<Icons
					status={layer.status}
					title={layer.title}
					treeType={layer.treeType}
					id={layer.id}
					lock={layer.lock}
					lockedByMe={layer.lockedByMe}
				/>
			),
			key: layer.id,
			id: layer.key,
			nextNode: layer.nextNode,
			previousNode: layer.previousNode,
			icon: getIcon(layer.treeType),
			treeType: layer.treeType,
			trussType: layer.trussType,
			jobName: layer.jobName,
			projectName: layer.projectName,
			lock: layer.lock,
			lockedByMe: layer.lockedByMe,
			customerType: layer.customerType,
		};
	});
};
