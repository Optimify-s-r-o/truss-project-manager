import { createProxy } from '../../../../../utils/getPath';
import { FetchStateType } from '../../../../../types/_types';

export interface Viewer {
	Id: string;
	JobId: string;
	Url: string;
	Uploaded: string;
	UploadedBy: string;
	Exists: boolean;
}

export const ViewerProxy = createProxy<Viewer>();

export type ViewerStateType = FetchStateType &
	Readonly<{
		models: Viewer;
	}>;

export interface ViewerRequest {
	Id: string;
}
