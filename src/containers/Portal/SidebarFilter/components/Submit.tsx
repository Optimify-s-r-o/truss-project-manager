import * as React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { ActiveCommon } from './ActiveCommon';
import { Button } from '../../../../components/Optimify/Button';
import { ContentColumn } from 'src/constants/globalStyles';
import { ContentRowEnd } from '../../../../constants/globalStyles';
import { FilterSettings, TreeType } from '../../../../types/_types';
import { getInitialValues } from '../_services';
import { lang } from '../../../../translation/i18n';
import { translationPath } from '../../../../utils/getPath';
import { useTranslation } from 'react-i18next';
export interface OwnProps {
	filter: FilterSettings;
	activeTree: TreeType;
	pending: boolean;
	active: boolean;
	activeFilter: boolean;
	activeFilterContent: any;
	handleSubmit: (_event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	formData: any;
}

export const Submit = (props: OwnProps) => {
	const {
		activeTree,
		filter,
		pending,
		active,
		activeFilterContent,
		activeFilter,
		handleSubmit,
		formData,
	} = props;
	const { t } = useTranslation();
	console.log(filter);
	console.log(activeFilterContent);
	console.log(formData);
	return (
		<ActiveFilter>
			<ActiveCommon
				values={formData}
				active={active}
				activeFilterContent={activeFilterContent}
				filter={filter}
				activeTree={activeTree}
				activeFilter={activeFilter}
			/>
			<FilterButton>
				<Button
					level={3}
					loading={pending}
					disabled={_.isEqual(getInitialValues(filter), formData)}
					type="button"
					onClick={handleSubmit}
				>
					{t(translationPath(lang.common.filterApply).path)}
				</Button>
			</FilterButton>
		</ActiveFilter>
	);
};

const ActiveFilter = styled(ContentColumn)`
	background-color: ${(props) => props.theme.colors.background.secondaryMenu};
	padding: 8px 15px;
	color: ${(props) => props.theme.colors.primary.default};
`;

const FilterButton = styled(ContentRowEnd)`
	width: 100%;
`;
