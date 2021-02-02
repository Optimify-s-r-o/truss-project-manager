import * as React from 'react';
import { Customer, CustomerProxy } from '../../../types/_types';
import { get } from 'lodash';
import { getPath, translationPath } from '../../../utils/getPath';
import { Job, SearchRootObject } from '../FastNavigation/_types';
import { Project } from '../FastNavigation/_types';
import { Routes } from '../../../constants/routes';
import { SRoute } from '../_styles';
import { useHistory } from 'react-router-dom';
import {
	CardEndTableWrapper,
	Content,
	ContentCard,
	GridItem,
	GridRow,
	Header1,
	Header2,
	MaterialTitleSection,
} from "../../../constants/globalStyles";
import {
	lang,
	t,
	WithTranslation,
	withTranslation,
} from "../../../translation/i18n";
import {
	ScrollableTable,
	TABLE_STYLE_CONDENSED,
} from "../../../components/Optimify/Table";

export interface StateProps {
	routerState: any;
	pending: boolean;
	searched: SearchRootObject;
}

export interface DispatchProps {
	searchRequest: (data: string) => void;
	setSelectedKeys: (data: string[]) => void;
	setExpandedKeys: (data: string[]) => void;
}

const Component = ({
	pending,
	searched,
	searchRequest,
	setSelectedKeys,
	setExpandedKeys,
}: WithTranslation & StateProps & DispatchProps) => {
	const history = useHistory();

	const routeToProject = (id: string) => () => {
		setSelectedKeys([id]);
		history.push(Routes.TREE_LINK_PROJECT + id);
	};

	const routeToJob = (projectId: string, id: string) => () => {
		setSelectedKeys([id]);
		setExpandedKeys([projectId]);
		history.push(Routes.TREE_LINK_JOB + id);
	};

	const routeToCustomer = (parent: any) => () => {
		setSelectedKeys([
			get(parent, getPath(CustomerProxy.Company.Id))
				? get(parent, getPath(CustomerProxy.Company.Id))
				: get(parent, getPath(CustomerProxy.Evidence.Id))
				? get(parent, getPath(CustomerProxy.Evidence.Id))
				: get(parent, getPath(CustomerProxy.Person.Id)),
		]);
		history.push({
			pathname: get(parent, getPath(CustomerProxy.Company.Id))
				? Routes.LINK_NEW_LEGAL_CUSTOMER +
				  get(parent, getPath(CustomerProxy.Company.Id))
				: get(parent, getPath(CustomerProxy.Evidence.Id))
				? Routes.LINK_NEW_EVIDENCE_CUSTOMER +
				  get(parent, getPath(CustomerProxy.Evidence.Id))
				: Routes.LINK_NEW_NATURAL_CUSTOMER +
				  get(parent, getPath(CustomerProxy.Person.Id)),
		});
	};

	return (
		<Content>
			<Header1>{t(translationPath(lang.common.find))}</Header1>

			<GridRow columns={3}>
				<GridItem>
					<ContentCard>
						<MaterialTitleSection>
							<Header2>{t(translationPath(lang.common.projects))}</Header2>
						</MaterialTitleSection>

						<CardEndTableWrapper>
							<ScrollableTable
								style={TABLE_STYLE_CONDENSED}
								height={320}
								headers={[
									t(translationPath(lang.common.name)),
									t(translationPath(lang.common.description)),
								]}
								data={
									searched &&
									searched.Projects &&
									searched.Projects?.map((value: Project, index: number) => {
										return [value.Name, value.Description, value];
									})
								}
								renderers={[
									(value: any, key: number, parent: Project) => {
										return (
											<SRoute onClick={routeToProject(parent.Id)}>
												{value}
											</SRoute>
										);
									},
									(value: any, key: number, parent: Project) => {
										return value;
									},
								]}
							/>
						</CardEndTableWrapper>
					</ContentCard>
				</GridItem>
				<GridItem>
					<ContentCard>
						<MaterialTitleSection>
							<Header2>{t(translationPath(lang.common.jobs))}</Header2>
						</MaterialTitleSection>
						<CardEndTableWrapper>
							<ScrollableTable
								style={TABLE_STYLE_CONDENSED}
								height={320}
								headers={[
									t(translationPath(lang.common.jobName)),
									t(translationPath(lang.common.projectName)),
								]}
								data={
									searched &&
									searched.Jobs &&
									searched.Jobs?.map((value: Job, key: number) => {
										return [value.JobName, value.Project, value];
									})
								}
								renderers={[
									(value: any, key: number, parent: Job) => {
										return (
											<SRoute onClick={routeToJob(value.ProjectId, parent.Id)}>
												{value}
											</SRoute>
										);
									},
									(value: any, key: number, parent: Job) => {
										return value;
									},
								]}
							/>
						</CardEndTableWrapper>
					</ContentCard>
				</GridItem>
				<GridItem>
					<ContentCard>
						<MaterialTitleSection>
							<Header2>{t(translationPath(lang.common.customers))}</Header2>
						</MaterialTitleSection>
						<CardEndTableWrapper>
							<ScrollableTable
								style={TABLE_STYLE_CONDENSED}
								height={320}
								headers={[t(translationPath(lang.common.name))]}
								data={
									searched &&
									searched.Customers &&
									searched.Customers?.map((value: Customer, key: number) => {
										const name = get(value, getPath(CustomerProxy.Company.Id))
											? get(value, getPath(CustomerProxy.Company.Name))
											: get(value, getPath(CustomerProxy.Evidence.Id))
											? get(value, getPath(CustomerProxy.Evidence.Name))
											: get(value, getPath(CustomerProxy.Person.Forename)) +
											  " " +
											  get(value, getPath(CustomerProxy.Person.Surname));
										return [name, value];
									})
								}
								renderers={[
									(value: any, key: number, parent: Customer) => {
										return (
											<SRoute onClick={routeToCustomer(parent)}>{value}</SRoute>
										);
									},
								]}
							/>
						</CardEndTableWrapper>
					</ContentCard>
				</GridItem>
			</GridRow>
		</Content>
	);
};

export default withTranslation()(Component);
