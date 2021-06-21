import CheckboxSelection from '../../components/Checkbox';
import React, { useEffect } from 'react';
import { Checkbox } from '../../Jobs/Component';
import { CustomerProxy } from '../../../Customer/_types';
import { faSuitcase } from '@fortawesome/pro-duotone-svg-icons';
import { FilterContentType, FilterProxy } from '../../../SidebarFilter/_types';
import { FilterType, PutHeaderSettings } from '../../_types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { lang } from '../../../../../translation/i18n';
import { Page, TreeType } from '../../../../../types/_types';
import { RootStateType } from '../../../../../reducers/index';
import { Routes } from 'src/constants/routes';
import { setSort, setSortOrder } from '../../_action';
import { StyledLink } from '../_styles';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
	ContentInline,
	ContentRow,
	ContentSpaceBetweenWithPadding,
	Header1,
} from "../../../../../constants/globalStyles";
import {
	getPath,
	lastPathMember,
	translationPath,
} from "../../../../../utils/getPath";

interface ColumnSelector {
	checked: Checkbox[];
	setChecked: React.Dispatch<React.SetStateAction<Checkbox[]>>;
	setColumns: React.Dispatch<React.SetStateAction<Checkbox[]>>;
	initHeaders: string[];
	putHeaderSettings: (data: PutHeaderSettings) => void;
	resetHeaderSettings: (data: string) => void;
	getCustomers: (data: Page) => void;
	sort: number[];
	setSort: (data: number[]) => void;
	setSortOrder: (data: number[]) => void;
}

export const CustomerColumnSelector = ({
	checked,
	setChecked,
	initHeaders,
	putHeaderSettings,
	setColumns,
	resetHeaderSettings,
	getCustomers,
	sort,
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
			Param: TreeType.CUSTOMER,
			Headers: newCheckboxes.map((e) => e.name),
		});
		setChecked(newCheckboxes);
	};

	const checkboxes: Checkbox[] = [
		{
			name: lastPathMember(CustomerProxy.Forename).path,
			title: t(translationPath(lang.common.forename).path),
			section: "General",
			filter: getPath(FilterProxy.Customers.FirstNameFilter.FirstName),
			filterType: FilterContentType.TEXT,
		},
		{
			name: lastPathMember(CustomerProxy.Surname).path,
			title: t(translationPath(lang.common.surname).path),
			section: "General",
			filter: getPath(FilterProxy.Customers.LastNameFilter.LastName),
			filterType: FilterContentType.TEXT,
		},
		{
			name: lastPathMember(CustomerProxy.Company).path,
			title: t(translationPath(lang.common.companyName).path),
			section: "General",
			filter: getPath(FilterProxy.Customers.CompanyNameFilter.Name),
			filterType: FilterContentType.TEXT,
		},
		{
			name: lastPathMember(CustomerProxy.Crn).path,
			title: t(translationPath(lang.common.crn).path),
			section: "General",
			filter: getPath(FilterProxy.Customers.CrnFilter.Crn),
			filterType: FilterContentType.TEXT,
		},

		{
			name: lastPathMember(CustomerProxy.VatRegNo).path,
			title: t(translationPath(lang.common.vatRegNo).path),
			section: "General",
			filter: getPath(FilterProxy.Customers.VatNumberFilter.VatNumber),
			filterType: FilterContentType.TEXT,
		},

		{
			name: "Open",
			title: t(translationPath(lang.common.actions).path),
			section: "General",
			filter: null,
		},
		{
			name: lastPathMember(CustomerProxy.ProjectCount).path,
			title: t(translationPath(lang.common.numberOfProjectsFilter).path),
			section: "Statistics",
			filter: getPath(FilterProxy.Customers.NumberOfProjectsFilter),
			filterType: FilterContentType.RANGE,
			round: true,
		},
		{
			name: lastPathMember(CustomerProxy.FinishedQuotationCount).path,
			title: t(translationPath(lang.common.finishedQuotationCount).path),
			section: "Statistics",
			filter: getPath(FilterProxy.Customers.NumberOfQuotationsFilter),
			filterType: FilterContentType.RANGE,
			round: true,
		},
		{
			name: lastPathMember(CustomerProxy.FinishedProductionCount).path,
			title: t(translationPath(lang.common.finishedProductionCount).path),
			section: "Statistics",
			filter: getPath(FilterProxy.Customers.NumberOfProductionsFilter),
			filterType: FilterContentType.RANGE,
			round: true,
		},
		{
			name: lastPathMember(CustomerProxy.ProductionsPerQuotations).path,
			title: t(
				translationPath(lang.common.productionsPerQuotationsFilter).path
			),
			section: "Statistics",
			filter: getPath(FilterProxy.Customers.ProductionsPerQuotationsFilter),
			filterType: FilterContentType.RANGE,
			round: true,
		},
		{
			name: lastPathMember(CustomerProxy.DateOfCreation).path,
			title: t(translationPath(lang.common.customerDateOfCreationFilter).path),
			section: "Date",
			filter: getPath(FilterProxy.Customers.CustomerDateOfCreationFilter),
			filterType: FilterContentType.DATE,
			round: true,
		},
	];

	return (
		<ContentSpaceBetweenWithPadding>
			<ContentRow>
				<Header1>{t(translationPath(lang.common.customersList).path)}</Header1>
				<StyledLink to={Routes.CREATE_CUSTOMER}>
					<FontAwesomeIcon
						icon={faSuitcase}
						style={{ fontSize: 12, color: "#bb9e00" }}
					/>
					<span>{t(translationPath(lang.customer.newCustomer).path)}</span>
				</StyledLink>
			</ContentRow>

			<ContentInline>
				<CheckboxSelection
					changeChecked={changeChecked}
					checked={checked}
					checkboxes={checkboxes.map((c, i) => {
						return { ...c, position: i };
					})}
					resetHeaderSettings={resetHeaderSettings}
					type={FilterType.Customer}
					getEntities={getCustomers}
					setSort={setSort}
					setSortOrder={setSortOrder}
					sort={sort}
				/>
			</ContentInline>
		</ContentSpaceBetweenWithPadding>
	);
};
