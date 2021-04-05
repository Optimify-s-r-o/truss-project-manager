import { get } from 'lodash';
import { getObject } from '../../../utils/helpers';
import { getPath } from '../../../utils/getPath';
import {
	FilterSettings,
	FilterSettingsProxy,
	TreeType,
} from "../../../types/_types";
import {
	CustomersFilter,
	Filter,
	JobsFilter,
	ProjectsFilter,
	TrussesFilter,
} from "./_types";

export const activation = {
	Active: false,
	IncludeNotSet: false,
};

export const getInitialValues = (
	activeTree: TreeType,
	filter: FilterSettings,
	activeFilterContent?: any
): Filter => {
	return {
		PersistTree: true,
		Customers: getCustomersFilters(filter),
		Projects: getProjectsFilters(filter),
		Jobs: getJobsFilters(filter),
		Trusses: getTrussesFilters(filter),
		ActiveTree: activeTree,
		...activeFilterContent,
	};
};

export const getCustomersFilters = (
	filter: FilterSettings
): CustomersFilter => {
	return {
		FirstNameFilter: {
			...activation,
			FirstName: "",
		},
		LastNameFilter: {
			...activation,
			LastName: "",
		},
		CompanyNameFilter: {
			...activation,
			Name: "",
		},
		CrnFilter: {
			...activation,
			Crn: "",
		},
		VatNumberFilter: {
			...activation,
			VatNumber: "",
		},
		CustomerTypeFilter: {
			...activation,
			Customers: [],
		},
		AveragePricePerProjectFilter: getObject(
			get(
				filter,
				getPath(FilterSettingsProxy.Customer.AveragePricePerProjectFrom)
			),
			get(
				filter,
				getPath(FilterSettingsProxy.Customer.AveragePricePerProjectTo)
			)
		),
		SumOfProjectPricesFilter: getObject(
			get(filter, getPath(FilterSettingsProxy.Customer.SumOfProjectPricesFrom)),
			get(filter, getPath(FilterSettingsProxy.Customer.SumOfProjectPricesTo))
		),

		NumberOfProjectsFilter: getObject(
			get(filter, getPath(FilterSettingsProxy.Customer.NumberOfProjectsFrom)),
			get(filter, getPath(FilterSettingsProxy.Customer.NumberOfProjectsTo))
		),
		NumberOfQuotationsFilter: getObject(
			get(filter, getPath(FilterSettingsProxy.Customer.NumberOfQuotationsFrom)),
			get(filter, getPath(FilterSettingsProxy.Customer.NumberOfQuotationsTo))
		),
		NumberOfProductionsFilter: getObject(
			get(
				filter,
				getPath(FilterSettingsProxy.Customer.NumberOfProductionsFrom)
			),
			get(filter, getPath(FilterSettingsProxy.Customer.NumberOfProductionsTo))
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

export const getProjectsFilters = (filter: FilterSettings): ProjectsFilter => {
	return {
		NameFilter: {
			...activation,
			Name: "",
			ExactMatch: false,
		},
		UserFilter: {
			...activation,
			Name: "",
		},
		AddressFilter: {
			...activation,
			Location: "",
		},
		ProjectStateFilter: {
			...activation,
			ProjectStates: [],
		},
		ProductionPriceFilter: getObject(
			get(filter, getPath(FilterSettingsProxy.Project.ProductionPriceFrom)),
			get(filter, getPath(FilterSettingsProxy.Project.ProductionPriceTo))
		),
		QuotationPriceFilter: getObject(
			get(filter, getPath(FilterSettingsProxy.Project.QuotationPriceFrom)),
			get(filter, getPath(FilterSettingsProxy.Project.QuotationPriceTo))
		),
		ConstructionDateFilter: {
			...activation,
			From: null,
			To: null,
		},
		DateOfCreationFilter: {
			...activation,
			From: null,
			To: null,
		},
		QuotationDateFilter: {
			...activation,
			From: null,
			To: null,
		},
	};
};

export const getJobsFilters = (filter: FilterSettings): JobsFilter => {
	return {
		NameFilter: {
			...activation,
			Name: "",
			ExactMatch: false,
		},
		JobTypeFilter: {
			...activation,
			JobTypes: [],
		},
		JobStateFilter: {
			...activation,
			JobStates: [],
		},
		PriceFilter: getObject(
			get(filter, getPath(FilterSettingsProxy.Job.PriceFrom)),
			get(filter, getPath(FilterSettingsProxy.Job.PriceTo))
		),
		PricePerSquareMeterFilter: getObject(
			get(filter, getPath(FilterSettingsProxy.Job.PricePerSquareMeterFrom)),
			get(filter, getPath(FilterSettingsProxy.Job.PricePerSquareMeterTo))
		),
		SnowAreaFilter: {
			...activation,
			SnowAreas: [],
		},
		WindAreaFilter: {
			...activation,
			WindAreas: [],
		},
		WindFilter: getObject(
			get(filter, getPath(FilterSettingsProxy.Job.WindFrom)),
			get(filter, getPath(FilterSettingsProxy.Job.WindTo))
		),
		SnowFilter: getObject(
			get(filter, getPath(FilterSettingsProxy.Job.SnowFrom)),
			get(filter, getPath(FilterSettingsProxy.Job.SnowTo))
		),
		AltitudeFilter: getObject(
			get(filter, getPath(FilterSettingsProxy.Job.AltitudeTo)),
			get(filter, getPath(FilterSettingsProxy.Job.AltitudeTo))
		),
		CoveredAreaFilter: getObject(
			get(filter, getPath(FilterSettingsProxy.Job.CoveredAreaFrom)),
			get(filter, getPath(FilterSettingsProxy.Job.CoveredAreaTo))
		),
		CeilingNameFilter: {
			...activation,
			Name: "",
			ExactMatch: false,
		},
		CentresFilter: getObject(
			get(filter, getPath(FilterSettingsProxy.Truss.CentresFrom)),
			get(filter, getPath(FilterSettingsProxy.Truss.CentresTo))
		),
		RoofingNameFilter: {
			...activation,
			Name: "",
			ExactMatch: false,
		},
		HipLengthFilter: getObject(
			get(filter, getPath(FilterSettingsProxy.Job.HipLengthFrom)),
			get(filter, getPath(FilterSettingsProxy.Job.HipLengthTo))
		),
		RidgeLengthFilter: getObject(
			get(filter, getPath(FilterSettingsProxy.Job.RidgeLengthFrom)),
			get(filter, getPath(FilterSettingsProxy.Job.PriceTo))
		),
		JobDateOfCreationFilter: {
			...activation,
			From: null,
			To: null,
		},
		DateOfLastUpdateFilter: {
			...activation,
			From: null,
			To: null,
		},
	};
};

export const getTrussesFilters = (filter: FilterSettings): TrussesFilter => {
	return {
		NameFilter: {
			...activation,
			Name: "",
			ExactMatch: false,
		},
		StatusFilter: {
			...activation,
			Statuses: [],
		},
		TypeFilter: {
			...activation,

			Types: [],
		},
		KindsFilter: {
			...activation,
			Kinds: [],
		},
		PriceFilter: getObject(
			get(filter, getPath(FilterSettingsProxy.Truss.PriceFrom)),
			get(filter, getPath(FilterSettingsProxy.Truss.PriceTo))
		),
		WindLoadFilter: getObject(
			get(filter, getPath(FilterSettingsProxy.Truss.WindLoadFrom)),
			get(filter, getPath(FilterSettingsProxy.Truss.WindLoadTo))
		),
		SnowLoadFilter: getObject(
			get(filter, getPath(FilterSettingsProxy.Truss.SnowLoadFrom)),
			get(filter, getPath(FilterSettingsProxy.Truss.SnowLoadTo))
		),
		CeilingLoadFilter: getObject(
			get(filter, getPath(FilterSettingsProxy.Truss.CeilingLoadFrom)),
			get(filter, getPath(FilterSettingsProxy.Truss.CeilingLoadTo))
		),
		RoofingLoadFilter: getObject(
			get(filter, getPath(FilterSettingsProxy.Truss.RoofingLoadFrom)),
			get(filter, getPath(FilterSettingsProxy.Truss.RoofingLoadTo))
		),
		HeightFilter: getObject(
			get(filter, getPath(FilterSettingsProxy.Truss.HeightFrom)),
			get(filter, getPath(FilterSettingsProxy.Truss.HeightTo))
		),
		LengthFilter: getObject(
			get(filter, getPath(FilterSettingsProxy.Truss.LengthFrom)),
			get(filter, getPath(FilterSettingsProxy.Truss.LengthTo))
		),
		SpanFilter: getObject(
			get(filter, getPath(FilterSettingsProxy.Truss.SpanFrom)),
			get(filter, getPath(FilterSettingsProxy.Truss.SpanTo))
		),
		ThicknessFilter: getObject(
			get(filter, getPath(FilterSettingsProxy.Truss.ThicknessFrom)),
			get(filter, getPath(FilterSettingsProxy.Truss.ThicknessTo))
		),
		WeightFilter: getObject(
			get(filter, getPath(FilterSettingsProxy.Truss.WeightFrom)),
			get(filter, getPath(FilterSettingsProxy.Truss.WeightTo))
		),
		TransportWeightFilter: getObject(
			get(filter, getPath(FilterSettingsProxy.Truss.TransportWeightFrom)),
			get(filter, getPath(FilterSettingsProxy.Truss.TransportWeightTo))
		),
		SupportsQuantityFilter: getObject(
			get(filter, getPath(FilterSettingsProxy.Truss.SupportsCountFrom)),
			get(filter, getPath(FilterSettingsProxy.Truss.SupportsCountTo))
		),
		MembersCountFilter: getObject(
			get(filter, getPath(FilterSettingsProxy.Truss.MembersCountFrom)),
			get(filter, getPath(FilterSettingsProxy.Truss.MembersCountTo))
		),
		PlatesCountFilter: getObject(
			filter?.Truss?.PlatesCountFrom,
			filter?.Truss?.PlatesCountTo
		),
		ModelCountFilter: getObject(
			get(filter, getPath(FilterSettingsProxy.Truss.ModelCountFrom)),
			get(filter, getPath(FilterSettingsProxy.Truss.ModelCountTo))
		),
		PliesFilter: getObject(
			get(filter, getPath(FilterSettingsProxy.Truss.PliesFrom)),
			get(filter, getPath(FilterSettingsProxy.Truss.PliesTo))
		),
	};
};

export const resetFilterCustomersValues = (
	formik: any,
	filter: FilterSettings
) => (_event: React.MouseEvent<HTMLElement, MouseEvent>) => {
	return {
		...formik.values,
		Customers: getCustomersFilters(filter),
	};
};

export const resetFilterProjectsValues = (
	formik: any,
	filter: FilterSettings
) => (_event: React.MouseEvent<HTMLElement, MouseEvent>) => {
	return {
		...formik.values,
		Projects: getProjectsFilters(filter),
	};
};

export const resetFilterJobsValues = (formik: any, filter: FilterSettings) => (
	_event: React.MouseEvent<HTMLElement, MouseEvent>
) => {
	return {
		...formik.values,
		Jobs: getJobsFilters(filter),
	};
};

export const resetFilterTrussesValues = (
	formik: any,
	filter: FilterSettings
) => (_event: React.MouseEvent<HTMLElement, MouseEvent>) => {
	return {
		...formik.values,
		Trusses: getTrussesFilters(filter),
	};
};
