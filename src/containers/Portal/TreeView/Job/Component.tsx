import General from './General/Container';
import Loading from '../../../../components/Optimify/Loading';
import Material from './Material/Container';
import ProtectedRoute from '../../../../components/ProtectedRoute';
import Quotations from './Quotations/Container';
import React from 'react';
import Trusses from './Trusses/Container';
import Viewer from './Viewer/Container';
import { HubComponent } from './HubComponent';
import { JobType, TreeType } from '../../../../types/_types';
import { MainTree } from '../../_styles';
import { OpenTruss } from '../../../../sagas/Truss/_actions';
import { Routes } from '../../../../constants/routes';
import { translationPath } from '../../../../utils/getPath';
import {
	RouteComponentProps,
	Switch,
	useLocation,
	useParams,
} from "react-router-dom";
import {
	lang,
	t,
	WithTranslation,
	withTranslation,
} from "../../../../translation/i18n";
import {
	DeleteJob,
	JobRootObject,
	JobsSelectedRequest,
	ProjectNameJobName,
	Unlock,
} from "./_types";
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
	editTruss: (data: OpenTruss) => void;
	jobImageByName: (data: ProjectNameJobName) => void;
	setJob: (data: JobRootObject) => void;
	unlockJob: (data: Unlock) => void;
	setLoading: (data: boolean) => void;
}

const Index = ({
	jobHub,
	setJob,
	job,
	removeJob,
	getJobImage,
	editTruss,
	setLoading,
	unlockJob,
	loadingPage,
}: WithTranslation & StateProps & DispatchProps & RouteComponentProps) => {
	const { id } = useParams<{ id: string; type?: string }>();
	const location = useLocation();

	return (
		<HubComponent id={id} jobHub={jobHub} setLoading={setLoading}>
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
						<ProtectedRoute
							path={Routes.TREE_JOB_MODEL_VIEWER}
							exact
							component={Viewer}
						/>
						<ProtectedRoute exact path={Routes.TREE_JOB} component={General} />
					</Switch>
				</Loading>
			</MainTree>
		</HubComponent>
	);
};

export default withTranslation()(Index);
