import lang from '../../../../../translation/lang';
import Loading from '../../../../../components/Optimify/Loading';
import React, { useEffect } from 'react';
import { ActionSection } from '../../../../../components/Quotations';
import { DeleteJob, Unlock } from '../_types';
import { Empty } from 'antd';
import { File } from './components/File';
import { Header } from '../components/Header';
import { MainTreeContent, TreeContent, TreeScreen } from '../../../_styles';
import { OpenTruss } from '../../../../../sagas/Truss/_actions';
import { Table } from './components/Table';
import { translationPath } from '../../../../../utils/getPath';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Viewer, ViewerRequest } from './_types';
import { ViewerColumn, ViewerTitleSection } from './_styles';
import {
	ContentCard,
	GridItem,
	Header2,
} from "../../../../../constants/globalStyles";

export interface StateProps {
	models: Viewer;
	pending: boolean;
	job: any;
}

export interface DispatchProps {
	uploadModelPostAction: (data: ViewerRequest) => void;
	editModelPutAction: (data: ViewerRequest) => void;
	modelsGetAction: (data: string) => void;
	deleteModel: (data: string) => void;
	clearModels: (data: void) => void;
	removeJob: (data: DeleteJob) => void;
	unlockJob: (data: Unlock) => void;
	editTruss: (data: OpenTruss) => void;
}

export default ({
	models,
	pending,
	uploadModelPostAction,
	removeJob,
	modelsGetAction,
	deleteModel,
	clearModels,
	unlockJob,
	editTruss,
	job,
}: StateProps & DispatchProps) => {
	const { t } = useTranslation();
	const { id } = useParams<{ id: string }>();

	useEffect(() => {
		if (id) {
			modelsGetAction(id);
		}
	}, [id]);

	useEffect(() => {
		return () => {
			clearModels();
		};
	}, []);

	return (
		<>
			<Header
				removeJob={removeJob}
				unlockJob={unlockJob}
				editTruss={editTruss}
				job={job}
			/>
			<MainTreeContent>
				<TreeScreen>
					<TreeContent>
						<GridItem fill>
							<Loading
								text={t(translationPath(lang.common.loading).path)}
								pending={pending}
								margin
							>
								{models?.Exists && (
									<ViewerTitleSection>
										<Header2>
											{t(translationPath(lang.viewer.title).path)}
										</Header2>
									</ViewerTitleSection>
								)}
								{models?.Exists ? (
									<ContentCard fullSize>
										<Table models={models} deleteModel={deleteModel} id={id} />
									</ContentCard>
								) : (
									<ViewerColumn>
										<Empty description={""} />
										<br />
										<ActionSection>
											<File
												uploadModelPostAction={uploadModelPostAction}
												id={id}
											/>
										</ActionSection>
									</ViewerColumn>
								)}
							</Loading>
						</GridItem>
					</TreeContent>
				</TreeScreen>
			</MainTreeContent>
		</>
	);
};
