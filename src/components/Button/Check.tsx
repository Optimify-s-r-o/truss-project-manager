import React from 'react';
import Tooltip from '../Optimify/Tooltip';
import { faCheck } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { lang } from '../../translation/i18n';
import { translationPath } from '../../utils/getPath';
import { useTranslation } from 'react-i18next';
import { VariableActionIcon } from '../../containers/Portal/Quotations/_styles';
interface ICheck {
	check: any;
}
export const Check = ({ check }: ICheck) => {
	const { t } = useTranslation();
	return (
		<Tooltip
			title={t(translationPath(lang.templates.saveTitle).path)}
			placement={"top"}
		>
			<VariableActionIcon onClick={() => check()}>
				<FontAwesomeIcon icon={faCheck} color={"green"} />
			</VariableActionIcon>
		</Tooltip>
	);
};
