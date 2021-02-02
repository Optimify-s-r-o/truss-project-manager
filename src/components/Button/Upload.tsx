import Loader from '../Optimify/Loader';
import React from 'react';
import styled from 'styled-components';
import { faUpload } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '../Optimify/Button';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Tooltip } from 'antd';

interface IUpload {
	upload: any;
	title: string;
	tooltip?: string;
	uploading?: boolean;
}
export const Upload = ({ upload, title, uploading }: IUpload) => {
	return (
		<Tooltip title={title} placement={"top"}>
			<div>
				<IconButton type="button" iconOnly onClick={() => upload()}>
					{uploading ? (
						<LoaderWrapper iconOnly={true}>
							<Loader size={24} />
						</LoaderWrapper>
					) : (
						<FontAwesomeIcon icon={faUpload as IconProp} color={"#6d4b0c"} />
					)}
				</IconButton>
			</div>
		</Tooltip>
	);
};

export const LoaderWrapper = styled.div`
	display: inline-block;
	position: relative;
	top: -5px;
	width: 24px;
	height: 24px;
	margin: -8px 0;

	${(props) =>
		props.iconOnly &&
		`
  position: absolute;
  top: 9px;
  left: -7px
  `}
`;
