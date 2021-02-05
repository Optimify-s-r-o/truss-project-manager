import { DatePicker } from "antd";
import locale from "antd/es/date-picker/locale/cs_CZ";
import moment from "moment";
import * as React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { lang } from "../../../translation/i18n";
import { translationPath } from "../../../utils/getPath";
interface DateInputProps {
	value: Date;
	onChange: (
		name: string
	) => (
		date: Date | null,
		event: React.SyntheticEvent<any> | undefined
	) => void;
	format: string;
	name?: string;
	formik?: any;
	disabled?: boolean;
}

const DateInput = ({ name, formik, disabled }: DateInputProps) => {
	const { t } = useTranslation();
	const [open, setOpen] = React.useState(false);

	const onChange = (value: any, dateString: string) => {
		setOpen(false);
		formik.setFieldValue(name, value);
	};

	return (
		<Wrapper>
			<DatePicker
				allowClear
				name={name}
				onChange={onChange}
				placeholder={t(translationPath(lang.placeholder.dateInput).path)}
				value={
					formik.values && formik.values[name]
						? moment(formik.values[name])
						: null
				}
				format={"DD. MM. YYYY"}
				locale={locale}
				disabled={disabled}
			/>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	margin: 8px 0;

	.ant-picker {
		background-color: ${(props) => props.theme.colors.background.content};
	}

	.anticon svg {
		background-color: ${(props) => props.theme.colors.background.content};
		color: ${(props) => props.theme.colors.forms.border};
	}

	> *:first-child {
		flex-grow: 1;
	}

	.svg-inline--fa {
		font-size: 1.15em !important;
		margin: 0 -2px 0 -1px;
	}

	.react-datepicker {
		border: 0;
		box-shadow: ${(props) => props.theme.boxShadow};
	}

	.react-datepicker__header {
		border: 0;
	}

	.react-datepicker-popper {
		z-index: 99;
	}

	.react-datepicker__triangle {
		right: 9px !important;

		&:before {
			border: 1px solid #d8d8d8;
		}
	}

	.react-datepicker__day--selected {
		background-color: ${(props) =>
			props.theme.colors.primary.default} !important;
	}

	.react-datepicker__day--keyboard-selected,
	.react-datepicker__month-text--keyboard-selected,
	.react-datepicker__quarter-text--keyboard-selected {
		background-color: rgba(23, 120, 94, 0.15);
		color: black;
	}

	.react-datepicker__day--keyboard-selected:hover,
	.react-datepicker__month-text--keyboard-selected:hover,
	.react-datepicker__quarter-text--keyboard-selected:hover {
		background-color: rgba(23, 120, 94, 0.25);
	}

	.react-datepicker__day--outside-month {
		color: rgba(0, 0, 0, 0.25);
	}

	.ant-picker-input > input {
		color: ${(props) => props.theme.colors.primaryText.default} !important;
	}
`;

export default DateInput;
