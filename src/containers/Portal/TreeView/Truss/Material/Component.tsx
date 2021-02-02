import * as React from 'react';
import Export from '../../../../../components/Export';
import Loading from '../../../../../components/Optimify/Loading';
import { get } from 'lodash';
import { getPath, translationPath } from '../../../../../utils/getPath';
import {
	Member,
	Plank,
	Plate,
	Truss,
	TrussProxy
	} from '../_types';
import { RouteComponentProps } from 'react-router-dom';
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
				`#image_${props.truss?.General?.Name}`
			) as any;
			if (img) {
				img.src = image;
			}
		}
	}, [image, props.truss]);

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
												props.truss?.General?.Name +
												"-" +
												t(translationPath(lang.common.nailPlates))
											}
											data={get(
												props.truss,
												getPath(TrussProxy.Material.Plates)
											)}
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
												get(props.truss, getPath(TrussProxy.Material.Plates)) &&
												get(
													props.truss,
													getPath(TrussProxy.Material.Plates)
												)?.map((value: Plate, key: number) => {
													return [value.Name, value.Count, value];
												})
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
													getPath(TrussProxy.General.Name)
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
												props.truss?.General?.Name +
												"-" +
												t(translationPath(lang.common.planks))
											}
											data={get(
												props.truss,
												getPath(TrussProxy.Material.Planks)
											)}
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
									</MaterialTitleSection>
									<FullCardEndTableWrapper>
										<ScrollableTable
											style={TABLE_STYLE_CONDENSED}
											headers={[
												t(translationPath(lang.common.thickness)),
												t(translationPath(lang.priceLists.width)),
												t(translationPath(lang.common.length)),
												t(translationPath(lang.common.quality)),
												t(translationPath(lang.common.count)),
											]}
											sortable={[true, true, true]}
											data={
												get(props.truss, getPath(TrussProxy.Material.Planks)) &&
												get(
													props.truss,
													getPath(TrussProxy.Material.Planks)
												)?.map((value: Plank, key: number) => {
													return [
														value.B,
														value.H,
														value.Length,
														value.Quality,
														value.Quantity,
														value,
													];
												})
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
									</FullCardEndTableWrapper>
								</ContentCard>
							</GridItemHalfHeight>

							<GridItemHalfHeight>
								<ContentCard fullSize>
									<MaterialTitleSection>
										<Header2>{t(translationPath(lang.common.members))}</Header2>
										<Export
											name={
												props.truss?.Name +
												"-" +
												t(translationPath(lang.common.members))
											}
											data={get(
												props.truss,
												getPath(TrussProxy.Material.Members)
											)}
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
												get(
													props.truss,
													getPath(TrussProxy.Material.Members)
												) &&
												get(
													props.truss,
													getPath(TrussProxy.Material.Members)
												)?.map((value: Member, key: number) => {
													return [value.Name, value.Count, value];
												})
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
