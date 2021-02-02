import React from 'react';
import Tooltip from '../Optimify/Tooltip';
import { faDownload } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { lang } from '../../translation/i18n';
import { translationPath } from '../../utils/getPath';
import { useTranslation } from 'react-i18next';
import { VariableActionIcon } from '../../containers/Portal/Quotations/_styles';

interface IDownload {
	download: any;
	title?: string;
	tooltipTitle?: string;
}

export const DownloadPure = ({ download, title, tooltipTitle }: IDownload) => {
	const { t } = useTranslation();
	return (
		<Tooltip
			title={
				tooltipTitle
					? tooltipTitle
					: t(translationPath(lang.common.download).path)
			}
			placement={"top"}
		>
			<VariableActionIcon onClick={(e) => download()}>
				<FontAwesomeIcon icon={faDownload} color={"#26a350"} />
				{title && title}
			</VariableActionIcon>
		</Tooltip>
	);
};
