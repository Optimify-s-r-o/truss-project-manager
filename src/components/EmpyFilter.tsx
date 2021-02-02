import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FilterSettings } from '../types/_types';
import {
	lang,
	t,
	WithTranslation,
	withTranslation
	} from '../translation/i18n';
import { translationPath } from '../utils/getPath';

export interface OwnProps {
	filter: FilterSettings;
	type: string;
	names?: string[];
	array?: string[];
	children: React.ReactNode;
}

export const EmptyFilter = (props: WithTranslation & OwnProps) => {
	const { array, filter, type, names, children } = props;
	const [show, setShow] = useState(false);

	useEffect(() => {
		let hasValue = false;
		if (array && filter) {
			for (const it of array) {
				const filterType = filter[type];
				if (filterType[it] && filterType[it].length > 0) {
					hasValue = true;
				}
			}
		}
		if (!hasValue && filter && names) {
			for (const it of names) {
				const from = it + "From";
				const to = it + "To";
				const filterType = filter[type];
				if (filterType[from] != filterType[to]) {
					hasValue = true;
				}
			}
		}
		setShow(hasValue);
	}, [filter]);

	return show ? (
		<>{children}</>
	) : (
		<NoValue>{t(translationPath(lang.common.emptyFilter))}</NoValue>
	);
};

export const NoValue = styled.div`
	color: ${(props) => props.theme.colors.secondaryText.default};
`;

export default withTranslation()(React.memo(EmptyFilter));
