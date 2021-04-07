import styled from 'styled-components';
import { Column } from '../../constants/globalStyles';
import { Link } from 'react-router-dom';

export const TableTitle = styled.div`
	font-size: 1.2rem;
	font-weight: 600;
	margin: 20px 0px 10px;
	> svg {
		font-size: 0.8em;
	}
`;

export const WindowWrapper = styled.div`
	display: flex;
	flex-direction: column;

	height: 100%;
`;

export const LinkPath = styled.span`
	width: 100%;
	display: block;
	padding: 5px 16px;
	text-decoration: none;
	color: ${(props) => props.theme.colors.secondaryText.default};
`;

export const NewWindow = styled.div`
	width: 100%;
	display: block;
	padding: 5px 16px;
	text-decoration: none;
	color: ${(props) => props.theme.colors.secondaryText.default};
`;

export const FullHeightExceptHeader = styled.div`
	flex: 1 1 0;

	display: flex;
	flex-direction: column;

	min-height: 0;

	background-color: ${(props) => props.theme.colors.background.content};
`;

export const ContentHeight = styled.div`
	flex: 1 1 0;

	display: flex;
	flex-direction: row;

	min-height: 0;

	> div:first-child > div {
		position: relative;
	}
`;

export const Nav = styled.div`
	flex-shrink: 0;

	padding: 0 3px;

	background-color: ${(props) => props.theme.colors.background.secondaryMenu};
`;

export const NavMenu = styled.div<{
	isOpen?: boolean;
	clicked: string;
}>`
	position: relative;
	padding: 4px 8px 5px 8px;

	${(props) =>
		props.isOpen && `background-color: ${props.theme.colors.background.menu};`}
	color: ${(props) => props.theme.colors.primaryText.default};
	font-size: 0.8rem;
	white-space: nowrap;
	display: block;

	cursor: default;

	&:hover {
		background-color: ${(props) => props.theme.colors.background.darker};
		color: ${(props) => props.theme.colors.primaryText.hover};
	}

	&:hover > div {
		width: 250px;
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.5);
		display: ${(props) => props.clicked};
	}
`;

export const NavLogout = styled.div`
	padding: 2px 8px;
	position: relative;
	cursor: pointer;
`;

export const SubMenu = styled(Column)`
	position: absolute;
	z-index: 999999999;

	display: none;

	top: 24px;
	left: 0;

	padding: 2px 0 4px;

	background-color: ${(props) => props.theme.colors.background.secondaryMenu};
`;

export const LinkColumn = styled.div`
	display: flex;
	flex-direction: row;

	margin-top: 2px;

	background-color: transparent;
	color: ${(props) => props.theme.colors.primaryText.default};

	cursor: default;

	${LinkPath}, ${LinkPath} * {
		cursor: default;
	}

	${NewWindow}, ${NewWindow} * {
		cursor: default;
	}

	&:hover {
		background-color: ${(props) => props.theme.colors.primary.default};

		${LinkPath}, ${LinkPath} * {
			color: ${(props) => props.theme.colors.secondaryText.white};
		}

		${NewWindow}, ${NewWindow} * {
			color: ${(props) => props.theme.colors.secondaryText.white};
		}
	}
`;

export const IconWrap = styled.div`
	display: inline-block;

	width: 15px;

	margin: -3px 8px -1px 0;

	text-align: center;

	svg {
		font-size: 12px;
	}
`;

export const Title = styled.span`
	color: ${(props) => props.theme.colors.primaryText.default};
`;

export const Shortcut = styled.span`
	float: right;
	margin-left: 8px;
	margin-top: 2px;
	font-size: 10px;
	color: ${(props) => props.theme.colors.secondaryText.default};
`;

export const Inline = styled.div`
	display: flex;
	flex-direction: row;
	height: calc(100% - 82px);
`;

//REPLACE TODO
export const StyledDiv = styled.div`
	background-color: transparent;
	box-shadow: none;
	color: ${(props) => props.theme.colors.primary.default};
	text-decoration: none;
	padding: 6px 12px;

	&:before {
		background-color: transparent;
	}

	&:after {
		content: "";
		position: absolute;

		right: 50%;
		bottom: 0;
		left: 50%;

		height: 1px;

		background-color: ${(props) => props.theme.colors.primary.default};
		opacity: 0.15;

		transition: all 0.1s ease-out;
	}

	&:hover {
		text-decoration: underline;
		box-shadow: none;

		&:after {
			left: 0;
			right: 0;
		}
	}

	&:active {
		background-color: rgba(0, 0, 0, 0.25);
		box-shadow: none;
	}
`;
export const SRoute = styled.div`
	background-color: transparent;
	cursor: pointer;

	box-shadow: none;
	color: ${(props) => props.theme.colors.primary.default};
	text-decoration: none;
	padding: 6px 12px;
`;
export const StyledLink = styled(Link)`
	background-color: transparent;
	box-shadow: none;
	color: ${(props) => props.theme.colors.primary.default};
	text-decoration: none;
	padding: 6px 12px;

	&:before {
		background-color: transparent;
	}

	&:after {
		content: "";
		position: absolute;

		right: 50%;
		bottom: 0;
		left: 50%;

		height: 1px;

		background-color: ${(props) => props.theme.colors.primary.default};
		opacity: 0.15;

		transition: all 0.1s ease-out;
	}

	&:hover {
		text-decoration: underline;
		box-shadow: none;

		&:after {
			left: 0;
			right: 0;
		}
	}

	&:active {
		background-color: rgba(0, 0, 0, 0.25);
		box-shadow: none;
	}
`;

export const SideMenu = styled.div`
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	text-align: center;
	flex-grow: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow-x: hidden;
`;

export const Content = styled.div`
	flex: 1 1 0;

	min-height: 0;

	background: ${(props) => props.theme.colors.background.contentSecondary};
	overflow: auto;
`;

export const ContentRow = styled.div`
	//display: flex;
	//flex-direction: row;
	flex: 1 1 0;

	min-height: 0;

	background: ${(props) => props.theme.colors.background.contentSecondary};
	overflow: auto;
`;

export const CenterImage = styled.div`
	height: 100%;

	> img {
		object-fit: contain;
		height: 100%;
		width: 100%;
	}
`;

export const MainTree = styled.div`
	display: flex;
	flex-direction: column;

	position: relative;

	height: 100%;

	background-color: ${(props) =>
		props.theme.colors.background.contentSecondary};
	padding: 0;
`;

export const MainTreeContent = styled.div`
	position: relative;

	flex: 1 1 auto;

	min-height: 0;

	form {
		position: absolute;

		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}
`;

export const TreeScreen = styled.div`
	display: flex;
	flex-direction: column;

	height: 100%;
`;

export const TreeContent = styled.div`
	flex: 1 1 auto;

	min-height: 0;
	overflow: auto;

	padding: 8px 16px;
`;

export const TreeButtonsRow = styled.div`
	flex: 0 0 auto;
	align-self: flex-end;

	display: flex;
	justify-content: flex-end;
	align-items: center;
	flex-direction: row;

	width: 100%;

	padding: 0 16px;

	border-top: 2px solid ${(props) => props.theme.colors.background.menu};
`;
