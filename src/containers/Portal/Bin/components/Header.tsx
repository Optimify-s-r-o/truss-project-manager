import React from 'react';
import { BinRequest, BinType } from '../_types';
import { EmptyBin } from '../../../../components/Button/EmptyBin';
import { lang } from '../../../../translation/i18n';
import { translationPath } from '../../../../utils/getPath';
import { useTranslation } from 'react-i18next';
import {
	ContentSpaceBetweenWithPadding,
	Header1,
} from "../../../../constants/globalStyles";

interface ColumnSelector {
	type: BinType;
	emptyBin: (data: BinRequest) => void;
}

export const Header = ({ type, emptyBin }: ColumnSelector) => {
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
			<EmptyBin remove={() => emptyBin({ type })} type={type} />
		</ContentSpaceBetweenWithPadding>
	);
};
