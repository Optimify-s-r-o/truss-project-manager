import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Field } from 'formik';

interface Input {
	name: any;
	title?: string;
	disabled?: boolean;
	children?: React.ReactNode;
	value?: string;
}
export const NestedInput = ({ children, title, name, value }: Input) => {
	const [isFocused, setFocused] = React.useState(false);

	const input = useRef(null);

	useEffect(() => {
		function selectAll(ev) {
			var key = ev.which || ev.keyCode;
			var ctrl = ev.ctrlKey ? ev.ctrlKey : key === 17 ? true : false;
			if ((key == 65 || key == 97) && ctrl) {
				if (input.current === document.activeElement) {
					input.current.select();
				}
			} else if (key === 13) {
				ev.preventDefault();
			}
		}
		if (input && input.current)
			input && input.current.addEventListener("keydown", selectAll, false);
	}, [input]);

	return (
		<BaseInlineInputWrapper isFocused={isFocused}>
			<Row>
				<Title>{title}</Title>
				<TextInput
					innerRef={input}
					onBlur={(e) => {
						setFocused(false);
					}}
					name={name?.join(".")}
					value={!!value ? value : ""}
				/>
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

const TextInput = styled(Field)`
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
