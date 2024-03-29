import { Tooltip } from 'antd';
import { get } from 'lodash';
import * as React from 'react';
import Moment from 'react-moment';
import { formatCurrency } from 'src/utils/currencyFormat';
import styled from 'styled-components';

import { Clone, Delete, Download, Link, Lock } from '../../../../../components/Button';
import FormikRow from '../../../../../components/Optimify/Form/FormikRow';
import { ActionsColumn, Table, TABLE_STYLE_CONDENSED } from '../../../../../components/Optimify/Table';
import { Input } from '../../../../../constants/enum';
import {
    CardEndTableWrapper,
    Center,
    ContentCard,
    ContentRow,
    ContentSpaceBetween,
    GridItem,
    GridRow,
    Title,
} from '../../../../../constants/globalStyles';
import { Routes } from '../../../../../constants/routes';
import { CreateJobFromFile } from '../../../../../sagas/CreateJobFromFile';
import { CreateJobFromTrussFile } from '../../../../../sagas/CreateJobFromFile/_types';
import { deleteJobAction, unlockJobAction } from '../../../../../sagas/Fetch/actions';
import { EditTruss, OpenTruss } from '../../../../../sagas/Truss/_actions';
import { lang, t, WithTranslation, withTranslation } from '../../../../../translation/i18n';
import { Folder, Job, Project, ProjectProxy, TreeType, TrussExe } from '../../../../../types/_types';
import { getPath, translationPath } from '../../../../../utils/getPath';
import { getStatusIcons, Status } from '../../../Sidebar/components/Icons';
import { DeleteJob, RequestDownloadLink, Unlock } from '../../Job/_types';
import { NameColumn, StatusBox, VerticalScroll } from './_styles';
import EditJob from './components/EditJob';
import NewJob from './components/NewJob';
import { IAddJsonToProject } from './File/_types';

export interface OwnProps {
	activeTree: TreeType;
	project: Project;
	formik: any;
	editTruss: ( data: EditTruss ) => void;
	createTruss: ( data: OpenTruss ) => void;
	addJsonRequest: ( data: IAddJsonToProject ) => void;
	duplicate: ( data: string ) => void;
	removeJob: ( data: DeleteJob ) => void;
	history: any;
	duplicateId: string;
	duplicatePending: boolean;
	setSelectedKeys: ( data: string[] ) => void;
	setExpandedKeys: ( data: string[] ) => void;
	createJobFromTrussFile?: ( data: CreateJobFromTrussFile ) => void;
	unlockJob: ( data: Unlock ) => void;
	equal: ( var1: Project, var2: Project, location?: any ) => boolean;
	leavingGuard: ( callback ) => void;
	folders: Folder;
	downloadJob: ( data: RequestDownloadLink ) => void;
}

