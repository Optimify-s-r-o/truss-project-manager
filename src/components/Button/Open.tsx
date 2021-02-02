import React from 'react';
import Tooltip from '../Optimify/Tooltip';
import { faFile } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '../Optimify/Button';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { lang, t } from '../../translation/i18n';
import { translationPath } from '../../utils/getPath';

interface IOpen {
	open: any;
}

export const Open = ({ open }: IOpen) => {
	return (
		<Tooltip title={t(translationPath(lang.common.open))} placement={"bottom"}>
			<IconButton type="button" iconOnly onClick={() => open()}>
				<FontAwesomeIcon icon={faFile as IconProp} color={"blue"} />
			</IconButton>
		</Tooltip>
	);
};
