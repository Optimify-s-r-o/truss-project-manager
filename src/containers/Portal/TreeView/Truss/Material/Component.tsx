import * as React from 'react';
import Export from '../../../../../components/Export';
import Loading from '../../../../../components/Optimify/Loading';
import { get } from 'lodash';
import { RouteComponentProps, useParams } from 'react-router-dom';
import {
	ScrollableTable,
	TABLE_STYLE_CONDENSED,
} from "../../../../../components/Optimify/Table";
import {
	ContentCard,
	FullCardEndTableWrapper,
	GridItemHalfHeight,
	GridRowFillContent,
	Header2,
	MaterialTitleSection,
	Sceleton,
} from "../../../../../constants/globalStyles";
import {
	lang,
	t,
	WithTranslation,
	withTranslation,
} from "../../../../../translation/i18n";
import {
	getPath,
	lastPathMember,
	translationPath,
} from "../../../../../utils/getPath";
import {
	CenterImage,
	MainTreeContent,
	TreeContent,
	TreeScreen,
} from "../../../_styles";
import {
	Material,
	Member,
	MemberProxy,
	Plank,
	PlankProxy,
	Plate,
	PlateProxy,
	Truss,
	TrussProxy,
} from "../_types";
export interface StateProps {
	pending: boolean;
	truss: Truss;
	image: string;
	history: any;
	materials: Material;
}

export interface DispatchProps {
	getTrussMaterials: (data: string) => void;
}

const Index = (
	props: WithTranslation & StateProps & RouteComponentProps & DispatchProps
) => {
	const { image, materials, getTrussMaterials } = props;
	const { id } = useParams<{ id: string }>();

	React.useEffect(() => {
		if (props.truss) {
			const img = window.document.querySelector(
				`#image_${props.truss?.TrussName}`
			) as any;
			if (img) {
				img.src = image;
			}
		}
	}, [image, props.truss]);

	React.useEffect(() => {
		if (id) {
			getTrussMaterials(id);
		}
	}, [id]);

	return (
		<MainTreeContent>
			<Loading
				text={t(translationPath(lang.common.loading))}
				pending={props.pending && !props.truss}
				margin
			>
				<TreeScreen>
					<TreeContent>
						<GridRowFillContent columns={2}>
							<GridItemHalfHeight>
								<ContentCard fullSize>
									<MaterialTitleSection>
										<Header2>
											{t(translationPath(lang.common.nailPlates))}
										</Header2>
										<Export
											name={
												props.truss?.TrussName +
												"-" +
												t(translationPath(lang.common.nailPlates))
											}
											data={materials?.Plates}
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
												{
													label: t(translationPath(lang.common.count)),
													valueName: lastPathMember(PlateProxy.CountSum).path,
												},
											]}
										/>
									</MaterialTitleSection>
									<FullCardEndTableWrapper>
										<ScrollableTable
											style={TABLE_STYLE_CONDENSED}
											headers={[
												t(translationPath(lang.common.type)),
												t(translationPath(lang.common.name)),
												t(translationPath(lang.priceLists.width)),
												t(translationPath(lang.common.length)),
												t(translationPath(lang.common.thickness)),
												t(translationPath(lang.common.countPerTruss)),
												t(translationPath(lang.common.countSum)),
											]}
											sortable={[true, true, true, true, true, true, true]}
											data={
												materials?.Plates &&
												materials?.Plates?.map((value: Plate, key: number) => {
													return [
														value.Type,
														value.Name,
														value.Width,
														value.Length,
														value.Thickness,
														value.Count,
														value.CountSum,
														value,
													];
												})
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
												(value: any, key: number, parent: Plate) => {
													return value;
												},
											]}
										/>
									</FullCardEndTableWrapper>
								</ContentCard>
							</GridItemHalfHeight>
							<GridItemHalfHeight smallerDisplayHide>
								<ContentCard fullSize>
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
							</GridItemHalfHeight>

							<GridItemHalfHeight>
								<ContentCard fullSize>
									<MaterialTitleSection>
										<Header2>{t(translationPath(lang.common.planks))}</Header2>
										<Export
											name={
												props.truss?.TrussName +
												"-" +
												t(translationPath(lang.common.planks))
											}
											data={materials?.Planks}
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
												{
													label: t(translationPath(lang.common.countSum)),
													valueName: lastPathMember(PlankProxy.CountSum).path,
												},
											]}
										/>
									</MaterialTitleSection>
									<FullCardEndTableWrapper>
										<ScrollableTable
											style={TABLE_STYLE_CONDENSED}
											headers={[
												t(translationPath(lang.common.thickness)),
												t(translationPath(lang.priceLists.width)),
												t(translationPath(lang.common.length)),
												t(translationPath(lang.common.quality)),
												t(translationPath(lang.common.countPerTruss)),
												t(translationPath(lang.common.countSum)),
											]}
											sortable={[true, true, true, true, true, true]}
											data={materials?.Planks?.map(
												(value: Plank, key: number) => {
													return [
														value.Thickness,
														value.Width,
														value.Length,
														value.Grade,
														value.Count,
														value.CountSum,
														value,
													];
												}
											)}
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
												(value: any, key: number, parent: Plank) => {
													return value;
												},
											]}
										/>
									</FullCardEndTableWrapper>
								</ContentCard>
							</GridItemHalfHeight>

							<GridItemHalfHeight>
								<ContentCard fullSize>
									<MaterialTitleSection>
										<Header2>{t(translationPath(lang.common.members))}</Header2>
										<Export
											name={
												props.truss?.TrussName +
												"-" +
												t(translationPath(lang.common.members))
											}
											data={materials?.Members}
											structure={[
												{
													label: t(translationPath(lang.common.name)),
													valueName: lastPathMember(MemberProxy.Name).path,
												},
												{
													label: t(translationPath(lang.common.trussCount)),
													valueName: lastPathMember(MemberProxy.CountSum).path,
												},
											]}
										/>
									</MaterialTitleSection>
									<FullCardEndTableWrapper>
										<ScrollableTable
											style={TABLE_STYLE_CONDENSED}
											headers={[
												t(translationPath(lang.common.name)),
												t(translationPath(lang.common.count)),
											]}
											sortable={[true, true]}
											data={
												materials?.Members &&
												materials?.Members?.map(
													(value: Member, key: number) => {
														return [value.Name, value.CountSum, value];
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
									</FullCardEndTableWrapper>
								</ContentCard>
							</GridItemHalfHeight>
						</GridRowFillContent>
					</TreeContent>
				</TreeScreen>
			</Loading>
		</MainTreeContent>
	);
};

export default withTranslation()(Index);
