import * as React from 'react';
import logo from '../../../../img/icon.png';
import styled from 'styled-components';
import { Box } from '../../../../components/Box';
import { Button, Space, Spin } from 'antd';
import { lang } from '../../../../translation/i18n';
import { State } from './Component';
import { translationPath } from '../../../../utils/getPath';
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
				<Box title={t(translationPath(lang.updates.title).path)}>
					<AlertBox>
						<Logo src={logo} />
						{updatingState === State.PENDING ? (
							<Message>
								{t(translationPath(lang.updates.checkingForUpdates).path)}
							</Message>
						) : updatingState === State.NEW_VERSION_TO_DOWNLOAD ? (
							<>
								<Info>
									{t(translationPath(lang.updates.newVersionFound).path)} v
									{versionToDownload}
								</Info>
							</>
						) : updatingState === State.DOWNLOADED ? (
							<Message>
								{t(translationPath(lang.updates.downloaded).path)}
							</Message>
						) : updatingState === State.UPDATING ? (
							<>
								<Info>{t(translationPath(lang.updates.updating).path)}</Info>
								<Description>
									{t(translationPath(lang.updates.notification).path)}
								</Description>
							</>
						) : updatingState === State.IS_UPDATED ? (
							<Message>
								{t(translationPath(lang.updates.upToDate).path)}{" "}
								<CheckCircleOutlined
									style={{ marginLeft: 2, color: "#52c41a" }}
								/>
							</Message>
						) : updatingState === State.FAILURE ? (
							<Message> {t(translationPath(lang.updates.error).path)}</Message>
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
									{t(translationPath(lang.updates.download).path)}
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
