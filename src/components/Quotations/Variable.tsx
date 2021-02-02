import FormulaInput from '../../containers/Portal/Quotations/components/FormulaInput';
import lang from '../../translation/lang';
import React from 'react';
import { Check } from '../Button/Check';
import { CircleRemove, PencilEdit } from '../Button';
import { Expression } from '../../containers/Portal/Quotations/components/Expression';
import { Price } from './Price';
import { PriceList } from '../../containers/Portal/PriceLists/_types';
import { SectionVariable } from '../../containers/Portal/Quotations/_types';
import { translationPath } from '../../utils/getPath';
import { Undo } from '../Button/Undo';
import { useTranslation } from 'react-i18next';
import { WithTranslation, withTranslation } from '../../translation/i18n';
import {
	VariableLine,
	VariableTitle,
	VariableTitleContainer,
	VariableTitleEditContainer,
	VariableTitleInput,
	VariableTitleText,
	SContentCard,
} from "../../containers/Portal/Quotations/_styles";

export interface VariableProps {
	variable: SectionVariable;
	onRemoveVariable?: () => void;
	onTitleEdit?: (editedTitle: string) => void;
	onExpressionEdit: (variable: SectionVariable) => void;
	createVariable?: (variable: SectionVariable) => void;
	onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
	onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
	sectionKey: number;
	variableKey: number;
	currency: boolean;
	disabled?: boolean;
	priceLists: PriceList[];
}

interface VariableTitleEditing {
	initial?: string;
	edited?: string;
}

const Variable = ({
	onExpressionEdit,
	variable,
	onTitleEdit,
	onRemoveVariable,
	onFocus,
	onBlur,
	currency,
	disabled,
	priceLists,
}: VariableProps & WithTranslation) => {
	const { t } = useTranslation();
	const [editing, setEditing] = React.useState<null | VariableTitleEditing>(
		null
	);
	const editingRef = React.useRef<HTMLInputElement>();
	const enableEdit = () => {
		setEditing({
			initial: variable?.Text,
			edited: variable?.Text,
		});

		setTimeout(() => {
			const input = editingRef?.current;
			input?.focus();
			input?.select();
		}, 10);
	};

	const onEdit = (newValue: string) => {
		setEditing({
			initial: editing?.initial,
			edited: newValue,
		});
	};

	const saveEdit = () => {
		onTitleEdit && editing?.edited && onTitleEdit(editing?.edited);
		setEditing(null);
	};

	const cancelEdit = () => {
		setEditing(null);
	};

	return (
		<VariableLine>
			<VariableTitle>
				<VariableTitleContainer visible={editing === null}>
					{onRemoveVariable && (
						<CircleRemove remove={() => onRemoveVariable()} />
					)}
					{onTitleEdit && <PencilEdit edit={() => enableEdit()} />}
					<VariableTitleText>{variable.Text}</VariableTitleText>
				</VariableTitleContainer>
				<VariableTitleEditContainer visible={editing !== null}>
					<VariableTitleInput
						type="text"
						disabled={disabled}
						ref={editingRef}
						value={editing !== null ? editing.edited : ""}
						onChange={(e) => {
							onEdit(e.target.value);
						}}
					/>
					<Check check={() => saveEdit()} />
					<Undo undo={() => cancelEdit()} />
				</VariableTitleEditContainer>
			</VariableTitle>
			<SContentCard fullSize>
				<Expression
					variable={variable}
					onFocus={onBlur}
					onBlur={onFocus}
					onExpressionEdit={onExpressionEdit}
				/>
				<Price
					variable={variable}
					onFocus={onBlur}
					onBlur={onFocus}
					onExpressionEdit={onExpressionEdit}
					priceLists={priceLists}
				/>
				<FormulaInput
					type="text"
					onChange={(newExpression) =>
						onExpressionEdit({ ...variable, Description: newExpression })
					}
					value={variable.Description}
					label={t(translationPath(lang.templates.description).path)}
					onFocus={onBlur}
					onBlur={onFocus}
					valid={true}
					placeholder={t(translationPath(lang.templates.description).path)}
					disabled={disabled}
				/>
			</SContentCard>
		</VariableLine>
	);
};

export default withTranslation()(Variable);
