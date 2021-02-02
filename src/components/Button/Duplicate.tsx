import React from 'react';
import Tooltip from '../Optimify/Tooltip';
import { faClone } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { lang } from '../../translation/i18n';
import { translationPath } from '../../utils/getPath';
import { useTranslation } from 'react-i18next';
import { VariableActionIcon } from '../../containers/Portal/Quotations/_styles';
interface IDuplicate {
	duplicate: any;
	title?: string;
	tooltipTitle?: string;
}
export const Duplicate = ({ duplicate, title, tooltipTitle }: IDuplicate) => {
	const { t } = useTranslation();
	return (
		<Tooltip
			title={
				tooltipTitle
					? tooltipTitle
					: t(translationPath(lang.templates.renameVariable).path)
			}
			placement={"top"}
		>
			<VariableActionIcon onClick={(e) => duplicate()}>
				<FontAwesomeIcon icon={faClone} color={"#f1a009"} />
				{title && title}
			</VariableActionIcon>
		</Tooltip>
	);
};
