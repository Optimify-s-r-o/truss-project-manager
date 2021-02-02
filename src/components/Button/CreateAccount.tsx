import React from 'react';
import Tooltip from '../Optimify/Tooltip';
import { faUserPlus } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '../Optimify/Button';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { lang } from '../../translation/i18n';
import { Link } from 'react-router-dom';
import { Routes } from '../../constants/routes';
import { translationPath } from '../../utils/getPath';
import { useTranslation } from 'react-i18next';

export const CreateAccount = () => {
	const { t } = useTranslation();
	return (
		<Tooltip
			title={t(translationPath(lang.common.addAccount).path)}
			placement={"bottom"}
		>
			<Link
				to={{
					pathname: Routes.LINK_CREATE_USER,
				}}
			>
				<IconButton iconOnly>
					<FontAwesomeIcon icon={faUserPlus as IconProp} color={"green"} />
				</IconButton>
			</Link>
		</Tooltip>
	);
};
