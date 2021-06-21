import * as React from 'react';
import PhoneInput from 'react-phone-number-input';
import styled from 'styled-components';
import { BasicInlineInputProps } from './BaseInput';

export const PhoneNumber = (props: BasicInlineInputProps) => {
	const { formik, name } = props;

	const handleNumberChange = (value: string) => {
		formik.setFieldValue(name, value);
	};

	let value = "";

	if (name.includes(".")) {
		const first = formik.values[name.split(".")[0]];
		const second = first[name.split(".")[1]];
		value = second;
	} else {
		value = name && formik.values && formik.values[name];
	}

	return (
		<SPhoneInput
			international
			displayInitialValueAsLocalNumber
			value={value}
			defaultCountry="CZ"
			onChange={handleNumberChange}
		/>
	);
};

const SPhoneInput = styled(PhoneInput)`
	.PhoneInputInput {
		background-color: ${(props) => props.theme.colors.background.content};
		color: ${(props) => props.theme.colors.contentText};
		border-bottom: 1px solid ${(props) => props.theme.colors.forms.border};
	}
	.PhoneInputCountry {
		border-bottom: 1px solid ${(props) => props.theme.colors.forms.border};
	}
`;
