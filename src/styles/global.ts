import styled from 'styled-components';

export const AlignRight = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
`;

export const Inline = styled.div`
	display: flex;
	flex-direction: row;
`;

export const Padding = styled.div`
	padding: 0 10px;
`;

export const RowCenter = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
`;

export const Center = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	padding: 5px;
`;

export const RowLeft = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
`;

export const RowRight = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-end;
	padding: 10px 0 ${(props) => !props.paddingBottom && "0"};
`;

export const Column = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
`;
