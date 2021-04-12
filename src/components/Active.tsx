import _, { get } from 'lodash';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Tooltip from './Optimify/Tooltip';
import { FilterSettings } from '../types/_types';
import { lang, t } from '../translation/i18n';
import { translationPath } from '../utils/getPath';

export interface ActiveInterval {
	from: any;
	to: any;
}
interface IOwnProps {
	checkboxes?: (string | number | symbol)[][];
	filter?: FilterSettings;
	values: any;
	formikCheckboxes?: (string | number | symbol)[][];
	input?: (string | number | symbol)[][];
	name?: string[];
	setting?: ActiveInterval[];
	skipCount?: number;
}

export const checkboxCount = (
	filter?: FilterSettings,
	checkboxes?: (string | number | symbol)[][]
) => {
	let count = 0;

	if (checkboxes && filter) {
		for (const it of checkboxes) {
			const item = get(filter, it);
			if (item && _.size(item)) {
				count++;
			}
		}
	}
	return count;
};

export const slidersCount = (
	setting?: ActiveInterval[],
	filter?: FilterSettings
) => {
	let count = 0;
	if (setting && filter) {
		for (let i of setting) {
			if (get(filter, i.from) != get(filter, i.to)) {
				count++;
			}
		}
	}
	return count;
};

export const activeCount = (
	values: any,
	formikCheckboxes?: (string | number | symbol)[][],
	input?: (string | number | symbol)[][],
	name?: string[]
) => {
	let count = 0;
	if (name) {
		for (let i of name) {
			if (get(values, i)?.Active) {
				count++;
			}
		}
	}
	if (formikCheckboxes) {
		for (let i of formikCheckboxes) {
			const item = get(values, i);
			if (item && _.size(item) > 0 && item?.Active) {
				count++;
			}
		}
	}
	if (input) {
		for (let i of input) {
			if (get(values, i) && get(values, i).length > 0) {
				count++;
			}
		}
	}
	return count;
};

const Active = (props: IOwnProps) => {
	const {
		filter,
		values,
		formikCheckboxes,
		checkboxes,
		input,
		name,
		setting,
		skipCount,
	} = props;
	const [active, setActive] = useState(0);
	const [size, setSize] = useState(0);

	useEffect(() => {
		let count = 0 + (skipCount ? skipCount : 0);
		count += checkboxCount(filter, checkboxes);
		count += slidersCount(setting, filter);
		count += input ? input.length : 0;
		setSize(count);
		setActive(activeCount(values, formikCheckboxes, input, name));
	}, [values]);

	return (
		<Border isActive={active > 0 ? 1 : 0}>
			<Tooltip
				title={t(translationPath(lang.common.active), {
					active: active,
					size: size,
				})}
				placement={"left"}
			>
				{active} / {size}
			</Tooltip>
		</Border>
	);
};

export default Active;

export const Border = styled.div<{ isActive: boolean }>`
	margin: 0 5px 0 0;
	padding: 2px 4px;
	background: ${(props: any) =>
		props.isActive
			? props.theme.colors.primary.default
			: props.theme.colors.background.secondaryMenu};
	border-radius: 5px;
	color: ${(props: any) =>
		props.isActive
			? props.theme.colors.background.content
			: props.theme.colors.secondaryText.default};
	font-size: 0.625rem;
	font-weight: 600;

	transition: all 0.2s ease-out;
`;