const Index = ( props: WithTranslation & OwnProps ) => {
	const {
		activeTree,
		formik,
		project,
		createTruss,
		editTruss,
		duplicate,
		removeJob,
		duplicateId,
		duplicatePending,
		setSelectedKeys,
		setExpandedKeys,
		createJobFromTrussFile,
		unlockJob,
		leavingGuard,
		folders,
		downloadJob,
	} = props;

	const duplicateProjectJob = ( id: string ) => {
		duplicate( id );
	};

	const removeJobCall = ( id: string, projectId: string ) => {
		removeJob( deleteJobAction( id, projectId, activeTree ) );
	};

	const stateOptions = new Map<string, string>( [
		["Finished", t( translationPath( lang.common.done ) )],
		["InProgress", t( translationPath( lang.common.inProgress ) )],
		["Aborted", t( translationPath( lang.common.canceled ) )],
	] );

	const typeOptions = new Map<string, string>( [
		["Quotation", t( translationPath( lang.common.priceOffer ) )],
		["Construction", t( translationPath( lang.common.output ) )],
	] );

	const routeJob = ( parent: Job ) => {
		setSelectedKeys( [parent.Id] );
		setExpandedKeys( [project.Id] );
		props.history.push( Routes.TREE_LINK_JOB + parent.Id );
	};

	const unlock = ( project: string, job: string ) => {
		unlockJob( unlockJobAction( project, job ) );
	};

	const download = ( id: string, name: string ) => {
		let options = {
			title: "Truss Project Manager",
			defaultPath:
				folders && folders?.downloads
					? folders?.downloads + `\\${ name }.tr3`
					: `C:\\${ name }.tr3`,
			buttonLabel: "Save",
		};
		const { remote } = window.require( "electron" );
		const WIN = remote.getCurrentWindow();
		remote.dialog.showSaveDialog( WIN, options ).then( ( result ) => {
			if ( result.filePath && id ) {
				downloadJob( { Id: id, Path: result.filePath } );
			}
		} );
	};

	return (
		<GridRow columns={1}>
			<GridItem>
				<ContentCard>
					<ContentSpaceBetween>
						<Title>{t( translationPath( lang.common.jobs ) )}</Title>
						<ContentRow>
							<CreateJobFromFile
								projectName={get( project, getPath( ProjectProxy.Name ) )}
								projectId={get( project, getPath( ProjectProxy.Id ) )}
								createJobFromTrussFile={createJobFromTrussFile}
							/>
							<NewJob
								projectId={get( project, getPath( ProjectProxy.Id ) )}
								openTruss={createTruss}
								trussExe={TrussExe.TRUSS_3D}
								projectName={get( project, getPath( ProjectProxy.Name ) )}
							/>
							{/* <NewJob
								projectId={get(project, getPath(ProjectProxy.Id))}
								openTruss={openTruss}
								trussExe={TrussExe.TRUSS_2D}
								projectName={get(project, getPath(ProjectProxy.Name))}
							/> */}
						</ContentRow>
					</ContentSpaceBetween>
					<CardEndTableWrapper>
						<VerticalScroll>
							<Table
								style={TABLE_STYLE_CONDENSED}
								headers={[
									t( translationPath( lang.common.status ) ),
									t( translationPath( lang.common.jobName ) ),
									t( translationPath( lang.common.assessment ) ),
									t( translationPath( lang.common.description ) ),
									t( translationPath( lang.common.type ) ),
									t( translationPath( lang.common.state ) ),
									t( translationPath( lang.common.lastChange ) ),
									t( translationPath( lang.common.price ) ),
									t( translationPath( lang.common.actions ) ),
								]}
								sortable={[false, false, false, false, false, false, false]}
								data={
									project
										? project.Jobs.map( ( value: Job, index: number ) => {
											return [
												value.JobState,
												value.JobName,
												null,
												value.Description,
												value.Type,
												value.State,
												value.LastChange,
												value.Price,
												value,
												value,
											];
										} )
										: []
								}
								renderers={[
									( value: any, key: number, parent: Job ) => {
										return (
											<Box color={value}>
												<Tooltip
													key={key}
													color={"#108ee9"}
													title={t(
														translationPath( lang.common["treeTooltip" + value] )
													)}
													placement={"right"}
												>
													{getStatusIcons( Status[value] as any )}
												</Tooltip>
											</Box>
										);
									},
									( value: any, key: number, parent: Job ) => {
										return (
											<NameColumn>
												<FormikRow
													formik={formik}
													name={`Jobs.${ key }.JobName`}
													type={Input.TEXT}
													titleWidth={0}
												/>
											</NameColumn>
										);
									},
									( value: any, key: number, parent: Job ) => {
										return (
											<Center>
												<StatusBox status={parent.Status} />
											</Center>
										);
									},
									( value: any, key: number, parent: Job ) => {
										return (
											<FormikRow
												formik={formik}
												name={`Jobs.${ key }.Description`}
												type={Input.TEXT}
												titleWidth={0}
											/>
										);
									},

									( value: any, key: number, parent: Job ) => {
										return (
											<FormikRow
												formik={formik}
												name={`Jobs.${ key }.Type`}
												type={Input.SELECT}
												options={
													stateOptions
														? Array.from( typeOptions ).map(
															( option: [string, string], n: number ) => {
																return {
																	value: option[0],
																	label: option[1],
																};
															}
														)
														: []
												}
												titleWidth={0}
												selectDirection={"up"}
											/>
										);
									},
									( value: any, key: number, parent: Job ) => {
										return (
											<FormikRow
												formik={formik}
												name={`Jobs.${ key }.State`}
												type={Input.SELECT}
												options={
													typeOptions
														? Array.from( stateOptions )?.map(
															( option: [string, string], n: number ) => {
																return {
																	value: option[0],
																	label: option[1],
																};
															}
														)
														: []
												}
												titleWidth={0}
												selectDirection={"up"}
											/>
										);
									},
									( value: any, key: number, parent: Job ) => {
										return <Moment format="DD/MM/YYYY">{value}</Moment>;
									},
									( value: any, key: number, parent: Job ) => {
										return formatCurrency( value );
									},
									( value: any, key: number, parent: Job ) => {
										return (
											<ActionsColumn>
												<EditJob
													openTruss={props.editTruss}
													id={parent.Id}
													project={project}
													trussExe={
														parent.TrussType === TrussExe.TRUSS_2D
															? TrussExe.TRUSS_2D
															: TrussExe.TRUSS_3D
													}
													projectName={project.Name}
													jobName={value.JobName}
													leavingGuard={leavingGuard}
												/>
												&nbsp;
												<Clone
													pending={
														duplicatePending && duplicateId === parent.Id
													}
													clone={() =>
														leavingGuard( () => duplicateProjectJob( parent.Id ) )
													}
												/>
												&nbsp;
												<Link link={() => routeJob( parent )} />
												{!!value?.Lock && (
													<>
														&nbsp;
														<Lock
															unlock={() =>
																leavingGuard(
																	unlock( project.Name, parent.JobName )
																)
															}
														/>
													</>
												)}
												&nbsp;
												<Download
													download={() => download( parent.Id, parent.JobName )}
												/>
												&nbsp;
												<Delete
													title={t( translationPath( lang.remove.job ), {
														name: parent.JobName,
													} )}
													remove={() =>
														leavingGuard( () =>
															removeJobCall( parent && parent.Id, project.Id )
														)
													}
												/>
											</ActionsColumn>
										);
									},
								]}
							/>
						</VerticalScroll>
					</CardEndTableWrapper>
				</ContentCard>
			</GridItem>
		</GridRow>
	);
};

export default withTranslation()( Index );

export const Box = styled.div<{ color: string; }>`
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	color: ${ ( props ) => props.theme.colors.status[props.color] };
	font-size: 0.7rem;
	font-weight: 400;
	padding: 1px;
	white-space: nowrap;

	svg {
		margin-top: -1px;
		margin-right: 3px;
		margin-bottom: -1px;

		font-size: 1rem;

		&:last-of-type {
			margin-right: 6px;
		}
	}
`;
