import CurrencyInputEl from 'react-currency-input';
import lang from '../../../../translation/lang';
import React from 'react';
import styled from 'styled-components';
import Tooltip from '../../../../components/Optimify/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Icon } from '../_styles';
import { translationPath } from '../../../../utils/getPath';
import { useDebounce } from '../../../../utils/useDebounce';
import { useTranslation } from 'react-i18next';
import {
  faCheckCircle,
  faTimesCircle,
} from '@fortawesome/pro-duotone-svg-icons';

interface FormulaInputCurrency {
  onChange: (newValue: string) => void;
  type: string;
  value: string;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  valid: boolean;
  disabled: boolean;
}

export const FormulaInputCurrency = ({
  onChange,
  value,
  onFocus,
  onBlur,
  valid,
  disabled,
}: FormulaInputCurrency) => {
  const [text, setText] = React.useState(value);
  const debouncedText = useDebounce(text, 500);
  const { t } = useTranslation();

  React.useEffect(() => {
    onChange(text);
  }, [debouncedText]);

  React.useEffect(() => {
    setText(value);
  }, [value]);

  return (
    <Wrapper>
      <CurrencyInputEl
        onChangeEvent={
          !disabled && ((e, maskedValue, floatValue) => setText(floatValue))
        }
        value={text}
        onFocus={!disabled && onFocus}
        onBlur={!disabled && onBlur}
        precision={0}
        thousandSeparator={' '}
        decimalSeparator={','}
        suffix={' Kč'}
      />
      <Icon>
        {valid ? (
          <Tooltip
            title={t(translationPath(lang.templates.expressionValid).path)}
            placement={'top'}
          >
            <FontAwesomeIcon
              icon={faCheckCircle}
              style={{ color: '#17785e', height: 24, width: 24 }}
            />
          </Tooltip>
        ) : (
          <Tooltip
            title={t(translationPath(lang.templates.expressionInvalid).path)}
            placement={'top'}
          >
            <FontAwesomeIcon
              icon={faTimesCircle}
              style={{ color: 'red', height: 24, width: 24 }}
            />
          </Tooltip>
        )}
      </Icon>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;

  input {
    min-width: 100%;

    margin: 0 0 0.5rem;
    padding: 0.75rem 1.5rem 0.75rem 2.12rem;

    box-shadow: 0 2px 10px -2px rgba(0, 0, 0, 0.2);
    border: 0;
    border-radius: 3px;
  }
`;
