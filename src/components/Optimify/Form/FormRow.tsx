import * as React from 'react';
import styled from 'styled-components';

interface FormRowProps {
	title: string;
	children?: any;
	hideGuide?: boolean;
	childrenId?: any;
	onTitleClick?: (_event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	titleWidth?: number;
	touched?: boolean;
	error?: string;
}

const FormRow = (props: FormRowProps) => {
	const {
		error,
		hideGuide,
		children,
		onTitleClick,
		touched,
		titleWidth,
	} = props;

	const id = props.hasOwnProperty("childrenId")
		? props.childrenId
		: Math.random().toString(36).substr(2, 16);

	return (
		<Row>
			<Title
				hideGuide={hideGuide}
				htmlFor={id}
				onClick={onTitleClick}
				width={props.hasOwnProperty("titleWidth") ? titleWidth : 30}
			>
				{props.title}
			</Title>
			<Value
				width={
					props.hasOwnProperty("titleWidth") && titleWidth
						? 100 - titleWidth
						: 70
				}
			>
				{props.hasOwnProperty("childrenId")
					? children
					: React.Children.map(children, (child) => {
							return React.cloneElement(child, {
								id: id,
							});
					  })}
			</Value>
			{touched && error ? <div>{error}</div> : null}
		</Row>
	);
};

export const Row = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;

	width: 100%;
`;

export const Title = styled.label`
	display: flex;
	flex-direction: column;
	justify-content: center;

	width: ${(props) => props.width}%;
	height: 32px;

	padding: 0 16px 0 0;

	border-bottom: 1px dotted
		${(props) =>
			props.hideGuide ? "transparent" : props.theme.colors.forms.labelBorder};
	color: ${(props) => props.theme.colors.primaryText.default};
	font-size: 0.8em;
`;

export const Value = styled.div`
	display: flex;
	flex-direction: row;
	width: ${(props) => props.width}%;

	> *:first-child {
		flex-grow: 1;
	}

	.svg-inline--fa {
		font-size: 0.9em;
	}
`;

export default FormRow;
