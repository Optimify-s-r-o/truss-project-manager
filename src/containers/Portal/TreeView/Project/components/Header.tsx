import Navigation from '../../../../../components/NavigationLink';
import NewJob from '../General/components/NewJob';
import { Delete } from '../../../../../components/Button';
import { DeleteProject } from '../../../Project/_types';
import { deleteProjectRoute } from '../../../../../sagas/Fetch/actions';
import { faFolder } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { get } from 'lodash';
import { getPath, translationPath } from '../../../../../utils/getPath';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { lang } from '../../../../../translation/i18n';
import { OpenTruss } from '../../../../../sagas/Truss/_actions';
import { Phase } from '../../../../../components/Phase';
import { Project, ProjectProxy, TrussExe } from '../../../../../types/_types';
import { Routes } from '../../../../../constants/routes';
import { useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
	faDatabase,
	faInfo,
	faMoneyBillWave,
} from "@fortawesome/pro-solid-svg-icons";
import {
	PageHeader,
	PageTitle,
	PageTitleActions,
	TitleName,
	TitleSection,
} from "../../../../../constants/globalStyles";

export interface ProjectHeader {
	removeProject: (data: DeleteProject) => void;
	createTruss: (data: OpenTruss) => void;
	project: Project;
	leavingGuard?: (callback) => void;
}

export const Header = ({
	project,
	removeProject,
	createTruss,
	leavingGuard,
}: ProjectHeader) => {
	const { id } = useParams<{ id: string; type?: string }>();
	const { t } = useTranslation();
	const location = useLocation();

	const removeProjectCall = (id: string) => {
		leavingGuard(() => removeProject(deleteProjectRoute(id)));
	};

	return (
		<PageHeader>
			<PageTitle>
				<TitleSection>
					<FontAwesomeIcon icon={faFolder as IconProp} color={"#fff"} />
					<TitleName>{project?.Name}</TitleName>
					{project?.Phases && (
						<Phase phase={project?.Phases?.filter((value) => value != "")} />
					)}
				</TitleSection>
				<PageTitleActions>
					<NewJob
						projectId={project?.Id}
						openTruss={createTruss}
						trussExe={TrussExe.TRUSS_3D}
						projectName={get(project, getPath(ProjectProxy.Name))}
						leavingGuard={leavingGuard}
					/>
					<Delete
						title={t(translationPath(lang.remove.project).path, {
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
							pathname: Routes.TREE_LINK_PROJECT + id + "/general/persist",
						},
						active:
							location.pathname.includes("general") ||
							(!location.pathname.includes("log") &&
								!location.pathname.includes("quotations")),
						text: t(translationPath(lang.common.general).path),
						icon: faInfo,
					},
					{
						to: {
							pathname: Routes.TREE_LINK_PROJECT + id + "/log/persit",
						},
						active: location.pathname.includes("log"),
						text: t(translationPath(lang.common.log).path),
						icon: faDatabase,
					},
					{
						to: Routes.TREE_LINK_PROJECT + id + "/quotations/persist",
						active: location.pathname.includes("quotations"),
						text: t(translationPath(lang.common.quotation).path),
						icon: faMoneyBillWave,
					},
				]}
			/>
		</PageHeader>
	);
};
