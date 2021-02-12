import * as React from 'react';
import PhoneInput from 'react-phone-number-input';
import styled from 'styled-components';
import { BasicInlineInputProps } from './BaseInput';

export const PhoneNumber = (props: BasicInlineInputProps) => {
	const { formik, name } = props;

	const handleNumberChange = (value: string) => {
		formik.setFieldValue(name, value);
	};

	return (
		<SPhoneInput
			international
			displayInitialValueAsLocalNumber
			value={name && formik.values && formik.values[name]}
			defaultCountry="CZ"
			onChange={handleNumberChange}
		/>
	);
};

const SPhoneInput = styled(PhoneInput)`
	.PhoneInputInput {
		background-color: ${(props) => props.theme.colors.background.content};
		color: ${(props) => props.theme.colors.contentText};
	}
`;
