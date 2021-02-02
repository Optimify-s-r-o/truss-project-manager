import * as React from 'react';
import styled from 'styled-components';
import { FieldInputProps } from 'formik';

export interface BasicInlineInputProps {
	disabled?: boolean;
	formik?: any;
	onChange?: (event: React.ChangeEvent<any>) => void;
	onBlur?: (_event: React.FocusEvent<any>) => void;
	value?: string | number;
	name?: string;
	placeholder?: string;
	id?: string;
	formikProps?: FieldInputProps<any>;
	filterName?: string;
	filter?: string;
}

interface BaseInlineInputProps extends BasicInlineInputProps {
	type?: string;
}

export const BaseInlineInput = (props: BaseInlineInputProps) => {
	const [isFocused, setFocused] = React.useState(false);

	const handleFilter = (newValue: string) => {
		if (newValue.length > 0 && props.filter) {
			props.formik.setFieldValue(
				(props.filter as any)?.join(".") + "." + "Active",
				true
			);
		} else if (props.filter) {
			props.formik.setFieldValue(
				(props.filter as any)?.join(".") + "." + "Active",
				false
			);
		}
	};

	return (
		<BaseInlineInputWrapper isFocused={isFocused}>
			<BaseInlineInputElement
				onFocus={() => setFocused(true)}
				name={props.name}
				{...props}
				onChange={(e) => {
					props.onChange && props.onChange(e);
					handleFilter(e.target.value);
				}}
				onBlur={(e) => {
					props.onBlur && props.onBlur(e);
					setFocused(false);
				}}
			/>
		</BaseInlineInputWrapper>
	);
};

export const BaseInlineInputWrapper = styled.div`
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

const BaseInlineInputElement = styled.input`
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
		border-bottom-color: ${(props) => props.theme.colors.primary.default};
	}
`;
