import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faMountains } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { get } from 'lodash';
import * as React from 'react';
import { useParams } from 'react-router';
import Data from '../../../../components/Data/Data';
import { UnitType } from '../../../../components/Data/Unit';
import Export from '../../../../components/Export';
import Loading from '../../../../components/Optimify/Loading';
import {
	ScrollableTable,
	TABLE_STYLE_CONDENSED
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
	Title,
	TitleName,
	TitleSection
} from "../../../../constants/globalStyles";
import {
	lang,
	t,
	WithTranslation,
	withTranslation
} from "../../../../translation/i18n";
import { Page } from '../../../../types/_types';
import { fixed } from '../../../../utils/formating';
import { getPath, translationPath } from '../../../../utils/getPath';
import { TableTitle } from '../../_styles';
import {
	Member,
	Plank,
	Plate,
	Truss,
	TrussProxy
} from '../Truss/_types';

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
								{get(props.truss, getPath(TrussProxy.Names))?.map(
									(value: string, key: number) =>
										value +
										(get(props.truss, getPath(TrussProxy.Names))?.length ==
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
								data={get(props.truss, getPath(TrussProxy.General.Count))}
								unit={UnitType.EMPTY}
							/>
							<Data
								title={t(translationPath(lang.common.averageMultiplicity))}
								data={fixed(
									get(props.truss, getPath(TrussProxy.General.Plies)),
									2
								)}
								unit={UnitType.EMPTY}
							/>
							<Data
								title={t(translationPath(lang.common.averageThickness))}
								data={fixed(
									get(props.truss, getPath(TrussProxy.General.Thickness)),
									0
								)}
								unit={UnitType.MM}
							/>
							<Data
								title={t(translationPath(lang.common.averageLoadWidth))}
								data={fixed(
									get(props.truss, getPath(TrussProxy.General.Width)),
									0
								)}
								unit={UnitType.MM}
							/>
							<Data
								title={t(translationPath(lang.common.totalNumberOfModels))}
								data={get(
									props.truss,
									getPath(TrussProxy.General.MembersCount)
								)}
								unit={UnitType.EMPTY}
							/>
							<Data
								title={t(translationPath(lang.common.totalPlatesWeight))}
								data={fixed(
									get(props.truss, getPath(TrussProxy.General.PlateWeight)),
									2
								)}
								unit={UnitType.KG}
							/>
							<Data
								title={t(translationPath(lang.common.averagePlatesWeight))}
								data={fixed(
									get(
										props.truss,
										getPath(TrussProxy.General.AveragePlateWeight)
									),
									2
								)}
								unit={UnitType.KG}
							/>
							<Data
								title={t(translationPath(lang.common.totalPlanksVolume))}
								data={fixed(
									get(props.truss, getPath(TrussProxy.General.Planks)),
									4
								)}
								unit={UnitType.M3}
							/>
							<Data
								title={t(translationPath(lang.common.averagePlanksVolume))}
								data={fixed(
									get(props.truss, getPath(TrussProxy.General.AveragePlanks)),
									4
								)}
								unit={UnitType.M3}
							/>
							<Data
								title={t(translationPath(lang.common.totalTransportWeight))}
								data={fixed(
									get(props.truss, getPath(TrussProxy.General.TransportWeight)),
									2
								)}
								unit={UnitType.KG}
							/>
							<Data
								title={t(translationPath(lang.common.averagePricePerPiece))}
								data={fixed(
									get(props.truss, getPath(TrussProxy.General.Price)),
									2
								)}
								unit={UnitType.KC}
							/>
							<Data
								title={t(translationPath(lang.common.priceTotal))}
								data={fixed(
									get(props.truss, getPath(TrussProxy.General.PriceSum)),
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
										props.truss,
										getPath(TrussProxy.General.PlateWeightOnArea)
									),
									4
								)}
								unit={UnitType.KGM2}
							/>
							<Data
								title={t(
									translationPath(lang.common.averagePlatesWeighOnPlanksVolume)
								)}
								data={fixed(
									get(
										props.truss,
										getPath(TrussProxy.General.PlatesWeighOnPlanksVolume) //TODO Check
									),
									2
								)}
								unit={UnitType.KGM2}
							/>
							<Data
								title={t(translationPath(lang.common.averagePlatesOnArea))}
								data={fixed(
									get(props.truss, getPath(TrussProxy.General.PlanksOnArea)),
									2
								)}
								unit={UnitType.M3M2}
							/>
							<Data
								title={t(translationPath(lang.common.averagePriceOnPlanks))}
								data={fixed(
									get(props.truss, getPath(TrussProxy.General.PriceOnPlanks)),
									2
								)}
								unit={UnitType.KCM3}
							/>
							<Data
								title={t(translationPath(lang.common.averagePriceOnArea))}
								data={fixed(
									get(props.truss, getPath(TrussProxy.General.PriceOnArea)),
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
								data={fixed(
									get(props.truss, getPath(TrussProxy.General.Width)),
									0
								)}
								unit={UnitType.MM}
							/>
							<Data
								title={t(translationPath(lang.common.averageHeight))}
								data={fixed(
									get(props.truss, getPath(TrussProxy.General.Height)),
									0
								)}
								unit={UnitType.MM}
							/>
							<Data
								title={t(translationPath(lang.common.averageTilt))}
								data={fixed(
									get(props.truss, getPath(TrussProxy.General.Pitch)),
									2
								)}
								unit={UnitType.DEGREE}
							/>
							<Data
								title={t(translationPath(lang.common.totalNumberOfPart))}
								data={get(
									props.truss,
									getPath(TrussProxy.General.MembersCount)
								)}
								unit={UnitType.EMPTY}
							/>
							<Data
								title={t(translationPath(lang.common.totalPlatesCount))}
								data={get(props.truss, getPath(TrussProxy.General.PlatesCount))}
								unit={UnitType.EMPTY}
							/>
							<Data
								title={t(translationPath(lang.common.totalNumberOfSupports))}
								data={get(
									props.truss,
									getPath(TrussProxy.General.SupportsCount)
								)}
								unit={UnitType.EMPTY}
							/>
							<Data
								title={t(translationPath(lang.common.averageNumberOfSupports))}
								data={fixed(
									get(
										props.truss,
										getPath(TrussProxy.General.AverageSupportsCount)
									),
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
									get(props.truss, getPath(TrussProxy.General.RoofingLoad)),
									2
								)}
								unit={UnitType.KNM2}
							/>
							<Data
								title={t(translationPath(lang.common.averageCeilingLoad))}
								data={fixed(
									get(props.truss, getPath(TrussProxy.General.CeilingLoad)),
									2
								)}
								unit={UnitType.KNM2}
							/>
							<Data
								title={t(translationPath(lang.common.averageSnowLoad))}
								data={fixed(
									get(props.truss, getPath(TrussProxy.General.SnowLoad)),
									2
								)}
								unit={UnitType.KNM2}
							/>
							<Data
								title={t(translationPath(lang.common.averageWindLoad))}
								data={fixed(
									get(props.truss, getPath(TrussProxy.General.WindLoad)),
									2
								)}
								unit={UnitType.KNM2}
							/>
						</ContentCard>
					</GridItem>
				</GridRow>

				<GridRow columns={3}>
					<GridItem>
						<ContentCard fullSize>
							<ContentSpaceBetween>
								<TableTitle>{t(translationPath(lang.common.members))}</Title>
								<Export
									name={
										props.truss?.Names?.map((value) => value).join(",") +
										"-" +
										t(translationPath(lang.common.members))
									}
									data={get(props.truss, getPath(TrussProxy.Material.Members))}
									structure={[
										{
											label: t(translationPath(lang.common.name)),
											valueName: "Name",
										},
										{
											label: t(translationPath(lang.common.trussCount)),
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
										get(props.truss, getPath(TrussProxy.Material.Members)) &&
										get(props.truss, getPath(TrussProxy.Material.Members))?.map(
											(value: Member, key: number) => {
												return [value.Name, value.Count, value];
											}
										)
									}
									renderers={[
										(value: any, key: number, parent: Member) => {
											return value;
										},
										(value: any, key: number, parent: Member) => {
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
								<TableTitle>{t(translationPath(lang.common.nailPlates))}</TableTitle>
								<Export
									name={
										props.truss?.Names?.map((value) => value).join(",") +
										"-" +
										t(translationPath(lang.common.nailPlates))
									}
									data={get(props.truss, getPath(TrussProxy.Material.Plates))}
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
										get(props.truss, getPath(TrussProxy.Material.Plates)) &&
										get(props.truss, getPath(TrussProxy.Material.Plates)).map(
											(value: Plate, key: number) => {
												return [value.Name, value.Count, value];
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
									]}
								/>
							</CardEndTableWrapper>
						</ContentCard>
					</GridItem>
					<GridItem>
						<ContentCard fullSize>
							<ContentSpaceBetween>
								<TableTitle>{t(translationPath(lang.common.planks))}</TableTitle>
								<Export
									name={
										props.truss?.Names?.map((value) => value).join(",") +
										"-" +
										t(translationPath(lang.common.planks))
									}
									data={get(props.truss, getPath(TrussProxy.Material.Planks))}
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
										get(props.truss, getPath(TrussProxy.Material.Planks)) &&
										get(props.truss, getPath(TrussProxy.Material.Planks)).map(
											(value: Plank, key: number) => {
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
