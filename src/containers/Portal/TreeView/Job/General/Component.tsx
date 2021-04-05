import * as React from 'react';
import * as Yup from 'yup';
import Data from '../../../../../components/Data/Data';
import FormikRow from '../../../../../components/Optimify/Form/FormikRow';
import Moment from 'react-moment';
import RouteLeavingGuard from '../../../../../components/Prompt';
import { Alert, Button as SButton, Modal } from 'antd';
import { Button } from '../../../../../components/Optimify/Button';
import { DeleteJob, JobProxy, Unlock } from '../_types';
import { EditTruss } from '../../../../../sagas/Truss/_actions';
import { fixed } from '../../../../../utils/formating';
import { formatCurrency } from 'src/utils/currencyFormat';
import { get } from 'lodash';
import { getPath, translationPath } from '../../../../../utils/getPath';
import { Header } from '../components/Header';
import { Input } from '../../../../../constants/enum';
import { JobType, Settings, TreeType } from '../../../../../types/_types';
import { RightColumn } from './_styles';
import { RouteComponentProps } from 'react-router-dom';
import { UnitType } from '../../../../../components/Data/Unit';
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
	job: any;
	pending: boolean;
	settings: Settings;
	image: string;
	history: any;
}

export interface DisptachProps {
	jobUpdate: (data: JobType) => void;
	setSelectedKeys: (data: string[]) => void;
	removeJob: (data: DeleteJob) => void;
	unlockJob: (data: Unlock) => void;
	editTruss: (data: EditTruss) => void;
}

let globalCallback = null;

