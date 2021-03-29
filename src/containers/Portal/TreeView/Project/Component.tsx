import General from './General/Container';
import Loading from '../../../../components/Optimify/Loading';
import Log from './Log/Container';
import ProtectedRoute from '../../../../components/ProtectedRoute';
import Quotations from './Quotations/Container';
import React from 'react';
import { DeleteProject } from '../../Project/_types';
import { deleteProjectRoute } from '../../../../sagas/Fetch/actions';
import { HubComponent } from './HubComponent';
import { MainTree } from '../../_styles';
import { OpenTruss } from '../../../../sagas/Truss/_actions';
import { Project, TreeType } from '../../../../types/_types';
import { ProjectFile, ProjectFileRequest } from './_types';
import { Routes } from '../../../../constants/routes';
import { SelectedProjectsRequest } from '../Projects/_types';
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
export interface StateProps {
	activeTree: TreeType;
	pending: boolean;
	project: Project;
	routerState: any;
	files: ProjectFile[];
	token: string;
	local: boolean;
	selectedKeys?: string[];
	projectHub: any;
	filesUploading: boolean;
	loadingPage: boolean;
}

export interface DispatchProps {
	selectedProjectRequest: (data: SelectedProjectsRequest) => void;
	getFiles: (data: ProjectFileRequest) => void;
	removeProject: (data: DeleteProject) => void;
	createTruss: (data: OpenTruss) => void;
	setProject: (data: Project) => void;
	setSelectedKeys: (data: string[]) => void;
	setLoading: (data: boolean) => void;
}

const Index = ({
	project,
	removeProject,
	createTruss,
	activeTree,
	selectedKeys,
	setSelectedKeys,
	projectHub,
	loadingPage,
	setLoading,
}: WithTranslation & DispatchProps & StateProps & RouteComponentProps) => {
	const { id } = useParams<{ id: string; type?: string }>();
	const location = useLocation();

	React.useEffect(() => {
		if (
			location.pathname &&
			location.pathname.includes(Routes.TREE_LINK_PROJECT) &&
			!selectedKeys?.includes(id)
		) {
			setSelectedKeys([id]);
		}
	}, [location.pathname, id]);

	const removeProjectCall = (id: string) => {
		removeProject(deleteProjectRoute(id));
	};

	return (
		<HubComponent id={id} projectHub={projectHub} setLoading={setLoading}>
			<MainTree>
				<Loading
					text={t(translationPath(lang.common.loading))}
					pending={loadingPage}
					margin
				>
					<Switch>
						<ProtectedRoute
							exact
							path={Routes.TREE_PROJECT_GENERAL}
							component={General}
						/>
						<ProtectedRoute
							exact
							path={Routes.TREE_PROJECT_LOG}
							component={Log}
						/>
						<ProtectedRoute
							exact
							path={Routes.TREE_PROJECT}
							component={General}
						/>
						<ProtectedRoute
							path={Routes.TREE_PROJECT_QUOTATIONS}
							exact
							component={Quotations}
						/>
					</Switch>
				</Loading>
			</MainTree>
		</HubComponent>
	);
};

export default withTranslation()(Index);
