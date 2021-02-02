import React from 'react';
import Tooltip from '../Optimify/Tooltip';
import { faSave } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '../Optimify/Button';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { lang } from '../../translation/i18n';
import { translationPath } from '../../utils/getPath';
import { useTranslation } from 'react-i18next';

interface ISave {
	save: any;
}
export const Save = ({ save }: ISave) => {
	const { t } = useTranslation();
	return (
		<Tooltip
			placement={"top"}
			title={t(translationPath(lang.common.save).path)}
		>
			<IconButton iconOnly onClick={() => save()} type="button">
				<FontAwesomeIcon icon={faSave as IconProp} color={"green"} />
			</IconButton>
		</Tooltip>
	);
};
