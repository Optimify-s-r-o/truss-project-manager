import * as React from 'react';
import { BaseInlineInput, BasicInlineInputProps } from './BaseInput';

export const TextInput = (props: BasicInlineInputProps) => {
	return <BaseInlineInput {...props} type="text" />;
};
