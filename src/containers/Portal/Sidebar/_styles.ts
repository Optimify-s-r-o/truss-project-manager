import Apps from '@material-ui/icons/Apps';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import styled, { keyframes } from 'styled-components';
import { ContentSpaceBetween } from '../../../constants/globalStyles';
import { Link } from 'react-router-dom';
import { Popconfirm, Tree } from 'antd';

const { DirectoryTree } = Tree;

export const SSpan = styled.span`
	display: flex;
	white-space: normal;
	overflow: hidden;
	text-overflow: ellipsis;
	width: 100%;
	height: 24px;

	align-items: flex-start;

	.react-contextmenu-wrapper {
		display: flex;
		align-items: flex-start;
		width: 100%;
	}
`;

export const Menu = styled(ContentSpaceBetween)`
	padding: 5px 9px;
	border-bottom: 1px solid ${(props) => props.theme.colors.background.menu};
	min-height: 30px;
`;

export const IconGroup = styled.div`
	display: flex;
	justify-content: space-between;
`;

export const Bar = styled.div<{
	isFilterActive?: boolean;
}>`
	border-right: 1px solid
		${(props) => props.theme.colors.background.secondaryMenu};
	background-color: ${(props) => props.theme.colors.background.content};
	overflow-y: auto;
	overflow-x: hidden;
	border: ${(props) => (props.isFilterActive ? `1 px solid green` : `0`)};
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	z-index: 2;

	ul {
		flex: 1 1 auto;
	}

	.ant-tree {
		background: transparent;
		color: ${(props) => props.theme.colors.primaryText.default};
		font-size: 1rem;
	}

	.ant-tree-title {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		height: 100%;
		width: 100%;
	}

	.ant-tree-node-content-wrapper {
		display: flex;
		flex-direction: row;
		align-items: center;

		height: 100%;
		width: 100%;
	}

	.ant-tree-treenode:not(.ant-tree-treenode-selected):hover::before {
		background-color: ${(props) =>
			props.theme.colors.background.secondaryMenu} !important;
	}

	.ant-tree
		.ant-tree-treenode:not(.ant-tree-treenode-selected):not(:hover)
		.ant-tree-node-content-wrapper
		.ant-tree-iconEle {
		transition: background-color 0.3s ease;
		background: ${(props) => props.theme.colors.background.content} !important;
	}

	.ant-tree
		.ant-tree-treenode
		.ant-tree-node-content-wrapper
		.ant-tree-iconEle {
		display: inline-block;
		width: 24px;
		height: 24px;
		line-height: 24px;
		text-align: center;
		vertical-align: middle;
	}

	.ant-tree-treenode:not(.ant-tree-treenode-selected):hover {
		background-color: ${(props) =>
			props.theme.colors.background.secondaryMenu} !important;
		.ant-tree-iconEle {
			background-color: ${(props) =>
				props.theme.colors.background.secondaryMenu} !important;
		}
	}

	.ant-tree .ant-tree-treenode-selected .ant-tree-iconEle {
		display: inline-block;
		background: ${(props) => props.theme.colors.primary.default};
		width: 24px;
		height: 24px;
		line-height: 24px;
		text-align: center;
		vertical-align: middle;
	}

	.ant-tree-switcher-line-icon,
	.ant-tree-switcher-line-icon svg {
		background: ${(props) => props.theme.colors.background.content} !important;
		color: #6d6d6df2;
	}

	.ant-tree-switcher-leaf-line:before,
	.ant-tree-switcher-leaf-line:after {
		border-color: #6d6d6df2;
	}

	.ant-tree-treenode-selected .ant-tree-switcher-leaf-line:before,
	.ant-tree-treenode-selected .ant-tree-switcher-leaf-line:after {
		border-color: rgba(255, 255, 255, 0.75);
	}
`;

export const ActiveFilter = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;

	padding: 8px 16px;

	background: ${(props) => props.theme.colors.background.primary.hover};
	border-top: 1px solid
		${(props) => props.theme.colors.background.primary.active};
	color: ${(props) => props.theme.colors.primary.default};
	font-size: 0.75rem;

	> *:first-child {
		flex-grow: 1;

		margin-right: 8px;

		text-align: left;
	}

	svg {
		color: red;
		font-size: 1rem;

		cursor: pointer;

		transition: 0.2s ease-out;
	}
`;

export const SidebarMenuAction = styled.span`
	display: inline-block;
	margin: 0 4px;
	padding: 4px;
	cursor: pointer;

	svg {
		color: ${(props) => props.theme.colors.secondaryText.default};
		font-size: 16px;
		transition: all 0.2s ease-out;
	}

	&:hover svg {
		color: ${(props) => props.theme.colors.primary.default};
	}
`;

export const fadeInOpacity = keyframes`
  0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
`;

export const Ul = styled.ul<{ show?: boolean }>`
	display: ${(props) => (props.show ? "block" : "none")};
	margin-left: ${(props) => (props.show ? "0" : "15px")};
	animation-name: ${fadeInOpacity};
	animation-iteration-count: 1;
	animation-timing-function: ease-in;
	animation-duration: 0.5s;

	&.has-parent {
		margin-left: 15px;
	}

	&.cluster {
		display: block;
	}
`;

export const Li = styled.li`
	position: relative;

	> div > .visibleOnHover {
		opacity: 0;
		transition: all 0.2s ease-in-out;
	}

	& > div:hover {
		> .visibleOnHover {
			opacity: 1;
		}
	}
