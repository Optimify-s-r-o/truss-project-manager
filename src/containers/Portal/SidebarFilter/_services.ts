import { FilterSettings, FilterSettingsProxy } from '../../../types/_types';
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
				get(
					filter,
					getPath(FilterSettingsProxy.Customer.AveragePricePerProjectFrom)
				),
				get(
					filter,
					getPath(FilterSettingsProxy.Customer.AveragePricePerProjectTo)
				)
			)
		),
		SumOfProjectPricesFilter: getFilter(
			activeFilterContent?.Customers?.SumOfProjectPricesFilter,
			getObject(
				get(
					filter,
					getPath(FilterSettingsProxy.Customer.SumOfProjectPricesFrom)
				),
				get(filter, getPath(FilterSettingsProxy.Customer.SumOfProjectPricesTo))
			)
		),

		NumberOfProjectsFilter: getFilter(
			activeFilterContent?.Customers?.NumberOfProjectsFilter,
			getObject(
				get(filter, getPath(FilterSettingsProxy.Customer.NumberOfProjectsFrom)),
				get(filter, getPath(FilterSettingsProxy.Customer.NumberOfProjectsTo))
			)
		),
		NumberOfQuotationsFilter: getFilter(
			activeFilterContent?.Customers?.NumberOfQuotationsFilter,
			getObject(
				get(
					filter,
					getPath(FilterSettingsProxy.Customer.NumberOfQuotationsFrom)
				),
				get(filter, getPath(FilterSettingsProxy.Customer.NumberOfQuotationsTo))
			)
		),
		NumberOfProductionsFilter: getFilter(
			activeFilterContent?.Customers?.NumberOfProductionsFilter,
			getObject(
				get(
					filter,
					getPath(FilterSettingsProxy.Customer.NumberOfProductionsFrom)
				),
				get(filter, getPath(FilterSettingsProxy.Customer.NumberOfProductionsTo))
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
				get(filter, getPath(FilterSettingsProxy.Project.ProductionPriceFrom)),
				get(filter, getPath(FilterSettingsProxy.Project.ProductionPriceTo))
			)
		),
		QuotationPriceFilter: getFilter(
			activeFilterContent?.Projects?.QuotationPriceFilter,
			getObject(
				get(filter, getPath(FilterSettingsProxy.Project.QuotationPriceFrom)),
				get(filter, getPath(FilterSettingsProxy.Project.QuotationPriceTo))
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
			getObject(
				get(filter, getPath(FilterSettingsProxy.Job.PriceFrom)),
				get(filter, getPath(FilterSettingsProxy.Job.PriceTo))
			)
		),
		PricePerSquareMeterFilter: getFilter(
			activeFilterContent?.Jobs?.PricePerSquareMeterFilter,
			getObject(
				get(filter, getPath(FilterSettingsProxy.Job.PricePerSquareMeterFrom)),
				get(filter, getPath(FilterSettingsProxy.Job.PricePerSquareMeterTo))
			)
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
			getObject(
				get(filter, getPath(FilterSettingsProxy.Job.AltitudeTo)),
				get(filter, getPath(FilterSettingsProxy.Job.AltitudeTo))
			)
		),
		CoveredAreaFilter: getFilter(
			activeFilterContent?.Jobs?.CoveredAreaFilter,
			getObject(
				get(filter, getPath(FilterSettingsProxy.Job.CoveredAreaFrom)),
				get(filter, getPath(FilterSettingsProxy.Job.CoveredAreaTo))
			)
		),
		CentresFilter: getFilter(
			activeFilterContent?.Jobs?.CentresFilter,
			getObject(
				get(filter, getPath(FilterSettingsProxy.Truss.CentresFrom)),
				get(filter, getPath(FilterSettingsProxy.Truss.CentresTo))
			)
		),
		HipLengthFilter: getFilter(
			activeFilterContent?.Jobs?.HipLengthFilter,
			getObject(
				get(filter, getPath(FilterSettingsProxy.Job.HipLengthFrom)),
				get(filter, getPath(FilterSettingsProxy.Job.HipLengthTo))
			)
		),
		RidgeLengthFilter: getFilter(
			activeFilterContent?.Jobs?.RidgeLengthFilter,
			getObject(
				get(filter, getPath(FilterSettingsProxy.Job.RidgeLengthFrom)),
				get(filter, getPath(FilterSettingsProxy.Job.PriceTo))
			)
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
			getObject(
				get(filter, getPath(FilterSettingsProxy.Truss.PriceFrom)),
				get(filter, getPath(FilterSettingsProxy.Truss.PriceTo))
			)
		),
		WindLoadFilter: getFilter(
			activeFilterContent?.Trusses?.WindLoadFilter,
			getObject(
				get(filter, getPath(FilterSettingsProxy.Truss.WindLoadFrom)),
				get(filter, getPath(FilterSettingsProxy.Truss.WindLoadTo))
			)
		),
		SnowLoadFilter: getFilter(
			activeFilterContent?.Trusses?.SnowLoadFilter,
			getObject(
				get(filter, getPath(FilterSettingsProxy.Truss.SnowLoadFrom)),
				get(filter, getPath(FilterSettingsProxy.Truss.SnowLoadTo))
			)
		),
		CeilingLoadFilter: getFilter(
			activeFilterContent?.Trusses?.CeilingLoadFilter,
			getObject(
				get(filter, getPath(FilterSettingsProxy.Truss.CeilingLoadFrom)),
				get(filter, getPath(FilterSettingsProxy.Truss.CeilingLoadTo))
			)
		),
		RoofingLoadFilter: getFilter(
			activeFilterContent?.Trusses?.RoofingLoadFilter,
			getObject(
				get(filter, getPath(FilterSettingsProxy.Truss.RoofingLoadFrom)),
				get(filter, getPath(FilterSettingsProxy.Truss.RoofingLoadTo))
			)
		),
		HeightFilter: getFilter(
			activeFilterContent?.Trusses?.HeightFilter,
			getObject(
				get(filter, getPath(FilterSettingsProxy.Truss.HeightFrom)),
				get(filter, getPath(FilterSettingsProxy.Truss.HeightTo))
			)
		),
		LengthFilter: getFilter(
			activeFilterContent?.Trusses?.LengthFilter,
			getObject(
				get(filter, getPath(FilterSettingsProxy.Truss.LengthFrom)),
				get(filter, getPath(FilterSettingsProxy.Truss.LengthTo))
			)
		),
		SpanFilter: getFilter(
			activeFilterContent?.Trusses?.SpanFilter,
			getObject(
				get(filter, getPath(FilterSettingsProxy.Truss.SpanFrom)),
				get(filter, getPath(FilterSettingsProxy.Truss.SpanTo))
			)
		),
		ThicknessFilter: getFilter(
			activeFilterContent?.Trusses?.ThicknessFilter,
			getObject(
				get(filter, getPath(FilterSettingsProxy.Truss.ThicknessFrom)),
				get(filter, getPath(FilterSettingsProxy.Truss.ThicknessTo))
			)
		),
		WeightFilter: getFilter(
			activeFilterContent?.Trusses?.WeightFilter,
			getObject(
				get(filter, getPath(FilterSettingsProxy.Truss.WeightFrom)),
				get(filter, getPath(FilterSettingsProxy.Truss.WeightTo))
			)
		),
		TransportWeightFilter: getFilter(
			activeFilterContent?.Trusses?.TransportWeightFilter,
			getObject(
				get(filter, getPath(FilterSettingsProxy.Truss.TransportWeightFrom)),
				get(filter, getPath(FilterSettingsProxy.Truss.TransportWeightTo))
			)
		),
		SupportsQuantityFilter: getFilter(
			activeFilterContent?.Trusses?.SupportsQuantityFilter,
			getObject(
				get(filter, getPath(FilterSettingsProxy.Truss.SupportsCountFrom)),
				get(filter, getPath(FilterSettingsProxy.Truss.SupportsCountTo))
			)
		),
		MembersCountFilter: getFilter(
			activeFilterContent?.Trusses?.MembersCountFilter,
			getObject(
				get(filter, getPath(FilterSettingsProxy.Truss.MembersCountFrom)),
				get(filter, getPath(FilterSettingsProxy.Truss.MembersCountTo))
			)
		),
		PlatesCountFilter: getFilter(
			activeFilterContent?.Trusses?.PlatesCountFilter,
			getObject(filter?.Truss?.PlatesCountFrom, filter?.Truss?.PlatesCountTo)
		),
		ModelCountFilter: getFilter(
			activeFilterContent?.Trusses?.ModelCountFilter,
			getObject(
				get(filter, getPath(FilterSettingsProxy.Truss.ModelCountFrom)),
				get(filter, getPath(FilterSettingsProxy.Truss.ModelCountTo))
			)
		),
		PliesFilter: getFilter(
			activeFilterContent?.Trusses?.PliesFilter,
			getObject(
				get(filter, getPath(FilterSettingsProxy.Truss.PliesFrom)),
				get(filter, getPath(FilterSettingsProxy.Truss.PliesTo))
			)
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
