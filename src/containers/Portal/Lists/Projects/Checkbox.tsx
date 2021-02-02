import * as React from 'react';
import ColumnSelector from '../components/ColumnSelector';
import { Checkbox } from '../Jobs/Component';
import { translationPath } from '../../../../utils/getPath';
import {
	lang,
	t,
	WithTranslation,
	withTranslation,
} from "../../../../translation/i18n";
export interface OwnProps {
	changeChecked: (newItem: Checkbox) => void;
	checked: Checkbox[];
	checkboxes: Checkbox[];
}

const Index = (props: OwnProps & WithTranslation) => {
	return (
		<ColumnSelector
			checkboxes={props.checkboxes}
			checked={props.checked}
			changeChecked={props.changeChecked}
		/>
	);
};

export default withTranslation()(React.memo(Index));
