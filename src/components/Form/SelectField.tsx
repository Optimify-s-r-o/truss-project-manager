import _ from 'lodash';
import React from 'react';
import styled from 'styled-components';
import { FormikProps } from 'formik';
import { OptionType, Select } from '../Optimify/Form/Select';
import { Settings } from '../../types/_types';
import { ValueType } from 'react-select';

interface TextField<T> {
	formik: FormikProps<T>;
	entity: T;
	options: any;
	name: any;
	type: string;
	label?: string;
	disabled?: boolean;
	settings: Settings;
}
export const SelectField = <T,>({
	disabled,
	options,
	label,
	type,
	formik,
	name,
}: TextField<T>) => {
	const item = (options as OptionType[])?.find(
		(e) => e.value === formik.values[name]
	);
	return (
		<BaseInlineInputWrapper>
			<Row>
				<Title>{label}</Title>
				<Select
					value={{
						value: formik.values && formik.values[name],
						label: item && item.label,
					}}
					options={options}
					onChange={(value: ValueType<OptionType, any>) => {
						formik.setFieldValue(name, (value as OptionType).value, false);
						formik.submitForm();
					}}
					direction={"up"}
					disabled={disabled}
				/>
			</Row>
		</BaseInlineInputWrapper>
	);
};

const BaseInlineInputWrapper = styled.div`
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
