import Moment from 'react-moment';
import React from 'react';
import Tooltip from '../../../../../../components/Optimify/Tooltip';
import { Delete } from '../../../../../../components/Button';
import { faCopy } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '../../../../../../components/Optimify/Button';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { lang, t } from '../../../../../../translation/i18n';
import { StyledDiv } from '../../../../Sidebar/_styles';
import { translationPath } from '../../../../../../utils/getPath';
import { Viewer } from '../_types';
import {
	ActionsColumn,
	ScrollableTable,
} from "../../../../../../components/Optimify/Table";

interface ITable {
	models: Viewer;
	deleteModel: (data: string) => void;
	id: string;
}
export const Table = ({ models, deleteModel, id }: ITable) => {
	const openFineUrl = (link?: string) => (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		const { shell } = window.require("electron");
		shell.openExternal(link);
	};

	const handleCopy = (value: string) => (
		_event: React.MouseEvent<HTMLElement, MouseEvent>
	) => {
		const { clipboard } = window.require("electron");
		clipboard.writeText(value, "selection");
	};

	return (
		<ScrollableTable
			height={250}
			headers={[
				t(translationPath(lang.viewer.url)),
				t(translationPath(lang.common.dateOfCreation)),
				t(translationPath(lang.common.user)),
				t(translationPath(lang.common.actions)),
			]}
			data={[models]?.map((value: Viewer, index: number) => {
				return [value.Url, value.Uploaded, value.UploadedBy, value, value];
			})}
			renderers={[
				(value: any, key: number, parent: Viewer) => {
					return (
						<StyledDiv onClick={openFineUrl(value)}>
							{value && value?.split("/#")[0]}
						</StyledDiv>
					);
				},
				(value: any, key: number, parent: Viewer) => {
					return <Moment format="DD/MM/YYYY">{value}</Moment>;
				},
				(value: any, key: number, parent: Viewer) => {
					return value;
				},
				(value: any, key: number, parent: Viewer) => {
					return (
						<ActionsColumn>
							<Tooltip
								title={t(translationPath(lang.common.clipboard))}
								placement={"bottom"}
							>
								<IconButton
									type="button"
									iconOnly
									onClick={handleCopy(parent.Url)}
								>
									<FontAwesomeIcon icon={faCopy as IconProp} color={"black"} />
								</IconButton>
							</Tooltip>
							&nbsp;
							<Delete
								remove={() => deleteModel(id)}
								title={t(translationPath(lang.remove.model))}
							/>
						</ActionsColumn>
					);
				},
			]}
		/>
	);
};
