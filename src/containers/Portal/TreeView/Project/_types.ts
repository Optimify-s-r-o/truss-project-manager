import { createProxy } from '../../../../utils/getPath';
import { Fetch, Project } from '../../../../types/_types';

export interface IProjectUpdate extends Fetch {
  data: Project;
}

export interface IProjectDuplicate extends Fetch {}

export interface ProjectFileRequest extends Fetch {}

export interface ProjectLogsRequest extends Fetch {}

export interface ProjectLog {
  ProjectId: string;
  Project: string;
  Date: string;
  User: string;
  UserId: string;
  ActionType: string;
  Status: string;
  AssignedUser: string;
  AssignedUserId: string;
  JobId: string;
  Job: string;
  File: string;
  FileId: string;
  Customer: string;
  CustomerId: string;
  CustomerType: string;
  ConstructionDateChanged: boolean;
  QuotationDateChanged: boolean;
  DescriptionChanged: boolean;
  NameChanged: boolean;
  StateChanged: boolean;
  TypeChanged: boolean;
  DeletedJobName: string;
  OldJobId: string;
  OldJob: string;
  NewJobId: string;
  NewJob: string;
  NewState: string;
  NewType: string;
  OldState: string;
  OldType: string;
  NewName: string;
  NewDescription: string;
  OldDescription: string;
  OldName: string;
  NewQuotationDate: string;
  OldQuotationDate: string;
  NewConstructionDate: string;
  OldConstructionDate: string;
  JobName: string;
}

export interface IFileDate {
  Id: string;
  Files: any;
}

export interface ProjectUploadFileRequest extends Fetch {
  data: IFileDate;
}

export interface QuotationCalculate {
  id?: string;
  recursiveRecreate?: boolean;
  templateId: string;
  entityId: string;
  type: string;
}

export interface ProjectFile {
  Creation: string;
  Directories: any[];
  Files: FileContent[];
  LastEdit: string;
  Name: string;
  Parent: string;
  Size: string;
}

export type FileContent = {
  Path: string;
  LastEdit: string;
  Name: string;
  Extension: string;
  Size: number;
};

export const ProjectFileProxy = createProxy<ProjectFile>();
