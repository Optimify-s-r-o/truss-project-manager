import React from 'react';
import { faUpload } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from 'antd';
import { VariableActionIcon } from '../../containers/Portal/Quotations/_styles';

interface IUpload {
	upload: any;
	title: string;
	tooltipTitle?: string;
}
export const UploadPure = ({ upload, title, tooltipTitle }: IUpload) => {
	return (
		<Tooltip title={tooltipTitle} placement={"top"}>
			<VariableActionIcon onClick={(e) => upload()}>
				<FontAwesomeIcon icon={faUpload} color={"#6d4b0c"} />
				{title && title}
			</VariableActionIcon>
		</Tooltip>
	);
};
