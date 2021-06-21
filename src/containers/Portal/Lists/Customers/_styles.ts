import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Main = styled.div`
	position: relative;
	flex-grow: 1;
`;

export const Center = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	cursor: pointer;
	padding: 5px;
`;

export const SpaceBetween = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
`;

export const Action = styled.div`
	min-width: 90px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const StyledLink = styled(Link)`
	margin: 8px 12px 16px;
	padding: 7px 10px;
	text-decoration: none;
	background-color: ${(props) => props.theme.colors.background.secondaryMenu};
	border-radius: 4px;

	&:hover {
		background-color: ${(props) => props.theme.colors.background.darker};
	}

	span {
		font-size: 12px;
		color: ${(props) => props.theme.colors.secondaryText.hover};
		margin-left: 9px;
	}
`;
