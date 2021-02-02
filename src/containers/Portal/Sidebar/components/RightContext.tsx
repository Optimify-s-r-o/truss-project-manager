import Icon from '../../../../components/Icon';
import React from 'react';
import {
	ContextMenu,
	Divider,
	Item,
	SPopConfirm
	} from '../_styles';
import { DeleteJob, Unlock } from '../../TreeView/Job/_types';
import { DeleteProject } from '../../Project/_types';
import { IconWrap, Title } from '../../_styles';
import { lang } from '../../../../translation/i18n';
import { OpenTruss } from '../../../../sagas/Truss/_actions';
import { Routes } from '../../../../constants/routes';
import { translationPath } from '../../../../utils/getPath';
import { TreeType, TrussExe } from '../../../../types/_types';
import { unlockJobAction } from 'src/sagas/Fetch/actions';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
	faEdit,
	faFolderOpen,
	faLockOpenAlt,
	faPlusSquare,
	faTrashAlt,
	faVoteNay,
	faVoteYea,
} from "@fortawesome/pro-duotone-svg-icons";
import {
	deleteJobRoute,
	deleteProjectRoute,
} from "../../../../sagas/Fetch/actions";
interface IRightContext {
	isVisible: boolean;
	x: number;
	y: number;
	ref: any;
	nodeType: TreeType;
	setSelectedKeys: (data: string[]) => void;
	unlockJob: (data: Unlock) => void;
	projectName: string;
	jobName: string;
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
	nodeId: string;
	trussType: any;
	truss3DExe: string;
	truss2DExe: string;
	removeJob: (data: DeleteJob) => void;
	createTruss: (data: OpenTruss) => void;
	editTruss: (data: OpenTruss) => void;
	removeProject: (data: DeleteProject) => void;
	jobLocked: boolean;
	jobLockedByMe: boolean;
	removeFromSelection: (data: string) => void;
	addToSelection: (data: string) => void;
	selectedKeys: string[];
}

