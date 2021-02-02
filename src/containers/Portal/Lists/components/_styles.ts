import styled from 'styled-components';
import { BaseInlineInputWrapper } from '../../../../components/Optimify/Form/BaseInput';
import { device } from '../../../../constants/theme';
import { Link } from 'react-router-dom';
import { OutlinedButton } from '../../../../components/Optimify/Button';
import {
	ButtonsRow,
	ContentSpaceBetween,
	Fixed,
	Form,
} from "../../../../constants/globalStyles";

export const Grow = styled.div``;

export const Sidebar = styled.div`
	height: 100%;
	overflow-y: auto;
	background-color: ${(props) => props.theme.colors.background.content};

	${Form} {
		display: flex;
		flex-direction: column;
		color: ${(props) => props.theme.colors.primaryText.default};
		${Fixed} ${ButtonsRow} {
			margin-top: 0;
		}
	}
`;

export const FilterTitle = styled.div`
	color: ${(props) => props.theme.colors.primary.active};
	font-weight: 400;
	font-size: 0.9rem;
	margin-bottom: 3px;
	width: 100%;
`;

export const DateRangeTitle = styled.div`
	color: ${(props) => props.theme.colors.primary.active};
	font-weight: 400;
	font-size: 0.9rem;
	width: 100%;
`;

export const SpaceBetweenFullWidth = styled(ContentSpaceBetween)`
	width: 100%;
`;

export const BorderAround = styled.div`
	display: inline-block;

	border: 1px solid ${(props) => props.theme.colors.forms.border};
	border-radius: 3px;

	overflow: hidden;

	> .DateRangePicker {
		margin-bottom: 0;
	}
`;

export const DateRange = styled.div`
	font-size: 0.9rem;

	button {
		font-size: 0.8rem !important;
		margin: 0 !important;
	}

	${BorderAround} {
		margin-top: 8px;
	}
`;

export const LinkPath = styled(Link)`
	position: relative;

	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;

	padding: 16px;

	box-sizing: border-box;
	color: ${(props) =>
		props.active
			? props.theme.colors.primary.hover
			: props.theme.colors.secondaryText.default};
	font-size: 0.85rem;
	font-weight: ${(props) => (props.active ? 600 : 400)};
	text-align: center;
	text-decoration: none;
	text-transform: uppercase;

	&:after {
		content: "";

		position: absolute;

		height: 2px;

		right: ${(props) => (props.active ? "0" : "100%")};
		bottom: 0;
		left: 0;

		background-color: ${(props) => props.theme.colors.primary.default};

		transition: all 0.2s ease-out;
	}

	&:hover:after {
		right: 0;
	}

	svg {
		margin: -4px 8px;

		font-size: 1.5rem;

		color: ${(props) =>
			props.active
				? props.theme.colors.primary.defaultHover
				: props.theme.colors.secondaryText.default};
	}

	&:not(:first-child) {
		margin-left: 1px;
	}
`;

export const NavigationRow = styled.div`
	display: flex;
	flex-direction: row;
	align-items: stretch;

	${LinkPath} {
		width: calc(${(props) => 100 / props.children.length}% - 1px);
	}

	@media ${device.extraLarge} {
		${LinkPath} {
			font-size: 0.75rem;

			svg {
				margin: -4px 8px -1px;

				font-size: 1rem;
			}
		}
	}

	@media ${device.large} {
		${LinkPath} {
			font-size: 0.5rem;

			svg {
				margin: -4px 8px 0;

				font-size: 0.75rem;
			}
		}
	}
`;

export const FilterSectionWrapper = styled.div`
	border-bottom: 1px solid ${(props) => props.theme.colors.sectionsDivider};
`;

export const FilterHeader = styled.div`
	box-sizing: border-box;

	padding: 12px 6px;

	display: flex;
	flex-direction: row;
	justify-content: space-between;

	&:hover {
		cursor: pointer;
		background-color: ${(props) => props.theme.colors.background.primary.hover};
	}
`;

export const FilterHeaderText = styled.h3`
	margin: 0;

	color: ${(props) => props.theme.colors.primary.default};
	font-size: 0.9rem;
	font-weight: 600;

	@media ${device.large} {
		font-size: 0.8rem;
	}

	@media ${device.medium} {
		font-size: 0.8rem;
	}
`;

export const FilterHeaderIcon = styled.span`
	display: inline-block;

	margin-left: 8px;

	${(props) => (props.isOpen ? "transform: rotate(180deg)" : "")};

	transition: transform 0.2s ease-out;
`;

export const FilterContent = styled.div`
	padding: 10px 9px;

	border-top: 1px solid
		${(props) => props.theme.colors.background.secondaryMenu};
`;

export const FilterContentSection = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
	width: 100%;

	& + & {
		margin-top: 24px;
	}

	& > *:not(:first-child) {
		margin-left: 8px;
		width: calc(100% - 8px);

		${BaseInlineInputWrapper} {
			margin: 4px 0;
		}
	}
`;

export const FilterCustomerContentSection = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
	width: 100%;

	& + & {
		margin-top: 24px;
	}
`;

export const ColumnSelectorWrapper = styled.div`
	position: relative;
`;

export const ColumnSelectorButton = styled(OutlinedButton)`
	background-color: ${(props) =>
		props.open ? props.theme.colors.primary.default : "transparent"};
	color: ${(props) =>
		props.open
			? props.theme.colors.background.content
			: props.theme.colors.primary.default};
`;

export const ColumnSelectorCheckboxes = styled.div`
	position: absolute;
	z-index: 999999;

	right: 0;

	max-height: 420px;

	display: ${(props) => (props.visible ? "block" : "none")};

	background-color: ${(props) => props.theme.colors.background.content};
	border-radius: 3px;
	box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.1);

	overflow: auto;

	> div {
		white-space: nowrap;

		&:not(:last-child) {
			border-bottom: 1px solid ${(props) => props.theme.colors.sectionsDivider};
		}
	}
`;

export const ColumnSelectorHeader = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;

	padding: 8px 12px;

	color: ${(props) => props.theme.colors.primary.default};
	font-size: 0.9rem;
	font-weight: 600;

	cursor: pointer;

	svg {
		margin-left: 8px;

		color: ${(props) => props.theme.colors.primary.default};

		transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0deg)")};
		transition: 0.2s ease-out;
	}

	&:hover {
		background-color: ${(props) => props.theme.colors.background.primary.hover};
	}
`;

export const ColumnSelectorContent = styled.div`
	padding: 8px 24px;

	border-top: 1px solid ${(props) => props.theme.colors.background.menu};
`;

export const FilterTree = styled.div`
	padding: 16px 16px 0;
`;

export const AbsoluteRange = styled.div`
	position: absolute;
	left: 20%;
	top: 20%;
`;

export const ColumnSelectorActive = styled.div`
	margin: 0 5px 0 0;
	padding: 2px 4px;
	background: ${(props) =>
		props.isActive
			? props.theme.colors.primary.default
			: props.theme.colors.background.secondaryMenu};
	border-radius: 5px;
	color: ${(props) =>
		props.isActive
			? props.theme.colors.background.content
			: props.theme.colors.secondaryText.default};
	font-size: 0.625rem;
	font-weight: 600;

	transition: all 0.2s ease-out;
`;
