import Logs from './Logs';
import React, { useEffect } from 'react';
import { Customer, Project, TreeType } from '../../../../../types/_types';
import { CustomersAll } from '../../../Lists/Customers/_types';
import { getProjectLog } from '../../../../../sagas/Fetch/actions';
import { MainTreeContent, TreeContent, TreeScreen } from '../../../_styles';
import { ProjectFile, ProjectLog, ProjectLogsRequest } from '../_types';
import { RouteComponentProps, useParams } from 'react-router-dom';
import { Settings } from '../../../../../types/_types';
import { UserData } from '../../../Accounts/_types';
import {
	WithTranslation,
	withTranslation,
} from "../../../../../translation/i18n";
export interface StateProps {
	all: CustomersAll[];
	activeTree: TreeType;
	project: Project;
	routerState: any;
	users: UserData[];
	settings: Settings;
	customers: Customer[];
	pending: boolean;
	files: ProjectFile[];
	history: any;
	logs: ProjectLog[];
}

export interface DispatchProps {
	downloadFile: (data: string) => void;
	getLogs: (data: ProjectLogsRequest) => void;
}

export interface JobName {
	jobName: string;
}
const Index = (
	props: WithTranslation & StateProps & DispatchProps & RouteComponentProps
) => {
	const { logs, downloadFile, getLogs } = props;
	const { id } = useParams<{ id: string }>();

	useEffect(() => {
		if (id) {
			getLogs(getProjectLog(id));
		}
	}, [id]);

	return (
		<MainTreeContent>
			<TreeScreen>
				<TreeContent>
					<Logs logs={logs} downloadFile={downloadFile} />
				</TreeContent>
			</TreeScreen>
		</MainTreeContent>
	);
};

export default withTranslation()(Index);
