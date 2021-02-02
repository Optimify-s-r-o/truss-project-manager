import styled from 'styled-components';

export const Show = styled.div<{ show: boolean }>`
	display: ${(props) => (props.show ? "block" : "none")};
`;

export const FilterWrapper = styled.div``;
export const Title = styled.div`
	color: ${(props) => props.theme.colors.primary.default};
	font-weight: 500;
	font-size: 1.2em;
	text-transform: uppercase;
	background-color: ${(props) => props.theme.colors.background.secondaryMenu};
	padding: 6px 15px;
`;

export const Icon = styled.div`
	svg {
		margin-left: 3px;
	}
`;
