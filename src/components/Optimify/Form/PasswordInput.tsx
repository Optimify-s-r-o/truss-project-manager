import * as React from 'react';
import { BaseInlineInput, BasicInlineInputProps } from './BaseInput';

export const PasswordInput = (props: BasicInlineInputProps) => {
  return <BaseInlineInput {...props} type="password" />;
};
