import React from 'react';
import styled from 'styled-components';
import { IconDefinition } from '@fortawesome/pro-solid-svg-icons';
import { ListQuotation } from '../containers/Portal/Quotations/_types';
import { QuotationList } from 'src/containers/Portal/Quotations/_types';
import { Select } from 'antd';
const { Option } = Select;
interface NavigationProps {
	title?: string;
	selected?: string;
	justify?: string;
	handleChangeTemplate: (id: string) => void;
	quotationList: QuotationList;
}

interface ItemDefinition {
	id: string;
	text: string;
	icon?: IconDefinition;
	isAction?: boolean;
	onClick?: any;
}

const Navigation = ({
	title,
	justify,
	selected,
	handleChangeTemplate,
	quotationList,
}: NavigationProps) => {
	const handleQuotationTypeChange = (value: string) => {
		handleChangeTemplate(value);
	};
	return (
		<NavigationWrapper justify={justify}>
			{title && <Title>{title}</Title>}

			<SSelect
				optionFilterProp="children"
				filterOption={(input, option) =>
					option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
				}
				style={{
					width: "300px",
					marginLeft: 10,
					marginTop: 10,
				}}
				placeholder={title}
				onChange={handleQuotationTypeChange}
				value={selected}
			>
				{quotationList?.Quotations?.map((p: ListQuotation, i: number) => (
					<Option key={i} value={p.Id}>
						{p.Title}
					</Option>
				))}
			</SSelect>
		</NavigationWrapper>
	);
};

export default Navigation;

const Title = styled.div`
	padding: 8px 4px 6px 16px;
	color: ${(props) => props.theme.colors.primaryText.default};
`;

const NavigationItem = styled.div<{ active: boolean; isAction?: boolean }>`
	cursor: pointer;
	padding: 8px 4px 16px 16px;

	background-color: ${(props) =>
		props.active
			? props.theme.colors.background.contentSecondary + " !important"
			: props.isAction
			? "transparent !important"
			: props.theme.colors.background.menu};
	color: ${(props) =>
		props.active
			? props.theme.colors.primary.default
			: props.isAction
			? props.theme.colors.background.content
			: props.theme.colors.secondaryText.default};

	svg {
		margin-right: 4px;
		color: ${(props) =>
			props.active
				? props.theme.colors.primary.default
				: props.theme.colors.background.darker};
	}

	&:hover {
		background-color: ${(props) =>
			props.active
				? props.theme.colors.background.contentSecondary
				: props.isAction
				? "rgba(255, 255, 255, 0.05)"
				: props.theme.colors.background.content} !important;
		color: ${(props) =>
			props.active
				? props.theme.colors.primary.default
				: props.isAction
				? props.theme.colors.background.content
				: props.theme.colors.secondaryText.hover};

		svg {
			color: ${(props) =>
				props.active
					? props.theme.colors.primary.default
					: props.isAction
					? props.theme.colors.background.content
					: props.theme.colors.secondaryText.default};
		}
	}
`;

const NavigationWrapper = styled.div<{
	justify?: string;
	active?: boolean;
	isAction?: boolean;
}>`
	display: flex;
	flex-direction: row;
	justify-content: ${(props) => (props.justify ? props.justify : "flex-start")};
	align-items: flex-end;

	padding: 10px 50px;

	> a {
		text-decoration: none;

		&:nth-child(even) ${NavigationItem} {
			background-color: ${(props) =>
				props.active
					? props.theme.colors.background.contentSecondary
					: props.isAction
					? "transparent"
					: props.theme.colors.background.secondaryMenu};
		}
	}
`;

const SSelect = styled(Select)`
	.ant-select-selector {
		background-color: ${(props) => props.theme.colors.forms.select} !important;
		color: ${(props) => props.theme.colors.secondaryText.default} !important;
	}

	.anticon svg {
		background-color: ${(props) => props.theme.colors.forms.select} !important;
	}
`;
