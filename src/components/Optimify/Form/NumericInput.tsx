import * as React from 'react';
import { BaseInlineInput, BasicInlineInputProps } from './BaseInput';

export const NumericInput = (props: BasicInlineInputProps) => {
  return <BaseInlineInput {...props} type="number" />;
};
