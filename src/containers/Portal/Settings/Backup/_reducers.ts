import { getType } from 'typesafe-actions';

import { backupType, createBackup, setBackupDownloadingText } from './_actions';
import { BackupRequestStateType } from './_types';

const initialState: BackupRequestStateType = {
  error: null,
  pending: false,
  list: null,
  status: 0,
  downloadingText: ""
};

export default (
  state: BackupRequestStateType = initialState,
  action: backupType
): BackupRequestStateType => {
  switch (action.type) {
    case getType(createBackup.request):
      return {
        ...initialState,
        error: null,
        pending: true
      };
    case getType(createBackup.success):
      return {
        ...initialState,
        list: action.payload,
        pending: false,
        status: 1
      };
    case getType(createBackup.failure):
      return {
        ...initialState,
        error: action.payload?.ErrorMessage,
        pending: false,
        status: 2
      };
      case getType(setBackupDownloadingText):
      return {
        ...state,
        downloadingText: action.payload,
      };
    default:
      return state;
  }
};
