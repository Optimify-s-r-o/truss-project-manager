import * as React from 'react';
import { BaseInlineInput, BasicInlineInputProps } from './BaseInput';

export const EmailInput = (props: BasicInlineInputProps) => {
  return <BaseInlineInput {...props} type="email" />;
};
