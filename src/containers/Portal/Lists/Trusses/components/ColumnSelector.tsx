import CheckboxSelection from '../../components/Checkbox';
import React, { useEffect } from 'react';
import { Checkbox } from '../../Jobs/Component';
import { FilterContentType, FilterProxy } from '../../../SidebarFilter/_types';
import { FilterType, PutHeaderSettings } from '../../_types';
import { getPath, translationPath } from '../../../../../utils/getPath';
import { lang } from '../../../../../translation/i18n';
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

export const TrussColumnSelector = ({
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
			Param: TreeType.TRUSS,
			Headers: newCheckboxes.map((e) => e.name),
		});
		setChecked(newCheckboxes);
	};

	const checkboxes: Checkbox[] = [
		{
			name: "Name",
			title: t(translationPath(lang.common.truss).path),
			section: "General",
			filter: getPath(FilterProxy.Trusses.NameFilter.Name),
			filterType: FilterContentType.TEXT,
		},
		{
			name: "Status",
			title: t(translationPath(lang.common.status).path),
			section: "General",
			filter: getPath(FilterProxy.Trusses.StatusFilter.Statuses),
			filterType: FilterContentType.ARRAY,
		},
		{
			name: "Type",
			title: t(translationPath(lang.common.type).path),
			section: "General",
			filter: getPath(FilterProxy.Trusses.TypeFilter.Types),
			filterType: FilterContentType.ARRAY,
		},
		{
			name: "Kind",
			title: t(translationPath(lang.common.kinds).path),
			section: "General",
			filter: getPath(FilterProxy.Trusses.KindsFilter.Kinds),
			filterType: FilterContentType.ARRAY,
		},
		{
			name: "JobName",
			title: t(translationPath(lang.common.jobName).path),
			section: "General",
			filter: getPath(FilterProxy.Jobs.NameFilter.Name),
			filterType: FilterContentType.TEXT,
		},

		{
			name: "Price",
			title: t(translationPath(lang.common.price).path),
			section: "Calculation",
			filter: null,
		},
		{
			name: "PlateWeight",
			title: t(translationPath(lang.common.platesWeight).path),
			section: "Calculation",
			filter: null,
		},
		{
			name: "PlanksOnArea",
			title: t(translationPath(lang.common.planksOnArea).path),
			section: "Calculation",
			filter: null,
		},
		{
			name: "PriceOnPlanks",
			title: t(translationPath(lang.common.priceOnPlanks).path),
			section: "Calculation",
			filter: null,
		},
		{
			name: "PriceSum",
			title: t(translationPath(lang.common.totalPrice).path),
			section: "Calculation",
			filter: getPath(FilterProxy.Trusses.PriceFilter),
			filterType: FilterContentType.RANGE,
		},
		{
			name: "PriceOnArea",
			title: t(translationPath(lang.common.PriceOnArea).path),
			section: "Calculation",
			filter: null,
		},
		{
			name: "WindLoad",
			title: t(translationPath(lang.common.windLoad).path),
			section: "Load",
			filter: getPath(FilterProxy.Trusses.WindLoadFilter),
			filterType: FilterContentType.RANGE,
		},
		{
			name: "SnowLoad",
			title: t(translationPath(lang.common.snowLoad).path),
			section: "Load",
			filter: getPath(FilterProxy.Trusses.SnowLoadFilter),
			filterType: FilterContentType.RANGE,
		},
		{
			name: "CeilingLoad",
			title: t(translationPath(lang.common.ceilingLoad).path),
			section: "Load",
			filter: getPath(FilterProxy.Trusses.CeilingLoadFilter),
			filterType: FilterContentType.RANGE,
		},
		{
			name: "RoofingLoad",
			title: t(translationPath(lang.common.roofingLoad).path),
			section: "Load",
			filter: getPath(FilterProxy.Trusses.RoofingLoadFilter),
			filterType: FilterContentType.RANGE,
		},
		{
			name: "SnowRegion",
			title: t(translationPath(lang.common.snowRegion).path),
			section: "Load",
			filter: null,
		},
		{
			name: "WindRegion",
			title: t(translationPath(lang.common.windRegion).path),
			section: "Load",
			filter: null,
		},
		{
			name: "RoofingName",
			title: t(translationPath(lang.common.roofingName).path),
			section: "Load",
			filter: null,
		},
		{
			name: "CeilingName",
			title: t(translationPath(lang.common.ceilingName).path),
			section: "Load",
			filter: null,
		},
		{
			name: "Height",
			title: t(translationPath(lang.common.height).path),
			section: "Dimensions",
			filter: null,
		},
		{
			name: "Length",
			title: t(translationPath(lang.common.length).path),
			section: "Dimensions",
			filter: getPath(FilterProxy.Trusses.LengthFilter),
			filterType: FilterContentType.RANGE,
		},
		{
			name: "Width",
			title: t(translationPath(lang.common.width).path),
			section: "Dimensions",
			filter: null,
		},
		{
			name: "Thickness",
			title: t(translationPath(lang.common.thickness).path),
			section: "Dimensions",
			filter: getPath(FilterProxy.Trusses.ThicknessFilter),
			filterType: FilterContentType.RANGE,
		},
		{
			name: "TransportWeight",
			title: t(translationPath(lang.common.transportWeight).path),
			section: "Others",
			filter: getPath(FilterProxy.Trusses.TransportWeightFilter),
			filterType: FilterContentType.RANGE,
		},
		{
			name: "SupportsCount",
			title: t(translationPath(lang.common.numberOfSupports).path),
			section: "Others",
			filter: getPath(FilterProxy.Trusses.SupportsQuantityFilter),
			filterType: FilterContentType.RANGE,
			round: true,
		},
		{
			name: "MembersCount",
			title: t(translationPath(lang.common.membersCount).path),
			section: "Others",
			filter: getPath(FilterProxy.Trusses.MembersCountFilter),
			filterType: FilterContentType.RANGE,
			round: true,
		},
		{
			name: "PlatesCount",
			title: t(translationPath(lang.common.platesCount).path),
			section: "Others",
			filter: getPath(FilterProxy.Trusses.PlatesCountFilter),
			filterType: FilterContentType.RANGE,
			round: true,
		},
		{
			name: "ModelCount",
			title: t(translationPath(lang.common.modelCount).path),
			section: "Others",
			filter: getPath(FilterProxy.Trusses.ModelCountFilter),
			filterType: FilterContentType.RANGE,
			round: true,
		},
		{
			name: "Plies",
			title: t(translationPath(lang.common.ply).path),
			section: "Others",
			filter: getPath(FilterProxy.Trusses.PliesFilter),
			filterType: FilterContentType.RANGE,
			round: true,
		},
		{
			name: "PlatesOnPlanks",
			title: t(translationPath(lang.common.PlatesWeighOnPlanksVolume).path),
			section: "Others",
			filter: null,
		},
		{
			name: "PlatesOnArea",
			title: t(translationPath(lang.common.PlateWeightOnArea).path),
			section: "Others",

			filter: null,
		},
		{
			name: "Count",
			title: t(translationPath(lang.common.count).path),
			section: "Others",
			filter: null,
		},
		{
			name: "Centres",
			title: t(translationPath(lang.common.centres).path),
			section: "Others",
			filter: null,
		},
		{
			name: "Pitch",
			title: t(translationPath(lang.common.pitch).path),
			section: "Others",
			filter: null,
		},
	];

	return (
		<ContentSpaceBetweenWithPadding>
			<Header1>{t(translationPath(lang.common.trussList).path)}</Header1>
			<ContentInline>
				<CheckboxSelection
					changeChecked={changeChecked}
					checked={checked}
					checkboxes={checkboxes.map((c, i) => {
						return { ...c, position: i };
					})}
					resetHeaderSettings={resetHeaderSettings}
					type={FilterType.Truss}
				/>
			</ContentInline>
		</ContentSpaceBetweenWithPadding>
	);
};
