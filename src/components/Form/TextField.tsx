import _ from 'lodash';
import React from 'react';
import styled from 'styled-components';
import { FormikProps } from 'formik';
import { useDebounce } from '../../utils/useDebounce';

interface ITextField<T> {
	formik: FormikProps<T>;
	entity: T;
	name: any;
	type: string;
	label?: string;
	disabled?: boolean;
}
export const TextField = <T,>({
	disabled,
	label,
	type,
	formik,
	name,
}: ITextField<T>) => {
	const [text, setText] = React.useState(formik.values[name]);
	const debouncedText = useDebounce(text, 500);
	const [isFocused, setFocused] = React.useState(false);

	React.useEffect(() => {
		if (!_.isEqual(formik.initialValues, formik.values)) {
			formik.submitForm();
		}
	}, [debouncedText]);

	React.useEffect(() => {
		setText(formik.values[name]);
	}, [formik.values[name]]);
	return (
		<BaseInlineInputWrapper isFocused={isFocused}>
			<Row>
				<Title>{label}</Title>
				<TextInput
					type={type}
					onChange={(e) => {
						formik.setFieldValue(name, e.target.value);
						setText(e.target.value);
					}}
					onBlur={(e) => {
						setFocused(false);
					}}
					value={formik.values[name]}
					disabled={disabled}
				/>
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

const TextInput = styled.input`
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
