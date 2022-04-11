import React from 'react';
import { RouteComponentProps, Switch, useLocation, useParams } from 'react-router-dom';

import Loading from '../../../../components/Optimify/Loading';
import ProtectedRoute from '../../../../components/ProtectedRoute';
import { Routes } from '../../../../constants/routes';
import { lang, t, WithTranslation, withTranslation } from '../../../../translation/i18n';
import { JobType, TreeType } from '../../../../types/_types';
import { translationPath } from '../../../../utils/getPath';
import { MainTree } from '../../_styles';
import { DeleteJob, JobRootObject, JobsSelectedRequest, ProjectNameJobName, Unlock } from './_types';
import General from './General/Container';
import { HubComponent } from './HubComponent';
import Material from './Material/Container';
import Quotations from './Quotations/Container';
import Trusses from './Trusses/Container';

const signalRMsgPack = require("@microsoft/signalr-protocol-msgpack");
export interface StateProps {
	activeTree: TreeType;
	routerState: any;
	pending: boolean;
	job: JobType;
	local: boolean;
	token: string;
	jobHub: any;
	loadingPage: boolean;
}

export interface DispatchProps {
	jobRequest: (data: JobsSelectedRequest) => void;
	getJobImage: (data: string) => void;
	removeJob: (data: DeleteJob) => void;
	jobImageByName: (data: ProjectNameJobName) => void;
	setJob: (data: JobRootObject) => void;
	unlockJob: (data: Unlock) => void;
	setLoading: (data: boolean) => void;
	modelsGetAction: (data: string) => void;
}

const Index = ({
	jobHub,
	setLoading,
	loadingPage,
	modelsGetAction,
}: WithTranslation & StateProps & DispatchProps & RouteComponentProps) => {
	const { id } = useParams<{ id: string; type?: string }>();
	const location = useLocation();

	return (
		<HubComponent
			id={id}
			jobHub={jobHub}
			setLoading={setLoading}
			modelsGetAction={modelsGetAction}
		>
			<MainTree>
				<Loading
					text={t(translationPath(lang.common.loading))}
					pending={loadingPage}
					margin
				>
					<Switch>
						<ProtectedRoute
							exact
							path={Routes.TREE_JOB_MATERIAL}
							component={Material}
						/>
						<ProtectedRoute
							exact
							path={Routes.TREE_JOB_GENERAL}
							component={General}
						/>
						<ProtectedRoute
							path={Routes.TREE_JOB_QUOTATIONS}
							exact
							component={Quotations}
						/>
						<ProtectedRoute
							path={Routes.TREE_JOB_TRUSSES}
							exact
							component={Trusses}
						/>
						<ProtectedRoute exact path={Routes.TREE_JOB} component={General} />
					</Switch>
				</Loading>
			</MainTree>
		</HubComponent>
	);
};

export default withTranslation()(Index);
