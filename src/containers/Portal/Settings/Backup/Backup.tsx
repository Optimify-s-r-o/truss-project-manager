import * as React from 'react';
import logo from '../../../../img/icon.png';
import styled from 'styled-components';
import {Box} from '../../../../components/Box';
import {Button, Space, Spin} from 'antd';
import {lang} from '../../../../translation/i18n';
import {translationPath} from '../../../../utils/getPath';
import {useTranslation} from 'react-i18next';
import {CloudDownloadOutlined, LoadingOutlined,} from "@ant-design/icons";
import {ContentRow, GridItem, GridRow,} from "../../../../constants/globalStyles";
import isElectron from "is-electron";
import {BackupRequest} from "./_types";
import {Column} from "../../../../styles/global";

const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;

export const Backup = ({createBackup, pending, status, downloadingText}: {
    status: number;
    pending: boolean; createBackup: (data: BackupRequest) => void;
    downloadingText: string;
}) => {
    const {t} = useTranslation();
    const [trussPath, setTrussPath] = React.useState(null);

    React.useEffect(() => {
        if (isElectron()) {
            const electron = window.require("electron");
            electron.ipcRenderer.send("trussFilesPath");
            const fs = electron.remote.require("fs");
            electron.ipcRenderer.on("trussFilesPath", (event, text) => {
                setTrussPath(text);
            });
        }
    }, []);

    return (
        <GridRow columns={1}>
            <GridItem fill>
                <Box title={t(translationPath(lang.backup.title).path)}>
                    <AlertBox>
                        <Logo src={logo}/>
                        {true && (
                            <>

                                {status === 100 && <Info>{t(translationPath(lang.backup.downloaded).path)}</Info>}

                                <Message>
                                    {t(translationPath(lang.backup.description).path)}
                                    {trussPath}.
                                </Message>
                            </>
                        )}
                        {pending && <Downloading>
                            <DownloadingText>
                            {t(translationPath(lang.backup.downloading).path)}
                            </DownloadingText>
                            <Spin indicator={antIcon}/>
                        </Downloading>
                        }
                        {!pending && trussPath && <Space direction="vertical" size="large">
                            <SButton
                                size="middle"
                                type="primary"
                                icon={<CloudDownloadOutlined/>}
                                onClick={() => createBackup({directory: trussPath})}
                            >
                                {t(translationPath(lang.backup.download).path)}
                            </SButton>
                        </Space>
                        }
                    </AlertBox>
                </Box>
            </GridItem>
        </GridRow>
    );
};

const Logo = styled.img`
  width: 120px;
`;

const Downloading = styled(Column)`
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.colors.secondaryText.default};
  margin: 0.3em 0 1.3em 0;
`;

const DownloadingText = styled.span`
  margin-bottom: 15px;
`;

const Info = styled.span`
  color: ${(props) => props.theme.colors.secondaryText.default};
  margin: 1.3em 0 0.3em 0;
`;

const Message = styled.span`
  color: ${(props) => props.theme.colors.secondaryText.default};
  text-align: center;
  line-height: 18px;
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
