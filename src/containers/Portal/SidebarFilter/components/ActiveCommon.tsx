import * as React from 'react';
import { Active } from './Active';
import { FilterSettings, TreeType } from '../../../../types/_types';
import { lang } from '../../../../translation/i18n';
import { translationPath } from '../../../../utils/getPath';
import { useTranslation } from 'react-i18next';

export interface IActiveCommon {
	values: any;
	active: boolean;
	activeFilterContent: any;
	filter: FilterSettings;
	activeTree: TreeType;
	activeFilter: boolean;
}

export const ActiveCommon = ({
	values,
	activeFilterContent,
	active,
	filter,
	activeTree,
	activeFilter,
}: IActiveCommon) => {
	const { t } = useTranslation();

	if (activeFilter) {
		return (
			<Active
				values={values}
				active={active}
				activeFilterContent={activeFilterContent}
			/>
		);
	}

	return <>{t(translationPath(lang.common.filterNotSet).path)}</>;
};
