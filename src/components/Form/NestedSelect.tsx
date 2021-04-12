import React from 'react';
import styled from 'styled-components';
import { Field } from 'formik';

interface Input {
	name: any;
	title?: string;
	disabled?: boolean;
	children?: React.ReactNode;
	options: { value: string; label: string }[];
}
export const NestedSelect = ({ children, title, name, options }: Input) => {
	const [isFocused, setFocused] = React.useState(false);

	return (
		<BaseInlineInputWrapper isFocused={isFocused}>
			<Row>
				<Title>{title}</Title>
				<Select
					as="select"
					onBlur={(e) => {
						setFocused(false);
					}}
					name={name}
				>
					{options?.map((i, key) => {
						return <Option value={i.value}>{i.label}</Option>;
					})}
				</Select>
				{children && children}
			</Row>
		</BaseInlineInputWrapper>
	);
};

const BaseInlineInputWrapper = styled.div<{ isFocused: boolean }>`
	position: relative;

	width: 100%;
	height: 32px;

	margin: 8px 0;

	&:after {
		content: "";

		position: absolute;

		right: 100%;
		bottom: 0;
		left: 0;

		height: 2px;

		background-color: transparent;

		transition: all 0.2s ease-out;
	}

	${(props) =>
		props.isFocused
			? `
      &:after {
        right: 0;

        background-color: ${props.theme.colors.primary.default};
      }
    `
			: ""}
`;

const Option = styled.option`
	background-color: ${(props) => props.theme.colors.primary.hover};
	color: ${(props) => props.theme.colors.background.content};
	&:hover {
		background-color: ${(props) => props.theme.colors.primary.hover};
		color: ${(props) => props.theme.colors.background.content};
	}
`;

const Select = styled(Field)`
	width: 100%;
	height: 32px;

	padding: 0;

	background-color: transparent;
	color: ${(props) => props.theme.colors.contentText};
	border: 0;
	border-bottom: 1px solid ${(props) => props.theme.colors.forms.border};
	font-size: 16px;

	transition: all 0.2s ease-out;

	&::placeholder {
		color: ${(props) => props.theme.colors.secondaryText.default};
		font-size: 0.9rem;
	}

	&:hover {
		border-bottom-color: ${(props) =>
			props.disabled
				? props.theme.colors.forms.border
				: props.theme.colors.primary.default};
	}

	&:after {
		background-color: ${(props) => props.theme.colors.background.lightGray};
		padding: 2em;
	}

	&:disabled {
		background-color: ${(props) => props.theme.colors.background.lightGray};
	}
`;

export const Title = styled.label<{ width?: string; hideGuide?: string }>`
	display: flex;
	flex-direction: column;
	justify-content: center;

	width: ${(props) => (props.width ? props.width : "30")}%;
	height: 32px;

	padding: 0 16px 0 0;

	border-bottom: 1px dotted
		${(props) =>
			props.hideGuide ? "transparent" : props.theme.colors.forms.labelBorder};
	color: ${(props) => props.theme.colors.primaryText.default};
	font-size: 0.8em;
`;

export const Row = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;

	width: 100%;
`;
