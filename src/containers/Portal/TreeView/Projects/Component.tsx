import * as React from 'react';
import Export from '../../../../components/Export';
import Loading from '../../../../components/Optimify/Loading';
import { ApiURL } from '../../../../constants/api';
import { faHomeLgAlt } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { get } from 'lodash';
import { getPath, translationPath } from '../../../../utils/getPath';
import { getSelectedProjects } from './_actions';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Method } from '../../../../constants/enum';
import { RouteComponentProps, useParams } from 'react-router-dom';
import { SelectedProjectsRequest } from './_types';
import { TableTitle } from '../../_styles';
import { useEffect } from 'react';
import {
	ScrollableTable,
	TABLE_STYLE_CONDENSED,
} from "../../../../components/Optimify/Table";
import {
	CardEndTableWrapper,
	ContentCard,
	ContentSpaceBetween,
	GridItem,
	GridRow,
	Main,
	PageHeader,
	PageTitle,
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
	JobRootObject,
	JobsProxy,
	NailPlate,
	Planks,
} from "../../../../types/_types";

export interface StateProps {
	routerState: any;
	pending: boolean;
	jobs: JobRootObject;
}

export interface DispatchProps {
	selectedProjectsRequest: (data: SelectedProjectsRequest) => void;
}

const Index = (
	props: WithTranslation & StateProps & DispatchProps & RouteComponentProps
) => {
	const { selectedProjectsRequest } = props;
	const { id } = useParams<{ id: string }>();
	useEffect(() => {
		if (id) {
			selectedProjectsRequest({
				action: getSelectedProjects,
				url: ApiURL.PROJECTS_SELECTION,
				method: Method.GET,
				param: { projects: id },
			});
		}
	}, [id]);

	return (
		<Main>
			<Loading
				text={t(translationPath(lang.common.loading))}
				pending={props.pending}
				margin
			>
				<PageHeader>
					<PageTitle>
						<TitleSection>
							<FontAwesomeIcon icon={faHomeLgAlt as IconProp} color={"#fff"} />
							<TitleName>
								{get(props.jobs, getPath(JobsProxy.Name))?.map(
									(value: string, key: number) =>
										value +
										(get(props.jobs, getPath(JobsProxy.Name))?.length == key + 1
											? " "
											: ", ")
								)}
							</TitleName>
						</TitleSection>
					</PageTitle>
				</PageHeader>
				<GridRow columns={2}>
					<GridItem>
						<ContentCard>
							<ContentSpaceBetween>
								<TableTitle>
									{t(translationPath(lang.common.nailPlates))}
								</TableTitle>
								<Export
									name={
										props.jobs?.Name?.map((value) => value).join(",") +
										"-" +
										t(translationPath(lang.common.nailPlates))
									}
									data={get(props.jobs, getPath(JobsProxy.NailPlates))}
									structure={[
										{
											label: t(translationPath(lang.common.name)),
											valueName: "Name",
										},
										{
											label: t(translationPath(lang.common.platesCount)),
											valueName: "Count",
										},
									]}
								/>
							</ContentSpaceBetween>
							<CardEndTableWrapper>
								<ScrollableTable
									style={TABLE_STYLE_CONDENSED}
									height={200}
									headers={[
										t(translationPath(lang.common.name)),
										t(translationPath(lang.common.count)),
									]}
									sortable={[true, true]}
									data={
										get(props.jobs, getPath(JobsProxy.NailPlates)) &&
										get(props.jobs, getPath(JobsProxy.NailPlates))?.map(
											(value: NailPlate, key: number) => {
												return [value.Name, value.Count, value];
											}
										)
									}
									renderers={[
										(value: any, key: number, parent: NailPlate) => {
											return value;
										},
										(value: any, key: number, parent: NailPlate) => {
											return value;
										},
									]}
								/>
							</CardEndTableWrapper>
						</ContentCard>
					</GridItem>
					<GridItem>
						<ContentCard>
							<ContentSpaceBetween>
								<TableTitle>
									{t(translationPath(lang.common.planks))}
								</TableTitle>
								<Export
									name={
										props.jobs?.Name?.map((value) => value).join(",") +
										"-" +
										t(translationPath(lang.common.planks))
									}
									data={get(props.jobs, getPath(JobsProxy.Planks))}
									structure={[
										{
											label: t(translationPath(lang.common.thickness)),
											valueName: "B",
										},
										{
											label: t(translationPath(lang.priceLists.width)),
											valueName: "H",
										},
										{
											label: t(translationPath(lang.common.length)),
											valueName: "Length",
										},
										{
											label: t(translationPath(lang.common.quality)),
											valueName: "Quality",
										},
										{
											label: t(translationPath(lang.common.count)),
											valueName: "Quantity",
										},
									]}
								/>
							</ContentSpaceBetween>
							<CardEndTableWrapper>
								<ScrollableTable
									style={TABLE_STYLE_CONDENSED}
									height={200}
									headers={[
										t(translationPath(lang.common.thickness)),
										t(translationPath(lang.priceLists.width)),
										t(translationPath(lang.common.length)),
										t(translationPath(lang.common.quality)),
										t(translationPath(lang.common.count)),
									]}
									sortable={[true, true, true, true, true]}
									data={
										get(props.jobs, getPath(JobsProxy.Planks)) &&
										get(props.jobs, getPath(JobsProxy.Planks))?.map(
											(value: Planks, key: number) => {
												return [
													value.B,
													value.H,
													value.Length,
													value.Quality,
													value.Quantity,
													value,
												];
											}
										)
									}
									renderers={[
										(value: any, key: number, parent: Planks) => {
											return value;
										},
										(value: any, key: number, parent: Planks) => {
											return value;
										},
										(value: any, key: number, parent: Planks) => {
											return value;
										},
										(value: any, key: number, parent: Planks) => {
											return value;
										},
										(value: any, key: number, parent: Planks) => {
											return value;
										},
									]}
								/>
							</CardEndTableWrapper>
						</ContentCard>
					</GridItem>
				</GridRow>
			</Loading>
		</Main>
	);
};

export default withTranslation()(Index);
