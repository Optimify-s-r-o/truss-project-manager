import * as React from 'react';
import Data from '../../../../components/Data/Data';
import Export from '../../../../components/Export';
import Loading from '../../../../components/Optimify/Loading';
import { faMountains } from '@fortawesome/pro-light-svg-icons';
import { fixed } from '../../../../utils/formating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { get } from 'lodash';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Page } from '../../../../types/_types';
import { TableTitle } from '../../_styles';
import { UnitType } from '../../../../components/Data/Unit';
import { useParams } from 'react-router';
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
import {
	Plank,
	PlankProxy,
	Plate,
	PlateProxy,
	Truss,
	TrussesProxy,
} from "../Truss/_types";

export interface StateProps {
	routerState: any;
	pending: boolean;
	truss: Truss;
}

export interface DispatchProps {
	getTrussesRequest: (data: Page) => void;
}

const Component = (props: WithTranslation & StateProps & DispatchProps) => {
	const { getTrussesRequest } = props;
	const { id } = useParams<{ id: string }>();
	React.useEffect(() => {
		if (id) {
			getTrussesRequest({ trusses: id });
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
							<FontAwesomeIcon icon={faMountains as IconProp} color={"#fff"} />
							<TitleName>
								{get(props.truss, getPath(TrussesProxy.Names))?.map(
									(value: string, key: number) =>
										value +
										(get(props.truss, getPath(TrussesProxy.Names))?.length ==
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
								title={t(translationPath(lang.common.totalCount))}
								data={get(props.truss, getPath(TrussesProxy.Count))}
								unit={UnitType.EMPTY}
							/>
							<Data
								title={t(translationPath(lang.common.averageMultiplicity))}
								data={fixed(get(props.truss, getPath(TrussesProxy.Plies)), 2)}
								unit={UnitType.EMPTY}
							/>
							<Data
								title={t(translationPath(lang.common.averageThickness))}
								data={fixed(
									get(props.truss, getPath(TrussesProxy.Thickness)),
									0
								)}
								unit={UnitType.MM}
							/>
							<Data
								title={t(translationPath(lang.common.averageLoadWidth))}
								data={fixed(get(props.truss, getPath(TrussesProxy.Width)), 0)}
								unit={UnitType.MM}
							/>
							<Data
								title={t(translationPath(lang.common.totalNumberOfModels))}
								data={get(props.truss, getPath(TrussesProxy.MembersCount))}
								unit={UnitType.EMPTY}
							/>
							<Data
								title={t(translationPath(lang.common.totalPlatesWeight))}
								data={fixed(
									get(props.truss, getPath(TrussesProxy.PlateWeight)),
									2
								)}
								unit={UnitType.KG}
							/>
							<Data
								title={t(translationPath(lang.common.averagePlatesWeight))}
								data={fixed(
									get(props.truss, getPath(TrussesProxy.AveragePlateWeight)),
									2
								)}
								unit={UnitType.KG}
							/>
							<Data
								title={t(translationPath(lang.common.totalPlanksVolume))}
								data={fixed(get(props.truss, getPath(TrussesProxy.Planks)), 4)}
								unit={UnitType.M3}
							/>
							<Data
								title={t(translationPath(lang.common.averagePlanksVolume))}
								data={fixed(
									get(props.truss, getPath(TrussesProxy.AveragePlanks)),
									4
								)}
								unit={UnitType.M3}
							/>
							<Data
								title={t(translationPath(lang.common.totalTransportWeight))}
								data={fixed(
									get(props.truss, getPath(TrussesProxy.TransportWeight)),
									2
								)}
								unit={UnitType.KG}
							/>
							<Data
								title={t(translationPath(lang.common.averagePricePerPiece))}
								data={fixed(get(props.truss, getPath(TrussesProxy.Price)), 2)}
								unit={UnitType.KC}
							/>
							<Data
								title={t(translationPath(lang.common.priceTotal))}
								data={fixed(
									get(props.truss, getPath(TrussesProxy.PriceSum)),
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
									get(props.truss, getPath(TrussesProxy.PlateWeightOnArea)),
									4
								)}
								unit={UnitType.KGM2}
							/>
							<Data
								title={t(
									translationPath(lang.common.averagePlatesWeighOnPlanksVolume)
								)}
								data={fixed(
									get(props.truss, getPath(TrussesProxy.PlateWeightOnVolume)),
									2
								)}
								unit={UnitType.KGM2}
							/>
							<Data
								title={t(translationPath(lang.common.averagePlatesOnArea))}
								data={fixed(
									get(props.truss, getPath(TrussesProxy.PlanksOnArea)),
									2
								)}
								unit={UnitType.M3M2}
							/>
							<Data
								title={t(translationPath(lang.common.averagePriceOnPlanks))}
								data={fixed(
									get(props.truss, getPath(TrussesProxy.PriceOnPlanks)),
									2
								)}
								unit={UnitType.KCM3}
							/>
							<Data
								title={t(translationPath(lang.common.averagePriceOnArea))}
								data={fixed(
									get(props.truss, getPath(TrussesProxy.PriceOnArea)),
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
								title={t(translationPath(lang.common.averageWidth))}
								data={fixed(get(props.truss, getPath(TrussesProxy.Width)), 0)}
								unit={UnitType.MM}
							/>
							<Data
								title={t(translationPath(lang.common.averageHeight))}
								data={fixed(get(props.truss, getPath(TrussesProxy.Height)), 0)}
								unit={UnitType.MM}
							/>
							<Data
								title={t(translationPath(lang.common.averageTilt))}
								data={fixed(get(props.truss, getPath(TrussesProxy.Pitch)), 2)}
								unit={UnitType.DEGREE}
							/>
							<Data
								title={t(translationPath(lang.common.totalNumberOfPart))}
								data={get(props.truss, getPath(TrussesProxy.MembersCount))}
								unit={UnitType.EMPTY}
							/>
							<Data
								title={t(translationPath(lang.common.totalPlatesCount))}
								data={get(props.truss, getPath(TrussesProxy.PlatesCount))}
								unit={UnitType.EMPTY}
							/>
							<Data
								title={t(translationPath(lang.common.totalNumberOfSupports))}
								data={get(props.truss, getPath(TrussesProxy.SupportsQuantity))}
								unit={UnitType.EMPTY}
							/>
							<Data
								title={t(translationPath(lang.common.averageNumberOfSupports))}
								data={fixed(
									get(props.truss, getPath(TrussesProxy.AverageSupportsCount)),
									2
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
									get(props.truss, getPath(TrussesProxy.RoofingLoad)),
									2
								)}
								unit={UnitType.KNM2}
							/>
							<Data
								title={t(translationPath(lang.common.averageCeilingLoad))}
								data={fixed(
									get(props.truss, getPath(TrussesProxy.CeilingLoad)),
									2
								)}
								unit={UnitType.KNM2}
							/>
							<Data
								title={t(translationPath(lang.common.averageSnowLoad))}
								data={fixed(
									get(props.truss, getPath(TrussesProxy.SnowLoad)),
									2
								)}
								unit={UnitType.KNM2}
							/>
							<Data
								title={t(translationPath(lang.common.averageWindLoad))}
								data={fixed(
									get(props.truss, getPath(TrussesProxy.WindLoad)),
									2
								)}
								unit={UnitType.KNM2}
							/>
						</ContentCard>
					</GridItem>
				</GridRow>

				<GridRow columns={2}>
					<GridItem>
						<ContentCard fullSize>
							<ContentSpaceBetween>
								<TableTitle>
									{t(translationPath(lang.common.nailPlates))}
								</TableTitle>
								<Export
									name={
										props.truss?.Names?.map((value) => value).join(",") +
										"-" +
										t(translationPath(lang.common.nailPlates))
									}
									data={get(props.truss, getPath(TrussesProxy.Plates))}
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
										t(translationPath(lang.common.countPerTruss)),
									]}
									sortable={[true, true, true, true, true, true]}
									data={
										get(props.truss, getPath(TrussesProxy.Plates)) &&
										get(props.truss, getPath(TrussesProxy.Plates)).map(
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
						<ContentCard fullSize>
							<ContentSpaceBetween>
								<TableTitle>
									{t(translationPath(lang.common.planks))}
								</TableTitle>
								<Export
									name={
										props.truss?.Names?.map((value) => value).join(",") +
										"-" +
										t(translationPath(lang.common.planks))
									}
									data={get(props.truss, getPath(TrussesProxy.Planks))}
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
										get(props.truss, getPath(TrussesProxy.Planks)) &&
										get(props.truss, getPath(TrussesProxy.Planks)).map(
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

export default withTranslation()(Component);
