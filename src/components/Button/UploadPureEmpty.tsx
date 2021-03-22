import React from 'react';
import styled from 'styled-components';
import { faUpload } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { VariableAdd } from '../../containers/Portal/Quotations/_styles';

interface IUpload {
	upload: any;
	title: string;
}
export const UploadPureEmpty = ({ upload, title }: IUpload) => {
	return (
		<VariableActionIcon onClick={(e) => upload()}>
			<FontAwesomeIcon icon={faUpload} color={"#666"} width={19} height={19} />
			{title && title}
		</VariableActionIcon>
	);
};

export const VariableActionIcon = styled(VariableAdd)`
	color: ${(props) => props.theme.colors.secondaryText.hover};

	svg {
		margin: 0 0.5rem -2px 0;

		font-size: 1.25rem;
	}
`;
