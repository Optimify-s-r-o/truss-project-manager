import React from 'react';
import styled from 'styled-components';
import { FilterType } from '../index';
import { lang, t } from '../../../../translation/i18n';
import { SectionWrapper } from 'src/containers/Portal/Quotations/_styles';
import { Select } from 'antd';
import { translationPath } from '../../../../utils/getPath';
const { Option } = Select;

interface ISelectType {
	handleChange: (value: FilterType) => void;
	activeFilter: FilterType;
}
export const SelectType = ({ activeFilter, handleChange }: ISelectType) => {
	return (
		<SectionWrapper>
			<SSelect
				optionFilterProp="children"
				filterOption={(input, option) =>
					option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
				}
				style={{ width: "90%" }}
				onChange={handleChange}
				value={activeFilter}
			>
				{[
					{
						title: t(translationPath(lang.common.customerFilter)),
						id: FilterType.Customer,
					},
					{
						title: t(translationPath(lang.common.projectFilter)),
						id: FilterType.Project,
					},
					{
						title: t(translationPath(lang.common.jobFilter)),
						id: FilterType.Job,
					},
					{
						title: t(translationPath(lang.common.trussFilter)),
						id: FilterType.Truss,
					},
				]?.map((p: { title: string; id: FilterType }, i: number) => (
					<Option key={i} value={p.id}>
						{p.title}
					</Option>
				))}
			</SSelect>
		</SectionWrapper>
	);
};

const SSelect = styled(Select)`
	margin-left: 14px;
	margin-bottom: 8px;
	.ant-select-selector {
		background-color: ${(props) => props.theme.colors.forms.select} !important;
		color: ${(props) => props.theme.colors.secondaryText.default} !important;
	}

	.anticon svg {
		background-color: ${(props) => props.theme.colors.forms.select} !important;
	}
`;
