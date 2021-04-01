import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Hub } from '../../../constants/hub';
import { HubConnection } from '@microsoft/signalr';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { lang } from '../../../translation/i18n';
import { Routes } from '../../../constants/routes';
import { translationPath } from '../../../utils/getPath';
import { TreeType } from '../../../types/_types';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import {
	faBookUser,
	faBrowser,
	faBuilding,
	faClipboardList,
	faCog,
	faFolder,
	faFolderPlus,
	faFolderTree,
	faHomeLgAlt,
	faLayerGroup,
	faMountains,
	faSuitcase,
	faUserPlus,
	faUsers,
} from "@fortawesome/pro-duotone-svg-icons";
import {
	IconWrap,
	Inline,
	LinkColumn,
	LinkPath,
	NavMenu,
	Shortcut,
	SubMenu,
	Title,
} from "../_styles";

interface INavigationMenu {
	connect: HubConnection;
	setActiveFilter: React.Dispatch<React.SetStateAction<boolean>>;
	selectedKeys: string[];
	selectedPageSize: number;
}

interface Menu {
	menu: string;
	path?: Routes;
	submenu?: Submenu[];
}

interface Submenu {
	path: Routes | string;
	text: string;
	icon: any;
	shortcut: string;
	newWindow?: boolean;
	invokeHub?: TreeType;
	color: string;
}

export const NavigationMenu = ({
	connect,
	setActiveFilter,
	selectedKeys,
	selectedPageSize,
}: INavigationMenu) => {
	const { t } = useTranslation();
	const [clicked, setClicked] = React.useState(false);
	const history = useHistory();
	const handleChange = (path: Routes) => (event: any) => {
		if (path) {
			history.push(path);
			return;
		}
		setClicked(!clicked);
	};

	const invokeTreeHub = async (tree: TreeType) => {
		try {
			if (selectedKeys.length > 0) {
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

	const handleSubChange = (hub: TreeType, path: Routes | string) => (
		event: any
	) => {
		history.push(path);
		if (hub) {
			invokeTreeHub(hub);
		}
	};

	const menuList: Menu[] = [
		{
			menu: t(translationPath(lang.common.projects).path),
			submenu: [
				{
					path: Routes.PROJECT_NEW,
					text: t(translationPath(lang.common.newProject).path),
					icon: faFolderPlus,
					shortcut: "Ctrl + N",
					color: "blue",
				},
				{
					path: Routes.FILTER_PROJECT,
					text: t(translationPath(lang.common.projectList).path),
					invokeHub: TreeType.PROJECT,
					icon: faFolderTree,
					shortcut: "Ctrl + P",
					color: "rgb(150, 45, 147)",
				},
				{
					path: Routes.FILTER_JOB,
					text: t(translationPath(lang.common.jobList).path),
					invokeHub: TreeType.JOB,
					icon: faHomeLgAlt,
					shortcut: "Ctrl + J",
					color: "red",
				},
				{
					path: Routes.FILTER_TRUSS,
					text: t(translationPath(lang.common.trussList).path),
					invokeHub: TreeType.TRUSS,
					icon: faMountains,
					shortcut: "Ctrl + T",
					color: "#c1c132",
				},
			],
		},
		{
			menu: t(translationPath(lang.common.customers).path),
			submenu: [
				{
					path: Routes.CREATE_CUSTOMER,
					text: t(translationPath(lang.common.newCustomer).path),
					icon: faSuitcase,
					shortcut: "Ctrl + L",
					color: "#bb9e00",
				},
				{
					path: Routes.CUSTOMER_ALL,
					text: t(translationPath(lang.common.customersList).path),
					invokeHub: TreeType.CUSTOMER,
					icon: faBookUser,
					shortcut: "Ctrl + S",
					color: "brown",
				},
			],
		},
		{
			menu: t(translationPath(lang.templates.templates).path),
			submenu: [
				{
					path: Routes.TEMPLATES_LINK + "Project",
					text: t(translationPath(lang.templates.project).path),
					icon: faFolder,
					shortcut: "Ctrl + K",
					color: "rgb(208, 143, 26)",
				},
				{
					path: Routes.TEMPLATES_LINK + "Job",
					text: t(translationPath(lang.templates.job).path),
					icon: faHomeLgAlt,
					shortcut: "Ctrl + O",
					color: "red",
				},
				{
					path: Routes.TEMPLATES_LINK + "Truss",
					text: t(translationPath(lang.templates.truss).path),
					icon: faMountains,
					shortcut: "Ctrl + U",
					color: "rgb(193, 193, 50)",
				},
			],
		},
		{
			menu: t(translationPath(lang.priceLists.menuTitle).path),
			submenu: [
				{
					path: Routes.PRICE_LISTS_PLATES,
					text: t(translationPath(lang.priceLists.plates).path),
					icon: faLayerGroup,
					shortcut: "Ctrl + H",
					color: "brown",
				},
				{
					path: Routes.PRICE_LISTS_CUSTOM,
					text: t(translationPath(lang.priceLists.custom).path),
					icon: faClipboardList,
					shortcut: "Ctrl + G",
					color: "purple",
				},
			],
		},
		{
			menu: t(translationPath(lang.common.accounts).path),
			submenu: [
				{
					path: Routes.LINK_CREATE_USER,
					text: t(translationPath(lang.common.addAccount).path),
					icon: faUserPlus,
					shortcut: "Ctrl + X",
					color: "green",
				},
				{
					path: Routes.USERS,
					text: t(translationPath(lang.common.accountsList).path),
					icon: faUsers,
					shortcut: "Ctrl + Q",
					color: "salmon",
				},
			],
		},
		{
			menu: t(translationPath(lang.common.settings).path),
			submenu: [
				{
					path: Routes.SETTINGS_TRUSS,
					text: t(translationPath(lang.settings.system).path),
					icon: faCog,
					shortcut: "Ctrl + D",
					color: "black",
				},
				{
					path: Routes.SETTINGS_ORGANIZATION,
					text: t(translationPath(lang.organization.title).path),
					icon: faBuilding,
					shortcut: "Ctrl + E",
					color: "olive",
				},
				{
					path: Routes.SETTINGS_ABOUT_PROGRAM,
					text: t(translationPath(lang.settings.aboutProgram).path),
					icon: faBrowser,
					shortcut: "Ctrl + B",
					color: "teal",
				},
			],
		},
	];

	return (
		<Inline>
			{menuList.map((value: Menu, key: number) => {
				return (
					<NavMenu
						key={key}
						clicked={clicked ? "block" : "none"}
						onClick={handleChange(value.path)}
					>
						{value.menu}
						{value.submenu && (
							<SubMenu>
								{value?.submenu?.map((sub: Submenu, index: number) => (
									<LinkColumn key={index}>
										<LinkPath
											onClick={handleSubChange(sub.invokeHub, sub.path)}
										>
											<IconWrap>
												<div>
													<FontAwesomeIcon
														icon={sub.icon as IconProp}
														style={{ fontSize: 12, color: sub.color }}
													/>
												</div>
											</IconWrap>
											<Title>{sub.text}</Title>
											<Shortcut>{sub.shortcut}</Shortcut>
										</LinkPath>
									</LinkColumn>
								))}
							</SubMenu>
						)}
					</NavMenu>
				);
			})}
		</Inline>
	);
};
