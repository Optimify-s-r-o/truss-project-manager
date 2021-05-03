import { FilterSettings } from '../../../types/_types';
import { get } from 'lodash';
import { getObject } from '../../../utils/helpers';
import { getPath, lastPathMember } from '../../../utils/getPath';
import {
	CustomersFilter,
	CustomersFilterProxy,
	Filter,
	JobsFilter,
	JobsFilterProxy,
	ProjectsFilter,
	ProjectsFilterProxy,
	TrussesFilter,
	TrussesFilterProxy,
} from "./_types";

export const activation = {
	Active: false,
	IncludeNotSet: false,
};

export const getFilter = (activeFilterContent: any, value: any) => {
	if (
		!activeFilterContent ||
		(!!!activeFilterContent && activeFilterContent?.Active === false)
	) {
		return value;
	}
	return activeFilterContent;
};

export const getInitialValues = (
	filter: FilterSettings,
	activeFilterContent?: any
): Filter => {
	return {
		Customers: getCustomersFilters(filter, activeFilterContent),
		Projects: getProjectsFilters(filter, activeFilterContent),
		Jobs: getJobsFilters(filter, activeFilterContent),
		Trusses: getTrussesFilters(filter, activeFilterContent),
	};
};

export const getCustomersFilters = (
	filter: FilterSettings,
	activeFilterContent?: any
): CustomersFilter => {
	return {
		FirstNameFilter: getFilter(
			activeFilterContent?.Customers?.FirstNameFilter,
			{
				...activation,
				FirstName: "",
			}
		),
		LastNameFilter: getFilter(activeFilterContent?.Customers?.LastNameFilter, {
			...activation,
			LastName: "",
		}),
		CompanyNameFilter: getFilter(
			activeFilterContent?.Customers?.CompanyNameFilter,
			{
				...activation,
				Name: "",
			}
		),
		CrnFilter: getFilter(activeFilterContent?.Customers?.CrnFilter, {
			Crn: "",
		}),
		VatNumberFilter: getFilter(
			activeFilterContent?.Customers?.VatNumberFilter,
			{
				...activation,
				VatNumber: "",
			}
		),
		CustomerTypeFilter: getFilter(
			activeFilterContent?.Customers?.CustomerTypeFilter,
			{
				...activation,
				Customers: [],
			}
		),
		AveragePricePerProjectFilter: getFilter(
			activeFilterContent?.Customers?.AveragePricePerProjectFilter,
			getObject(
				filter?.Customer?.AveragePricePerProjectFrom,
				filter?.Customer?.AveragePricePerProjectTo
			)
		),
		SumOfProjectPricesFilter: getFilter(
			activeFilterContent?.Customers?.SumOfProjectPricesFilter,
			getObject(
				filter?.Customer?.SumOfProjectPricesFrom,
				filter?.Customer?.SumOfProjectPricesTo
			)
		),

		NumberOfProjectsFilter: getFilter(
			activeFilterContent?.Customers?.NumberOfProjectsFilter,
			getObject(
				filter?.Customer?.NumberOfProjectsFrom,
				filter?.Customer?.NumberOfProjectsTo
			)
		),
		NumberOfQuotationsFilter: getFilter(
			activeFilterContent?.Customers?.NumberOfQuotationsFilter,
			getObject(
				filter?.Customer?.NumberOfQuotationsFrom,
				filter?.Customer?.NumberOfQuotationsTo
			)
		),
		NumberOfProductionsFilter: getFilter(
			activeFilterContent?.Customers?.NumberOfProductionsFilter,
			getObject(
				filter?.Customer?.NumberOfProductionsFrom,
				filter?.Customer?.NumberOfProductionsTo
			)
		),
		ProductionsPerQuotationsFilter: {
			...activation,
			From: 0,
			To: 1,
		},
		CustomerDateOfCreationFilter: {
			...activation,
			From: null,
			To: null,
		},
	};
};

