import * as React from 'react';
import PhoneInput from 'react-phone-number-input';
import { BasicInlineInputProps } from './BaseInput';

export const PhoneNumber = (props: BasicInlineInputProps) => {
	const { formik, name } = props;

	const handleNumberChange = (value: string) => {
		formik.setFieldValue(name, value);
	};

	return (
		<PhoneInput
			international
			displayInitialValueAsLocalNumber
			value={name && formik.values && formik.values[name]}
			defaultCountry="CZ"
			onChange={handleNumberChange}
		/>
	);
};
