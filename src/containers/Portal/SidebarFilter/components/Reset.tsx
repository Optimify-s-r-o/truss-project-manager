import * as React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { FilterSettings, TreeType } from '../../../../types/_types';
import { FilterType } from '../index';
import { Fixed } from '../../../../constants/globalStyles';
import { lang } from '../../../../translation/i18n';
import { OutlinedButton } from '../../../../components/Optimify/Button';
import { translationPath } from '../../../../utils/getPath';
import { useTranslation } from 'react-i18next';
import {
	getInitialValues,
	resetFilterCustomersValues,
	resetFilterJobsValues,
	resetFilterProjectsValues,
	resetFilterTrussesValues,
} from "../_services";
export interface OwnProps {
	filter: FilterSettings;
	activeTree: TreeType;
	formik: any;
	resetTree: () => void;
	pending: boolean;
	activeFilter: FilterType;
}

export const Reset = (props: OwnProps) => {
	const { activeTree, filter, formik, resetTree, activeFilter } = props;
	const { t } = useTranslation();

	const handleReset = (_event: React.MouseEvent<HTMLElement, MouseEvent>) => {
		const initialValues: any =
			activeFilter === FilterType.Customer
				? resetFilterCustomersValues(formik, filter)
				: activeFilter === FilterType.Project
				? resetFilterProjectsValues(formik, filter)
				: activeFilter === FilterType.Job
				? resetFilterJobsValues(formik, filter)
				: resetFilterTrussesValues(formik, filter);

		formik.setValues(initialValues);
	};
	return (
		<Fixed>
			<ButtonsRow>
				{!_.isEqual(getInitialValues(activeTree, filter), formik.values) && (
					<OutlinedButton type="button" level={3} onClick={handleReset}>
						{t(
							translationPath(
								activeFilter === FilterType.Customer
									? lang.common.removeCustomerFilter
									: activeFilter === FilterType.Project
									? lang.common.removeProjectFilter
									: activeFilter === FilterType.Job
									? lang.common.removeJobFilter
									: lang.common.removeTrussFilter
							).path
						)}
					</OutlinedButton>
				)}
			</ButtonsRow>
		</Fixed>
	);
};

export const ButtonsRow = styled.div`
	margin-top: 5px;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	padding: 4px;

	button {
		width: 100%;
	}
`;
