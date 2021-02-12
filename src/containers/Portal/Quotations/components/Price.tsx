import lang from '../../../../translation/lang';
import React from 'react';
import styled from 'styled-components';
import Tooltip from '../../../../components/Optimify/Tooltip';
import { ContentRow } from '../../../../constants/globalStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PriceExpresionType, SectionVariable } from '../_types';
import { PriceList, PriceListItem } from '../../PriceLists/_types';
import { Select } from 'antd';
import { translationPath } from '../../../../utils/getPath';
import { useTranslation } from 'react-i18next';
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
	priceListGetByIdAction: (data: string) => void;
	priceList: PriceList;
	price?: string;
	setPrice?: React.Dispatch<React.SetStateAction<string>>;
	handleKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
	activeConfiguration: string;
}
export const Price = ({
	activeConfiguration,
	onFocus,
	onBlur,
	variable,
	onExpressionEdit,
	priceLists,
	priceList,
	priceListGetByIdAction,
	setPrice,
	price,
	handleKeyDown,
}: Price) => {
	const [active, setActive] = React.useState(null);
	const { t } = useTranslation();

	React.useEffect(() => {
		setPrice(variable.PriceExpression);
		setActive(variable.PriceExpressionType);
	}, [variable]);

	const children = [];
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
			ActiveConfiguration: activeConfiguration,
			PriceExpressionType: PriceExpresionType.PriceList,
		});
	};

	const handlePriceItemChange = (value: string) => {
		onExpressionEdit({
			...variable,
			ActiveConfiguration: activeConfiguration,
			PriceListItemId: value,
		});
	};

	const handlePriceType = (type: string) => {
		onExpressionEdit({
			...variable,
			ActiveConfiguration: activeConfiguration,
			PriceExpressionType: type as any,
		});
		setActive(type);
	};
	return (
		<Wrapper>
			<Label>
				<SSelect
					optionFilterProp="children"
					onFocus={onFocus}
					onBlur={onBlur}
					filterOption={(input, option) =>
						option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
					}
					style={{ width: "90%" }}
					placeholder={t(translationPath(lang.templates.priceList).path)}
					onChange={handlePriceType}
					value={active}
				>
					{["PriceSum", "PricePerUnit", "PriceList"]?.map(
						(p: string, i: number) => (
							<Option key={i} value={p}>
								{p === PriceExpresionType.PricePerUnit
									? t(translationPath(lang.templates.pricePerUnit).path)
									: p === PriceExpresionType.PriceSum
									? t(translationPath(lang.templates.price).path)
									: t(translationPath(lang.templates.priceList).path)}
							</Option>
						)
					)}
				</SSelect>
			</Label>

			{active === PriceExpresionType.PricePerUnit ||
			active === PriceExpresionType.PriceSum ? (
				<Relative>
					<Input
						type="text"
						onChange={(e) => {
							setPrice(e.target.value);
						}}
						onDrop={(event) => {
							onExpressionEdit({
								...variable,
								PriceExpression:
									variable.PriceExpression + event.dataTransfer.getData("Text"),
							});
						}}
						value={price}
						onFocus={onFocus}
						onBlur={(e) => {
							onBlur(e);
							onExpressionEdit({
								...variable,
								PriceExpression: price,
								PriceExpressionType: active,
							});
						}}
						onKeyDown={handleKeyDown}
						placeholder={t(translationPath(lang.templates.price).path)}
					/>
					<Equals>=</Equals>
				</Relative>
			) : (
				<SContentRow>
					<SSelect
						optionFilterProp="children"
						onFocus={onFocus}
						onBlur={onBlur}
						filterOption={(input, option) =>
							option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
						}
						style={{ width: "49%", marginRight: "1%" }}
						placeholder={t(translationPath(lang.templates.priceList).path)}
						onChange={handlePriceListChange}
						value={variable.PriceListId}
					>
						{priceLists?.map((p: PriceList, i: number) => (
							<Option key={i} value={p.Id}>
								{p.Name}
							</Option>
						))}
					</SSelect>
					<SSelect
						optionFilterProp="children"
						onFocus={onFocus}
						onBlur={onBlur}
						filterOption={(input, option) =>
							option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
						}
						style={{ width: "50%" }}
						placeholder={t(translationPath(lang.templates.price).path)}
						onChange={handlePriceItemChange}
						disabled={
							!variable?.PriceListItems ||
							variable?.PriceListItems?.length === 0
						}
						value={variable?.PriceListItemId}
					>
						{variable?.PriceListItems?.map((p: PriceListItem, i: number) => (
							<Option key={i} value={p.Id}>
								{p.Name}
							</Option>
						))}
					</SSelect>
				</SContentRow>
			)}

			<Span>
				{variable.PriceValid ? (
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

const SSelect = styled(Select)`
	.ant-select-selector {
		background-color: ${(props) => props.theme.colors.forms.select} !important;
		color: ${(props) => props.theme.colors.secondaryText.default} !important;
	}

	.anticon svg {
		background-color: ${(props) => props.theme.colors.forms.select} !important;
	}
`;

const Slash = styled.span`
	margin: 0 6px;
`;
const PriceType = styled.span<{ active: boolean }>`
	color: ${(props) => (props.active ? "green" : " #ccc")};
	border-bottom: ${(props) => (props.active ? "1px solid green" : "none")};
	cursor: pointer;
`;
const Span = styled.span`
	padding-bottom: 9px;
	padding-left: 11px;
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

const SContentRow = styled(ContentRow)`
	width: 100%;
`;
