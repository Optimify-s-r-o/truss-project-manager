import * as React from 'react';
import DateInput from './DateInput';
import { AddressInput } from './AddressInput';
import { AddressInputSeznam } from './AddressInputSeznam';
import { CustomerInput } from './CustomerInput';
import { EmailInput } from './EmailInput';
import { Evidence, Settings } from '../../../types/_types';
import { FormikSwitch } from './FormikSwitch';
import { get } from 'lodash';
import { getLabel, getValue } from '../../../utils/country';
import { Input } from '../../../constants/enum';
import { NumericInput } from './NumericInput';
import { PasswordInput } from './PasswordInput';
import { PhoneNumber } from './PhoneNumber';
import { TextInput } from './TextInput';
import { ValueType } from 'react-select';
import {
	OptionType,
	SearchableSelect,
	Select,
	SelectDirection,
} from "./Select";
interface FormRowProps {
	id: string;
	name?: string;
	formik?: any;
	type: Input;
	options?: any;
	settings?: Settings;
	format?: string;
	placeholder?: string;
	selectDirection?: SelectDirection;
	filterName?: string;
	filter?: string;
	disabled?: boolean;
	customers?: any[];
	addCustomer?: (data: string) => void;
	loading?: boolean;
	createdEvidence?: Evidence;
}

const FormikInput = (props: FormRowProps) => {
	const {
		formik,
		format,
		id,
		name,
		options,
		placeholder,
		settings,
		type,
		selectDirection,
		filterName,
		filter,
		disabled,
		addCustomer,
		customers,
		loading,
		createdEvidence,
	} = props;

	const hasNumber = (myString: string) => {
		return /\d/.test(myString);
	};

	switch (type) {
		case Input.CUSTOMER:
			return (
				<CustomerInput
					formik={formik}
					name={name}
					addCustomer={addCustomer}
					customers={customers}
					loading={loading}
					createdEvidence={createdEvidence}
				/>
			);
		case Input.SWITCH:
			return <FormikSwitch formik={formik} name={name} />;
		case Input.ADDRESS_GOOGLE:
			return <AddressInput formik={formik} name={name} />;
		case Input.ADDRESS_SEZNAM:
			return <AddressInputSeznam formik={formik} name={name} />;
		case Input.FILTER_TEXT:
			return (
				<TextInput
					{...formik.getFieldProps(name)}
					id={id}
					name={(name as any).join(".")}
					placeholder={placeholder}
					filterName={filterName}
					filter={filter}
					disabled={disabled}
					formik={formik}
					value={get(formik.values, name) ? get(formik.values, name) : ""}
				/>
			);
		case Input.TEXT:
			return (
				<TextInput
					id={id}
					name={name}
					disabled={disabled}
					placeholder={placeholder}
					{...formik.getFieldProps(name)}
				/>
			);
		case Input.PHONE:
			return (
				<PhoneNumber
					id={id}
					name={name}
					formik={formik}
					placeholder={placeholder}
					{...formik.getFieldProps(name)}
				/>
			);
		case Input.PASSWORD:
			return (
				<PasswordInput id={id} name={name} {...formik.getFieldProps(name)} />
			);
		case Input.NUMERIC:
			return (
				<NumericInput
					id={id}
					name={name}
					disabled={disabled}
					{...formik.getFieldProps(name)}
				/>
			);
		case Input.EMAIL:
			return <EmailInput id={id} name={name} {...formik.getFieldProps(name)} />;

		case Input.DATE:
			return (
				<DateInput
					id={id}
					name={name}
					formik={formik}
					format={format}
					disabled={disabled}
					{...formik.getFieldProps(name)}
				/>
			);

		case Input.SELECT:
			const item = (options as OptionType[])?.find(
				(
					item: { label: string | number; value: string | number },
					key: number
				) => {
					let comparator = name && formik.values && formik.values[name];
					if (name && hasNumber(name) && name && formik.values) {
						const names = name.split(".");
						let temp = formik.values[names[0]];
						for (let i = 1; i < names.length; i++) {
							if (names[i] && temp) {
								temp = temp[names[i]];
							}
						}
						comparator = temp;
						if (item.value === comparator) {
							return item;
						}
					} else if (
						name &&
						formik.values &&
						name?.includes(".") &&
						get(formik.values, name) === item.value
					) {
						return item;
					} else if (
						name &&
						formik.values &&
						item.value === formik.values[name]
					) {
						return item;
					}
				}
			);

			return (
				<Select
					value={{
						value: get(formik.values, name),
						label: item?.label,
					}}
					disabled={disabled}
					options={options}
					onChange={(value: ValueType<OptionType, any>) => {
						formik.setFieldValue(name, (value as OptionType).value, false);
						if (filter && !!(value as OptionType).value) {
							formik.setFieldValue((filter as any).join(".") + ".Active", true);
						} else if (filter) {
							formik.setFieldValue((filter as any).join(".") + ".Active", true);
						}
					}}
					direction={selectDirection}
				/>
			);

		case Input.SEARCHABLE_SELECT:
			return (
				<SearchableSelect
					value={{
						value: getValue(formik.values, name),
						label: getLabel(getValue(formik.values, name), settings),
					}}
					options={options}
					onChange={(value: ValueType<OptionType, any>) => {
						formik.setFieldValue(name, (value as OptionType).value, false);
					}}
				/>
			);
	}
};

export default FormikInput;
