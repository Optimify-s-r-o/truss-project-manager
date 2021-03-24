import EditJob from '../../Project/General/components/EditJob';
import Navigation from '../../../../../components/NavigationLink';
import { Delete, Lock } from '../../../../../components/Button';
import { DeleteJob, JobProxy, Unlock } from '../_types';
import { faCube } from '@fortawesome/pro-duotone-svg-icons';
import { faHomeLgAlt, faMountains } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { get } from 'lodash';
import { getPath, translationPath } from '../../../../../utils/getPath';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { JobType } from '../../../../../types/_types';
import { lang } from '../../../../../translation/i18n';
import { OpenTruss } from '../../../../../sagas/Truss/_actions';
import { Phase } from '../../../../../components/Phase';
import { Routes } from '../../../../../constants/routes';
import { useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
	faInfo,
	faInventory,
	faMoneyBillWave,
} from "@fortawesome/pro-solid-svg-icons";
import {
	PageHeader,
	PageTitle,
	PageTitleActions,
	TitleName,
	TitleSection,
} from "../../../../../constants/globalStyles";
import {
	deleteJobRoute,
	unlockJobAction,
} from "../../../../../sagas/Fetch/actions";

export interface JobHeader {
	job: JobType;
	removeJob: (data: DeleteJob) => void;
	unlockJob: (data: Unlock) => void;
	leavingGuard?: (callback) => void;
	editTruss: (data: OpenTruss) => void;
}

export const Header = ({
	removeJob,
	job,
	unlockJob,
	leavingGuard,
	editTruss,
}: JobHeader) => {
	const { id } = useParams<{ id: string; type?: string }>();
	const { t } = useTranslation();
	const location = useLocation();

	const removeJobCall = (id: string) => {
		leavingGuard(() => removeJob(deleteJobRoute(id)));
	};

	const unlock = () => {
		leavingGuard(() => unlockJob(unlockJobAction(job.Project, job.JobName)));
	};
	console.log(job);
	return (
		<PageHeader>
			<PageTitle>
				<TitleSection>
					<FontAwesomeIcon icon={faHomeLgAlt as IconProp} color={"#fff"} />
					<TitleName>{job?.JobName}</TitleName>
					{job?.Phases && <Phase phase={job?.Phases} />}
				</TitleSection>
				<PageTitleActions>
					<EditJob
						openTruss={editTruss}
						id={job?.Id}
						trussExe={job?.TrussType}
						jobName={job?.JobName}
						projectName={job?.Project}
						leavingGuard={leavingGuard}
					/>
					{!!job?.Lock && <Lock unlock={() => unlock()} />}

					<Delete
						title={t(translationPath(lang.remove.job).path, {
							name: job?.JobName,
						})}
						remove={() => removeJobCall(get(job, getPath(JobProxy.Id)))}
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
						text: t(translationPath(lang.common.general).path),
						icon: faInfo,
					},
					{
						to: Routes.TREE_LINK_JOB + id + "/material/persist",
						active: location.pathname.includes("material"),
						text: t(translationPath(lang.common.material).path),
						icon: faInventory,
					},
					{
						to: Routes.TREE_LINK_JOB + id + "/trusses/persist",
						active: location.pathname.includes("trusses"),
						text: t(translationPath(lang.common.trusses).path),
						icon: faMountains,
					},
					{
						to: Routes.TREE_LINK_JOB + id + "/viewer",
						active: location.pathname.includes("viewer"),
						text: t(translationPath(lang.common.viewer).path),
						icon: faCube,
					},
					{
						to: Routes.TREE_LINK_JOB + id + "/quotations/persist",
						active: location.pathname.includes("quotations"),
						text: t(translationPath(lang.common.quotation).path),
						icon: faMoneyBillWave,
					},
				]}
			/>
		</PageHeader>
	);
};