export const getProjectsFilters = (
	filter: FilterSettings,
	activeFilterContent?: any
): ProjectsFilter => {
	return {
		NameFilter: getFilter(activeFilterContent?.Projects?.NameFilter, {
			...activation,
			Name: "",
			ExactMatch: false,
		}),
		UserFilter: getFilter(activeFilterContent?.Projects?.UserFilter, {
			...activation,
			Name: null,
		}),
		AddressFilter: getFilter(activeFilterContent?.Projects?.AddressFilter, {
			...activation,
			Location: "",
		}),
		ProjectStateFilter: getFilter(
			activeFilterContent?.Projects?.ProjectStateFilter,
			{
				...activation,
				ProjectStates: [],
			}
		),
		ProductionPriceFilter: getFilter(
			activeFilterContent?.Projects?.ProductionPriceFilter,
			getObject(
				filter?.Project?.ProductionPriceFrom,
				filter?.Project?.ProductionPriceTo
			)
		),
		QuotationPriceFilter: getFilter(
			activeFilterContent?.Projects?.QuotationPriceFilter,
			getObject(
				filter?.Project?.QuotationPriceFrom,
				filter?.Project?.QuotationPriceTo
			)
		),
		ConstructionDateFilter: getFilter(
			activeFilterContent?.Projects?.ConstructionDateFilter,
			{
				...activation,
				From: null,
				To: null,
			}
		),
		DateOfCreationFilter: getFilter(
			activeFilterContent?.Projects?.DateOfCreationFilter,
			{
				...activation,
				From: null,
				To: null,
			}
		),
		QuotationDateFilter: getFilter(
			activeFilterContent?.Projects?.QuotationDateFilter,
			{
				...activation,
				From: null,
				To: null,
			}
		),
	};
};

export const getJobsFilters = (
	filter: FilterSettings,
	activeFilterContent?: any
): JobsFilter => {
	return {
		NameFilter: getFilter(activeFilterContent?.Jobs?.NameFilter, {
			...activation,
			Name: "",
			ExactMatch: false,
		}),
		JobTypeFilter: getFilter(activeFilterContent?.Jobs?.JobTypeFilter, {
			...activation,
			JobTypes: [],
		}),
		JobStateFilter: getFilter(activeFilterContent?.Jobs?.JobStateFilter, {
			...activation,
			JobStates: [],
		}),
		PriceFilter: getFilter(
			activeFilterContent?.Jobs?.PriceFilter,
			getObject(filter?.Job?.PriceFrom, filter?.Job?.PriceTo)
		),
		PricePerSquareMeterFilter: getFilter(
			activeFilterContent?.Jobs?.PricePerSquareMeterFilter,
			getObject(
				filter?.Job?.PricePerSquareMeterFrom,
				filter?.Job?.PricePerSquareMeterTo
			)
		),
		RoofingLoadFilter: getFilter(
			activeFilterContent?.Jobs?.RoofingLoadFilter,
			getObject(filter?.Job?.RoofingLoadFrom, filter?.Job?.RoofingLoadTo)
		),
		CeilingLoadFilter: getFilter(
			activeFilterContent?.Jobs?.CeilingLoadFilter,
			getObject(filter?.Job?.CeilingLoadFrom, filter?.Job?.CeilingLoadTo)
		),
		SnowAreaFilter: getFilter(activeFilterContent?.Jobs?.SnowAreaFilter, {
			...activation,
			SnowAreas: [],
		}),
		WindAreaFilter: getFilter(activeFilterContent?.Jobs?.WindAreaFilter, {
			...activation,
			WindAreas: [],
		}),
		WindFilter: getFilter(
			activeFilterContent?.Jobs?.WindFilter,
			getObject(filter?.Job?.WindFrom, filter?.Job?.WindTo)
		),
		SnowFilter: getFilter(
			activeFilterContent?.Jobs?.SnowFilter,
			getObject(filter?.Job?.SnowFrom, filter?.Job?.SnowTo)
		),
		AltitudeFilter: getFilter(
			activeFilterContent?.Jobs?.AltitudeFilter,
			getObject(filter?.Job?.AltitudeTo, filter?.Job?.AltitudeTo)
		),
		CoveredAreaFilter: getFilter(
			activeFilterContent?.Jobs?.CoveredAreaFilter,
			getObject(filter?.Job?.CoveredAreaFrom, filter?.Job?.CoveredAreaTo)
		),
		CentresFilter: getFilter(
			activeFilterContent?.Jobs?.CentresFilter,
			getObject(filter?.Truss?.CentresFrom, filter?.Truss?.CentresTo)
		),
		HipLengthFilter: getFilter(
			activeFilterContent?.Jobs?.HipLengthFilter,
			getObject(filter?.Job?.HipLengthFrom, filter?.Job?.HipLengthTo)
		),
		RidgeLengthFilter: getFilter(
			activeFilterContent?.Jobs?.RidgeLengthFilter,
			getObject(filter?.Job?.RidgeLengthFrom, filter?.Job?.RidgeLengthTo)
		),
		DateOfCreationFilter: getFilter(
			activeFilterContent?.Jobs?.DateOfCreationFilter,
			{
				...activation,
				From: null,
				To: null,
			}
		),
		DateOfLastUpdateFilter: getFilter(
			activeFilterContent?.Jobs?.DateOfLastUpdateFilter,
			{
				...activation,
				From: null,
				To: null,
			}
		),
	};
};

