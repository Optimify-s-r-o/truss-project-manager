import lang from '../../../../../translation/lang';
import Loading from '../../../../../components/Optimify/Loading';
import React, { useEffect } from 'react';
import { ActionButton } from '../General/_styles';
import { ActionSection } from '../../../../../components/Quotations';
import { DeleteJob, Unlock } from '../_types';
import { EditTruss } from '../../../../../sagas/Truss/_actions';
import { Empty } from 'antd';
import { Header } from '../components/Header';
import { MainTreeContent, TreeContent, TreeScreen } from '../../../_styles';
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
	publishModelPostAction: (data: string) => void;
	editModelPutAction: (data: ViewerRequest) => void;
	modelsGetAction: (data: string) => void;
	deleteModel: (data: string) => void;
	clearModels: (data: void) => void;
	removeJob: (data: DeleteJob) => void;
	unlockJob: (data: Unlock) => void;
	editTruss: (data: EditTruss) => void;
}

export default ({
	models,
	pending,
	publishModelPostAction,
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
										<Table
											models={models}
											deleteModel={deleteModel}
											job={job}
										/>
									</ContentCard>
								) : (
									<ViewerColumn>
										<Empty description={""} />
										<br />
										<ActionSection>
											<ActionButton onClick={() => publishModelPostAction(id)}>
												{t(translationPath(lang.viewer.publish).path)}
											</ActionButton>
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
