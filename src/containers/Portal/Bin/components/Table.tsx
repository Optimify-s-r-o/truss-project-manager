import ExternalTable from '../../../../components/Table/ExternalTable';
import Moment from 'react-moment';
import React from 'react';
import { Data, Page } from '../../../../types/_types';
import { Delete, Restore } from '../../../../components/Button';
import { lang } from '../../../../translation/i18n';
import { lastPathMember, translationPath } from '../../../../utils/getPath';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
	CardMiddleTableWrapper,
	ContentRow,
} from "../../../../constants/globalStyles";
import {
	Bin,
	BinProxy,
	BinRequest,
	BinRestore,
	BinType,
	DeleteRequest,
} from "../_types";

interface Table {
	refreshFromBinAction: (data: BinRestore) => void;
	deleteEntity: (data: DeleteRequest) => void;
	getBinAction: (data: BinRequest) => void;
	pending: boolean;
	data: Data<Bin>;
	type: BinType;
}

export const BinTable = ({
	refreshFromBinAction,
	deleteEntity,
	pending,
	data,
	type,
	getBinAction,
}: Table) => {
	const { t } = useTranslation();
	const history = useHistory();

	const remove =
		(id: string) => (_event: React.MouseEvent<HTMLElement, MouseEvent>) => {
			deleteEntity({
				id,
				type,
				requiredPage: {
					PageSize: 25,
					Page: 1,
				},
			});
		};

	return (
		<CardMiddleTableWrapper>
			<ExternalTable
				headers={[
					t(translationPath(lang.common.name).path),
					t(translationPath(lang.common.date).path),
					t(translationPath(lang.common.actions).path),
				]}
				sortable={[false, false, false]}
				columnNames={[
					lastPathMember(BinProxy.Name).path,
					lastPathMember(BinProxy.Date).path,
					lastPathMember(BinProxy.Date).path,
				]}
				onPageRequired={(requiredPage: Page) => {
					getBinAction({ ...requiredPage, type });
				}}
				pageSize={data?.SettingsPageSize}
				firstRecordOnPage={data?.FirstRecordOnPage}
				lastRecordOnPage={data?.LastRecordOnPage}
				currentPage={data?.CurrentPage}
				totalPages={data?.TotalPages}
				totalRecords={data?.TotalRecords}
				isLoading={pending}
				data={
					data?.Data
						? data?.Data?.map((bin: Bin, key: number) => [
								bin?.Name,
								bin?.Date,
								bin?.Date,
								bin,
						  ])
						: []
				}
				renderers={[
					(value: any, key: number, parent: Bin) => {
						return value;
					},
					(value: string, key: number, parent: Bin) => {
						return <Moment format="DD/MM/YYYY HH:mm">{value}</Moment>;
					},
					(value: any, key: number, parent: Bin) => {
						return (
							<ContentRow>
								<Restore
									change={() => refreshFromBinAction({ type, id: parent?.Id })}
									type={type}
								/>
								&nbsp;
								<Delete
									deleteTooltip={t(
										translationPath(lang.common.permanentRemove).path
									)}
									title={t(translationPath(lang.remove.job).path, {
										name: parent?.Name,
									})}
									remove={remove(parent?.Id)}
								/>
							</ContentRow>
						);
					},
				]}
			/>
		</CardMiddleTableWrapper>
	);
};
