import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCopy } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';
import { useToasts } from 'react-toast-notifications';
import { Icon } from 'src/components/Icon';
import { IconButton } from 'src/components/Optimify/Button';
import { ContentRow } from 'src/constants/globalStyles';
import { RequestDownloadLink } from 'src/containers/Portal/TreeView/Job/_types';
import styled from 'styled-components';

import Tooltip from '../../../../../../../components/Optimify/Tooltip';
import { lang, t, WithTranslation, withTranslation } from '../../../../../../../translation/i18n';
import { Project } from '../../../../../../../types/_types';
import { translationPath } from '../../../../../../../utils/getPath';

export interface OwnProps {
	leavingGuard?: (callback) => void;
	id: string;
	title?: string;
	project?: Project;
	jobName: string;
	projectName: string;
    contextMenu?: boolean;
	downloadJob?: ( data: RequestDownloadLink ) => void;
	token: string;
}

export interface CopyJobFileLink {
	jobName: string;
}

const Index: FC<WithTranslation & OwnProps> = ({
	title,
	id,
	contextMenu,
	jobName,
	projectName,
    leavingGuard,
	downloadJob,
	token
}) => {
	
	const { addToast } = useToasts();

    const handleCopy = async () => {
		const apiUrl = `${ process.env.REACT_APP_BACKEND_API }/api/v1/jobs/${ id }/download-link`;

		const response = await fetch( apiUrl, {
			headers: {
				Authorization: `Bearer ${ token }`
			}
		} );
	
		const data: any = await response.json();
	
		if ( !response?.ok || !data?.Url ) return;
			addToast(  "message"  )
			const { clipboard } = window.require("electron");
			clipboard.writeText(data?.Url, "selection");
		
	}

	return (
		<div>
			{contextMenu ? (
				<ContentRow onClick={async () => await handleCopy()}>
					<span>{title}</span>
					<Icon icon={faCopy} />
				</ContentRow>
			) : (
				<Tooltip
								title={t(translationPath(lang.common.clipboard))}
								placement={"bottom"}
							>
								<IconButton
									type="button"
									iconOnly
									onClick={async () => await handleCopy()}
								>
									<FontAwesomeIcon icon={faCopy as IconProp} color={"black"} />
								</IconButton>
							</Tooltip>
			)}
		</div>
	);
};

export const Exe = styled.div`
	margin-top: 14px;
	margin-left: 7px;
	color: ${(props) => props.theme.colors.primary.default};
	font-size: 0.6rem;
`;

export default withTranslation()(Index);
