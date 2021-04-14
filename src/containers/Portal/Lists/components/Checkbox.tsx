import * as React from 'react';
import ColumnSelector from './ColumnSelector';
import { Checkbox } from '../Jobs/Component';
import { FilterType } from '../_types';
import { OutlinedButton } from 'src/components/Optimify/Button';
import { Page } from '../../../../types/_types';
import { translationPath } from '../../../../utils/getPath';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
	lang,
	WithTranslation,
	withTranslation,
} from "../../../../translation/i18n";

export interface OwnProps {
	changeChecked: (newItem: Checkbox) => void;
	checked: Checkbox[];
	checkboxes: Checkbox[];
	resetHeaderSettings: (data: string) => void;
	type: FilterType;
	setSort: (data: number[]) => void;
	setSortOrder: (data: number[]) => void;
	getEntities: (data: Page) => void;
	sort: number[];
}

const Index = ({
	checkboxes,
	checked,
	changeChecked,
	resetHeaderSettings,
	type,
	getEntities,
	setSortOrder,
	setSort,
	sort,
}: OwnProps & WithTranslation) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();

	const handleResetSort = (
		_event: React.MouseEvent<HTMLElement, MouseEvent>
	) => {
		dispatch(setSort(sort.map((_) => 0)));
		dispatch(setSortOrder([]));
		getEntities({ Paginate: true, Sort: "", RewriteSort: true });
	};

	return (
		<>
			<OutlinedButton type="button" level={3} onClick={handleResetSort}>
				{t(translationPath(lang.table.removeSort).path)}
			</OutlinedButton>
			<ColumnSelector
				checkboxes={checkboxes.map((c, i) => {
					return { ...c, position: i };
				})}
				checked={checked}
				changeChecked={changeChecked}
				resetHeaderSettings={resetHeaderSettings}
				type={type}
			/>
		</>
	);
};

export default withTranslation()(React.memo(Index));
