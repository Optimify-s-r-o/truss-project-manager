import React from 'react';
import Tooltip from '../Optimify/Tooltip';
import { faMinusCircle } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { lang } from '../../translation/i18n';
import { Popconfirm } from 'antd';
import { translationPath } from '../../utils/getPath';
import { useTranslation } from 'react-i18next';
import { VariableActionIcon } from '../../containers/Portal/Quotations/_styles';
interface ICircleRemove {
	remove: any;
	title?: string;
	popTitle?: string;
	tooltipTitle?: string;
}
export const CircleRemove = ({
	remove,
	popTitle,
	title,
	tooltipTitle,
}: ICircleRemove) => {
	const { t } = useTranslation();
	return (
		<Tooltip
			title={
				tooltipTitle
					? tooltipTitle
					: t(translationPath(lang.templates.deleteVariable).path)
			}
			placement={"top"}
		>
			<Popconfirm
				title={
					popTitle
						? popTitle
						: t(translationPath(lang.templates.warningQuotation).path)
				}
				onConfirm={remove}
				okText={t(translationPath(lang.common.yes).path)}
				cancelText={t(translationPath(lang.common.no).path)}
			>
				<VariableActionIcon>
					<FontAwesomeIcon icon={faMinusCircle} color={"#e03838"} />
					{title && title}
				</VariableActionIcon>
			</Popconfirm>
		</Tooltip>
	);
};
