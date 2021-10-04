import * as React from 'react';
import Export from '../../../../../components/Export';
import Loading from '../../../../../components/Optimify/Loading';
import { EditTruss } from '../../../../../sagas/Truss/_actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Header } from '../components/Header';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { IconTableCell } from './_styles';
import { JobType } from 'src/types/_types';
import { lastPathMember, translationPath } from '../../../../../utils/getPath';
import { MainTreeContent, TreeContent, TreeScreen } from '../../../_styles';
import { Plate, PlateProxy } from '../../Truss/_types';
import { RouteComponentProps, useParams } from 'react-router-dom';
import {
	faRectanglePortrait,
	faRectangleWide,
	faTriangle,
} from "@fortawesome/pro-light-svg-icons";
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
} from "../../../../../constants/globalStyles";
import {
	lang,
	t,
	WithTranslation,
	withTranslation,
} from "../../../../../translation/i18n";
import {
	DeleteJob,
	Materials,
	Member,
	MemberProxy,
	Model,
	ModelProxy,
	NailPlate,
	NailPlateProxy,
	Unlock,
} from "../_types";

export interface StateProps {
	materials: Materials;
	job: JobType;
}

export interface DispatchProps {
	getJobMaterials: (data: string) => void;
	removeJob: (data: DeleteJob) => void;
	unlockJob: (data: Unlock) => void;
	editTruss: (data: EditTruss) => void;
}

const Index = ({
	getJobMaterials,
	materials,
	removeJob,
	unlockJob,
	editTruss,
	job,
}: WithTranslation & StateProps & RouteComponentProps & DispatchProps) => {
	const { id } = useParams<{ id: string }>();

	React.useEffect(() => {
		if (id) {
			getJobMaterials(id);
		}
	}, [id]);

	return (
		<>
			<Header
				removeJob={removeJob}
				unlockJob={unlockJob}
				editTruss={editTruss}
				job={job}
			/>
			<MainTreeContent>
				<Loading
					text={t(translationPath(lang.common.loading))}
					pending={!materials}
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
													materials?.JobName +
													"-" +
													t(translationPath(lang.common.nailPlates))
												}
												data={materials?.NailPlates}
												structure={[
													{
														label: t(translationPath(lang.common.type)),
														valueName: lastPathMember(NailPlateProxy.Type).path,
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
														valueName: lastPathMember(PlateProxy.Thickness)
															.path,
													},
													{
														label: t(translationPath(lang.common.count)),
														valueName: lastPathMember(PlateProxy.Count).path,
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
													t(translationPath(lang.common.countSum)),
												]}
												sortable={[true, true, true, true, true, true]}
												data={materials?.NailPlates?.map(
													(value: NailPlate, key: number) => {
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
												)}
												renderers={[
													(value: any, key: number, parent: NailPlate) => {
														return (
															<IconTableCell>
																<FontAwesomeIcon
																	icon={faRectanglePortrait as IconProp}
																/>{" "}
																<span>{value}</span>
															</IconTableCell>
														);
													},
													(value: any, key: number, parent: NailPlate) => {
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
								<GridItemHalfHeight>
									<ContentCard fullSize>
										<MaterialTitleSection>
											<Header2>
												{t(translationPath(lang.common.members))}
											</Header2>
											<Export
												name={
													materials?.JobName +
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
														valueName: lastPathMember(MemberProxy.Count).path,
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
												data={materials?.Members?.map(
													(value: Member, key: number) => {
														return [value.Name, value.Count, value];
													}
												)}
												renderers={[
													(value: any, key: number, parent: Member) => {
														return (
															<IconTableCell>
																<FontAwesomeIcon
																	icon={faRectangleWide as IconProp}
																/>
																<span>{value}</span>
															</IconTableCell>
														);
													},
													(value: any, key: number, parent: Member) => {
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
											<Header2>
												{t(translationPath(lang.common.models))}
											</Header2>
											<Export
												name={
													materials?.JobName +
													"-" +
													t(translationPath(lang.common.models))
												}
												data={materials?.Models}
												structure={[
													{
														label: t(translationPath(lang.common.name)),
														valueName: lastPathMember(ModelProxy.Name).path,
													},
													{
														label: t(translationPath(lang.common.trussCount)),
														valueName: lastPathMember(ModelProxy.Count).path,
													},
													{
														label: t(translationPath(lang.common.plyCount)),
														valueName: lastPathMember(ModelProxy.PlyCount).path,
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
													t(translationPath(lang.common.plyCount)),
												]}
												sortable={[true, true, true]}
												data={materials?.Models?.map(
													(value: Model, key: number) => {
														return [
															value.Name,
															value.Count,
															value.PlyCount,
															value,
														];
													}
												)}
												renderers={[
													(value: any, key: number, parent: Model) => {
														return (
															<IconTableCell>
																<FontAwesomeIcon
																	icon={faTriangle as IconProp}
																/>
																<span>{value}</span>
															</IconTableCell>
														);
													},
													(value: any, key: number, parent: Model) => {
														return value;
													},
													(value: any, key: number, parent: Model) => {
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
		</>
	);
};

export default withTranslation()(Index);
