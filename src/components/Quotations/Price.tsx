import Data from '../Data/Data';
import lang from '../../translation/lang';
import React from 'react';
import styled from 'styled-components';
import Tooltip from '../Optimify/Tooltip';
import { ContentRow } from '../../constants/globalStyles';
import { fixed } from '../../utils/formating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { get } from 'lodash';
import { getPath, translationPath } from '../../utils/getPath';
import { JobProxy } from '../../containers/Portal/TreeView/Job/_types';
import { PriceList } from '../../containers/Portal/PriceLists/_types';
import { Select } from 'antd';
import { t } from '../../translation/i18n';
import { UnitType } from '../Data/Unit';
import { UnitValue, Value } from '../Data/Data';
import { useDebounce } from '../../utils/useDebounce';
import { useTranslation } from 'react-i18next';
import {
	PriceExpresionType,
	SectionVariable,
} from "../../containers/Portal/Quotations/_types";
import {
	faCheckCircle,
	faTimesCircle,
} from "@fortawesome/pro-duotone-svg-icons";

const { Option } = Select;

interface Price {
	onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
	onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
	onExpressionEdit: (variable: SectionVariable) => void;
	variable?: SectionVariable;
	priceLists: PriceList[];
}
export const Price = ({
	onFocus,
	onBlur,
	variable,
	onExpressionEdit,
	priceLists,
}: Price) => {
	const [price, setPrice] = React.useState(variable?.PriceExpression);
	const [active, setActive] = React.useState(variable?.PriceExpressionType);
	const debouncedPrice = useDebounce(price, 500);
	const { t } = useTranslation();
	React.useEffect(() => {
		onExpressionEdit({
			...variable,
			PriceExpression: price,
			PriceExpressionType: active,
		});
	}, [debouncedPrice]);

	React.useEffect(() => {
		setPrice(variable?.PriceExpression);
	}, [variable]);

	const children: any[] = [];
	for (let i = 10; i < 36; i++) {
		children.push(
			<Option key={i.toString(36) + i} value={i.toString(36) + i}>
				{i.toString(36) + i}
			</Option>
		);
	}

	const handlePriceListChange = (value: string) => {
		onExpressionEdit({
			...variable,
			PriceListId: value,
			PriceExpressionType: PriceExpresionType.PriceList,
		});
	};

	var formatter = new Intl.NumberFormat("cs-CZ", {
		style: "currency",
		currency: "CZK",
	});

	return (
		<Wrapper>
			<Label>
				<PriceType>{t(translationPath(lang.templates.price).path)}</PriceType>
			</Label>

			{active === PriceExpresionType.PricePerUnit ||
			active === PriceExpresionType.PriceSum ? (
				<Relative>
					<Input
						type="text"
						onChange={(e) => {
							setPrice(e.target.value);
						}}
						value={price}
						onFocus={onFocus}
						onBlur={onBlur}
						placeholder={t(translationPath(lang.templates.price).path)}
					/>
					<Equals>=</Equals>
				</Relative>
			) : (
				<SSelect
					showSearch
					optionFilterProp="children"
					onFocus={onFocus}
					onBlur={onBlur}
					filterOption={(input, option) =>
						option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
					}
					style={{ width: "100%" }}
					placeholder={t(translationPath(lang.templates.price).path)}
					onChange={handlePriceListChange}
					value={variable?.PriceListItemId}
				>
					{variable?.PriceListItems?.map((p: PriceList, i: number) => (
						<Option key={i} value={p?.Id ? p?.Id : ""}>
							{p.Name}
						</Option>
					))}
				</SSelect>
			)}
			{active === PriceExpresionType.PriceList && variable?.PriceExpression && (
				<PriceTag>
					{formatter.format(parseInt(variable?.PriceExpression))}
				</PriceTag>
			)}
			<Span>
				{variable?.PriceValid ? (
					<Tooltip
						title={t(translationPath(lang.templates.priceValid).path)}
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
						title={t(translationPath(lang.templates.priceInvalid).path)}
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

const SSelect = styled(Select)``;

const PriceType = styled.span`
	color: #ccc;
`;
const Span = styled.span`
	padding-bottom: 9px;
	padding-left: 11px;
`;
const PriceTag = styled.span`
	padding: 0 11px 9px 20px;
`;
const Label = styled.label`
	display: flex;
	flex-direction: row;
	color: #ccc;
	min-width: 250px;
`;

const Wrapper = styled(ContentRow)`
	width: 100%;
`;

const Input = styled.input<{ width?: number }>`
	margin: 0 0 0.5rem;
	padding: 0.75rem 0.45rem 0.75rem 0.8rem;

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
