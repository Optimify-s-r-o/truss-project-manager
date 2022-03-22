import * as React from 'react';
import Data from '../../../../components/Data/Data';
import Export from '../../../../components/Export';
import Loading from '../../../../components/Optimify/Loading';
import { ApiURL } from '../../../../constants/api';
import { faHomeLgAlt } from '@fortawesome/pro-light-svg-icons';
import { fixed } from '../../../../utils/formating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { get } from 'lodash';
import { getSelectedProjects } from './_actions';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { JobRootObject, JobsProxy } from '../../../../types/_types';
import { Method } from '../../../../constants/enum';
import {
	Plank,
	PlankProxy,
	Plate,
	PlateProxy
	} from '../Truss/_types';
import { RouteComponentProps, useParams } from 'react-router-dom';
import { SelectedProjectsRequest } from './_types';
import { TableTitle } from '../../_styles';
import { UnitType } from '../../../../components/Data/Unit';
import { useEffect } from 'react';
import {
	ScrollableTable,
	TABLE_STYLE_CONDENSED,
} from "../../../../components/Optimify/Table";
import {
	CardEndTableWrapper,
	ContentCard,
	ContentRow,
	ContentSpaceBetween,
	GridItem,
	GridRow,
	Header2,
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
	getPath,
	lastPathMember,
	translationPath,
} from "../../../../utils/getPath";

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
							<ContentRow>
								<FontAwesomeIcon
									icon={faHomeLgAlt as IconProp}
									color={"#fff"}
								/>
								<TitleName>
									{get(props.jobs, getPath(JobsProxy.Name))?.map(
										(value: string, key: number) =>
											value +
											(get(props.jobs, getPath(JobsProxy.Name))?.length ==
											key + 1
												? " "
												: ", ")
									)}
								</TitleName>
							</ContentRow>
						</TitleSection>
					</PageTitle>
				</PageHeader>
				<GridRow columns={2}>
					<GridItem>
						<ContentCard>
							<Header2>
								{t(translationPath(lang.common.generalInformation))}
							</Header2>
							<Data
								title={t(translationPath(lang.common.totalPlatesWeight))}
								data={fixed(
									get(props.jobs, getPath(JobsProxy.PlatesWeight)),
									2
								)}
								unit={UnitType.KG}
							/>
							<Data
								title={t(translationPath(lang.common.averagePlatesWeight))}
								data={fixed(
									get(props.jobs, getPath(JobsProxy.AveragePlatesWeight)),
									2
								)}
								unit={UnitType.KG}
							/>
							<Data
								title={t(translationPath(lang.common.totalPlanksVolume))}
								data={fixed(
									get(props.jobs, getPath(JobsProxy.PlanksVolume)),
									4
								)}
								unit={UnitType.M3}
							/>
							<Data
								title={t(translationPath(lang.common.averagePlanksVolume))}
								data={fixed(
									get(props.jobs, getPath(JobsProxy.AveragePlanksVolume)),
									4
								)}
								unit={UnitType.M3}
							/>

							<Data
								title={t(translationPath(lang.common.priceTotal))}
								data={fixed(get(props.jobs, getPath(JobsProxy.Price)), 2)}
								unit={UnitType.CURRENCY}
							/>
							<Data
								title={t(translationPath(lang.common.averagePrice))}
								data={fixed(
									get(props.jobs, getPath(JobsProxy.AveragePrice)),
									2
								)}
								unit={UnitType.CURRENCY}
							/>
						</ContentCard>
					</GridItem>

					<GridItem>
						<ContentCard>
							<Header2>
								{t(translationPath(lang.common.controlInformation))}
							</Header2>
							<Data
								title={t(translationPath(lang.common.averagePlateWeightOnArea))}
								data={fixed(
									get(props.jobs, getPath(JobsProxy.PlatesWeightOnArea)),
									2
								)}
								unit={UnitType.KGM2}
							/>
							<Data
								title={t(
									translationPath(lang.common.averagePlatesWeighOnPlanksVolume)
								)}
								data={fixed(
									get(
										props.jobs,
										getPath(JobsProxy.PlatesWeightOnPlanksVolume)
									),
									2
								)}
								unit={UnitType.KGM2}
							/>
							<Data
								title={t(translationPath(lang.common.averagePriceOnPlanks))}
								data={fixed(
									get(props.jobs, getPath(JobsProxy.PriceOnPlanks)),
									2
								)}
								unit={UnitType.KCM3}
							/>
							<Data
								title={t(translationPath(lang.common.averagePriceOnArea))}
								data={fixed(get(props.jobs, getPath(JobsProxy.PriceOnArea)), 2)}
								unit={UnitType.KCM2}
							/>
						</ContentCard>
					</GridItem>
				</GridRow>
				<GridRow columns={2}>
					<GridItem>
						<ContentCard>
							<Header2>{t(translationPath(lang.common.geometry))}</Header2>
							<Data
								title={t(translationPath(lang.common.totalRoofingArea))}
								data={fixed(get(props.jobs, getPath(JobsProxy.RoofingArea)), 2)}
								unit={UnitType.M2}
							/>
							<Data
								title={t(translationPath(lang.common.averageRoofingArea))}
								data={fixed(
									get(props.jobs, getPath(JobsProxy.AverageRoofingArea)),
									2
								)}
								unit={UnitType.M2}
							/>
							<Data
								title={t(translationPath(lang.common.totalCeilingArea))}
								data={fixed(get(props.jobs, getPath(JobsProxy.CeilingArea)), 2)}
								unit={UnitType.M2}
							/>
							<Data
								title={t(translationPath(lang.common.totalCeilingArea))}
								data={fixed(
									get(props.jobs, getPath(JobsProxy.AverageCeilingArea)),
									2
								)}
								unit={UnitType.M2}
							/>
							<Data
								title={t(translationPath(lang.common.averagePitch))}
								data={fixed(get(props.jobs, getPath(JobsProxy.Pitch)), 0)}
								unit={UnitType.EMPTY}
							/>
							<Data
								title={t(translationPath(lang.common.averageCentres))}
								data={fixed(get(props.jobs, getPath(JobsProxy.Centres)), 0)}
								unit={UnitType.MM}
							/>
							<Data
								title={t(translationPath(lang.common.totalTrussTypesCountSum))}
								data={fixed(
									get(props.jobs, getPath(JobsProxy.TrussTypesCount)),
									0
								)}
								unit={UnitType.EMPTY}
							/>
							<Data
								title={t(translationPath(lang.common.totalTrussCountSum))}
								data={fixed(get(props.jobs, getPath(JobsProxy.TrussCount)), 0)}
								unit={UnitType.EMPTY}
							/>
						</ContentCard>
					</GridItem>
					<GridItem>
						<ContentCard>
							<Header2>{t(translationPath(lang.common.load))}</Header2>
							<Data
								title={t(translationPath(lang.common.averageRoofingLoad))}
								data={fixed(get(props.jobs, getPath(JobsProxy.RoofingLoad)), 2)}
								unit={UnitType.KNM2}
							/>
							<Data
								title={t(translationPath(lang.common.averageCeilingLoad))}
								data={fixed(get(props.jobs, getPath(JobsProxy.CeilingLoad)), 2)}
								unit={UnitType.KNM2}
							/>
							<Data
								title={t(translationPath(lang.common.averageSnowLoad))}
								data={fixed(get(props.jobs, getPath(JobsProxy.SnowLoad)), 2)}
								unit={UnitType.KNM2}
							/>
							<Data
								title={t(translationPath(lang.common.averageWindLoad))}
								data={fixed(get(props.jobs, getPath(JobsProxy.WindLoad)), 2)}
								unit={UnitType.KNM2}
							/>
							<Data
								title={t(translationPath(lang.common.averageUsefulInTheAttic))}
								data={fixed(get(props.jobs, getPath(JobsProxy.CeilingLoad)), 2)}
								unit={UnitType.KNM2}
							/>
						</ContentCard>
					</GridItem>
				</GridRow>
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
									data={get(props.jobs, getPath(JobsProxy.Plates))}
									structure={[
										{
											label: t(translationPath(lang.common.type)),
											valueName: lastPathMember(PlateProxy.Type).path,
										},
										{
											label: t(translationPath(lang.common.name)),
											valueName: lastPathMember(PlateProxy.Name).path,
										},
										{
											label: t(translationPath(lang.priceLists.width)),
											valueName: lastPathMember(PlateProxy.Width).path,
										},
										{
											label: t(translationPath(lang.common.length)),
											valueName: lastPathMember(PlateProxy.Length).path,
										},
										{
											label: t(translationPath(lang.common.thickness)),
											valueName: lastPathMember(PlateProxy.Thickness).path,
										},
										{
											label: t(translationPath(lang.common.count)),
											valueName: lastPathMember(PlateProxy.Count).path,
										},
									]}
								/>
							</ContentSpaceBetween>
							<CardEndTableWrapper>
								<ScrollableTable
									style={TABLE_STYLE_CONDENSED}
									height={200}
									headers={[
										t(translationPath(lang.common.type)),
										t(translationPath(lang.common.name)),
										t(translationPath(lang.priceLists.width)),
										t(translationPath(lang.common.length)),
										t(translationPath(lang.common.thickness)),
										t(translationPath(lang.common.count)),
									]}
									sortable={[true, true, true, true, true, true]}
									data={
										get(props.jobs, getPath(JobsProxy.Plates)) &&
										get(props.jobs, getPath(JobsProxy.Plates))?.map(
											(value: Plate, key: number) => {
												return [
													value.Type,
													value.Name,
													value.Width,
													value.Length,
													value.Thickness,
													value.Count,
													value,
												];
											}
										)
									}
									renderers={[
										(value: any, key: number, parent: Plate) => {
											return value;
										},
										(value: any, key: number, parent: Plate) => {
											return value;
										},
										(value: any, key: number, parent: Plate) => {
											return value;
										},
										(value: any, key: number, parent: Plate) => {
											return value;
										},
										(value: any, key: number, parent: Plate) => {
											return value;
										},
										(value: any, key: number, parent: Plate) => {
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
											valueName: lastPathMember(PlankProxy.Thickness).path,
										},
										{
											label: t(translationPath(lang.priceLists.width)),
											valueName: lastPathMember(PlankProxy.Width).path,
										},
										{
											label: t(translationPath(lang.common.length)),
											valueName: lastPathMember(PlankProxy.Length).path,
										},
										{
											label: t(translationPath(lang.common.quality)),
											valueName: lastPathMember(PlankProxy.Grade).path,
										},
										{
											label: t(translationPath(lang.common.countPerTruss)),
											valueName: lastPathMember(PlankProxy.Count).path,
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
											(value: Plank, key: number) => {
												return [
													value.Thickness,
													value.Width,
													value.Length,
													value.Grade,
													value.Count,
													value,
												];
											}
										)
									}
									renderers={[
										(value: any, key: number, parent: Plank) => {
											return value;
										},
										(value: any, key: number, parent: Plank) => {
											return value;
										},
										(value: any, key: number, parent: Plank) => {
											return value;
										},
										(value: any, key: number, parent: Plank) => {
											return value;
										},
										(value: any, key: number, parent: Plank) => {
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
