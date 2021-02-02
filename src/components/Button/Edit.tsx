import React from 'react';
import Tooltip from '../Optimify/Tooltip';
import { faEdit } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '../Optimify/Button';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { lang } from '../../translation/i18n';
import { translationPath } from '../../utils/getPath';
import { useTranslation } from 'react-i18next';

interface IEdit {
	edit: any;
}
export const Edit = ({ edit }: IEdit) => {
	const { t } = useTranslation();
	return (
		<Tooltip
			placement={"top"}
			title={t(translationPath(lang.common.edit).path)}
		>
			<IconButton iconOnly onClick={() => edit()} type="button">
				<FontAwesomeIcon icon={faEdit as IconProp} color={"blue"} />
			</IconButton>
		</Tooltip>
	);
};
