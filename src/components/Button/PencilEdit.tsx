import React from 'react';
import Tooltip from '../Optimify/Tooltip';
import { faPencil } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { lang } from '../../translation/i18n';
import { translationPath } from '../../utils/getPath';
import { useTranslation } from 'react-i18next';
import { VariableActionIcon } from '../../containers/Portal/Quotations/_styles';
interface IPencilEdit {
	edit: any;
	title?: string;
	tooltipTitle?: string;
}
export const PencilEdit = ({ edit, title, tooltipTitle }: IPencilEdit) => {
	const { t } = useTranslation();

	const handleOnClick = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		edit();
	};
	return (
		<Tooltip
			title={
				tooltipTitle
					? tooltipTitle
					: t(translationPath(lang.templates.renameVariable).path)
			}
			placement={"top"}
		>
			<VariableActionIcon onClick={handleOnClick}>
				<FontAwesomeIcon icon={faPencil} color={"#346ef1eb"} />
				{title && title}
			</VariableActionIcon>
		</Tooltip>
	);
};
