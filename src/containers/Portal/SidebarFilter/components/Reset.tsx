import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FilterSettings, TreeType } from '../../../../types/_types';
import { FilterType } from '../index';
import { Fixed } from '../../../../constants/globalStyles';
import { lang } from '../../../../translation/i18n';
import { OutlinedButton } from '../../../../components/Optimify/Button';
import { translationPath } from '../../../../utils/getPath';
import { useTranslation } from 'react-i18next';
import {
	getCustomersFilters,
	getJobsFilters,
	getProjectsFilters,
	getTrussesFilters,
} from "../_services";
export interface OwnProps {
	filter: FilterSettings;
	activeTree: TreeType;
	values: any;
	setValues: (values: unknown, shouldValidate?: boolean) => void;
	resetTree: () => void;
	pending: boolean;
	activeFilter: FilterType;
}

export const Reset = (props: OwnProps) => {
	const { filter, values, setValues, resetTree, activeFilter } = props;
	const [initValues, setInitValues] = useState<any>([]);
	const { t } = useTranslation();

	useEffect(() => {
		setInitValues(
			activeFilter === FilterType.Customer
				? getCustomersFilters(filter)
				: activeFilter === FilterType.Project
				? getProjectsFilters(filter)
				: activeFilter === FilterType.Job
				? getJobsFilters(filter)
				: getTrussesFilters(filter)
		);
	}, [activeFilter]);

	const handleReset = (_event: React.MouseEvent<HTMLElement, MouseEvent>) => {
		const initialValues: any =
			activeFilter === FilterType.Customer
				? getCustomersFilters(filter)
				: activeFilter === FilterType.Project
				? getProjectsFilters(filter)
				: activeFilter === FilterType.Job
				? getJobsFilters(filter)
				: getTrussesFilters(filter);
		setValues(initialValues);
	};

	return (
		<Fixed>
			<ButtonsRow>
				{(!!!initValues || !_.isEqual(initValues, values)) && (
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