export const RightContext = ({
	isVisible,
	x,
	y,
	ref,
	nodeType,
	setSelectedKeys,
	unlockJob,
	projectName,
	jobName,
	setIsVisible,
	nodeId,
	trussType,
	truss3DExe,
	truss2DExe,
	removeJob,
	createTruss,
	editTruss,
	removeProject,
	jobLockedByMe,
	jobLocked,
	removeFromSelection,
	addToSelection,
	selectedKeys,
}: IRightContext) => {
	const history = useHistory();
	const { t } = useTranslation();
	const openCall = (key: any, path: any) => (
		_event: React.MouseEvent<HTMLElement, MouseEvent>
	) => {
		history.push(path + key);
		setSelectedKeys([key]);
		setIsVisible(false);
	};

	const unlock = () => {
		unlockJob(unlockJobAction(projectName, jobName));
		setIsVisible(false);
	};

	const newProjectJob = (pId: string, trussExe: any, pName: string) => (
		_event: React.MouseEvent<HTMLElement, MouseEvent>
	) => {
		setIsVisible(false);
		createTruss({
			projectId: pId,
			jobName: pName,
			trussExe: trussExe === TrussExe.TRUSS_3D ? truss3DExe : truss2DExe,
			fileType: trussExe,
		});
	};

	const openEditTruss = (
		id: string,
		trussExe: any,
		pName: string,
		jName: string
	) => (_event: React.MouseEvent<HTMLElement, MouseEvent>) => {
		history.push(Routes.TREE_LINK_JOB + id);
		setSelectedKeys([id]);
		setIsVisible(false);
		editTruss({
			jobId: id,
			trussExe: trussExe === TrussExe.TRUSS_3D ? truss3DExe : truss2DExe,
			fileType: trussExe,
			projectName: pName,
			jobName: jName,
		});
	};

	const removeJobCall = (id: string) => (
		_event: React.MouseEvent<HTMLElement, MouseEvent>
	) => {
		removeJob(deleteJobRoute(id));
		setIsVisible(false);
	};

	const removeProjectCall = (id: string) => (
		_event: React.MouseEvent<HTMLElement, MouseEvent>
	) => {
		removeProject(deleteProjectRoute(id, nodeType));
		setIsVisible(false);
	};

	return (
		<>
			{isVisible && nodeType != "Customer" && (
				<ContextMenu show={isVisible} x={x} y={y} ref={ref}>
					{nodeType == "Project" && (
						<>
							<Item onClick={openCall(nodeId, Routes.TREE_LINK_PROJECT)}>
								<IconWrap>
									<Icon icon={faFolderOpen} />
								</IconWrap>
								<Title>
									{t(translationPath(lang.contextMenu.openProject).path)}
								</Title>
							</Item>
							{/* <Item
								onClick={newProjectJob(nodeId, TrussExe.TRUSS_2D, projectName)}
							>
								<IconWrap>
									<Icon icon={faPlusSquare} />
								</IconWrap>
								<Title>
									{t(translationPath(lang.contextMenu.newTruss2DJob).path)}
								</Title>
							</Item> */}

							<Item
								onClick={newProjectJob(nodeId, TrussExe.TRUSS_3D, projectName)}
							>
								<IconWrap>
									<Icon icon={faPlusSquare} />
								</IconWrap>
								<Title>
									{t(translationPath(lang.contextMenu.newTruss3DJob).path)}
								</Title>
							</Item>
							<ActiveSelection
								id={nodeId}
								removeFromSelection={removeFromSelection}
								addToSelection={addToSelection}
								add={t(translationPath(lang.contextMenu.addToSelection).path)}
								remove={t(
									translationPath(lang.contextMenu.removeFromSelection).path
								)}
								selectedKeys={selectedKeys}
							/>
							<Divider />
							<SPopConfirm
								id={"popConfirmId"}
								title={t(translationPath(lang.remove.project).path, {
									name: projectName,
								})}
								onConfirm={removeProjectCall(nodeId)}
								onCancel={() => setIsVisible(false)}
								okText={t(translationPath(lang.common.yes).path)}
								cancelText={t(translationPath(lang.common.no).path)}
								placement="left"
							>
								<Item>
									<IconWrap>
										<Icon icon={faTrashAlt} />
									</IconWrap>
									<Title>
										{t(translationPath(lang.contextMenu.deleteProject).path)}
									</Title>
								</Item>
							</SPopConfirm>
						</>
					)}
					{nodeType == "Job" && (
						<>
							<Item onClick={openCall(nodeId, Routes.TREE_LINK_JOB)}>
								<IconWrap>
									<Icon icon={faFolderOpen} />
								</IconWrap>
								<Title>
									{t(translationPath(lang.contextMenu.openJob).path)}
								</Title>
							</Item>
							{jobLocked &&
								(jobLockedByMe ? (
									<Item onClick={unlock}>
										<IconWrap>
											<Icon icon={faLockOpenAlt} />
										</IconWrap>
										<Title>
											{t(translationPath(lang.contextMenu.unlockJob).path)}
										</Title>
									</Item>
								) : (
									<SPopConfirm
										id={"popConfirmId"}
										title={t(translationPath(lang.common.unlock).path)}
										onConfirm={unlock}
										onCancel={() => setIsVisible(false)}
										okText={t(translationPath(lang.common.yes).path)}
										cancelText={t(translationPath(lang.common.no).path)}
										placement="left"
									>
										<Item>
											<IconWrap>
												<Icon icon={faLockOpenAlt} />
											</IconWrap>
											<Title>
												{t(translationPath(lang.contextMenu.unlockJob).path)}
											</Title>
										</Item>
									</SPopConfirm>
								))}
							<Item
								onClick={openEditTruss(nodeId, trussType, projectName, jobName)}
							>
								<IconWrap>
									<Icon icon={faEdit} />
								</IconWrap>
								<Title>
									{t(translationPath(lang.contextMenu.openJobInTruss).path)}
								</Title>
							</Item>
							<ActiveSelection
								id={nodeId}
								removeFromSelection={removeFromSelection}
								addToSelection={addToSelection}
								add={t(translationPath(lang.contextMenu.addToSelection).path)}
								remove={t(
									translationPath(lang.contextMenu.removeFromSelection).path
								)}
								selectedKeys={selectedKeys}
							/>
							<Divider />
							<SPopConfirm
								id={"popConfirmId"}
								title={t(translationPath(lang.remove.job).path, {
									name: jobName,
								})}
								onConfirm={removeJobCall(nodeId)}
								onCancel={() => setIsVisible(false)}
								// onVisibleChange={handleClickOutside}
								okText={t(translationPath(lang.common.yes).path)}
								cancelText={t(translationPath(lang.common.no).path)}
								placement="left"
							>
								<Item>
									<IconWrap>
										<Icon icon={faTrashAlt} />
									</IconWrap>
									<Title>
										{t(translationPath(lang.contextMenu.deleteJob).path)}
									</Title>
								</Item>
							</SPopConfirm>
						</>
					)}
					{nodeType == "Truss" && (
						<>
							<Item onClick={openCall(nodeId, Routes.TREE_LINK_TRUSS)}>
								<IconWrap>
									<Icon icon={faFolderOpen} />
								</IconWrap>
								<Title>
									{t(translationPath(lang.contextMenu.openTruss).path)}
								</Title>
							</Item>
							<ActiveSelection
								id={nodeId}
								removeFromSelection={removeFromSelection}
								addToSelection={addToSelection}
								add={t(translationPath(lang.contextMenu.addToSelection).path)}
								remove={t(
									translationPath(lang.contextMenu.removeFromSelection).path
								)}
								selectedKeys={selectedKeys}
							/>
						</>
					)}
				</ContextMenu>
			)}
		</>
	);
};

export const ActiveSelection = ({
	id,
	addToSelection,
	removeFromSelection,
	add,
	remove,
	selectedKeys,
}) => {
	const handleAdd = () => {
		if (selectedKeys.includes(id)) {
			addToSelection(selectedKeys.join(","));
			return;
		}
		addToSelection(id);
	};

	const handleRemove = () => {
		if (selectedKeys.includes(id)) {
			removeFromSelection(selectedKeys.join(","));
			return;
		}
		removeFromSelection(id);
	};
	return (
		<>
			<Divider />
			<Item onClick={handleRemove}>
				<IconWrap>
					<Icon icon={faVoteNay} />
				</IconWrap>
				<Title>{remove}</Title>
			</Item>
			<Item onClick={handleAdd}>
				<IconWrap>
					<Icon icon={faVoteYea} />
				</IconWrap>

				<Title>{add}</Title>
			</Item>
		</>
	);
};
