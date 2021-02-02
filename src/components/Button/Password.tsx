import React from 'react';
import Tooltip from '../Optimify/Tooltip';
import { faLock } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '../Optimify/Button';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { lang } from '../../translation/i18n';
import { translationPath } from '../../utils/getPath';
import { useTranslation } from 'react-i18next';

interface IPassword {
	change: any;
}
export const Password = ({ change }: IPassword) => {
	const { t } = useTranslation();
	return (
		<Tooltip
			placement={"top"}
			title={t(translationPath(lang.common.changePassword).path)}
		>
			<IconButton iconOnly onClick={() => change()} type="button">
				<FontAwesomeIcon icon={faLock as IconProp} color={"#65573d"} />
			</IconButton>
		</Tooltip>
	);
};
