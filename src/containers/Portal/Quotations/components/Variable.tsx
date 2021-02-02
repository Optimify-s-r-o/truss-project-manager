import FormulaInput from './FormulaInput';
import lang from '../../../../translation/lang';
import React from 'react';
import { Check } from '../../../../components/Button/Check';
import { CircleRemove, PencilEdit } from '../../../../components/Button';
import { Expression } from './Expression';
import { Price } from './Price';
import { PriceList } from '../../PriceLists/_types';
import { SectionVariable } from '../_types';
import { translationPath } from '../../../../utils/getPath';
import { Undo } from '../../../../components/Button/Undo';
import { useTranslation } from 'react-i18next';
import { WithTranslation, withTranslation } from '../../../../translation/i18n';
import {
	VariableLine,
	VariableTitle,
	VariableTitleContainer,
	VariableTitleEditContainer,
	VariableTitleInput,
	VariableTitleText,
	SContentCard,
} from "../_styles";

export interface VariableProps {
	variable: SectionVariable;
	onRemoveVariable?: () => void;
	onTitleEdit?: (editedTitle: string) => void;
	onExpressionEdit: (variable: SectionVariable) => void;
	createVariable?: (variable: SectionVariable) => void;
	onFocusExpression?: (event: React.FocusEvent<HTMLInputElement>) => void;
	onBlurExpression?: (event: React.FocusEvent<HTMLInputElement>) => void;
	onFocusPrice?: (event: React.FocusEvent<HTMLInputElement>) => void;
	onBlurPrice?: (event: React.FocusEvent<HTMLInputElement>) => void;
	sectionKey: number;
	variableKey: number;
	currency: boolean;
	disabled?: boolean;
	priceLists: PriceList[];
	priceListGetByIdAction: (data: string) => void;
	priceList: PriceList;
	activeConfiguration: string;
}

interface VariableTitleEditing {
	initial: string;
	edited: string;
}

const Variable = ({
	onExpressionEdit,
	variable,
	onTitleEdit,
	onRemoveVariable,
	onBlurExpression,
	onFocusExpression,
	onBlurPrice,
	onFocusPrice,
	currency,
	disabled,
	priceLists,
	priceListGetByIdAction,
	priceList,

	activeConfiguration,
}: VariableProps & WithTranslation) => {
	const { t } = useTranslation();
	const [editing, setEditing] = React.useState<null | VariableTitleEditing>(
		null
	);
	const [unit, setUnit] = React.useState<string>("");
	const [description, setDescription] = React.useState<string>("");
	const [expression, setExpression] = React.useState(
		variable.QuantityExpression
	);
	const [price, setPrice] = React.useState(variable.PriceExpression);

	React.useEffect(() => {
		setDescription(variable.Description);
		setUnit(variable.QuantityExpressionUnit);
	}, [variable]);

	const editingRef = React.useRef<HTMLInputElement>();
	const enableEdit = () => {
		setEditing({
			initial: variable.Text,
			edited: variable.Text,
		});

		setTimeout(() => {
			const input = editingRef.current;
			input.focus();
			input.select();
		}, 10);
	};

	const onEdit = (newValue: string) => {
		setEditing({
			initial: editing.initial,
			edited: newValue,
		});
	};

	const saveEdit = () => {
		onTitleEdit(editing.edited);
		setEditing(null);
	};

	const cancelEdit = () => {
		setEditing(null);
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter" || event.key === "Tab") {
			onExpressionEdit({
				...variable,
				Description: description,
				QuantityExpressionUnit: unit,
				QuantityExpression: expression,
			});
		}
	};

	return (
		<VariableLine>
			<SContentCard fullSize>
				<VariableTitle>
					<VariableTitleContainer visible={editing === null}>
						{onRemoveVariable && (
							<CircleRemove
								remove={() => onRemoveVariable()}
								popTitle={t(translationPath(lang.remove.variable).path, {
									name: variable.Text,
								})}
							/>
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
				<Expression
					variable={variable}
					onFocus={onBlurExpression}
					onBlur={onFocusExpression}
					onExpressionEdit={onExpressionEdit}
					expression={expression}
					setExpression={setExpression}
					handleKeyDown={handleKeyDown}
				/>
				<FormulaInput
					type="text"
					onChange={(newExpression) => setUnit(newExpression)}
					value={variable.QuantityExpressionUnit}
					label={t(translationPath(lang.templates.exportedUnit).path)}
					valid={true}
					onBlur={(e) => {
						onExpressionEdit({
							...variable,
							QuantityExpressionUnit: unit,
						});
					}}
					placeholder={t(translationPath(lang.templates.exportedUnit).path)}
					disabled={disabled}
					handleKeyDown={handleKeyDown}
				/>
				<Price
					activeConfiguration={activeConfiguration}
					variable={variable}
					onExpressionEdit={onExpressionEdit}
					onFocus={onBlurPrice}
					onBlur={onFocusPrice}
					priceLists={priceLists}
					priceList={priceList}
					priceListGetByIdAction={priceListGetByIdAction}
					setPrice={setPrice}
					price={price}
					handleKeyDown={handleKeyDown}
				/>
				<FormulaInput
					type="text"
					onChange={(newExpression) => setDescription(newExpression)}
					value={variable.Description}
					label={t(translationPath(lang.templates.description).path)}
					valid={true}
					onBlur={(e) => {
						onExpressionEdit({ ...variable, Description: description });
					}}
					placeholder={t(translationPath(lang.templates.description).path)}
					disabled={disabled}
					handleKeyDown={handleKeyDown}
				/>
			</SContentCard>
		</VariableLine>
	);
};

export default withTranslation()(Variable);
