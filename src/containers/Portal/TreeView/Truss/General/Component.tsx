import * as React from 'react';
import Data from '../../../../../components/Data/Data';
import { fixed } from '../../../../../utils/formating';
import { formatCurrency } from 'src/utils/currencyFormat';
import { get } from 'lodash';
import { getPath, translationPath } from '../../../../../utils/getPath';
import { RouteComponentProps } from 'react-router-dom';
import { Truss, TrussProxy } from '../_types';
import { UnitType } from '../../../../../components/Data/Unit';
import {
	ContentCard,
	GridItem,
	GridRow,
	Header2,
	Sceleton,
} from "../../../../../constants/globalStyles";
import {
	lang,
	t,
	WithTranslation,
	withTranslation,
} from "../../../../../translation/i18n";
import {
	CenterImage,
	MainTreeContent,
	TreeContent,
	TreeScreen,
} from "../../../_styles";

export interface StateProps {
	pending: boolean;
	truss: Truss;
	image: string;
	history: any;
}

const Index = (props: WithTranslation & StateProps & RouteComponentProps) => {
	const { image } = props;

	React.useEffect(() => {
		if (props.truss) {
			const img = window.document.querySelector(
				`#image_${get(props.truss, getPath(TrussProxy.TrussName))}`
			) as any;
			if (img) {
				img.src = image;
			}
		}
	}, [image && props.truss]);

	return (
		<MainTreeContent>
			<TreeScreen>
				<TreeContent>
					<GridRow columns={2}>
						<GridItem fill>
							<ContentCard fullSize>
								<Data
									title={t(translationPath(lang.common.count))}
									data={get(props.truss, getPath(TrussProxy.Quantity))}
									unit={UnitType.EMPTY}
								/>
								<Data
									title={t(translationPath(lang.common.multiplicity))}
									data={get(props.truss, getPath(TrussProxy.PliesCount))}
									unit={UnitType.EMPTY}
								/>
								<Data
									title={t(translationPath(lang.common.thickness))}
									data={fixed(
										get(props.truss, getPath(TrussProxy.Thickness)),
										0
									)}
									unit={UnitType.MM}
								/>
								<Data
									title={t(translationPath(lang.common.loadWidth))}
									data={fixed(get(props.truss, getPath(TrussProxy.Centres)), 0)}
									unit={UnitType.MM}
								/>
								<Data
									title={t(translationPath(lang.common.typeOfTruss))}
									data={t(
										translationPath(
											lang.common[get(props.truss, getPath(TrussProxy.Kind))]
										)
									)}
									unit={UnitType.EMPTY}
								/>
								<Data
									title={t(translationPath(lang.common.trussType))}
									data={t(
										translationPath(
											lang.common[get(props.truss, getPath(TrussProxy.Type))]
										)
									)}
									unit={UnitType.EMPTY}
								/>
								<Data
									title={t(translationPath(lang.common.numberOfModels))}
									data={get(props.truss, getPath(TrussProxy.ModelsCount))}
									unit={UnitType.EMPTY}
								/>
								<Data
									title={t(translationPath(lang.common.weight))}
									data={fixed(
										get(props.truss, getPath(TrussProxy.PlateWeight)),
										2
									)}
									unit={UnitType.KG}
								/>
								<Data
									title={t(translationPath(lang.common.woodVolume))}
									data={fixed(get(props.truss, getPath(TrussProxy.Volume)), 4)}
									unit={UnitType.M3}
								/>
								<Data
									title={t(translationPath(lang.common.transportWeight))}
									data={fixed(
										get(props.truss, getPath(TrussProxy.TransportWeight)),
										2
									)}
									unit={UnitType.KG}
								/>
								<Data
									title={t(translationPath(lang.common.pricePerPiece))}
									data={formatCurrency(props.truss?.Price)}
									unit={UnitType.EMPTY}
								/>
								<Data
									title={t(translationPath(lang.common.totalPrice))}
									data={formatCurrency(props.truss?.PriceSum)}
									unit={UnitType.EMPTY}
								/>

								<Header2>{t(translationPath(lang.common.controlData))}</Header2>
								<Data
									title={t(translationPath(lang.common.PlateWeightOnArea))}
									data={fixed(
										get(props.truss, getPath(TrussProxy.PlateWeightOnArea)),
										4
									)}
									unit={UnitType.KGM2}
								/>
								<Data
									title={t(
										translationPath(lang.common.PlatesWeighOnPlanksVolume)
									)}
									data={fixed(
										get(props.truss, getPath(TrussProxy.PlateWeightOnVolume)),
										2
									)}
									unit={UnitType.KGM2}
								/>
								<Data
									title={t(translationPath(lang.common.platesWeight))}
									data={fixed(
										get(props.truss, getPath(TrussProxy.PlateWeight)),
										2
									)}
									unit={UnitType.KG}
								/>
								<Data
									title={t(translationPath(lang.common.PlatesOnArea))}
									data={fixed(
										get(props.truss, getPath(TrussProxy.VolumeOnArea)),
										2
									)}
									unit={UnitType.M3M2}
								/>
								<Data
									title={t(translationPath(lang.common.PriceOnPlanks))}
									data={formatCurrency(
										props.truss?.PriceOnVolume,
										UnitType.KCM3
									)}
									unit={UnitType.EMPTY}
								/>
								<Data
									title={t(translationPath(lang.common.PriceOnArea))}
									data={formatCurrency(props.truss?.PriceOnArea, UnitType.KCM2)}
									unit={UnitType.EMPTY}
								/>
							</ContentCard>
						</GridItem>

						<GridItem fill>
							<ContentCard>
								<CenterImage>
									{image ? (
										<img
											src=""
											id={`image_${get(
												props.truss,
												getPath(TrussProxy.TrussName)
											)}`}
										/>
									) : (
										<Sceleton />
									)}
								</CenterImage>
							</ContentCard>
							<ContentCard topMargin>
								<Header2>{t(translationPath(lang.common.geometry))}</Header2>
								<Data
									title={t(translationPath(lang.common.span))}
									data={fixed(get(props.truss, getPath(TrussProxy.Span)), 0)}
									unit={UnitType.MM}
								/>
								<Data
									title={t(translationPath(lang.common.height))}
									data={fixed(get(props.truss, getPath(TrussProxy.Height)), 0)}
									unit={UnitType.MM}
								/>
								<Data
									title={t(translationPath(lang.common.tilt))}
									data={fixed(get(props.truss, getPath(TrussProxy.Pitch)), 2)}
									unit={UnitType.DEGREE}
								/>
								<Data
									title={t(translationPath(lang.common.numberOfPart))}
									data={
										<>
											{get(props.truss, getPath(TrussProxy.MembersCount))}/
											{get(props.truss, getPath(TrussProxy.JointsCount))}
										</>
									}
									unit={UnitType.EMPTY}
								/>
								<Data
									title={t(translationPath(lang.common.numberOfSupports))}
									data={get(props.truss, getPath(TrussProxy.SupportsQuantity))}
									unit={UnitType.EMPTY}
								/>

								<Header2>{t(translationPath(lang.common.load))}</Header2>
								<Data
									title={t(translationPath(lang.common.covering))}
									data={fixed(
										get(props.truss, getPath(TrussProxy.RoofingLoad)),
										2
									)}
									unit={UnitType.KNM2}
								/>
								<Data
									title={t(translationPath(lang.common.suspendedCeiling))}
									data={fixed(
										get(props.truss, getPath(TrussProxy.CeilingLoad)),
										2
									)}
									unit={UnitType.KNM2}
								/>
								<Data
									title={t(translationPath(lang.common.snowLoad))}
									data={fixed(
										get(props.truss, getPath(TrussProxy.SnowLoad)),
										2
									)}
									unit={UnitType.KNM2}
								/>
								<Data
									title={t(translationPath(lang.common.windLoad))}
									data={fixed(
										get(props.truss, getPath(TrussProxy.WindLoad)),
										2
									)}
									unit={UnitType.KNM2}
								/>
								<Data
									title={t(translationPath(lang.common.snowRegion))}
									data={get(props.truss, getPath(TrussProxy.SnowArea))}
									unit={UnitType.EMPTY}
								/>
								<Data
									title={t(translationPath(lang.common.windRegion))}
									data={get(props.truss, getPath(TrussProxy.WindArea))}
									unit={UnitType.EMPTY}
								/>
							</ContentCard>
						</GridItem>
					</GridRow>
				</TreeContent>
			</TreeScreen>
		</MainTreeContent>
	);
};

export default withTranslation()(Index);
