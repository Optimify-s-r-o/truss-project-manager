import React from 'react';
import Tooltip from '../Optimify/Tooltip';
import { faUnlock } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '../Optimify/Button';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { lang } from '../../translation/i18n';
import { translationPath } from '../../utils/getPath';
import { useTranslation } from 'react-i18next';
interface ILock {
	unlock: any;
}
export const Lock = ({ unlock }: ILock) => {
	const { t } = useTranslation();
	return (
		<Tooltip
			placement={"top"}
			title={t(translationPath(lang.common.unlock).path)}
		>
			<IconButton type="button" iconOnly onClick={() => unlock()}>
				<FontAwesomeIcon icon={faUnlock as IconProp} color={"orange"} />
			</IconButton>
		</Tooltip>
	);
};
