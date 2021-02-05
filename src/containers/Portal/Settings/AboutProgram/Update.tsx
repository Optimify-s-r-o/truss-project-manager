import * as React from 'react';
import logo from '../../../../img/icon.png';
import styled from 'styled-components';
import { Box } from '../../../../components/Box';
import { Button, Space, Spin } from 'antd';
import { LoadingOutlined, WindowsOutlined } from '@ant-design/icons';
import { State } from './Component';
import { useTranslation } from 'react-i18next';
import {
	ContentRow,
	GridItem,
	GridRow,
} from "../../../../constants/globalStyles";

export interface Update {
	currentAppVersion: string;
	updateApp: () => void;
	versionToDownload: string;
	updatingState: State;
}
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export const Update = ({
	currentAppVersion,
	updatingState,
	versionToDownload,
	updateApp,
}: Update) => {
	const { t } = useTranslation();

	return (
		<GridRow columns={1}>
			<GridItem fill>
				<Box title="Aktualizace">
					<AlertBox>
						<Logo src={logo} />
						{updatingState === State.PENDING ? (
							<Message>Checking for updates...</Message>
						) : updatingState === State.NEW_VERSION_TO_DOWNLOAD ? (
							<>
								<VersionInfo>
									New version found: {versionToDownload}
								</VersionInfo>
								<Downloading>Downloading the update...</Downloading>
							</>
						) : updatingState === State.DOWNLOADED ? (
							<Message>Update successfully downloaded.</Message>
						) : updatingState === State.UPDATING ? (
							<Message>Updating...</Message>
						) : updatingState === State.IS_UPDATED ? (
							<Message>Updating...</Message>
						) : updatingState === State.FAILURE ? (
							<Message>Error</Message>
						) : (
							""
						)}
						{(updatingState === State.PENDING ||
							updatingState === State.UPDATING ||
							updatingState === State.NEW_VERSION_TO_DOWNLOAD) && (
							<Space direction="vertical" size="large">
								<Spin indicator={antIcon} />
							</Space>
						)}
						{updatingState === State.DOWNLOADED && (
							<Space direction="vertical" size="large">
								<SButton
									size="middle"
									type="primary"
									icon={<WindowsOutlined />}
									onClick={() => updateApp()}
								>
									Quit & Install now
								</SButton>
							</Space>
						)}
					</AlertBox>
				</Box>
			</GridItem>
		</GridRow>
	);
};

const Logo = styled.img`
	width: 120px;
`;

const Downloading = styled.span`
	color: ${(props) => props.theme.colors.secondaryText.default};
	margin: 0.3em 0 1.3em 0;
`;

const VersionInfo = styled.span`
	color: ${(props) => props.theme.colors.secondaryText.default};
	margin-top: 1.3em 0 0.3em 0;
`;
const Message = styled.span`
	color: ${(props) => props.theme.colors.secondaryText.default};
	margin: 1.3em 0;
`;

const AlertBox = styled(ContentRow)`
	flex-direction: column;
	margin: 1em 0;
	.anticon svg {
		background: transparent;
	}
`;

const SButton = styled(Button)`
	margin: 0.7em 0 0.4em 0;
	.anticon svg {
		background: transparent;
	}
`;
