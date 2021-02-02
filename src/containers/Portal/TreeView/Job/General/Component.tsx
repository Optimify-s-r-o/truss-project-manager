import * as React from 'react';
import * as Yup from 'yup';
import Data from '../../../../../components/Data/Data';
import FormikRow from '../../../../../components/Optimify/Form/FormikRow';
import Moment from 'react-moment';
import RouteLeavingGuard from '../../../../../components/Prompt';
import { Button } from '../../../../../components/Optimify/Button';
import { fixed } from '../../../../../utils/formating';
import { formatCurrency } from 'src/utils/currencyFormat';
import { get } from 'lodash';
import { getPath, translationPath } from '../../../../../utils/getPath';
import { Input } from '../../../../../constants/enum';
import { JobProxy, UpdateJobRequest } from '../_types';
import { JobType, Settings, TreeType } from '../../../../../types/_types';
import { RightColumn } from './_styles';
import { RouteComponentProps } from 'react-router-dom';
import { UnitType } from '../../../../../components/Data/Unit';
import { updateJobWithoutUpdate } from '../../../../../sagas/Fetch/actions';
import { useFormik } from 'formik';
import {
	ContentCard,
	Form,
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
	TreeButtonsRow,
	TreeContent,
	TreeScreen,
} from "../../../_styles";

export interface StateProps {
	activeTree: TreeType;
	routerState: any;
	jobs: any;
	pending: boolean;
	settings: Settings;
	image: string;
	history: any;
}

export interface DisptachProps {
	jobUpdate: (data: UpdateJobRequest) => void;
	setSelectedKeys: (data: string[]) => void;
}

