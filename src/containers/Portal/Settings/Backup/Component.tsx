import * as React from 'react';
import {faDatabase} from '@fortawesome/pro-light-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {lang} from '../../../../translation/i18n';
import {translationPath} from '../../../../utils/getPath';
import {Backup} from './Backup';
import {useTranslation} from 'react-i18next';
import {ContentRow, PageHeader, PageTitle, TitleName, TitleSection,} from "../../../../constants/globalStyles";
import {MainTree, MainTreeContent, TreeContent, TreeScreen,} from "../../_styles";
import {BackupRequest} from "./_types";

export interface StateProps {
    status: number;
    pending: boolean;
    downloadingText: string;
}

export interface DispatchProps {
    createBackup: (data: BackupRequest) => void;
}

export const Component = ({downloadingText, createBackup, pending, status}: StateProps & DispatchProps) => {
    const {t} = useTranslation();

    return (
        <MainTree>
            <PageHeader>
                <PageTitle>
                    <TitleSection>
                        <ContentRow>
                            <FontAwesomeIcon icon={faDatabase as IconProp}/>
                            <TitleName>
                                {t(translationPath(lang.settings.backup).path)}
                            </TitleName>
                        </ContentRow>
                    </TitleSection>
                </PageTitle>
            </PageHeader>
            <MainTreeContent>
                <TreeScreen>
                    <TreeContent>
                        <Backup createBackup={createBackup} status={status} pending={pending}
                                downloadingText={downloadingText}/>
                    </TreeContent>
                </TreeScreen>
            </MainTreeContent>
        </MainTree>
    );
};

export default Component;
