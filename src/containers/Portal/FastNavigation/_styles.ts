import styled from 'styled-components';
import { ContentSpaceBetween } from '../../../constants/globalStyles';
import { Link } from 'react-router-dom';

export const Header = styled(ContentSpaceBetween)`
	flex-shrink: 0;
	background: ${(props) => props.theme.colors.background.menu};
	color: ${(props) => props.theme.colors.primaryText.default};
`;

export const Start = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: row;
	min-width: 600px;

	padding: 1px 5px;
`;

export const LinkDiv = styled.div`
	padding: 0px 5px;
	margin: 0 2px;
	text-decoration: none;
	color: black;
	cursor: pointer;
`;

export const LinkIcon = styled(Link)`
	padding: 0px 5px;
	margin: 0 2px;
	text-decoration: none;
	color: black;
`;

export const LinkSpanIcon = styled.span`
	padding: 0px 5px;
	margin: 0 2px;
	text-decoration: none;
	color: black;
	cursor: pointer;
`;

export const InputElement = styled.input`
	border: none;
	font-weight: 400;
	background-color: transparent;
	color: #ccc;
	padding: 7px 11px;

	::placeholder {
		color: ${(props) => props.theme.colors.secondaryText.default};
	}

	&:focus {
		outline-color: transparent;
	}

	&:hover {
		box-shadow: 0 2px 3px rgba(#b3b3b3, 0.1) inset;
	}

	&:hover ~ button {
		box-shadow: 0 2px 3px rgba(#b3b3b3, 0.1) inset;
	}
`;

export const ButtonSearch = styled.button`
	border: none;
	cursor: pointer;
	padding: 7px;
	background-color: transparent;

	svg {
		color: ${(props) => props.theme.colors.secondaryText.default};
	}

	&:hover svg {
		color: ${(props) => props.theme.colors.secondaryText.hover};
	}
`;

export const ShowFilter = styled(ContentSpaceBetween)`
	cursor: pointer;
	font-size: 0.85rem;
`;

export const Span = styled.span`
	padding-right: 5px;
	color: ${(props) => props.theme.colors.primaryText.default};
`;

export const Divider = styled.div`
	width: 0px;
	height: 23px;

	margin: 0 4px;

	border-right: 1px solid ${(props) => props.theme.colors.sectionsDivider};
`;

export const DividerSmall = styled.div`
	width: 0px;
	height: 16px;

	margin: 0 4px;

	border-right: 1px solid ${(props) => props.theme.colors.sectionsDivider};
`;

export const TooltipText = styled.span`
	font-size: 12px;
`;

export const TooltipShortcut = styled.span`
	position: relative;

	top: -1px;

	margin-left: 4px;

	font-size: 9px;
`;

export const Filter = styled.div`
	cursor: pointer;
	color: #17785e;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 12px;
`;

export const Show = styled.span`
	padding-right: 6px;
`;
