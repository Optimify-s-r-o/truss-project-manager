import lang from '../../../../translation/lang';
import React from 'react';
import styled from 'styled-components';
import Tooltip from '../../../../components/Optimify/Tooltip';
import { ContentRow } from '../../../../constants/globalStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SectionVariable } from '../_types';
import { translationPath } from '../../../../utils/getPath';
import { useTranslation } from 'react-i18next';
import {
	faCheckCircle,
	faTimesCircle,
} from "@fortawesome/pro-duotone-svg-icons";

interface Expression {
	onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
	onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
	onExpressionEdit: (variable: SectionVariable) => void;
	variable?: SectionVariable;
	expression?: string;
	setExpression?: React.Dispatch<React.SetStateAction<string>>;
	handleKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}
export const Expression = ({
	onFocus,
	onBlur,
	variable,
	onExpressionEdit,
	expression,
	setExpression,
	handleKeyDown,
}: Expression) => {
	const { t } = useTranslation();

	React.useEffect(() => {
		setExpression(variable.QuantityExpression);
	}, [variable]);

	return (
		<Wrapper>
			{<Label>{t(translationPath(lang.templates.quantity).path)}</Label>}
			<Relative>
				<Input
					type="text"
					onChange={(e) => {
						setExpression(e.target.value);
					}}
					value={expression}
					onDrop={(event) => {
						onExpressionEdit({
							...variable,
							QuantityExpression:
								variable.QuantityExpression +
								event.dataTransfer.getData("Text"),
						});
					}}
					onFocus={onFocus}
					onBlur={(e) => {
						onBlur(e);
						onExpressionEdit({ ...variable, QuantityExpression: expression });
					}}
					placeholder={t(translationPath(lang.templates.expression).path)}
					onKeyDown={handleKeyDown}
					width={100}
				/>
				<Equals>=</Equals>
			</Relative>
			<Span>
				{variable.QuantityValid ? (
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
`;

const Input = styled.input<{ width?: number }>`
	margin: 0 0 0.5rem;
	padding: 0.75rem 0.45rem 0.75rem 0.8rem;
	background-color: ${(props) => props.theme.colors.forms.select};
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