const Index = ({
	removeJob,
	image,
	jobUpdate,
	job,
	unlockJob,
	editTruss,
	pending,
	setSelectedKeys,
}: WithTranslation & StateProps & DisptachProps & RouteComponentProps) => {
	const [alertDialog, setAlertDialog] = React.useState(false);

	const formik = useFormik({
		initialValues: job as JobType,
		enableReinitialize: true,
		validationSchema: Yup.object({}),
		onSubmit: (values: JobType) => {
			jobUpdate(values);
		},
	});
	React.useEffect(() => {
		if (job) {
			const img = window.document.querySelector(`#image_${job?.Id}`) as any;
			if (img) {
				img.src = image;
			}
		}
	}, [image, job]);

	const stateOptions: Map<string, string> = new Map([
		["Finished", t(translationPath(lang.common.done))],
		["InProgress", t(translationPath(lang.common.inProgress))],
		["Aborted", t(translationPath(lang.common.canceled))],
	]);

	const typeOptions: Map<string, string> = new Map([
		["Quotation", t(translationPath(lang.common.priceOffer))],
		["Construction", t(translationPath(lang.common.output))],
	]);

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

	const leavingGuard = (callback) => {
		if (equal(formik.values, job)) {
			callback && callback();
			return;
		}
		globalCallback = callback;
		setAlertDialog(true);
	};

	const leave = () => {
		if (globalCallback) {
			globalCallback();
			setAlertDialog(false);
		}
	};

	const saveAndLeave = () => {
		if (globalCallback) {
			jobUpdate({ ...formik.values, callback: globalCallback });
			setAlertDialog(false);
		}
	};

	return (
		<>
			<Header
				removeJob={removeJob}
				unlockJob={unlockJob}
				leavingGuard={leavingGuard}
				editTruss={editTruss}
				job={job}
			/>
			<MainTreeContent>
				<Form onSubmit={formik.handleSubmit}>
					<RouteLeavingGuard
						when={!equal(formik.values, job)}
						shouldBlockNavigation={(location) => {
							if (!equal(formik.values, job)) {
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
											title={t(translationPath(lang.common.jobName))}
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
											name="Type"
											title={t(translationPath(lang.common.jobType))}
											type={Input.SELECT}
											options={Array.from(typeOptions)?.map(
												(value: [string, string]) => {
													return { value: value[0], label: value[1] };
												}
											)}
											titleWidth={40}
										/>
										<FormikRow
											formik={formik}
											name="State"
											title={t(translationPath(lang.common.jobState))}
											type={Input.SELECT}
											options={Array.from(stateOptions)?.map(
												(value: [string, string]) => {
													return { value: value[0], label: value[1] };
												}
											)}
											titleWidth={40}
										/>
										<Data
											title={t(translationPath(lang.common.jobDateOfCreation))}
											data={
												<Moment format="DD/MM/YYYY HH:MM">
													{get(job, getPath(JobProxy.DateOfCreation))}
												</Moment>
											}
											unit={UnitType.EMPTY}
										/>
										<Data
											title={t(
												translationPath(lang.common.jobDateOfLastUpdate)
											)}
											data={
												<Moment format="DD/MM/YYYY HH:MM">
													{get(job, getPath(JobProxy.LastChange))}
												</Moment>
											}
											unit={UnitType.EMPTY}
										/>
										<Data
											title={t(translationPath(lang.common.platesWeight))}
											data={fixed(get(job, getPath(JobProxy.PlatesWeight)), 2)}
											unit={UnitType.KG}
										/>
										<Data
											title={t(translationPath(lang.common.planksVolume))}
											data={fixed(get(job, getPath(JobProxy.PlanksVolume)), 4)}
											unit={UnitType.M3}
										/>
										<Data
											title={t(translationPath(lang.common.designPrice))}
											data={formatCurrency(job?.Price)}
											unit={UnitType.EMPTY}
										/>

										<Header2>
											{t(translationPath(lang.common.controlInformation))}
										</Header2>
										<Data
											title={t(translationPath(lang.common.PlateWeightOnArea))}
											data={fixed(
												get(job, getPath(JobProxy.PlatesWeightOnArea)),
												2
											)}
											unit={UnitType.KGM2}
										/>
										<Data
											title={t(
												translationPath(lang.common.PlatesWeighOnPlanksVolume)
											)}
											data={fixed(
												get(job, getPath(JobProxy.PlatesWeightOnPlanksVolume)),
												2
											)}
											unit={UnitType.KGM2}
										/>
										<Data
											title={t(translationPath(lang.common.priceOnPlanks))}
											data={formatCurrency(
												job?.TrussPriceOnPlanksVolume,
												UnitType.KCM3
											)}
											unit={UnitType.EMPTY}
										/>
										<Data
											title={t(translationPath(lang.common.PriceOnArea))}
											data={formatCurrency(
												job?.TrussPriceOnArea,
												UnitType.KCM2
											)}
											unit={UnitType.EMPTY}
										/>
									</ContentCard>
								</GridItem>

								<GridItem fill>
									<ContentCard>
										<CenterImage>
											{image && job?.Id ? (
												<img src="" id={`image_${job?.Id}`} />
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
															get(job, getPath(JobProxy.RoofInfo.RoofArea)),
															2
														)}
														unit={UnitType.M2}
													/>
													<Data
														title={t(translationPath(lang.common.ceilingArea))}
														data={fixed(
															get(job, getPath(JobProxy.RoofInfo.CoveredArea)),
															2
														)}
														unit={UnitType.M2}
													/>
													<Data
														title={t(translationPath(lang.common.pitch))}
														data={fixed(
															get(job, getPath(JobProxy.RoofInfo.Pitch)),
															0
														)}
														unit={UnitType.EMPTY}
													/>
													<Data
														title={t(translationPath(lang.common.centres))}
														data={fixed(get(job, getPath(JobProxy.Centres)), 0)}
														unit={UnitType.MM}
													/>
													<Data
														title={t(
															translationPath(lang.common.trussTypesCount)
														)}
														data={fixed(
															get(job, getPath(JobProxy.TrussTypes)),
															0
														)}
														unit={UnitType.EMPTY}
													/>
													<Data
														title={t(translationPath(lang.common.trussCount))}
														data={fixed(
															get(job, getPath(JobProxy.TrussCount)),
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
															get(job, getPath(JobProxy.Load.RoofingLoad)),
															2
														)}
														unit={UnitType.KNM2}
													/>
													<Data
														title={t(translationPath(lang.common.ceilingLoad))}
														data={fixed(
															get(job, getPath(JobProxy.Load.CeilingLoad)),
															2
														)}
														unit={UnitType.KNM2}
													/>
													<Data
														title={t(translationPath(lang.common.snowLoad))}
														data={fixed(
															get(job, getPath(JobProxy.Load.SnowLoad)),
															2
														)}
														unit={UnitType.KNM2}
													/>
													<Data
														title={t(translationPath(lang.common.windLoad))}
														data={fixed(
															get(job, getPath(JobProxy.Load.WindLoad)),
															2
														)}
														unit={UnitType.KNM2}
													/>

													<Data
														title={t(translationPath(lang.common.floorArea))}
														data={null}
														unit={UnitType.KNM2}
													/>
													<Data
														title={t(
															translationPath(lang.common.usefulInTheAttic)
														)}
														data={null}
														unit={UnitType.KNM2}
													/>
												</GridItem>
											</GridRow>
										</RightColumn>
									</ContentCard>
								</GridItem>
							</GridRow>
						</TreeContent>
						{!equal(formik.values, job) && (
							<TreeButtonsRow>
								<Button level={1} loading={pending}>
									{t(translationPath(lang.common.save))}
								</Button>
							</TreeButtonsRow>
						)}
					</TreeScreen>
				</Form>
			</MainTreeContent>
			<Modal
				centered
				visible={alertDialog}
				onCancel={() => setAlertDialog(false)}
				cancelText={t(translationPath(lang.common.no))}
				okText={t(translationPath(lang.common.yes))}
				footer={[
					<SButton onClick={leave}>
						{t(translationPath(lang.common.cancel))}
					</SButton>,
					<SButton onClick={saveAndLeave} type="primary">
						{t(translationPath(lang.common.saveChanges))}
					</SButton>,
					,
				]}
			>
				<br />
				<p>
					<Alert
						message={t(translationPath(lang.common.actionWithoutSavingTitle))}
						description={t(
							translationPath(lang.common.actionWithoutSavingMessage)
						)}
						type="warning"
						showIcon
					/>
				</p>
			</Modal>
		</>
	);
};

export default withTranslation()(Index);