export const getTrussesFilters = (
	filter: FilterSettings,
	activeFilterContent?: any
): TrussesFilter => {
	return {
		NameFilter: getFilter(activeFilterContent?.Trusses?.NameFilter, {
			...activation,
			Name: "",
			ExactMatch: false,
		}),
		StatusFilter: getFilter(activeFilterContent?.Trusses?.StatusFilter, {
			...activation,
			Statuses: [],
		}),
		TypeFilter: getFilter(activeFilterContent?.Trusses?.TypeFilter, {
			...activation,
			Types: [],
		}),
		KindsFilter: getFilter(activeFilterContent?.Trusses?.KindsFilter, {
			...activation,
			Kinds: [],
		}),
		PriceFilter: getFilter(
			activeFilterContent?.Trusses?.PriceFilter,
			getObject(filter?.Truss?.PriceFrom, filter?.Truss?.PriceTo)
		),
		WindLoadFilter: getFilter(
			activeFilterContent?.Trusses?.WindLoadFilter,
			getObject(filter?.Truss?.WindLoadFrom, filter?.Truss?.WindLoadTo)
		),
		SnowLoadFilter: getFilter(
			activeFilterContent?.Trusses?.SnowLoadFilter,
			getObject(filter?.Truss?.SnowLoadFrom, filter?.Truss?.SnowLoadTo)
		),
		CeilingLoadFilter: getFilter(
			activeFilterContent?.Trusses?.CeilingLoadFilter,
			getObject(filter?.Truss?.CeilingLoadFrom, filter?.Truss?.CeilingLoadTo)
		),
		RoofingLoadFilter: getFilter(
			activeFilterContent?.Trusses?.RoofingLoadFilter,
			getObject(filter?.Truss?.RoofingLoadFrom, filter?.Truss?.RoofingLoadTo)
		),
		HeightFilter: getFilter(
			activeFilterContent?.Trusses?.HeightFilter,
			getObject(filter?.Truss?.HeightFrom, filter?.Truss?.HeightTo)
		),
		LengthFilter: getFilter(
			activeFilterContent?.Trusses?.LengthFilter,
			getObject(filter?.Truss?.LengthFrom, filter?.Truss?.LengthTo)
		),
		SpanFilter: getFilter(
			activeFilterContent?.Trusses?.SpanFilter,
			getObject(filter?.Truss?.SpanFrom, filter?.Truss?.SpanTo)
		),
		ThicknessFilter: getFilter(
			activeFilterContent?.Trusses?.ThicknessFilter,
			getObject(filter?.Truss?.ThicknessFrom, filter?.Truss?.ThicknessTo)
		),
		WeightFilter: getFilter(
			activeFilterContent?.Trusses?.WeightFilter,
			getObject(filter?.Truss?.WeightFrom, filter?.Truss?.WeightTo)
		),
		TransportWeightFilter: getFilter(
			activeFilterContent?.Trusses?.TransportWeightFilter,
			getObject(
				filter?.Truss?.TransportWeightFrom,
				filter?.Truss?.TransportWeightTo
			)
		),
		SupportsQuantityFilter: getFilter(
			activeFilterContent?.Trusses?.SupportsQuantityFilter,
			getObject(
				filter?.Truss?.SupportsCountFrom,
				filter?.Truss?.SupportsCountTo
			)
		),
		MembersCountFilter: getFilter(
			activeFilterContent?.Trusses?.MembersCountFilter,
			getObject(filter?.Truss?.MembersCountFrom, filter?.Truss?.MembersCountTo)
		),
		PlatesCountFilter: getFilter(
			activeFilterContent?.Trusses?.PlatesCountFilter,
			getObject(filter?.Truss?.PlatesCountFrom, filter?.Truss?.PlatesCountTo)
		),
		ModelCountFilter: getFilter(
			activeFilterContent?.Trusses?.ModelCountFilter,
			getObject(filter?.Truss?.ModelCountFrom, filter?.Truss?.ModelCountTo)
		),
		PliesFilter: getFilter(
			activeFilterContent?.Trusses?.PliesFilter,
			getObject(filter?.Truss?.PliesFrom, filter?.Truss?.PliesTo)
		),
	};
};

