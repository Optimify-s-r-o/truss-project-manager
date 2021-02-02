import React from 'react';
import Tooltip from '../Optimify/Tooltip';
import { faSync } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '../Optimify/Button';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { lang } from '../../translation/i18n';
import { translationPath } from '../../utils/getPath';
import { useTranslation } from 'react-i18next';

interface ISync {
	sync: any;
}

export const Sync = ({ sync }: ISync) => {
	const { t } = useTranslation();
	return (
		<Tooltip
			title={t(translationPath(lang.common.reload).path)}
			placement={"bottom"}
			sideMargin
		>
			<IconButton type="button" iconOnly onClick={() => sync()}>
				<FontAwesomeIcon icon={faSync as IconProp} color={"blue"} />
			</IconButton>
		</Tooltip>
	);
};
