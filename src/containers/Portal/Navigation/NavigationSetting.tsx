import Menu from '@material-ui/core/Menu';
import React from 'react';
import Switch from '../../../components/Optimify/Form/Switch';
import { Actions, MenuItemStyled } from '../../Home/_styles';
import { ContentSpaceBetween, End } from '../../../constants/globalStyles';
import { DividerSmall } from '../FastNavigation/_styles';
import { faLanguage, faSignOut } from '@fortawesome/pro-light-svg-icons';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getLanguage, lang } from '../../../translation/i18n';
import { HubConnection } from '@microsoft/signalr';
import { Icon } from '../../../components/Icon';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Nav, NavLogout, NavMenu as NavMenuEl } from '../_styles';
import { NavigationMenu } from './Menu';
import { Routes } from '../../../constants/routes';
import { Tooltip } from 'antd';
import { translationPath } from '../../../utils/getPath';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface NavigationSetting {
	local: boolean;
	setCloud: (data: boolean) => void;
	setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
	mode: "light" | "dark";
	connect: HubConnection;
	setActiveFilter: React.Dispatch<React.SetStateAction<boolean>>;
	selectedKeys: string[];
	setSelectedPageSize: React.Dispatch<React.SetStateAction<number>>;
	selectedPageSize: number;
	toggleTheme: () => void;
}

export const NavigationSetting = ({
	local,
	setCloud,
	setTheme,
	mode,
	connect,
	setActiveFilter,
	selectedKeys,
	setSelectedPageSize,
	selectedPageSize,
	toggleTheme,
}: NavigationSetting) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [language, setLanguage] = React.useState(getLanguage());
	const history = useHistory();
	const { t, i18n } = useTranslation();

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLanguageChange = (lng: string) => (
		_event: React.MouseEvent<HTMLLIElement, MouseEvent>
	) => {
		setLanguage(lng);
		i18n.changeLanguage(lng);
		handleClose();
	};

	const logout = (_event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		history.push(Routes.HOME);
		setCloud(true);
	};

	return (
		<Nav>
			<ContentSpaceBetween>
				<NavigationMenu
					connect={connect}
					setActiveFilter={setActiveFilter}
					selectedKeys={selectedKeys}
					selectedPageSize={selectedPageSize}
				/>
				<End>
					<Switch
						checked={mode === "dark"}
						handleChange={() => {
							toggleTheme();
						}}
						name="darkModeSwitch"
						leftLabel={<FontAwesomeIcon icon={faSun as IconProp} />}
						rightLabel={<FontAwesomeIcon icon={faMoon as IconProp} />}
					/>
					<DividerSmall />
					<Actions>
						<NavMenuEl
							aria-controls="simple-menu"
							aria-haspopup="true"
							onClick={handleClick}
							isOpen={anchorEl}
						>
							<Icon icon={faLanguage} />
							&nbsp;&nbsp;
							{language === "cs-CZ" ? "CZ" : language === "de-DE" ? "DE" : "EN"}
						</NavMenuEl>
					</Actions>
					<DividerSmall />
					<Tooltip
						title={t(translationPath(lang.common.logout).path) + " Ctrl + O"}
						placement={"bottom"}
					>
						<NavLogout onClick={logout}>
							<Icon icon={faSignOut} />
						</NavLogout>
					</Tooltip>

					<Menu
						id="simple-menu"
						anchorEl={anchorEl}
						getContentAnchorEl={null}
						anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
						transformOrigin={{ vertical: "top", horizontal: "right" }}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={handleClose}
					>
						<MenuItemStyled onClick={handleLanguageChange("cs-CZ")}>
							{t(translationPath(lang.common.czech).path)}
						</MenuItemStyled>
						<MenuItemStyled onClick={handleLanguageChange("en-GB")}>
							{t(translationPath(lang.common.english).path)}
						</MenuItemStyled>
						<MenuItemStyled onClick={handleLanguageChange("de-DE")}>
							{t(translationPath(lang.common.german).path)}
						</MenuItemStyled>
					</Menu>
				</End>
			</ContentSpaceBetween>
		</Nav>
	);
};
