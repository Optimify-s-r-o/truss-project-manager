import { TrussExe } from '../../types/_types';

export interface CreateJobFromTrussFile {
  projectName: string;
  jobName: string;
  projectId: string;
  trussExe: string;
  fileType: TrussExe;
  path: string;
}
