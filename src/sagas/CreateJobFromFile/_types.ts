import { TrussExe } from '../../types/_types';

export interface CreateJobFromTrussFile {
  jobName: string;
  projectId: string;
  trussExe: string;
  fileType: TrussExe;
  path: string;
}
