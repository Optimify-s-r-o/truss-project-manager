import * as Yup from 'yup';
import _ from 'lodash';
import FormikRow from '../Optimify/Form/FormikRow';
import lang from '../../translation/lang';
import React from 'react';
import styled from 'styled-components';
import { Input } from '../../constants/enum';
import { NameColumn } from '../../containers/Portal/TreeView/Project/General/_styles';
import { PriceList } from '../../containers/Portal/PriceLists/_types';
import { Save } from '../Button';
import { Table, TABLE_STYLE_CONDENSED } from '../Optimify/Table';
import { translationPath } from '../../utils/getPath';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import {
	PriceExpresionType,
	QuotationType,
	SectionVariable,
	SectionVariableRequest,
	TemplateSection,
} from "../../containers/Portal/Quotations/_types";

export interface VariableProps {
	section: TemplateSection;
	quotationPutAction: (variable: SectionVariableRequest) => void;
	priceLists: PriceList[];
	id: string;
	type: QuotationType;
	entityId: string;
	selected: string;
}

interface VariableTitleEditing {
	initial: string;
	edited: string;
}

export const VariableTable = ({
	quotationPutAction,
	section,
	id,
	type,
	entityId,
	selected,
}: VariableProps) => {
	const { t } = useTranslation();

	const handleSave = (variable: SectionVariable) => {
		quotationPutAction({
			...variable,
			QuotationId: id,
			Type: type,
			TemplateId: selected,
			EntityId: entityId,
		});
	};

	const formik = useFormik({
		initialValues: section,
		enableReinitialize: true,
		validationSchema: Yup.object({}),
		onSubmit: (values: TemplateSection) => {},
	});

	return (
		<Table
			style={TABLE_STYLE_CONDENSED}
			headers={[
				t(translationPath(lang.common.description).path),
				t(translationPath(lang.templates.quantity).path),
				t(translationPath(lang.templates.unit).path),
				t(translationPath(lang.templates.unitPrice).path),
				t(translationPath(lang.templates.price).path),
				t(translationPath(lang.templates.priceList).path),
				t(translationPath(lang.templates.totalPrice).path),
				t(translationPath(lang.common.actions).path),
			]}
			sortable={[true, true, true, true, true, true, true, false]}
			data={
				section
					? section?.Variables?.map((value: SectionVariable, index: number) => {
							return [
								value.Description,
								value.QuantityExpression,
								value.QuantityExpressionUnit,
								value.PricePerUnitExpression,
								value.PriceSumExpression,
								value.PriceListItemId,
								value.TotalPriceExpression,
								value.TotalPriceExpression,
								value,
							];
					  })
					: []
			}
			renderers={[
				(value: any, key: number, parent: SectionVariable) => {
					return (
						<FormikRow
							formik={formik}
							name={`Variables.${key}.Description`}
							type={Input.TEXT}
							titleWidth={0}
						/>
					);
				},

				(value: any, key: number, parent: SectionVariable) => {
					return (
						<FormikRow
							formik={formik}
							name={`Variables.${key}.QuantityExpression`}
							type={Input.NUMERIC}
							titleWidth={0}
						/>
					);
				},
				(value: any, key: number, parent: SectionVariable) => {
					return (
						<FormikRow
							formik={formik}
							name={`Variables.${key}.QuantityExpressionUnit`}
							type={Input.TEXT}
							titleWidth={0}
						/>
					);
				},
				(value: any, key: number, parent: SectionVariable) => {
					return (
						<FormikRow
							formik={formik}
							name={`Variables.${key}.PricePerUnitExpression`}
							type={Input.NUMERIC}
							disabled={
								parent.PriceExpressionType !== PriceExpresionType.PricePerUnit
							}
							titleWidth={0}
						/>
					);
				},
				(value: any, key: number, parent: SectionVariable) => {
					return (
						<FormikRow
							formik={formik}
							name={`Variables.${key}.PriceSumExpression`}
							disabled={
								parent.PriceExpressionType !== PriceExpresionType.PriceSum
							}
							type={Input.NUMERIC}
							titleWidth={0}
						/>
					);
				},
				(value: any, key: number, parent: SectionVariable) => {
					if (!!value) {
						return (
							<FormikRow
								formik={formik}
								name={`Variables.${key}.PriceListItemId`}
								disabled={
									parent.PriceExpressionType !== PriceExpresionType.PriceList
								}
								type={Input.SELECT}
								options={parent.PriceListItems?.map((i: any, n: number) => {
									return {
										value: i.Id,
										label: i.Name,
									};
								})}
								titleWidth={0}
								selectDirection={"up"}
							/>
						);
					} else {
						<></>;
					}
				},
				(value: any, key: number, parent: SectionVariable) => {
					return <div>{value}</div>;
				},
				(value: any, key: number, parent: SectionVariable) => {
					const isEqual =
						section?.Variables &&
						formik.values &&
						(!section.Variables[key] ||
							(formik &&
								formik?.values?.Variables[key]?.Text ===
									section.Variables[key]?.Text &&
								formik?.values?.Variables[key]?.Description ===
									section.Variables[key]?.Description &&
								formik?.values.Variables[key]?.QuantityExpression ===
									section.Variables[key]?.QuantityExpression &&
								formik?.values?.Variables[key]?.QuantityExpressionUnit ===
									section.Variables[key]?.QuantityExpressionUnit &&
								formik?.values?.Variables[key]?.PricePerUnitExpression ===
									section.Variables[key]?.PricePerUnitExpression &&
								formik?.values?.Variables[key]?.PriceSumExpression ===
									section.Variables[key]?.PriceSumExpression &&
								formik?.values?.Variables[key]?.PriceListItemId ===
									section.Variables[key]?.PriceListItemId));
					return (
						<Action>
							{!isEqual && (
								<Save
									save={() => {
										handleSave(formik.values?.Variables[key]);
									}}
								/>
							)}
						</Action>
					);
				},
			]}
		/>
	);
};

const Action = styled.div`
	width: 150px;
`;
