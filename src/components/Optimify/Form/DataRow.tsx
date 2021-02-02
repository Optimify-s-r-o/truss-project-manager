import * as React from 'react';
import styled from 'styled-components';

interface DataRowProps {
	title: string;
	children?: any;
	titleWidth?: number;
}

const DataRow = (props: DataRowProps) => {
	return (
		<Row>
			<Title width={props.hasOwnProperty("titleWidth") ? props.titleWidth : 30}>
				{props.title}
			</Title>
			<Value
				width={
					props.hasOwnProperty("titleWidth") && props?.titleWidth
						? 100 - props?.titleWidth
						: 70
				}
			>
				{props.children}
			</Value>
		</Row>
	);
};

const Row = styled.div`
	display: flex;
	flex-direction: row;
	align-items: flex-end;

	width: 100%;

	&:not(:last-child) {
		margin-bottom: 8px;
	}
`;

const Title = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;

	width: ${(props) => props.width}%;
	min-height: 20px;

	padding: 0 16px 4px 0;

	border-bottom: 1px dotted ${(props) => props.theme.colors.forms.labelBorder};
	color: ${(props) => props.theme.colors.primaryText.default};
	font-size: 0.8em;
`;

const Value = styled.div`
	display: flex;
	flex-direction: row;
	width: ${(props) => props.width}%;
	min-height: 24px;

	border-bottom: 1px solid ${(props) => props.theme.colors.forms.border};

	.svg-inline--fa {
		font-size: 0.9em;
	}
`;

export default DataRow;
