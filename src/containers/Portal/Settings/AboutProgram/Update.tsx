import * as React from 'react';
import logo from '../../../../img/icon.png';
import styled from 'styled-components';
import { Box } from '../../../../components/Box';
import { Button, Space, Spin } from 'antd';
import { State } from './Component';
import { useTranslation } from 'react-i18next';
import {
	CheckCircleOutlined,
	LoadingOutlined,
	WindowsOutlined,
} from "@ant-design/icons";
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
								<Info>New version found: {versionToDownload}</Info>
							</>
						) : updatingState === State.DOWNLOADED ? (
							<Message>Update successfully downloaded.</Message>
						) : updatingState === State.UPDATING ? (
							<>
								<Info>Updating...</Info>
								<Description>
									This may take a while. When a new update is downloaded TRUSS
									Project Manager will automatically restart.
								</Description>
							</>
						) : updatingState === State.IS_UPDATED ? (
							<Message>
								Your app is up to date.{" "}
								<CheckCircleOutlined
									style={{ marginLeft: 2, color: "#52c41a" }}
								/>
							</Message>
						) : updatingState === State.FAILURE ? (
							<Message>Error</Message>
						) : (
							""
						)}
						{(updatingState === State.PENDING ||
							updatingState === State.UPDATING) && (
							<Space direction="vertical" size="large">
								<Spin indicator={antIcon} />
							</Space>
						)}
						{updatingState === State.NEW_VERSION_TO_DOWNLOAD && (
							<Space direction="vertical" size="large">
								<SButton
									size="middle"
									type="primary"
									icon={<WindowsOutlined />}
									onClick={() => updateApp()}
								>
									Download & Install now
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

const Description = styled.span`
	color: ${(props) => props.theme.colors.secondaryText.default};
	margin: 0.3em 0 1.3em 0;
`;

const Info = styled.span`
	color: ${(props) => props.theme.colors.secondaryText.default};
	margin: 1.3em 0 0.3em 0;
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
	margin: 0.4em 0 0.4em 0;
	.anticon svg {
		background: transparent;
	}
`;