export const resetFilterCustomersValues = (
	values: any,
	filter: FilterSettings
) => (_event: React.MouseEvent<HTMLElement, MouseEvent>) => {
	return {
		...values,
		...getCustomersFilters(filter),
	};
};

export const resetFilterProjectsValues = (
	values: any,
	filter: FilterSettings
) => (_event: React.MouseEvent<HTMLElement, MouseEvent>) => {
	return {
		...values,
		...getProjectsFilters(filter),
	};
};

export const resetFilterJobsValues = (values: any, filter: FilterSettings) => (
	_event: React.MouseEvent<HTMLElement, MouseEvent>
) => {
	return {
		...values,
		...getJobsFilters(filter),
	};
};

export const resetFilterTrussesValues = (
	values: any,
	filter: FilterSettings
) => (_event: React.MouseEvent<HTMLElement, MouseEvent>) => {
	return {
		...values,
		...getTrussesFilters(filter),
	};
};

export const isNullOrEmpty = (value: any) => {
	if (!!value) {
		return false;
	}
	return true;
};

export const mapActiveInputs = (
	values: any,
	name: any,
	lastPathMember: any
) => {
	return {
		...activation,
		Active: isNullOrEmpty(get(values, name)) ? false : true,
		[lastPathMember.path]: get(values, name),
	};
};

export const mapCustomers = (values: any) => {
	return {
		...values,
		CompanyNameFilter: mapActiveInputs(
			values,
			getPath(CustomersFilterProxy.CompanyNameFilter.Name),
			lastPathMember(CustomersFilterProxy.CompanyNameFilter.Name)
		),
		CrnFilter: mapActiveInputs(
			values,
			getPath(CustomersFilterProxy.CrnFilter.Crn),
			lastPathMember(CustomersFilterProxy.CrnFilter.Crn)
		),
		VatNumberFilter: mapActiveInputs(
			values,
			getPath(CustomersFilterProxy.VatNumberFilter.VatNumber),
			lastPathMember(CustomersFilterProxy.VatNumberFilter.VatNumber)
		),
		FirstNameFilter: mapActiveInputs(
			values,
			getPath(CustomersFilterProxy.FirstNameFilter.FirstName),
			lastPathMember(CustomersFilterProxy.FirstNameFilter.FirstName)
		),
		LastNameFilter: mapActiveInputs(
			values,
			getPath(CustomersFilterProxy.LastNameFilter.LastName),
			lastPathMember(CustomersFilterProxy.LastNameFilter.LastName)
		),
	};
};

export const mapProjects = (values: any) => {
	return {
		...values,
		NameFilter: mapActiveInputs(
			values,
			getPath(ProjectsFilterProxy.NameFilter.Name),
			lastPathMember(ProjectsFilterProxy.NameFilter.Name)
		),
		AddressFilter: mapActiveInputs(
			values,
			getPath(ProjectsFilterProxy.AddressFilter.Location),
			lastPathMember(ProjectsFilterProxy.AddressFilter.Location)
		),
	};
};

export const mapJobs = (values: any) => {
	return {
		...values,
		NameFilter: mapActiveInputs(
			values,
			getPath(JobsFilterProxy.NameFilter.Name),
			lastPathMember(JobsFilterProxy.NameFilter.Name)
		),
	};
};

export const mapTrusses = (values: any) => {
	return {
		...values,
		NameFilter: mapActiveInputs(
			values,
			getPath(TrussesFilterProxy.NameFilter.Name),
			lastPathMember(TrussesFilterProxy.NameFilter.Name)
		),
	};
};

export const mapEntities = (values: any) => {
	return {
		Customers: mapCustomers(values?.Customers),
		Projects: mapProjects(values?.Projects),
		Jobs: mapJobs(values?.Jobs),
		Trusses: mapTrusses(values?.Trusses),
	};
};

export const mapActiveFilterContent = (values: any) => {
	return {
		Customers: mapActiveFilters(values?.Customers),
		Projects: mapActiveFilters(values?.Projects),
		Jobs: mapActiveFilters(values?.Jobs),
		Trusses: mapActiveFilters(values?.Trusses),
	};
};

export const mapActiveFilters = (values: any) => {
	if (!values) return null;
	let newObj = {};
	Object.entries(values).map(([key, value]: any) => {
		if (
			key === "FilterType" ||
			key === "PersistTree" ||
			key === "SaveFilter" ||
			key === "FilterType" ||
			key === "SavedFilterName" ||
			!value?.Active
		) {
			return;
		}
		newObj[key] = value;
	});
	return newObj;
};
