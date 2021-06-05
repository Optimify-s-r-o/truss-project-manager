import React from 'react';
import Tooltip from '../Optimify/Tooltip';
import { BinType } from 'src/containers/Portal/Bin/_types';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { faTrashAlt } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '../Optimify/Button';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { lang } from '../../translation/i18n';
import { Popconfirm } from 'antd';
import { translationPath } from '../../utils/getPath';
import { useTranslation } from 'react-i18next';

interface IEmptyBin {
	remove: any;
	type: BinType;
}
export const EmptyBin = ({ remove, type }: IEmptyBin) => {
	const { t } = useTranslation();
	return (
		<Tooltip
			placement={"top"}
			title={t(
				translationPath(
					type === BinType.PROJECT
						? lang.common.emptyProjectBin
						: lang.common.emptyJobBin
				).path
			)}
		>
			<Popconfirm
				title={t(translationPath(lang.remove.bin).path)}
				onConfirm={() => remove()}
				icon={<ExclamationCircleFilled style={{ color: "red" }} />}
				okText={t(translationPath(lang.common.yes).path)}
				cancelText={t(translationPath(lang.common.no).path)}
				placement="left"
			>
				<IconButton iconOnly type="button">
					<FontAwesomeIcon icon={faTrashAlt as IconProp} color={"red"} />
				</IconButton>
			</Popconfirm>
		</Tooltip>
	);
};
