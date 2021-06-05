import React from 'react';
import { BinType } from '../_types';
import { lang } from '../../../../translation/i18n';
import { translationPath } from '../../../../utils/getPath';
import { useTranslation } from 'react-i18next';
import {
	ContentSpaceBetweenWithPadding,
	Header1,
} from "../../../../constants/globalStyles";

interface ColumnSelector {
	type: BinType;
}

export const Header = ({ type }: ColumnSelector) => {
	const { t } = useTranslation();

	return (
		<ContentSpaceBetweenWithPadding>
			<Header1>
				{t(
					translationPath(
						type === BinType.PROJECT
							? lang.common.projectBin
							: lang.common.jobBin
					).path
				)}
			</Header1>
		</ContentSpaceBetweenWithPadding>
	);
};
