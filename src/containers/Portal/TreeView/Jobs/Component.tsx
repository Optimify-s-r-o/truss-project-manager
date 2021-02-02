import * as React from 'react';
import Data from '../../../../components/Data/Data';
import Export from '../../../../components/Export';
import Loading from '../../../../components/Optimify/Loading';
import { ApiURL } from '../../../../constants/api';
import { faHomeLgAlt } from '@fortawesome/pro-light-svg-icons';
import { fixed } from '../../../../utils/formating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { get } from 'lodash';
import { getPath, translationPath } from '../../../../utils/getPath';
import { getSelectedJobs } from './_actions';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { JobsSelectedRequest } from '../Job/_types';
import { Method } from '../../../../constants/enum';
import { RouteComponentProps, useParams } from 'react-router-dom';
import { UnitType } from '../../../../components/Data/Unit';
import { useEffect } from 'react';
import {
	PageHeader,
	PageTitle,
	TitleName,
	TitleSection,
} from "../../../../constants/globalStyles";
import {
	CardEndTableWrapper,
	ContentCard,
	ContentSpaceBetween,
	GridItem,
	GridRow,
	Header2,
	Main,
	Title,
} from "../../../../constants/globalStyles";
import {
	JobRootObject,
	JobsProxy,
	NailPlate,
	Planks,
} from "../../../../types/_types";
import {
	lang,
	t,
	WithTranslation,
	withTranslation,
} from "../../../../translation/i18n";
import {
	ScrollableTable,
	TABLE_STYLE_CONDENSED,
} from "../../../../components/Optimify/Table";

export interface StateProps {
	routerState: any;
	pending: boolean;
	jobs: JobRootObject;
}

export interface DispatchProps {
	getJobs: (data: JobsSelectedRequest) => void;
}