`;

export const TreeRow = styled.div`
	display: flex;
	flex-direction: row;

	width: 100%;

	> *:first-child {
		/* type icon */
		flex-shrink: 0;
	}

	> *:nth-child(2) {
		display: block;

		flex-shrink: 1;
		min-width: 0;

		text-align: left;

		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	> *:last-child {
		/* status icon */
		flex-shrink: 0;
	}
`;

export const StyledDiv = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: row;

	width: 100%;

	margin-right: 8px;
	padding: 4px;

	color: ${(props) => props.theme.colors.primary.default};
	font-size: 0.9rem;
	text-decoration: none;
	cursor: pointer;

	transition: all 0.2s ease-in-out;

	&:hover {
		text-decoration: underline;
	}
`;

export const CustomerRow = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: row;

	width: 100%;

	margin-right: 8px;
	padding: 4px;

	color: ${(props) => props.theme.colors.primaryText.default};
	font-size: 0.9rem;
	text-decoration: none;

	transition: all 0.2s ease-in-out;

	${TreeRow} > svg {
		margin-right: 8px;
		color: ${(props) => props.theme.colors.secondaryText.default};
		font-size: 16px;
		transition: all 0.2s ease-in-out;
	}

	.hoveredColor {
		color: ${(props) => props.theme.colors.primaryText.hover};
		transition: all 0.2s ease-in-out;
	}
	&:hover {
		color: ${(props) => props.theme.colors.primaryText.hover};

		.hoveredColor,
		${TreeRow} > svg {
			color: ${(props) => props.theme.colors.primary.default};
		}
	}
`;

export const StyledLink = styled(Link)`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: row;

	width: 100%;

	margin-right: 8px;
	padding: 4px;

	color: ${(props) => props.theme.colors.primaryText.default};
	font-size: 0.9rem;
	text-decoration: none;

	transition: all 0.2s ease-in-out;

	${TreeRow} > svg {
		margin-right: 8px;
		color: ${(props) => props.theme.colors.secondaryText.default};
		font-size: 16px;
		transition: all 0.2s ease-in-out;
	}

	.hoveredColor {
		color: ${(props) => props.theme.colors.primaryText.hover};
		transition: all 0.2s ease-in-out;
	}
	&:hover {
		color: ${(props) => props.theme.colors.primaryText.hover};

		.hoveredColor,
		${TreeRow} > svg {
			color: ${(props) => props.theme.colors.primary.default};
		}
	}
`;

export const Text = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: row;

	margin-left: 26px;
	padding: 0 8px 0 0;

	transition: all 0.2s ease-in-out;

	&:hover span {
		display: block;
	}
`;

export const AppsStyled = styled(Apps)`
	padding: 2px;
	height: 1rem !important;
`;

export const AddStyled = styled(KeyboardArrowRightIcon)<{ navigation: any }>`
	display: ${(props) => (props.navigation ? "block" : "none")} !important;

	position: absolute;

	top: 5px;
	left: 0;

	height: 1rem !important;

	color: ${(props) => props.theme.colors.forms.labelBorder};
	cursor: pointer;

	transition: all 0.2s ease-in-out !important;

	&:hover {
		color: ${(props) => props.theme.colors.primary.default};
	}

	&.open {
		transform: rotate(90deg);
	}
`;

export const ContentRow = styled(ContentSpaceBetween)`
	width: 100%;
`;

export const Divider = styled.div`
	height: 1px;
	width: 100%;
	border: 0.5px solid ${(props) => props.theme.colors.background.darker};
	align-self: center;
`;

export const Item = styled.a`
	padding: 5px 10px;
	color: black !important;
	background-color: "red";
	display: flex;
	flex-direction: row;
	width: 100%;
	height: 100%;
	cursor: pointer;
	transition: all 0.5s ease-in-out !important;
	background-color: ${(props) => props.theme.colors.forms.slider};

	&:hover {
		background-color: ${(props) => props.theme.colors.sectionsDivider};
		> svg {
			color: #ff0000 !important;
		}
	}

	> div > svg {
		padding-bottom: 2px !important;
		font-size: 15px;
	}

	> span {
		font-size: 0.85em;
		cursor: pointer;
	}
`;

export const StatusWrapper = styled.span`
	> svg:nth-child(2) {
		margin-left: 4px;
	}

	svg {
		color: ${(props) => props.theme.colors.status[props.color]};
	}
`;

export const SDirectoryTree = styled(DirectoryTree)`
	padding-top: 7px;
	z-index: 999;
`;

export const ContextMenu = styled.div<{ show: boolean; x: number; y: number }>`
	position: absolute;
	left: ${(props) => props.x - 60 + "px"};
	top: ${(props) => props.y - 60 + "px"};

	display: ${(props) => (props.show ? "flex" : "none")};
	justify-content: center;
	align-items: flex-start;
	flex-direction: column;

	width: 210px;
	border: 1px solid ${(props) => props.theme.colors.border.context};
	background-color: ${(props) => props.theme.colors.primary.hover};

	z-index: 999;

	transition: all 0.5s ease-in-out !important;
`;

export const SPopConfirm = styled(Popconfirm)`
	.ant-btn-primary {
		background: #17785e;
		border-color: #17785e;
	}
`;

export const ContextColumn = styled.div`
	position: relative;
	display: "flex";
	justify-content: flex-start;
	align-items: flex-start;
	flex-direction: column;
`;

export const ContextItem = styled.div`
	display: "flex";
	justify-content: flex-start;
	align-items: flex-start;
	flex-direction: row;
	width: 100%;
	min-height: 2em;
	cursor: pointer;

	&:hover {
		background-color: #f1f1f1;
		div > div > svg {
			color: #17785e !important;
		}
	}
`;

export const Active = styled.span`
	margin-bottom: 4px;
	color: ${(props) => props.theme.colors.secondaryText.text};
`;

export const ActiveFilterSpan = styled.span`
	color: ${(props) => props.theme.colors.secondaryText.text};
`;
