import lang from '../../../../translation/lang';
import React from 'react';
import styled from 'styled-components';
import Tooltip from '../../../../components/Optimify/Tooltip';
import { ContentRow } from '../../../../constants/globalStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { translationPath } from '../../../../utils/getPath';
import { useDebounce } from '../../../../utils/useDebounce';
import { useTranslation } from 'react-i18next';
import {
	faCheckCircle,
	faTimesCircle,
} from "@fortawesome/pro-duotone-svg-icons";

interface FormulaInput {
	onChange: (newValue: string) => void;
	type: string;
	value?: string;
	onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
	onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
	handleKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
	valid?: boolean;
	disabled?: boolean;
	label?: string;
	width?: number;
	placeholder?: string;
	equal?: boolean;
}
const FormulaInput = ({
	onChange,
	type,
	value,
	onFocus,
	onBlur,
	valid,
	disabled,
	label,
	width,
	placeholder,
	handleKeyDown,
	equal,
}: FormulaInput) => {
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
			{label && <Label>{label}</Label>}
			<Relative>
				<Input
					type={type}
					onChange={(e) => {
						setText(e.target.value);
					}}
					value={text}
					onFocus={onFocus}
					onBlur={onBlur}
					disabled={disabled}
					width={width}
					placeholder={placeholder}
					onKeyDown={handleKeyDown}
				/>
				{equal && <Equals>=</Equals>}
			</Relative>
			<Span>
				{valid ? (
					<Tooltip
						title={t(translationPath(lang.templates.expressionValid).path)}
						placement={"top"}
					>
						<FontAwesomeIcon
							icon={faCheckCircle}
							style={{
								color: "#17785e",
								height: 24,
								width: 24,
							}}
						/>
					</Tooltip>
				) : (
					<Tooltip
						title={t(translationPath(lang.templates.expressionInvalid).path)}
						placement={"top"}
					>
						<FontAwesomeIcon
							icon={faTimesCircle}
							style={{
								color: "red",
								height: 24,
								width: 24,
							}}
						/>
					</Tooltip>
				)}
			</Span>
		</Wrapper>
	);
};

export default FormulaInput;

const Span = styled.span`
	padding-bottom: 9px;
	padding-left: 11px;
`;

const Label = styled.label`
	color: #ccc;
	min-width: 250px;
`;

const Wrapper = styled(ContentRow)`
	width: 100%;
	position: relative;
`;

const Input = styled.input<{ width?: number }>`
	margin: 0 0 0.5rem;
	padding: 0.75em 1.1em;

	width: ${(props) => (props.width ? props.width : 100)}%;

	box-shadow: 0 2px 10px -2px rgba(0, 0, 0, 0.2);
	border: 0;
	border-radius: 3px;
`;

const Relative = styled.div`
	position: relative;
	width: 100%;
`;

const Equals = styled.div`
	position: absolute;

	left: 0.2rem;
	top: 0.75rem;

	color: ${(props) => props.theme.colors.secondaryText.default};
`;
