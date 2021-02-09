import General from './General/Container';
import Loading from '../../../../components/Optimify/Loading';
import Log from './Log/Container';
import Navigation from '../../../../components/NavigationLink';
import NewJob from './General/components/NewJob';
import Quotations from './Quotations/Container';
import React from 'react';
import { Delete } from '../../../../components/Button';
import { DeleteProject } from '../../Project/_types';
import { deleteProjectRoute } from '../../../../sagas/Fetch/actions';
import { faFolder } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { get } from 'lodash';
import { getPath, translationPath } from '../../../../utils/getPath';
import { HubComponent } from './HubComponent';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { MainTree } from '../../_styles';
import { OpenTruss } from '../../../../sagas/Truss/_actions';
import { Phase } from '../../../../components/Phase';
import { ProjectFile, ProjectFileRequest } from './_types';
import { Routes } from '../../../../constants/routes';
import { SelectedProjectsRequest } from '../Projects/_types';
import {
	faDatabase,
	faInfo,
	faMoneyBillWave,
} from "@fortawesome/pro-solid-svg-icons";
import {
	Route,
	RouteComponentProps,
	Switch,
	useLocation,
	useParams,
} from "react-router-dom";
import {
	PageHeader,
	PageTitle,
	PageTitleActions,
	TitleName,
	TitleSection,
} from "../../../../constants/globalStyles";
import {
	lang,
	t,
	WithTranslation,
	withTranslation,
} from "../../../../translation/i18n";
import {
	Fetch,
	Page,
	Project,
	ProjectProxy,
	TreeType,
	TrussExe,
} from "../../../../types/_types";
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
	getUsers: (data: Fetch) => void;
	getCustomers: (data: Page) => void;
	removeProject: (data: DeleteProject) => void;
	createTruss: (data: OpenTruss) => void;
	setProject: (data: Project) => void;
	setSelectedKeys: (data: string[]) => void;
	clearEvidenceAction: (data: void) => void;
	setLoading: (data: void) => void;
}

const Index = ({
	getFiles,
	getUsers,
	getCustomers,
	project,
	setProject,
	removeProject,
	createTruss,
	token,
	activeTree,
	filesUploading,
	selectedKeys,
	setSelectedKeys,
	projectHub,
	loadingPage,
	clearEvidenceAction,
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
		return () => {
			clearEvidenceAction();
		};
	}, [location.pathname, id]);

	const removeProjectCall = (id: string) => {
		removeProject(deleteProjectRoute(id, activeTree));
	};

	return (
		<HubComponent id={id} projectHub={projectHub} setLoading={setLoading}>
			<MainTree>
				<Loading
					text={t(translationPath(lang.common.loading))}
					pending={loadingPage}
					margin
				>
					<PageHeader>
						<PageTitle>
							<TitleSection>
								<FontAwesomeIcon icon={faFolder as IconProp} color={"#fff"} />
								<TitleName>{project?.Name}</TitleName>
								{project?.Phases && <Phase phase={project?.Phases} />}
							</TitleSection>
							<PageTitleActions>
								<NewJob
									projectId={project?.Id}
									openTruss={createTruss}
									trussExe={TrussExe.TRUSS_3D}
									projectName={get(project, getPath(ProjectProxy.Name))}
								/>
								{/* <NewJob
								projectId={project?.Id}
								openTruss={openTruss}
								trussExe={TrussExe.TRUSS_2D}
								projectName={get(project, getPath(ProjectProxy.Name))}
							/> */}
								<Delete
									title={t(translationPath(lang.remove.project), {
										name: project?.Name,
									})}
									remove={() =>
										removeProjectCall(get(project, getPath(ProjectProxy.Id)))
									}
								/>
							</PageTitleActions>
						</PageTitle>
						<Navigation
							items={[
								{
									to: {
										pathname:
											Routes.TREE_LINK_PROJECT + id + "/general/persist",
									},
									active:
										location.pathname.includes("general") ||
										(!location.pathname.includes("log") &&
											!location.pathname.includes("quotations")),
									text: t(translationPath(lang.common.general)),
									icon: faInfo,
								},
								{
									to: {
										pathname: Routes.TREE_LINK_PROJECT + id + "/log/persit",
									},
									active: location.pathname.includes("log"),
									text: t(translationPath(lang.common.log)),
									icon: faDatabase,
								},
								{
									to: Routes.TREE_LINK_PROJECT + id + "/quotations/persist",
									active: location.pathname.includes("quotations"),
									text: t(translationPath(lang.common.quotation)),
									icon: faMoneyBillWave,
								},
							]}
						/>
					</PageHeader>
					<Switch>
						<Route
							exact
							path={Routes.TREE_PROJECT_GENERAL}
							component={General}
						/>
						<Route exact path={Routes.TREE_PROJECT_LOG} component={Log} />
						<Route exact path={Routes.TREE_PROJECT} component={General} />
						<Route
							path={Routes.TREE_PROJECT_QUOTATIONS}
							exact
							component={Quotations}
							routerState={location.pathname}
						/>
					</Switch>
				</Loading>
			</MainTree>
		</HubComponent>
	);
};

export default withTranslation()(Index);
