import React from 'react';
import Tooltip from '../Optimify/Tooltip';
import { faDownload } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '../Optimify/Button';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { lang, t } from '../../translation/i18n';
import { translationPath } from '../../utils/getPath';

interface IDownload {
	download: any;
	title?: string;
}

export const Download = ({ download, title }: IDownload) => {
	return (
		<Tooltip
			title={t(translationPath(lang.common.download))}
			placement={"bottom"}
		>
			<IconButton type="button" iconOnly onClick={() => download()}>
				<FontAwesomeIcon icon={faDownload as IconProp} />
			</IconButton>
		</Tooltip>
	);
};
