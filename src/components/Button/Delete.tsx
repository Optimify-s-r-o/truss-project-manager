import React from 'react';
import { faTrash } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '../Optimify/Button';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { lang } from '../../translation/i18n';
import { Popconfirm, Tooltip } from 'antd';
import { translationPath } from '../../utils/getPath';
import { useTranslation } from 'react-i18next';
interface IDelete {
	remove: any;
	title: string;
	deleteTooltip?: string;
}
export const Delete = ({ remove, title, deleteTooltip }: IDelete) => {
	const { t } = useTranslation();
	return (
		<Tooltip
			placement={"right"}
			title={
				deleteTooltip
					? deleteTooltip
					: t(translationPath(lang.common.delete).path)
			}
		>
			<Popconfirm
				title={title}
				onConfirm={() => remove()}
				okText={t(translationPath(lang.common.yes).path)}
				cancelText={t(translationPath(lang.common.no).path)}
				placement="left"
			>
				<IconButton iconOnly type="button">
					<FontAwesomeIcon icon={faTrash as IconProp} color={"red"} />
				</IconButton>
			</Popconfirm>
		</Tooltip>
	);
};
