import * as React from 'react';
import ColumnSelector from './ColumnSelector';
import { Checkbox } from '../Jobs/Component';
import { TreeType } from '../../../../types/_types';
import { WithTranslation, withTranslation } from '../../../../translation/i18n';

export interface OwnProps {
	changeChecked: (newItem: Checkbox) => void;
	checked: Checkbox[];
	checkboxes: Checkbox[];
	resetHeaderSettings: (data: string) => void;
	type: TreeType;
}

const Index = ({
	checkboxes,
	checked,
	changeChecked,
	resetHeaderSettings,
	type,
}: OwnProps & WithTranslation) => {
	return (
		<ColumnSelector
			checkboxes={checkboxes.map((c, i) => {
				return { ...c, position: i };
			})}
			checked={checked}
			changeChecked={changeChecked}
			resetHeaderSettings={resetHeaderSettings}
			type={type}
		/>
	);
};

export default withTranslation()(React.memo(Index));
