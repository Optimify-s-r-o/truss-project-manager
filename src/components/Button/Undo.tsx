import React from 'react';
import Tooltip from '../Optimify/Tooltip';
import { faUndo } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { lang } from '../../translation/i18n';
import { translationPath } from '../../utils/getPath';
import { useTranslation } from 'react-i18next';
import { VariableActionIcon } from '../../containers/Portal/Quotations/_styles';
interface IUndo {
	undo: any;
}
export const Undo = ({ undo }: IUndo) => {
	const { t } = useTranslation();
	return (
		<Tooltip
			title={t(translationPath(lang.templates.cancelEdit).path)}
			placement={"top"}
		>
			<VariableActionIcon onClick={() => undo()}>
				<FontAwesomeIcon icon={faUndo} color={"#adad13"} />
			</VariableActionIcon>
		</Tooltip>
	);
};
