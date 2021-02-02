import lang from '../../../../../translation/lang';
import Loading from '../../../../../components/Optimify/Loading';
import React, { useEffect } from 'react';
import { ActionSection } from '../../../../../components/Quotations';
import { Empty } from 'antd';
import { File } from './components/File';
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
}

export interface DispatchProps {
	uploadModelPostAction: (data: ViewerRequest) => void;
	editModelPutAction: (data: ViewerRequest) => void;
	modelsGetAction: (data: string) => void;
	deleteModel: (data: string) => void;
	clearModels: (data: void) => void;
}

export default ({
	models,
	pending,
	uploadModelPostAction,
	editModelPutAction,
	modelsGetAction,
	deleteModel,
	clearModels,
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
	);
};
