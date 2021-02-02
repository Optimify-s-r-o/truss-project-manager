import * as React from 'react';
import _ from 'lodash';
import { Active } from './Active';
import { FilterSettings, TreeType } from '../../../../types/_types';
import { getInitialValues } from '../_services';
import { lang } from '../../../../translation/i18n';
import { translationPath } from '../../../../utils/getPath';
import { useTranslation } from 'react-i18next';

export interface IActiveCommon {
	formik: any;
	active: boolean;
	activeFilterContent: any;
	filter: FilterSettings;
	activeTree: TreeType;
}

export const ActiveCommon = ({
	formik,
	activeFilterContent,
	active,
	filter,
	activeTree,
}: IActiveCommon) => {
	const { t } = useTranslation();

	if (!_.isEqual(getInitialValues(activeTree, filter), formik.values)) {
		return (
			<Active
				formik={formik}
				active={active}
				activeFilterContent={activeFilterContent}
			/>
		);
	}

	return <>{t(translationPath(lang.common.filterNotSet).path)}</>;
};
