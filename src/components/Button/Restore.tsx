import React from 'react';
import Tooltip from '../Optimify/Tooltip';
import { BinType } from 'src/containers/Portal/Bin/_types';
import { faUndoAlt } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '../Optimify/Button';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { lang } from '../../translation/i18n';
import { translationPath } from '../../utils/getPath';
import { useTranslation } from 'react-i18next';

interface IRestore {
	change: any;
	type: BinType;
}
export const Restore = ({ change, type }: IRestore) => {
	const { t } = useTranslation();
	return (
		<Tooltip
			placement={"top"}
			title={t(
				translationPath(
					type == BinType.PROJECT
						? lang.common.restoreProject
						: lang.common.restoreJob
				).path
			)}
		>
			<IconButton iconOnly onClick={() => change()} type="button">
				<FontAwesomeIcon icon={faUndoAlt as IconProp} color={"green"} />
			</IconButton>
		</Tooltip>
	);
};
