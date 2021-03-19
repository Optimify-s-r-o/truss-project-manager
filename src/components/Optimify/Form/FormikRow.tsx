import * as React from 'react';
import ErrorMessage from './ErrorMessage';
import FormikInput from './FormikInput';
import { ContentColumn } from '../../../constants/globalStyles';
import { Evidence, Settings } from '../../../types/_types';
import { Input } from '../../../constants/enum';
import { Row, Title, Value } from './FormRow';
import { SelectDirection } from './Select';

interface FormRowProps {
	title?: string;
	hideGuide?: boolean;
	childrenId?: any;
	name?: any;
	onTitleClick?: (_event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	titleWidth?: number;
	formik?: any;
	type: Input;
	options?: any;
	settings?: Settings;
	children?: React.ReactNode;
	format?: string;
	placeholder?: string;
	selectDirection?: SelectDirection;
	filterName?: string;
	filter?: any;
	disabled?: boolean;
	customers?: any[];
	addCustomer?: (data: string) => void;
	loading?: boolean;
	createdEvidence?: Evidence;
}

const FormikRow = (props: FormRowProps) => {
	const {
		createdEvidence,
		formik,
		format,
		hideGuide,
		children,
		name,
		onTitleClick,
		options,
		placeholder,
		titleWidth,
		type,
		settings,
		selectDirection,
		filterName,
		filter,
		disabled,
		customers,
		addCustomer,
		loading,
	} = props;

	const id = props.hasOwnProperty("childrenId")
		? props.childrenId
		: Math.random().toString(36).substr(2, 16);

	return (
		<ContentColumn>
			<Row>
				{props.title && (
					<Title
						hideGuide={hideGuide}
						htmlFor={id}
						onClick={onTitleClick}
						width={props.hasOwnProperty("titleWidth") ? titleWidth : 30}
					>
						{props.title}
					</Title>
				)}
				<Value
					width={
						props.hasOwnProperty("titleWidth") && titleWidth
							? 100 - titleWidth
							: 70
					}
				>
					<FormikInput
						id={id}
						options={options}
						type={type}
						formik={formik}
						name={name}
						placeholder={placeholder}
						settings={settings}
						format={format}
						selectDirection={selectDirection}
						filterName={filterName}
						filter={filter}
						disabled={disabled}
						addCustomer={addCustomer}
						customers={customers}
						loading={loading}
						createdEvidence={createdEvidence}
					/>
					{children && children}
				</Value>
			</Row>
			<ErrorMessage name={name} formik={formik} />
		</ContentColumn>
	);
};

export default FormikRow;