const Index = (
	props: WithTranslation & StateProps & DispatchProps & RouteComponentProps
) => {
	const { getJobs } = props;
	const { id } = useParams<{ id: string }>();
	useEffect(() => {
		getJobs({
			action: getSelectedJobs,
			url: ApiURL.JOBS_SELECTION,
			method: Method.GET,
			param: { jobs: id },
		});
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
							<FontAwesomeIcon icon={faHomeLgAlt as IconProp} />
							<TitleName>
								{get(props.jobs, getPath(JobsProxy.Name))?.map(
									(value: string, key: number) =>
										value +
										(get(props.jobs, getPath(JobsProxy.Name))?.length ===
										key + 1
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
							<Header2>
								{t(translationPath(lang.common.generalInformation))}
							</Header2>
							<Data
								title={t(translationPath(lang.common.totalPlatesWeight))}
								data={fixed(
									get(props.jobs, getPath(JobsProxy.General.PlatesWeight)),
									2
								)}
								unit={UnitType.KG}
							/>
							<Data
								title={t(translationPath(lang.common.averagePlatesWeight))}
								data={fixed(
									get(
										props.jobs,
										getPath(JobsProxy.General.AveragePlatesWeight)
									),
									2
								)}
								unit={UnitType.KG}
							/>
							<Data
								title={t(translationPath(lang.common.totalPlanksVolume))}
								data={fixed(
									get(props.jobs, getPath(JobsProxy.General.PlanksVolume)),
									4
								)}
								unit={UnitType.M3}
							/>
							<Data
								title={t(translationPath(lang.common.averagePlanksVolume))}
								data={fixed(
									get(
										props.jobs,
										getPath(JobsProxy.General.AveragePlanksVolume)
									),
									4
								)}
								unit={UnitType.M3}
							/>

							<Data
								title={t(translationPath(lang.common.priceTotal))}
								data={fixed(
									get(props.jobs, getPath(JobsProxy.General.Price)),
									2
								)}
								unit={UnitType.KC}
							/>
							<Data
								title={t(translationPath(lang.common.averagePrice))}
								data={fixed(
									get(props.jobs, getPath(JobsProxy.General.AveragePrice)),
									2
								)}
								unit={UnitType.KC}
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
									get(
										props.jobs,
										getPath(JobsProxy.General.PlatesWeightOnArea)
									),
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
										getPath(JobsProxy.General.PlatesWeightOnPlanksVolume)
									),
									2
								)}
								unit={UnitType.KGM2}
							/>
							<Data
								title={t(translationPath(lang.common.averagePriceOnPlanks))}
								data={fixed(
									get(props.jobs, getPath(JobsProxy.General.PriceOnPlanks)),
									2
								)}
								unit={UnitType.KCM3}
							/>
							<Data
								title={t(translationPath(lang.common.averagePriceOnArea))}
								data={fixed(
									get(props.jobs, getPath(JobsProxy.General.PriceOnArea)),
									2
								)}
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
								data={fixed(
									get(props.jobs, getPath(JobsProxy.General.RoofingArea)),
									2
								)}
								unit={UnitType.M2}
							/>
							<Data
								title={t(translationPath(lang.common.averageRoofingArea))}
								data={fixed(
									get(
										props.jobs,
										getPath(JobsProxy.General.AverageRoofingArea)
									),
									2
								)}
								unit={UnitType.M2}
							/>
							<Data
								title={t(translationPath(lang.common.totalCeilingArea))}
								data={fixed(
									get(props.jobs, getPath(JobsProxy.General.CeilingArea)),
									2
								)}
								unit={UnitType.M2}
							/>
							<Data
								title={t(translationPath(lang.common.totalCeilingArea))}
								data={fixed(
									get(
										props.jobs,
										getPath(JobsProxy.General.AverageCeilingArea)
									),
									2
								)}
								unit={UnitType.M2}
							/>
							<Data
								title={t(translationPath(lang.common.averagePitch))}
								data={fixed(
									get(props.jobs, getPath(JobsProxy.General.Pitch)),
									0
								)}
								unit={UnitType.EMPTY}
							/>
							<Data
								title={t(translationPath(lang.common.averageCentres))}
								data={fixed(
									get(props.jobs, getPath(JobsProxy.General.Centres)),
									0
								)}
								unit={UnitType.MM}
							/>
							<Data
								title={t(translationPath(lang.common.totalTrussTypesCountSum))}
								data={fixed(
									get(props.jobs, getPath(JobsProxy.General.TrussTypesCount)),
									0
								)}
								unit={UnitType.EMPTY}
							/>
							<Data
								title={t(translationPath(lang.common.totalTrussCountSum))}
								data={fixed(
									get(props.jobs, getPath(JobsProxy.General.TrussCount)),
									0
								)}
								unit={UnitType.EMPTY}
							/>
						</ContentCard>
					</GridItem>
					<GridItem>
						<ContentCard>
							<Header2>{t(translationPath(lang.common.load))}</Header2>
							<Data
								title={t(translationPath(lang.common.averageRoofingLoad))}
								data={fixed(
									get(props.jobs, getPath(JobsProxy.General.RoofingLoad)),
									2
								)}
								unit={UnitType.KNM2}
							/>
							<Data
								title={t(translationPath(lang.common.averageCeilingLoad))}
								data={fixed(
									get(props.jobs, getPath(JobsProxy.General.CeilingLoad)),
									2
								)}
								unit={UnitType.KNM2}
							/>
							<Data
								title={t(translationPath(lang.common.averageSnowLoad))}
								data={fixed(
									get(props.jobs, getPath(JobsProxy.General.SnowLoad)),
									2
								)}
								unit={UnitType.KNM2}
							/>
							<Data
								title={t(translationPath(lang.common.averageWindLoad))}
								data={fixed(
									get(props.jobs, getPath(JobsProxy.General.WindLoad)),
									2
								)}
								unit={UnitType.KNM2}
							/>
							<Data
								title={t(translationPath(lang.common.averageUsefulInTheAttic))}
								data={fixed(
									get(props.jobs, getPath(JobsProxy.General.CeilingLoad)),
									2
								)}
								unit={UnitType.KNM2}
							/>
						</ContentCard>
					</GridItem>
				</GridRow>
				<GridRow columns={2}>
					<GridItem>
						<ContentCard>
							<ContentSpaceBetween>
								<Title>{t(translationPath(lang.common.nailPlates))}</Title>
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
								<Title>{t(translationPath(lang.common.planks))}</Title>
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
										get(props.jobs, getPath(JobsProxy.Planks)).map(
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
