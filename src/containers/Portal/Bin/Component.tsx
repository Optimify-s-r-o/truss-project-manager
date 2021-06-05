import React, { useEffect } from 'react';
import {
	Bin,
	BinRequest,
	BinRestore,
	BinType,
	DeleteRequest
	} from './_types';
import { BinTable } from './components/Table';
import { Data } from '../../../types/_types';
import { Header } from './components/Header';
import { Main } from './_styles';
import { RouteComponentProps, useParams } from 'react-router-dom';
import { WithTranslation, withTranslation } from '../../../translation/i18n';
import {
	ContentCard,
	ContentFilter,
	ContentInline,
} from "../../../constants/globalStyles";
export interface StateProps {
	pending: boolean;
	data: Data<Bin>;
}

export interface DispatchProps {
	getBinAction: (data: BinRequest) => void;
	refreshFromBinAction: (data: BinRestore) => void;
	deleteEntity: (data: DeleteRequest) => void;
	clearBinReducer: () => void;
}

const Index = ({
	pending,
	data,
	getBinAction,
	refreshFromBinAction,
	deleteEntity,
	clearBinReducer,
}: WithTranslation & StateProps & DispatchProps & RouteComponentProps) => {
	const { type } = useParams<{ type: BinType }>();

	useEffect(() => {
		clearBinReducer();
		getBinAction({ type: type });
	}, [type]);

	return (
		<ContentInline>
			<Main>
				<ContentFilter>
					<ContentCard>
						<Header type={type} />
						<BinTable
							data={data}
							pending={pending}
							refreshFromBinAction={refreshFromBinAction}
							deleteEntity={deleteEntity}
							getBinAction={getBinAction}
							type={type}
						/>
					</ContentCard>
				</ContentFilter>
			</Main>
		</ContentInline>
	);
};

export default withTranslation()(Index);
