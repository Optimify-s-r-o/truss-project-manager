import React from 'react';
import styled from 'styled-components';
import { ExclamationCircleFilled } from '@ant-design/icons';
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
	hasProject: boolean;
	name: string;
}
export const DeleteCustomer = ({ remove, hasProject, name }: IDelete) => {
	const { t } = useTranslation();
	return (
		<Tooltip
			placement={"right"}
			title={t(translationPath(lang.common.delete).path)}
		>
			{hasProject ? (
				<SPopconfirm
					title={t(translationPath(lang.remove.customerHasProject).path, {
						name: name,
					})}
					onConfirm={null}
					okText={t(translationPath(lang.common.ok).path)}
					cancelButtonProps={{ style: { display: "none" } }}
					cancelText={null}
					icon={<ExclamationCircleFilled style={{ color: "red" }} />}
					placement="left"
				>
					<IconButton iconOnly type="button">
						<FontAwesomeIcon icon={faTrash as IconProp} color={"red"} />
					</IconButton>
				</SPopconfirm>
			) : (
				<Popconfirm
					title={t(translationPath(lang.remove.customer).path, {
						name: name,
					})}
					onConfirm={() => remove()}
					okText={t(translationPath(lang.common.yes).path)}
					cancelText={t(translationPath(lang.common.no).path)}
					icon={<ExclamationCircleFilled style={{ color: "orange" }} />}
					placement="left"
				>
					<IconButton iconOnly type="button">
						<FontAwesomeIcon icon={faTrash as IconProp} color={"red"} />
					</IconButton>
				</Popconfirm>
			)}
		</Tooltip>
	);
};

const SPopconfirm = styled(Popconfirm)`
	.ant-popover-buttons:first {
		display: none !important;
	}
`;
