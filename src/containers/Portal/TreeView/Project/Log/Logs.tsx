import * as React from 'react';
import Moment from 'react-moment';
import { faArrowRight } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { ProjectLog } from '../_types';
import { Routes } from '../../../../../constants/routes';
import { ScrollableTable } from '../../../../../components/Optimify/Table';
import { translationPath } from '../../../../../utils/getPath';
import {
	CardEndTableWrapper,
	ContentCard,
	ContentSpaceBetween,
	GridItem,
	GridRow,
	Title,
} from "../../../../../constants/globalStyles";
import {
	lang,
	t,
	WithTranslation,
	withTranslation,
} from "../../../../../translation/i18n";
import {
	Action,
	ChangeArrowWrapper,
	LogDetail,
	LogElement,
	LogSeparator,
} from "../General/_styles";

export interface OwnProps {
	logs: ProjectLog[];
	downloadFile: (data: string) => void;
}

const Index = (props: WithTranslation & OwnProps) => {
	const { logs, downloadFile } = props;

	const download =
		(id: string) => (_event: React.MouseEvent<HTMLElement, MouseEvent>) => {
			downloadFile(id);
		};

	const ChangeArrow = () => {
		return (
			<ChangeArrowWrapper>
				<FontAwesomeIcon icon={faArrowRight} />
			</ChangeArrowWrapper>
		);
	};

	const routeToJob = (
		name: string,
		id: string,
		projectName: string,
		jobName: string
	) => {
		return <Link to={Routes.TREE_LINK_JOB + id}>{name}</Link>;
	};

	const writeNameChange = (value: ProjectLog) => {
		return value.NameChanged ? (
			<>
				{t(translationPath(lang.common.name))}
				<LogDetail>
					{value.OldName}
					<ChangeArrow />
					{value.NewName}
				</LogDetail>
			</>
		) : (
			""
		);
	};

	const writeDescriptionChange = (value: ProjectLog) => {
		return value.DescriptionChanged ? (
			Boolean(value.OldDescription) ? (
				<>
					{t(translationPath(lang.common.description))}
					<LogDetail>
						{value.OldDescription}
						<ChangeArrow />
						{value.NewDescription}
					</LogDetail>
				</>
			) : (
				<>
					{t(translationPath(lang.common.descriptionEmptyValueSetTo))}
					<LogDetail>{value.NewDescription}</LogDetail>
				</>
			)
		) : (
			""
		);
	};

	const writeConstructionDateChange = (value: ProjectLog) => {
		return value.ConstructionDateChanged ? (
			Boolean(value.OldConstructionDate) ? (
				<>
					{t(translationPath(lang.common.constructionDate))}{" "}
					<LogDetail>
						{value.OldConstructionDate}
						<ChangeArrow />
						{value.NewConstructionDate}
					</LogDetail>
				</>
			) : (
				<>
					{t(translationPath(lang.common.constructionDateEmptyValueSetTo))}
					<LogDetail>{value.NewConstructionDate}</LogDetail>
				</>
			)
		) : (
			""
		);
	};

	const writeQuotationDateChange = (value: ProjectLog) => {
		return value.QuotationDateChanged ? (
			Boolean(value.OldQuotationDate) ? (
				<>
					{t(translationPath(lang.common.quotationDate))}
					<LogDetail>
						{value.OldQuotationDate}
						<ChangeArrow />
						{value.NewQuotationDate}
					</LogDetail>
				</>
			) : (
				<>
					{t(translationPath(lang.common.quotationDateEmptyValueSetTo))}
					<LogDetail>{value.NewQuotationDate}</LogDetail>
				</>
			)
		) : (
			""
		);
	};

	const writeJobStatusChange = (value: ProjectLog) => {
		return value.StateChanged ? (
			<>
				{t(translationPath(lang.common.state))}
				<LogDetail>
					{t(translationPath(lang.common[value.OldState]))}
					<ChangeArrow />
					{t(translationPath(lang.common[value.NewState]))}
				</LogDetail>
			</>
		) : (
			""
		);
	};

	const writeJobTypeChange = (value: ProjectLog) => {
		return value.TypeChanged ? (
			<>
				{t(translationPath(lang.common.type))}{" "}
				<LogDetail>
					{t(translationPath(lang.common[value.OldType]))}
					<ChangeArrow />
					{t(translationPath(lang.common[value.NewType]))}
				</LogDetail>
			</>
		) : (
			""
		);
	};

	const writeProjectUpdate = (value: ProjectLog) => {
		return (
			<>
				{t(translationPath(lang.common.ProjectUpdate))}
				{[
					writeNameChange(value),
					writeDescriptionChange(value),
					writeConstructionDateChange(value),
					writeQuotationDateChange(value),
				].map((e) => {
					if (e)
						return (
							<div>
								<LogSeparator />
								{e}
							</div>
						);
					else return null;
				})}
			</>
		);
	};

	const writeJobUpdate = (value: ProjectLog) => {
		return (
			<>
				{t(translationPath(lang.common.JobUpdate))}{" "}
				{routeToJob(value.Job, value.JobId, value.Project, value.JobName)}
				{[
					writeNameChange(value),
					writeDescriptionChange(value),
					writeJobTypeChange(value),
					writeJobStatusChange(value),
				].map((e) => {
					if (e)
						return (
							<div>
								<LogSeparator />
								{e}
							</div>
						);
					else return null;
				})}
			</>
		);
	};

	const writeFileSavedUnderProject = (value: ProjectLog) => {
		return (
			<>
				{t(translationPath(lang.common.FileSavedUnderProject))}
				<LogDetail>
					<Action onClick={download(value.FileId)}>{value.File}</Action>
				</LogDetail>
			</>
		);
	};

	const writeCreateProject = (value: ProjectLog) => {
		return (
			<>
				{t(translationPath(lang.common.CreateProject))}
				<LogDetail>{value.Project}</LogDetail>
			</>
		);
	};

	const writeCreateJob = (value: ProjectLog) => {
		return (
			<>
				{`${t(translationPath(lang.common.CreateJob))}`}
				<LogDetail>
					{routeToJob(value.Job, value.JobId, value.Project, value.JobName)}
				</LogDetail>
			</>
		);
	};

	const writeAssignProjectToUser = (value: ProjectLog) => {
		return (
			<>
				{t(translationPath(lang.common.AssignProjectToUser))}
				<LogDetail>{value.AssignedUser}</LogDetail>
			</>
		);
	};

	const writeAssignProjectToCustomer = (value: ProjectLog) => {
		return (
			<>
				{t(translationPath(lang.common.AssignProjectToCustomer))}
				<LogDetail>{value.Customer}</LogDetail>
			</>
		);
	};

	const writeJobDelete = (value: ProjectLog) => {
		return (
			<>
				{`${t(translationPath(lang.common.JobDelete))}`}
				<LogDetail>{value.DeletedJobName}</LogDetail>
			</>
		);
	};

	const writeJobDuplicate = (value: ProjectLog) => {
		return (
			<>
				{`${t(translationPath(lang.common.JobDuplicate))}`}
				<LogDetail>
					{routeToJob(
						value.OldJob,
						value.OldJobId,
						value.Project,
						value.JobName
					)}
					<ChangeArrow />
					{routeToJob(
						value.NewJob,
						value.NewJobId,
						value.Project,
						value.JobName
					)}
				</LogDetail>
			</>
		);
	};

	const writeFileDelete = (value: ProjectLog) => {
		return (
			<>
				{`${t(translationPath(lang.common.FileDelete))}`}
				<LogDetail>{value.File}</LogDetail>
			</>
		);
	};

	const writeJobUpdateFromTruss = (value: ProjectLog) => {
		return (
			<>
				{`${t(translationPath(lang.common.JobUpdateFromTruss))}`}
				<LogDetail>
					{routeToJob(value.Job, value.JobId, value.Project, value.JobName)}
				</LogDetail>
			</>
		);
	};

	const writeUploadModelJob = (value: ProjectLog) => {
		return (
			<>
				{`${t(translationPath(lang.common.UploadModelJob))}`}
				<LogDetail>
					{routeToJob(value.Job, value.JobId, value.Project, value.JobName)}
				</LogDetail>
			</>
		);
	};

	const projectLocationChange = (value: ProjectLog) => {
		return <>{`${t(translationPath(lang.common.projectLocationChange))}`}</>;
	};

	const getLogActionTranslation = (action: string, value: ProjectLog) => {
		switch (action) {
			case "UploadModelJob":
				return <>{writeUploadModelJob(value)}</>;
			case "ProjectLocationChange":
				return <>{projectLocationChange(value)}</>;
			case "CreateProject":
				return <>{writeCreateProject(value)}</>;
			case "CreateJob":
				return <>{writeCreateJob(value)}</>;
			case "JobUpdate":
				return <>{writeJobUpdate(value)}</>;
			case "AssignProjectToUser":
				return <>{writeAssignProjectToUser(value)}</>;
			case "FileSavedUnderProject":
				return <>{writeFileSavedUnderProject(value)}</>;
			case "AssignProjectToCustomer":
				return <>{writeAssignProjectToCustomer(value)}</>;
			case "ProjectUpdate":
				return <>{writeProjectUpdate(value)}</>;
			case "JobDelete":
				return <>{writeJobDelete(value)}</>;
			case "JobDuplicate":
				return <>{writeJobDuplicate(value)}</>;
			case "FileDelete":
				return <>{writeFileDelete(value)}</>;
			case "JobUpdateFromTruss":
				return <>{writeJobUpdateFromTruss(value)}</>;
		}
	};

	return (
		<GridRow columns={1}>
			<GridItem>
				<ContentCard>
					<ContentSpaceBetween>
						<Title>{t(translationPath(lang.common.log))}</Title>
					</ContentSpaceBetween>
					<CardEndTableWrapper>
						<ScrollableTable
							headers={[
								t(translationPath(lang.common.date)),
								t(translationPath(lang.common.user)),
								t(translationPath(lang.common.actions)),
							]}
							sortable={[true, true, true]}
							data={
								logs
									? logs.map((value: ProjectLog, index: number) => {
											return [value.Date, value.User, value.ActionType, value];
									  })
									: []
							}
							renderers={[
								(value: string, key: number, parent: ProjectLog) => {
									return <Moment format="DD/MM/YYYY HH:mm">{value}</Moment>;
								},
								(value: string, key: number, parent: ProjectLog) => {
									return parent.User;
								},
								(value: string, key: number, parent: ProjectLog) => {
									return (
										<LogElement>
											{getLogActionTranslation(parent.ActionType, parent)}
										</LogElement>
									);
								},
							]}
						/>
					</CardEndTableWrapper>
				</ContentCard>
			</GridItem>
		</GridRow>
	);
};

export default withTranslation()(Index);
