import CheckboxSelection from '../../components/Checkbox';
import React, { useEffect } from 'react';
import { Checkbox } from '../Component';
import { FilterContentType, FilterProxy } from '../../../SidebarFilter/_types';
import { getPath, translationPath } from '../../../../../utils/getPath';
import { lang } from '../../../../../translation/i18n';
import { PutHeaderSettings } from '../../_types';
import { RootStateType } from '../../../../../reducers/index';
import { setSort, setSortOrder } from '../../_action';
import { TreeType } from '../../../../../types/_types';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
	ContentInline,
	ContentSpaceBetweenWithPadding,
	Header1,
} from "../../../../../constants/globalStyles";

interface ColumnSelector {
	checked: Checkbox[];
	setChecked: React.Dispatch<React.SetStateAction<Checkbox[]>>;
	setColumns: React.Dispatch<React.SetStateAction<Checkbox[]>>;
	initHeaders: string[];
	putHeaderSettings: (data: PutHeaderSettings) => void;
	resetHeaderSettings: (data: string) => void;
}

export const JobColumnSelector = ({
	checked,
	setChecked,
	initHeaders,
	putHeaderSettings,
	setColumns,
	resetHeaderSettings,
}: ColumnSelector) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const state = useSelector(
		(state: RootStateType) => state.HeaderSettingsReducer
	);

	useEffect(() => {
		if (initHeaders) {
			setChecked(
				initHeaders?.map((value) => checkboxes.find((i) => i.name == value))
			);
			setColumns(checkboxes);
		}
	}, [initHeaders]);

	const changeChecked = (newItem: Checkbox) => {
		const index = checked?.findIndex((item) => item.name === newItem.name);
		let newCheckboxes = [];
		if (index !== -1) {
			newCheckboxes = checked.filter((item) => item.name !== newItem.name);
			let temp = state.sort;
			temp.splice(index, 1);
			const newStateOrder = state.sortOrder.map(
				(value: number, key: number) => {
					if (value > index) {
						return value - 1;
					}
					return value;
				}
			);
			dispatch(setSortOrder(newStateOrder));
			dispatch(setSort(temp));
		} else {
			newCheckboxes = [...checked, newItem];
			dispatch(setSort([...state.sort, 0]));
		}
		putHeaderSettings({
			Param: TreeType.JOB,
			Headers: newCheckboxes.map((e) => e.name),
		});
		setChecked(newCheckboxes);
	};

	const checkboxes: Checkbox[] = [
		{
			name: "JobName",
			title: t(translationPath(lang.common.jobName).path),
			section: "General",
			filter: getPath(FilterProxy.Jobs.NameFilter.Name),
			filterType: FilterContentType.TEXT,
		},
		{
			name: "Type",
			title: t(translationPath(lang.common.jobType).path),
			section: "General",
			filter: getPath(FilterProxy.Jobs.JobTypeFilter.JobTypes),
			filterType: FilterContentType.ARRAY,
		},
		{
			name: "State",
			title: t(translationPath(lang.common.jobState).path),
			section: "General",
			filter: getPath(FilterProxy.Jobs.JobStateFilter.JobStates),
			filterType: FilterContentType.ARRAY,
		},
		{
			name: "Project",
			title: t(translationPath(lang.common.projectName).path),
			section: "General",
			filter: getPath(FilterProxy.Projects.NameFilter.Name),
			filterType: FilterContentType.TEXT,
		},

		{
			name: "CustomerName",
			title: t(translationPath(lang.common.customer).path),
			section: "General",
			filter: null,
		},
		{
			name: "Open",
			title: t(translationPath(lang.common.editJob).path),
			section: "General",
			filter: null,
		},
		{
			name: "Price",
			title: t(translationPath(lang.common.designPrice).path),
			section: "Calculation",
			filter: getPath(FilterProxy.Jobs.PriceFilter),
			filterType: FilterContentType.RANGE,
		},
		{
			name: "PricePerSquareMeter",
			title: t(translationPath(lang.common.pricePerSquareMeter).path),
			section: "Calculation",
			filter: getPath(FilterProxy.Jobs.PricePerSquareMeterFilter),
			filterType: FilterContentType.RANGE,
		},
		{
			name: "SnowRegion",
			title: t(translationPath(lang.common.snowArea).path),
			section: "Load",
			filterType: FilterContentType.ARRAY,
		},
		{
			name: "WindRegion",
			title: t(translationPath(lang.common.windArea).path),
			section: "Load",
			filterType: FilterContentType.ARRAY,
		},
		{
			name: "SnowLoad",
			title: t(translationPath(lang.common.snowLoad).path),
			section: "Load",
			filterType: FilterContentType.RANGE,
		},
		{
			name: "WindLoad",
			title: t(translationPath(lang.common.windLoad).path),
			section: "Load",
			filterType: FilterContentType.RANGE,
		},
		{
			name: "HipLength",
			title: t(translationPath(lang.common.hipLength).path),
			section: "TechnicalParameters",
			filter: getPath(FilterProxy.Jobs.HipLengthFilter),
			filterType: FilterContentType.RANGE,
		},
		{
			name: "CoveredArea",
			title: t(translationPath(lang.common.roofArea).path),
			section: "TechnicalParameters",
			filter: getPath(FilterProxy.Jobs.CoveredAreaFilter),
			filterType: FilterContentType.RANGE,
		},
		{
			name: "DateOfCreation",
			title: t(translationPath(lang.common.jobDateOfCreation).path),
			section: "Date",
			filter: getPath(FilterProxy.Jobs.JobDateOfCreationFilter),
			filterType: FilterContentType.DATE,
		},
		{
			name: "LastChange",
			title: t(translationPath(lang.common.jobDateOfLastUpdate).path),
			section: "Date",
			filter: getPath(FilterProxy.Jobs.DateOfLastUpdateFilter),
			filterType: FilterContentType.DATE,
		},
	];

	return (
		<ContentSpaceBetweenWithPadding>
			<Header1>{t(translationPath(lang.common.jobList).path)}</Header1>
			<ContentInline>
				<CheckboxSelection
					changeChecked={changeChecked}
					checked={checked}
					checkboxes={checkboxes.map((c, i) => {
						return { ...c, position: i };
					})}
					resetHeaderSettings={resetHeaderSettings}
					type={TreeType.JOB}
				/>
			</ContentInline>
		</ContentSpaceBetweenWithPadding>
	);
};
