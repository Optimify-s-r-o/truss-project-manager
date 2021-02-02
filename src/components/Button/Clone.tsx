import React from 'react';
import Tooltip from '../Optimify/Tooltip';
import { faCopy } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '../Optimify/Button';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { lang } from '../../translation/i18n';
import { translationPath } from '../../utils/getPath';
import { useTranslation } from 'react-i18next';

interface ILink {
	clone: any;
	pending: boolean;
}
export const Clone = ({ clone, pending }: ILink) => {
	const { t } = useTranslation();
	return (
		<Tooltip
			title={t(translationPath(lang.common.duplicate).path)}
			placement={"bottom"}
		>
			<IconButton
				type="button"
				level={3}
				iconOnly
				loading={pending}
				onClick={() => clone()}
			>
				<FontAwesomeIcon icon={faCopy as IconProp} color={"green"} />
			</IconButton>
		</Tooltip>
	);
};