const Index = ({
	activeTree,
	image,
	jobUpdate,
	jobs,
	settings,
	pending,
	setSelectedKeys,
}: WithTranslation & StateProps & DisptachProps & RouteComponentProps) => {
	const formik = useFormik({
		initialValues: jobs as JobType,
		enableReinitialize: true,
		validationSchema: Yup.object({}),
		onSubmit: (values: JobType) => {
			jobUpdate(updateJobWithoutUpdate(values));
		},
	});
	React.useEffect(() => {
		if (jobs) {
			const img = window.document.querySelector(`#image_${jobs?.Id}`) as any;
			if (img) {
				img.src = image;
			}
		}
	}, [image, jobs]);

	const stateOptions: Map<string, string> = new Map([
		["Finished", t(translationPath(lang.common.done))],
		["InProgress", t(translationPath(lang.common.inProgress))],
		["Aborted", t(translationPath(lang.common.canceled))],
	]);

	const typeOptions: Map<string, string> = new Map([
		["Quotation", t(translationPath(lang.common.priceOffer))],
		["Construction", t(translationPath(lang.common.output))],
	]);

	const getLocation =
		formik.values && formik.values?.Details?.Location
			? formik.values?.Details?.Location?.CityName +
			  (formik.values?.Details?.Location?.CityName ? ", " : "") +
			  formik.values?.Details?.Location?.StreetName +
			  " " +
			  formik.values?.Details?.Location?.PlaceNumber +
			  (formik.values?.Details?.Location?.StreetName ? ", " : "") +
			  formik.values?.Details?.Location?.RegionName +
			  (formik.values?.Details?.Location?.RegionName ? ", " : "") +
			  (formik.values.Details.Location.Country
					? formik.values.Details.Location.Country
					: "")
			: "";

	const equal = (var1: JobType, var2: JobType): boolean => {
		if (
			var1?.JobName === var2?.JobName &&
			var1?.Description === var2?.Description &&
			var1?.State === var2?.State &&
			var1?.Type === var2?.Type
		) {
			return true;
		}
		return false;
	};

	console.log(jobs);

	return (
		<MainTreeContent>
			<Form onSubmit={formik.handleSubmit}>
				<RouteLeavingGuard
					when={!equal(formik.values, jobs)}
					shouldBlockNavigation={(location) => {
						if (!equal(formik.values, jobs)) {
							return true;
						}
						return false;
					}}
					formik={formik}
					setSelectedKeys={setSelectedKeys}
					update={jobUpdate}
					type={TreeType.JOB}
				/>
				<TreeScreen>
					<TreeContent>
						<GridRow columns={2}>
							<GridItem fill>
								<ContentCard fullSize>
									<FormikRow
										formik={formik}
										name="JobName"
										title={t(translationPath(lang.common.name))}
										type={Input.TEXT}
										titleWidth={40}
									/>
									<FormikRow
										formik={formik}
										name="Description"
										title={t(translationPath(lang.common.description))}
										type={Input.TEXT}
										titleWidth={40}
									/>
									<FormikRow
										formik={formik}
										name="State"
										title={t(translationPath(lang.common.state))}
										type={Input.SELECT}
										options={Array.from(stateOptions)?.map(
											(value: [string, string]) => {
												return { value: value[0], label: value[1] };
											}
										)}
										titleWidth={40}
									/>
									<FormikRow
										formik={formik}
										name="Type"
										title={t(translationPath(lang.common.type))}
										type={Input.SELECT}
										options={Array.from(typeOptions)?.map(
											(value: [string, string]) => {
												return { value: value[0], label: value[1] };
											}
										)}
										titleWidth={40}
									/>
									<Data
										title={t(translationPath(lang.common.address))}
										data={getLocation}
										unit={UnitType.EMPTY}
									/>
									<Data
										title={t(translationPath(lang.common.dateOfCreation))}
										data={
											<Moment format="DD/MM/YYYY HH:MM">
												{get(jobs, getPath(JobProxy.General.DateOfCreation))}
											</Moment>
										}
										unit={UnitType.EMPTY}
									/>
									<Data
										title={t(translationPath(lang.common.lastEdit))}
										data={
											<Moment format="DD/MM/YYYY HH:MM">
												{get(jobs, getPath(JobProxy.General.LastEdit))}
											</Moment>
										}
										unit={UnitType.EMPTY}
									/>
									<Data
										title={t(translationPath(lang.common.platesWeight))}
										data={fixed(
											get(jobs, getPath(JobProxy.General.PlatesWeight)),
											2
										)}
										unit={UnitType.KG}
									/>
									<Data
										title={t(translationPath(lang.common.planksVolume))}
										data={fixed(
											get(jobs, getPath(JobProxy.General.PlanksVolume)),
											4
										)}
										unit={UnitType.M3}
									/>
									<Data
										title={t(translationPath(lang.common.price))}
										data={formatCurrency(jobs?.Price)}
										unit={UnitType.EMPTY}
									/>

									<Header2>
										{t(translationPath(lang.common.controlInformation))}
									</Header2>
									<Data
										title={t(translationPath(lang.common.PlateWeightOnArea))}
										data={fixed(
											get(jobs, getPath(JobProxy.General.PlatesWeightOnArea)),
											2
										)}
										unit={UnitType.KGM2}
									/>
									<Data
										title={t(
											translationPath(lang.common.PlatesWeighOnPlanksVolume)
										)}
										data={fixed(
											get(
												jobs,
												getPath(JobProxy.General.PlatesWeightOnPlanksVolume)
											),
											2
										)}
										unit={UnitType.KGM2}
									/>
									<Data
										title={t(translationPath(lang.common.priceOnPlanks))}
										data={formatCurrency(
											jobs?.General.PriceOnPlanks,
											UnitType.KCM3
										)}
										unit={UnitType.EMPTY}
									/>
									<Data
										title={t(translationPath(lang.common.PriceOnArea))}
										data={formatCurrency(
											jobs?.General.PriceOnArea,
											UnitType.KCM2
										)}
										unit={UnitType.EMPTY}
									/>
								</ContentCard>
							</GridItem>

							<GridItem fill>
								<ContentCard>
									<CenterImage>
										{image && jobs?.Id ? (
											<img src="" id={`image_${jobs?.Id}`} />
										) : (
											<Sceleton />
										)}
									</CenterImage>
								</ContentCard>
								<ContentCard>
									<RightColumn>
										<GridRow columns={2}>
											<GridItem>
												<Header2>
													{t(translationPath(lang.common.geometry))}
												</Header2>

												<Data
													title={t(translationPath(lang.common.roofingArea))}
													data={fixed(
														get(jobs, getPath(JobProxy.General.RoofingArea)),
														2
													)}
													unit={UnitType.M2}
												/>
												<Data
													title={t(translationPath(lang.common.ceilingArea))}
													data={fixed(
														get(jobs, getPath(JobProxy.General.CeilingArea)),
														2
													)}
													unit={UnitType.M2}
												/>
												<Data
													title={t(translationPath(lang.common.pitch))}
													data={fixed(
														get(jobs, getPath(JobProxy.Details.Roof.Pitch)),
														0
													)}
													unit={UnitType.EMPTY}
												/>
												<Data
													title={t(translationPath(lang.common.centres))}
													data={fixed(
														get(jobs, getPath(JobProxy.General.Centres)),
														0
													)}
													unit={UnitType.MM}
												/>
												<Data
													title={t(
														translationPath(lang.common.trussTypesCount)
													)}
													data={fixed(
														get(
															jobs,
															getPath(JobProxy.General.TrussTypesCount)
														),
														0
													)}
													unit={UnitType.EMPTY}
												/>
												<Data
													title={t(translationPath(lang.common.trussCount))}
													data={fixed(
														get(jobs, getPath(JobProxy.General.TrussCount)),
														0
													)}
													unit={UnitType.EMPTY}
												/>
											</GridItem>
											<GridItem>
												<Header2>
													{t(translationPath(lang.common.load))}
												</Header2>
												<Data
													title={t(translationPath(lang.common.roofingLoad))}
													data={fixed(
														get(
															jobs,
															getPath(JobProxy.Details.Load.RoofingLoad)
														),
														2
													)}
													unit={UnitType.KNM2}
												/>
												<Data
													title={t(translationPath(lang.common.ceilingLoad))}
													data={fixed(
														get(
															jobs,
															getPath(JobProxy.Details.Load.CeilingLoad)
														),
														2
													)}
													unit={UnitType.KNM2}
												/>
												<Data
													title={t(translationPath(lang.common.snowLoad))}
													data={fixed(
														get(jobs, getPath(JobProxy.Details.Load.SnowLoad)),
														2
													)}
													unit={UnitType.KNM2}
												/>
												<Data
													title={t(translationPath(lang.common.windLoad))}
													data={fixed(
														get(jobs, getPath(JobProxy.Details.Load.WindLoad)),
														2
													)}
													unit={UnitType.KNM2}
												/>
												<Data
													title={t(
														translationPath(lang.common.usefulInTheAttic)
													)}
													data={fixed(
														get(
															jobs,
															getPath(JobProxy.Details.Load.CeilingLoad)
														),
														2
													)}
													unit={UnitType.KNM2}
												/>
											</GridItem>
										</GridRow>
									</RightColumn>
								</ContentCard>
							</GridItem>
						</GridRow>
					</TreeContent>
					{!equal(formik.values, jobs) && (
						<TreeButtonsRow>
							<Button level={1} loading={pending}>
								{t(translationPath(lang.common.save))}
							</Button>
						</TreeButtonsRow>
					)}
				</TreeScreen>
			</Form>
		</MainTreeContent>
	);
};

export default withTranslation()(Index);
