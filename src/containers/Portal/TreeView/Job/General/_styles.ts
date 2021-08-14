import styled from 'styled-components';

export const RightColumn = styled.div`
	display: flex;
	flex-direction: column;

	height: 100%;

	> :first-child {
		flex-grow: 1;
	}
`;

export const ActionButton = styled.button`
	background: transparent;
	border: none;
	color: ${(props) => props.theme.colors.secondaryText.hover};

	cursor: pointer;

	svg {
		margin: 0 0.5rem -2px 0;

		font-size: 1.25rem;
	}

	&:hover {
		color: ${(props) => props.theme.colors.primary.hover};
	}

	& + & {
		margin-left: 1rem;
	}
`;
