import EditJob from '../Project/General/components/EditJob';
import General from './General/Container';
import Loading from '../../../../components/Optimify/Loading';
import Material from './Material/Container';
import Navigation from '../../../../components/NavigationLink';
import Quotations from './Quotations/Container';
import React, { useState } from 'react';
import Trusses from './Trusses/Container';
import Viewer from './Viewer/Container';
import { Delete, Lock } from '../../../../components/Button';
import { faCube } from '@fortawesome/pro-duotone-svg-icons';
import { faHomeLgAlt, faMountains } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { get } from 'lodash';
import { getPath, translationPath } from '../../../../utils/getPath';
import { HubComponent } from './HubComponent';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { JobType, TreeType } from '../../../../types/_types';
import { MainTree } from '../../_styles';
import { OpenTruss } from '../../../../sagas/Truss/_actions';
import { Phase } from '../../../../components/Phase';
import { Routes } from '../../../../constants/routes';
import {
	faInfo,
	faInventory,
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
	deleteJobRoute,
	unlockJobAction,
} from "../../../../sagas/Fetch/actions";
import {
	lang,
	t,
	WithTranslation,
	withTranslation,
} from "../../../../translation/i18n";
import {
	DeleteJob,
	JobProxy,
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
	jobs: JobType;
	local: boolean;
	token: string;
	jobHub: any;
}

export interface DispatchProps {
	jobRequest: (data: JobsSelectedRequest) => void;
	getJobImage: (data: string) => void;
	removeJob: (data: DeleteJob) => void;
	editTruss: (data: OpenTruss) => void;
	jobImageByName: (data: ProjectNameJobName) => void;
	setJob: (data: JobRootObject) => void;
	unlockJob: (data: Unlock) => void;
}

const Index = ({
	jobHub,
	setJob,
	jobs,
	removeJob,
	getJobImage,
	editTruss,
	token,
	unlockJob,
	local,
}: WithTranslation & StateProps & DispatchProps & RouteComponentProps) => {
	const { id } = useParams<{ id: string; type?: string }>();
	const [loading, setLoading] = useState<boolean>(true);
	const location = useLocation();

	const removeJobCall = (id: string) => {
		removeJob(deleteJobRoute(id));
	};

	const handleJob = () => {
		getJobImage(id);
	};

	const unlock = () => {
		unlockJob(unlockJobAction(jobs.Project, jobs.JobName));
	};

	return (
		<HubComponent
			id={id}
			jobHub={jobHub}
			setJob={setJob}
			getJobImage={getJobImage}
			setLoading={setLoading}
		>
			<MainTree>
				<Loading
					text={t(translationPath(lang.common.loading))}
					pending={loading}
					margin
				>
					<PageHeader>
						<PageTitle>
							<TitleSection>
								<FontAwesomeIcon icon={faHomeLgAlt as IconProp} />
								<TitleName>{jobs?.JobName}</TitleName>
								{jobs?.Phases && <Phase phase={jobs?.Phases} />}
							</TitleSection>
							<PageTitleActions>
								<EditJob
									openTruss={editTruss}
									id={get(jobs, getPath(JobProxy.Id))}
									trussExe={jobs?.TrussType}
									jobName={jobs?.JobName}
									projectName={jobs?.Project}
								/>
								{!!jobs?.Lock && <Lock unlock={() => unlock()} />}

								<Delete
									title={t(translationPath(lang.remove.job), {
										name: jobs?.JobName,
									})}
									remove={() => removeJobCall(get(jobs, getPath(JobProxy.Id)))}
								/>
							</PageTitleActions>
						</PageTitle>
						<Navigation
							items={[
								{
									to: Routes.TREE_LINK_JOB + id + "/general/persist",
									active:
										location.pathname.includes("general") ||
										(!location.pathname.includes("material") &&
											!location.pathname.includes("viewer") &&
											!location.pathname.includes("trusses") &&
											!location.pathname.includes("quotations")),
									text: t(translationPath(lang.common.general)),
									icon: faInfo,
								},
								{
									to: Routes.TREE_LINK_JOB + id + "/material/persist",
									active: location.pathname.includes("material"),
									text: t(translationPath(lang.common.material)),
									icon: faInventory,
								},
								{
									to: Routes.TREE_LINK_JOB + id + "/trusses/persist",
									active: location.pathname.includes("trusses"),
									text: t(translationPath(lang.common.trusses)),
									icon: faMountains,
								},
								{
									to: Routes.TREE_LINK_JOB + id + "/viewer",
									active: location.pathname.includes("viewer"),
									text: t(translationPath(lang.common.viewer)),
									icon: faCube,
								},
								{
									to: Routes.TREE_LINK_JOB + id + "/quotations/persist",
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
							path={Routes.TREE_JOB_MATERIAL}
							component={Material}
							routerState={location.pathname}
						/>
						<Route
							exact
							path={Routes.TREE_JOB_GENERAL}
							component={General}
							routerState={location.pathname}
						/>
						<Route
							path={Routes.TREE_JOB_QUOTATIONS}
							exact
							component={Quotations}
							routerState={location.pathname}
						/>
						<Route
							path={Routes.TREE_JOB_TRUSSES}
							exact
							component={Trusses}
							routerState={location.pathname}
						/>
						<Route
							path={Routes.TREE_JOB_MODEL_VIEWER}
							exact
							component={Viewer}
							routerState={location.pathname}
						/>
						<Route
							exact
							path={Routes.TREE_JOB}
							component={General}
							routerState={location.pathname}
						/>
					</Switch>
				</Loading>
			</MainTree>
		</HubComponent>
	);
};

export default withTranslation()(Index);
