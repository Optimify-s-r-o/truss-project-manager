import React from 'react';
import Tooltip from '../Optimify/Tooltip';
import { faArrowToRight } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '../Optimify/Button';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { lang } from '../../translation/i18n';
import { translationPath } from '../../utils/getPath';
import { useTranslation } from 'react-i18next';

interface ILink {
	link: any;
	title?: string;
}
export const Link = ({ link, title }: ILink) => {
	const { t } = useTranslation();
	return (
		<Tooltip
			title={title ? title : t(translationPath(lang.common.link).path)}
			placement={"bottom"}
		>
			<IconButton type="button" level={3} onClick={() => link()}>
				<FontAwesomeIcon icon={faArrowToRight as IconProp} color={"blue"} />
			</IconButton>
		</Tooltip>
	);
};
