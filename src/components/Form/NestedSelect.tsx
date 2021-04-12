import React from 'react';
import styled from 'styled-components';
import { get } from 'lodash';
import { OptionType, Select } from '../Optimify/Form/Select';
import { ValueType } from 'react-select';

interface Input {
	name: any;
	values: any;
	title?: string;
	disabled?: boolean;
	children?: React.ReactNode;
	options: { value: string; label: string }[];
	setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
	filter?: any;
}
export const NestedSelect = ({
	children,
	title,
	name,
	options,
	values,
	disabled,
	setFieldValue,
	filter,
}: Input) => {
	const [isFocused, setFocused] = React.useState(false);

	const hasNumber = (myString: string) => {
		return /\d/.test(myString);
	};

	const item = (options as OptionType[])?.find(
		(item: { label: string | number; value: string | number }, key: number) => {
			console.log(item);
			console.log(name);
			console.log(values);
			if (
				name &&
				values &&
				name?.includes(".") &&
				get(values, name) === item.value
			) {
				return item;
			} else if (name && values && item.value === values[name]) {
				return item;
			}
		}
	);
	console.log(item);
	return (
		<BaseInlineInputWrapper isFocused={isFocused}>
			<Row>
				<Title>{title}</Title>
				<Select
					value={{
						value: get(values, name),
						label: item?.label,
					}}
					disabled={disabled}
					options={options}
					onChange={(value: ValueType<OptionType, any>) => {
						setFieldValue(name, (value as OptionType).value, false);
						if (filter && !!(value as OptionType).value) {
							setFieldValue((filter as any).join(".") + ".Active", true);
						} else if (filter) {
							setFieldValue((filter as any).join(".") + ".Active", true);
						}
					}}
					direction={"down"}
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

const Option = styled.option`
	background-color: ${(props) => props.theme.colors.primary.hover};
	color: ${(props) => props.theme.colors.background.content};
	&:hover {
		background-color: ${(props) => props.theme.colors.primary.hover};
		color: ${(props) => props.theme.colors.background.content};
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
