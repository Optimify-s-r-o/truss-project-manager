import {ActionType, createAction, createAsyncAction} from 'typesafe-actions';
import {Error} from '../../../../sagas/_sagas';
import {BackupRequest, BackupResponse} from "./_types";

export const createBackup = createAsyncAction(
    "CREATE_BACKUP_REQUEST",
    "CREATE_BACKUP_SUCCESS",
    "CREATE_BACKUP_FAILURE"
)<BackupRequest, BackupResponse, Error>();

export const setBackupDownloadingText = createAction("SET_BACKUP_DOWNLOADING_TEXT")<string>();

export type backupType = ActionType<typeof createBackup | typeof setBackupDownloadingText>;

