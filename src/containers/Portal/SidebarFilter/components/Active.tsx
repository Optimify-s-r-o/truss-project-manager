import _ from 'lodash';
import React from 'react';
import {
	DateRange,
	MultipleSelect,
	Row,
	SliderRange
	} from './Row';
import { lang } from '../../../../translation/i18n';
import { translationPath } from '../../../../utils/getPath';
import { TreeType } from 'src/types/_types';
import { useTranslation } from 'react-i18next';
interface IActive {
	formik: any;
	active: boolean;
	activeFilterContent: any;
}
export const Active = ({ active, formik, activeFilterContent }: IActive) => {
	const { t } = useTranslation();

	return (
		<>
			<>
				{_.isEqual(activeFilterContent, formik.values)
					? t(translationPath(lang.filter.activeFilters).path)
					: t(translationPath(lang.filter.selectedFilters).path)}
			</>
			<Row
				title={t(translationPath(lang.common.forename).path)}
				value={formik.values?.Customers?.FirstNameFilter?.FirstName}
				show={formik.values?.Customers?.FirstNameFilter?.Active}
				type={TreeType.CUSTOMER}
			/>
			<Row
				title={t(translationPath(lang.common.surname).path)}
				value={formik.values?.Customers?.LastNameFilter?.LastName}
				show={formik.values?.Customers?.LastNameFilter?.Active}
				type={TreeType.CUSTOMER}
			/>
			<Row
				title={t(translationPath(lang.common.companyName).path)}
				value={formik.values?.Customers?.CompanyNameFilter?.Name}
				show={formik.values?.Customers?.CompanyNameFilter?.Active}
				type={TreeType.CUSTOMER}
			/>
			<Row
				title={t(translationPath(lang.common.crn).path)}
				value={formik.values?.Customers?.CrnFilter?.Crn}
				show={formik.values?.Customers?.CrnFilter?.Active}
				type={TreeType.CUSTOMER}
			/>
			<Row
				title={t(translationPath(lang.common.vatRegNo).path)}
				value={formik.values?.Customers?.VatNumberFilter?.VatNumber}
				show={formik.values?.Customers?.VatNumberFilter?.Active}
				type={TreeType.CUSTOMER}
			/>
			<MultipleSelect
				title={t(translationPath(lang.common.type).path)}
				value={formik.values?.Customers?.CustomerTypeFilter?.Customers}
				show={formik.values?.Customers?.CustomerTypeFilter?.Active}
				translate
				type={TreeType.CUSTOMER}
			/>
			<SliderRange
				title={t(
					translationPath(lang.common.averagePricePerProjectFilter).path
				)}
				value={formik.values?.Customers?.AveragePricePerProjectFilter}
				show={formik.values?.Customers?.AveragePricePerProjectFilter?.Active}
				type={TreeType.CUSTOMER}
			/>
			<SliderRange
				title={t(translationPath(lang.common.sumOfProjectPricesFilter).path)}
				value={formik.values?.Customers?.SumOfProjectPricesFilter}
				show={formik.values?.Customers?.SumOfProjectPricesFilter?.Active}
				type={TreeType.CUSTOMER}
			/>
			<SliderRange
				title={t(translationPath(lang.common.numberOfProjectsFilter).path)}
				value={formik.values?.Customers?.NumberOfProjectsFilter}
				show={formik.values?.Customers?.NumberOfProjectsFilter?.Active}
				round
				type={TreeType.CUSTOMER}
			/>
			<SliderRange
				title={t(translationPath(lang.common.numberOfQuotationsFilter).path)}
				value={formik.values?.Customers?.NumberOfQuotationsFilter}
				show={formik.values?.Customers?.NumberOfQuotationsFilter?.Active}
				type={TreeType.CUSTOMER}
			/>
			<SliderRange
				title={t(translationPath(lang.common.numberOfProductionsFilter).path)}
				value={formik.values?.Customers?.NumberOfProductionsFilter}
				show={formik.values?.Customers?.NumberOfProductionsFilter?.Active}
				type={TreeType.CUSTOMER}
			/>
			<SliderRange
				title={t(
					translationPath(lang.common.productionsPerQuotationsFilter).path
				)}
				value={formik.values?.Customers?.ProductionsPerQuotationsFilter}
				show={formik.values?.Customers?.ProductionsPerQuotationsFilter?.Active}
				type={TreeType.CUSTOMER}
			/>
			<DateRange
				title={t(
					translationPath(lang.common.customerDateOfCreationFilter).path
				)}
				value={formik.values?.Customers?.CustomerDateOfCreationFilter}
				show={formik.values?.Customers?.CustomerDateOfCreationFilter?.Active}
				type={TreeType.CUSTOMER}
			/>
			<Row
				title={t(translationPath(lang.common.projectName).path)}
				value={formik.values?.Projects?.NameFilter?.Name}
				show={formik.values?.Projects?.NameFilter?.Active}
				type={TreeType.PROJECT}
			/>
			<MultipleSelect
				title={t(translationPath(lang.common.user).path)}
				value={formik.values?.Projects?.UserFilter?.Name}
				show={formik.values?.Projects?.UserFilter?.Active}
				includeNotSetTooltip={t(
					translationPath(lang.common.tooltip.projectUserFilter).path
				)}
				includeNotSet={formik.values?.UserFilter?.IncludeNotSet}
				translate
				string
				type={TreeType.PROJECT}
			/>
			<Row
				title={t(translationPath(lang.common.address).path)}
				value={formik.values?.Projects?.AddressFilter?.Location}
				show={formik.values?.Projects?.AddressFilter?.Active}
				includeNotSet={formik.values?.AddressFilter?.IncludeNotSet}
				includeNotSetTooltip={t(
					translationPath(lang.common.tooltip.addressFilter).path
				)}
				type={TreeType.PROJECT}
			/>
			<MultipleSelect
				title={t(translationPath(lang.common.projectState).path)}
				value={formik.values?.Projects?.ProjectStateFilter?.ProjectStates}
				show={formik.values?.Projects?.ProjectStateFilter?.Active}
				translate
				type={TreeType.PROJECT}
			/>
			<SliderRange
				title={t(translationPath(lang.common.quotation).path)}
				value={formik.values?.Projects?.QuotationPriceFilter}
				show={formik.values?.Projects?.QuotationPriceFilter?.Active}
				type={TreeType.PROJECT}
			/>
			<SliderRange
				title={t(translationPath(lang.common.production).path)}
				value={formik.values?.Projects?.ProductionPriceFilter}
				show={formik.values?.Projects?.ProductionPriceFilter?.Active}
				type={TreeType.PROJECT}
			/>
			<DateRange
				title={t(translationPath(lang.common.dateOfCreation).path)}
				value={formik.values?.Projects?.DateOfCreationFilter}
				show={formik.values?.Projects?.DateOfCreationFilter?.Active}
				type={TreeType.PROJECT}
			/>
			<DateRange
				title={t(translationPath(lang.common.constructionDate).path)}
				value={formik.values?.Projects?.ConstructionDateFilter}
				show={formik.values?.Projects?.ConstructionDateFilter?.Active}
				type={TreeType.PROJECT}
			/>
			<DateRange
				title={t(translationPath(lang.common.quotationDate).path)}
				value={formik.values?.Projects?.QuotationDateFilter}
				show={formik.values?.Projects?.QuotationDateFilter?.Active}
				type={TreeType.PROJECT}
			/>
			<Row
				title={t(translationPath(lang.common.jobName).path)}
				value={formik.values?.Jobs?.NameFilter?.Name}
				show={formik.values?.Jobs?.NameFilter?.Active}
				type={TreeType.JOB}
			/>
			<MultipleSelect
				title={t(translationPath(lang.common.jobType).path)}
				value={formik.values?.Jobs?.JobTypeFilter?.JobTypes}
				show={formik.values?.Jobs?.JobTypeFilter?.Active}
				translate
				type={TreeType.JOB}
			/>
			<MultipleSelect
				title={t(translationPath(lang.common.state).path)}
				value={formik.values?.Jobs?.JobStateFilter?.JobStates}
				show={formik.values?.Jobs?.JobStateFilter?.Active}
				translate
				type={TreeType.JOB}
			/>
			<SliderRange
				title={t(translationPath(lang.common.price).path)}
				value={formik.values?.Jobs?.PriceFilter}
				show={formik.values?.Jobs?.PriceFilter?.Active}
				type={TreeType.JOB}
			/>
			<SliderRange
				title={t(translationPath(lang.common.pricePerSquareMeter).path)}
				value={formik.values?.Jobs?.PricePerSquareMeterFilter}
				show={formik.values?.Jobs?.PricePerSquareMeterFilter?.Active}
				type={TreeType.JOB}
			/>
			<MultipleSelect
				title={t(translationPath(lang.common.snowArea).path)}
				value={formik.values?.Jobs?.SnowAreaFilter?.SnowAreas.map((s) =>
					s === "SnowAreaNotSet" ? t(translationPath(lang.common[s]).path) : s
				)}
				show={formik.values?.Jobs?.SnowAreaFilter?.Active}
				includeNotSetTooltip={t(
					translationPath(lang.common.SnowAreaNotSet).path
				)}
				includeNotSet={formik.values?.SnowAreaFilter?.IncludeNotSet}
				type={TreeType.JOB}
			/>
			<MultipleSelect
				title={t(translationPath(lang.common.windArea).path)}
				value={formik.values?.Jobs?.WindAreaFilter?.WindAreas?.map((i) =>
					i === "WindAreaNotSet" ? t(translationPath(lang.common[i]).path) : i
				)}
				show={formik.values?.Jobs?.WindAreaFilter?.Active}
				includeNotSetTooltip={t(
					translationPath(lang.common.WindAreaNotSet).path
				)}
				includeNotSet={formik.values?.Jobs?.WindAreaFilter?.IncludeNotSet}
				type={TreeType.JOB}
			/>
			<Row
				title={t(translationPath(lang.common.ceilingName).path)}
				value={formik.values?.Jobs?.CeilingNameFilter?.Name}
				show={formik.values?.Jobs?.CeilingNameFilter?.Active}
				type={TreeType.JOB}
			/>
			<Row
				title={t(translationPath(lang.common.roofingName).path)}
				value={formik.values?.Jobs?.RoofingNameFilter?.Name}
				show={formik.values?.Jobs?.RoofingNameFilter?.Active}
				type={TreeType.JOB}
			/>
			<SliderRange
				title={t(translationPath(lang.common.hipLength).path)}
				value={formik.values?.Jobs?.HipLengthFilter}
				show={formik.values?.Jobs?.HipLengthFilter?.Active}
				type={TreeType.JOB}
			/>
			<SliderRange
				title={t(translationPath(lang.common.roofArea).path)}
				value={formik.values?.Jobs?.CoveredAreaFilter}
				show={formik.values?.Jobs?.CoveredAreaFilter?.Active}
				type={TreeType.JOB}
			/>

			<SliderRange
				title={t(translationPath(lang.common.ridgeLength).path)}
				value={formik.values?.Jobs?.RidgeLengthFilter}
				show={formik.values?.Jobs?.RidgeLengthFilter?.Active}
				type={TreeType.JOB}
			/>
			<DateRange
				title={t(translationPath(lang.common.dateOfCreation).path)}
				value={formik.values?.Jobs?.DateOfCreationFilter}
				show={formik.values?.Jobs?.DateOfCreationFilter?.Active}
				type={TreeType.JOB}
			/>
			<DateRange
				title={t(translationPath(lang.common.dateOfLastUpdate).path)}
				value={formik.values?.Jobs?.DateOfLastUpdateFilter}
				show={formik.values?.Jobs?.DateOfLastUpdateFilter?.Active}
				type={TreeType.JOB}
			/>
			<Row
				title={t(translationPath(lang.common.truss).path)}
				value={formik.values?.Trusses?.NameFilter?.Name}
				show={formik.values?.Trusses?.NameFilter?.Active}
				type={TreeType.TRUSS}
			/>
			<MultipleSelect
				title={t(translationPath(lang.common.status).path)}
				value={formik.values?.Trusses?.StatusFilter?.Statuses}
				show={formik.values?.Trusses?.StatusFilter?.Active}
				translate
				type={TreeType.TRUSS}
			/>
			<MultipleSelect
				title={t(translationPath(lang.common.type).path)}
				value={formik.values?.Trusses?.TypeFilter?.Types}
				show={formik.values?.Trusses?.TypeFilter?.Active}
				translate
				type={TreeType.TRUSS}
			/>
			<MultipleSelect
				title={t(translationPath(lang.common.kinds).path)}
				value={formik.values?.Trusses?.KindsFilter?.Kinds}
				show={formik.values?.Trusses?.KindsFilter?.Active}
				translate
				type={TreeType.TRUSS}
			/>
			<SliderRange
				title={t(translationPath(lang.common.price).path)}
				value={formik.values?.Trusses?.PriceFilter}
				show={formik.values?.Trusses?.PriceFilter?.Active}
				type={TreeType.TRUSS}
			/>
			<SliderRange
				title={t(translationPath(lang.common.windLoad).path)}
				value={formik.values?.Trusses?.WindLoadFilter}
				show={formik.values?.Trusses?.WindLoadFilter?.Active}
				type={TreeType.TRUSS}
			/>
			<SliderRange
				title={t(translationPath(lang.common.snowLoad).path)}
				value={formik.values?.Trusses?.SnowLoadFilter}
				show={formik.values?.Trusses?.SnowLoadFilter?.Active}
				type={TreeType.TRUSS}
			/>
			<SliderRange
				title={t(translationPath(lang.common.ceilingLoad).path)}
				value={formik.values?.Trusses?.CeilingLoadFilter}
				show={formik.values?.Trusses?.CeilingLoadFilter?.Active}
				type={TreeType.TRUSS}
			/>
			<SliderRange
				title={t(translationPath(lang.common.roofingLoad).path)}
				value={formik.values?.Trusses?.RoofingLoadFilter}
				show={formik.values?.Trusses?.RoofingLoadFilter?.Active}
				type={TreeType.TRUSS}
			/>
			<SliderRange
				title={t(translationPath(lang.common.height).path)}
				value={formik.values?.Trusses?.HeightFilter}
				show={formik.values?.Trusses?.HeightFilter?.Active}
				type={TreeType.TRUSS}
			/>
			<SliderRange
				title={t(translationPath(lang.common.length).path)}
				value={formik.values?.Trusses?.LengthFilter}
				show={formik.values?.Trusses?.LengthFilter?.Active}
				type={TreeType.TRUSS}
			/>
			<SliderRange
				title={t(translationPath(lang.common.span).path)}
				value={formik.values?.Trusses?.SpanFilter}
				show={formik.values?.Trusses?.SpanFilter?.Active}
				type={TreeType.TRUSS}
			/>
			<SliderRange
				title={t(translationPath(lang.common.thickness).path)}
				value={formik.values?.Trusses?.ThicknessFilter}
				show={formik.values?.Trusses?.ThicknessFilter?.Active}
				type={TreeType.TRUSS}
			/>

			<SliderRange
				title={t(translationPath(lang.common.centres).path)}
				value={formik.values?.Trusses?.CentresFilter}
				show={formik.values?.Trusses?.CentresFilter?.Active}
				type={TreeType.TRUSS}
			/>
			<SliderRange
				title={t(translationPath(lang.common.weight).path)}
				value={formik.values?.Trusses?.WeightFilter}
				show={formik.values?.Trusses?.WeightFilter?.Active}
				type={TreeType.TRUSS}
			/>
			<SliderRange
				title={t(translationPath(lang.common.transportWeight).path)}
				value={formik.values?.Trusses?.TransportWeightFilter}
				show={formik.values?.Trusses?.TransportWeightFilter?.Active}
				type={TreeType.TRUSS}
			/>
			<SliderRange
				title={t(translationPath(lang.common.numberOfSupports).path)}
				value={formik.values?.Trusses?.SupportsQuantityFilter}
				show={formik.values?.Trusses?.SupportsQuantityFilter?.Active}
				round
				type={TreeType.TRUSS}
			/>
			<SliderRange
				title={t(translationPath(lang.common.membersCount).path)}
				value={formik.values?.Trusses?.MembersCountFilter}
				show={formik.values?.Trusses?.MembersCountFilter?.Active}
				round
				type={TreeType.TRUSS}
			/>
			<SliderRange
				title={t(translationPath(lang.common.platesCount).path)}
				value={formik.values?.Trusses?.PlatesCountFilter}
				show={formik.values?.Trusses?.PlatesCountFilter?.Active}
				round
				type={TreeType.TRUSS}
			/>
			<SliderRange
				title={t(translationPath(lang.common.modelCount).path)}
				value={formik.values?.Trusses?.ModelCountFilter}
				show={formik.values?.Trusses?.ModelCountFilter?.Active}
				round
				type={TreeType.TRUSS}
			/>
			<SliderRange
				title={t(translationPath(lang.common.ply).path)}
				value={formik.values?.Trusses?.PliesFilter}
				show={formik.values?.Trusses?.PliesFilter?.Active}
				round
				type={TreeType.TRUSS}
			/>
		</>
	);
};
