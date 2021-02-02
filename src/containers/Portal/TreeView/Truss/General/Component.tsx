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
				`#image_${get(props.truss, getPath(TrussProxy.General.Name))}`
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
									data={get(props.truss, getPath(TrussProxy.General.Count))}
									unit={UnitType.EMPTY}
								/>
								<Data
									title={t(translationPath(lang.common.multiplicity))}
									data={get(props.truss, getPath(TrussProxy.General.Plies))}
									unit={UnitType.EMPTY}
								/>
								<Data
									title={t(translationPath(lang.common.thickness))}
									data={fixed(
										get(props.truss, getPath(TrussProxy.General.Thickness)),
										0
									)}
									unit={UnitType.MM}
								/>
								<Data
									title={t(translationPath(lang.common.loadWidth))}
									data={fixed(
										get(props.truss, getPath(TrussProxy.General.Centres)),
										0
									)}
									unit={UnitType.MM}
								/>
								<Data
									title={t(translationPath(lang.common.typeOfTruss))}
									data={t(
										translationPath(
											lang.common[
												get(props.truss, getPath(TrussProxy.General.Kind))
											]
										)
									)}
									unit={UnitType.EMPTY}
								/>
								<Data
									title={t(translationPath(lang.common.trussType))}
									data={t(
										translationPath(
											lang.common[
												get(props.truss, getPath(TrussProxy.General.Type))
											]
										)
									)}
									unit={UnitType.EMPTY}
								/>
								<Data
									title={t(translationPath(lang.common.numberOfModels))}
									data={get(
										props.truss,
										getPath(TrussProxy.General.ModelCount)
									)}
									unit={UnitType.EMPTY}
								/>
								<Data
									title={t(translationPath(lang.common.weight))}
									data={fixed(
										get(props.truss, getPath(TrussProxy.General.PlateWeight)),
										2
									)}
									unit={UnitType.KG}
								/>
								<Data
									title={t(translationPath(lang.common.woodVolume))}
									data={fixed(
										get(props.truss, getPath(TrussProxy.General.Planks)),
										4
									)}
									unit={UnitType.M3}
								/>
								<Data
									title={t(translationPath(lang.common.transportWeight))}
									data={fixed(
										get(
											props.truss,
											getPath(TrussProxy.General.TransportWeight)
										),
										2
									)}
									unit={UnitType.KG}
								/>
								<Data
									title={t(translationPath(lang.common.pricePerPiece))}
									data={formatCurrency(props.truss?.General?.Price)}
									unit={UnitType.EMPTY}
								/>
								<Data
									title={t(translationPath(lang.common.totalPrice))}
									data={formatCurrency(props.truss?.General?.PriceSum)}
									unit={UnitType.EMPTY}
								/>

								<Header2>{t(translationPath(lang.common.controlData))}</Header2>
								<Data
									title={t(translationPath(lang.common.PlateWeightOnArea))}
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
										translationPath(lang.common.PlatesWeighOnPlanksVolume)
									)}
									data={fixed(
										get(
											props.truss,
											getPath(TrussProxy.General.PlatesWeighOnPlanksVolume)
										),
										2
									)}
									unit={UnitType.KGM2}
								/>
								<Data
									title={t(translationPath(lang.common.platesWeight))}
									data={fixed(
										get(props.truss, getPath(TrussProxy.General.PlateWeight)),
										2
									)}
									unit={UnitType.KG}
								/>
								<Data
									title={t(translationPath(lang.common.PlatesOnArea))}
									data={fixed(
										get(props.truss, getPath(TrussProxy.General.PlatesOnArea)),
										2
									)}
									unit={UnitType.M3M2}
								/>
								<Data
									title={t(translationPath(lang.common.PriceOnPlanks))}
									data={formatCurrency(
										props.truss?.General?.PriceOnPlanks,
										UnitType.KCM3
									)}
									unit={UnitType.EMPTY}
								/>
								<Data
									title={t(translationPath(lang.common.PriceOnArea))}
									data={formatCurrency(
										props.truss?.General?.PriceOnArea,
										UnitType.KCM2
									)}
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
												getPath(TrussProxy.General.Name)
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
									data={fixed(
										get(props.truss, getPath(TrussProxy.General.Width)),
										0
									)}
									unit={UnitType.MM}
								/>
								<Data
									title={t(translationPath(lang.common.height))}
									data={fixed(
										get(props.truss, getPath(TrussProxy.General.Height)),
										0
									)}
									unit={UnitType.MM}
								/>
								<Data
									title={t(translationPath(lang.common.tilt))}
									data={fixed(
										get(props.truss, getPath(TrussProxy.General.Pitch)),
										2
									)}
									unit={UnitType.DEGREE}
								/>
								<Data
									title={t(translationPath(lang.common.numberOfPart))}
									data={
										<>
											{get(
												props.truss,
												getPath(TrussProxy.General.MembersCount)
											)}
											/
											{get(
												props.truss,
												getPath(TrussProxy.General.PlatesCount)
											)}
										</>
									}
									unit={UnitType.EMPTY}
								/>
								<Data
									title={t(translationPath(lang.common.numberOfSupports))}
									data={get(
										props.truss,
										getPath(TrussProxy.General.SupportsCount)
									)}
									unit={UnitType.EMPTY}
								/>

								<Header2>{t(translationPath(lang.common.load))}</Header2>
								<Data
									title={t(translationPath(lang.common.covering))}
									data={fixed(
										get(
											props.truss,
											getPath(TrussProxy.General.Load.RoofingLoad)
										),
										2
									)}
									unit={UnitType.KNM2}
								/>
								<Data
									title={t(translationPath(lang.common.suspendedCeiling))}
									data={fixed(
										get(
											props.truss,
											getPath(TrussProxy.General.Load.CeilingLoad)
										),
										2
									)}
									unit={UnitType.KNM2}
								/>
								<Data
									title={t(translationPath(lang.common.snowLoad))}
									data={fixed(
										get(props.truss, getPath(TrussProxy.General.Load.SnowLoad)),
										2
									)}
									unit={UnitType.KNM2}
								/>
								<Data
									title={t(translationPath(lang.common.windLoad))}
									data={fixed(
										get(props.truss, getPath(TrussProxy.General.Load.WindLoad)),
										2
									)}
									unit={UnitType.KNM2}
								/>
								<Data
									title={t(translationPath(lang.common.snowRegion))}
									data={get(
										props.truss,
										getPath(TrussProxy.General.Load.SnowRegion)
									)}
									unit={UnitType.EMPTY}
								/>
								<Data
									title={t(translationPath(lang.common.windRegion))}
									data={get(
										props.truss,
										getPath(TrussProxy.General.Load.WindRegion)
									)}
									unit={UnitType.EMPTY}
								/>
							</ContentCard>
						</GridItem>
					</GridRow>
				</TreeContent>
				{/* <TreeButtonsRow>
            <Back
              history={history}
              label={t(translationPath(lang.common.back))}
            />
          </TreeButtonsRow> */}
			</TreeScreen>
		</MainTreeContent>
	);
};

export default withTranslation()(Index);
