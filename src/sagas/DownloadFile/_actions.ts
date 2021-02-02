import { createAsyncAction } from 'typesafe-actions';

export const download = createAsyncAction(
	"DOWNLOAD_FILE_REQUEST",
	"DOWNLOAD_FILE_SUCCESS",
	"DOWNLOAD_FILE_FAILURE"
)<FileRequest, string, Error>();

export const fileChangeRootPath = createAsyncAction(
	"FILE_CHANGE_ROOTPATH_REQUEST",
	"FILE_CHANGE_ROOTPATH_SUCCESS",
	"FILE_CHANGE_ROOTPATH_FAILURE"
)<string, void, Error>();

export interface FileRequest {
	id: string;
	path?: string;
	type: FileOperation;
}

export enum FileOperation {
	DOWNLOAD,
	OPEN,
}
