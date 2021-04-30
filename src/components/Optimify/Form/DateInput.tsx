import * as React from 'react';
import localeCSCZ from 'antd/lib/locale/cs_CZ';
import localeCZ from './localesDateInput/cs-CZ.json';
import localeDE from './localesDateInput/de-DE.json';
import localeDEDE from 'antd/lib/locale/de_DE';
import localeEN from './localesDateInput/en-GB.json';
import localeENGB from 'antd/lib/locale/en_GB';
import moment from 'moment';
import styled from 'styled-components';
import { ConfigProvider, DatePicker } from 'antd';
import { ContentRow } from 'src/constants/globalStyles';
import { faCalendar, faTimes } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getLanguage, lang } from '../../../translation/i18n';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { LineOutlined } from '@ant-design/icons';
import { translationPath } from '../../../utils/getPath';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import 'moment/locale/cs';
import 'moment/locale/de';
import 'moment/locale/en-gb';
moment.locale("cs");
interface DateInputProps {
	value: Date;
	onChange?: (
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
	const [focused, setFocused] = useState(false);
	const datepicker = useRef(null);
	const [language, setLanguage] = React.useState(getLanguage());

	useEffect(() => {
		setLanguage(getLanguage());

		if (getLanguage() == "cz-CZ") {
			moment.locale("cs");
		} else if (getLanguage() == "de-DE") {
			moment.locale("de");
		} else {
			moment.locale("en");
		}
	}, [getLanguage()]);
	useEffect(() => {
		function handleClickOutside(event) {
			if (
				(event.target.tagName === "A" || event.target.tagName === "DIV") &&
				datepicker.current &&
				event.target &&
				!event.target?.className?.includes("ant-picker")
			) {
				setFocused(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [datepicker]);

	const onChange = (value: any, dateString: string) => {
		formik.setFieldValue(name, value);
		setFocused(false);
	};

	const handleToggle = () => {
		setFocused(!focused);
	};

	const handleRemove = () => {
		formik.setFieldValue(name, null);
	};

	const handleBlur = () => {
		setFocused(false);
	};

	const handleFocus = () => {
		setFocused(true);
	};
	return (
		<Wrapper>
			<Row>
				<ConfigProvider
					locale={
						language === "cs-CZ"
							? localeCSCZ
							: language === "de-DE"
							? localeDEDE
							: localeENGB
					}
				>
					<DatePicker
						allowClear={false}
						ref={datepicker}
						name={name}
						onChange={onChange}
						open={focused}
						placeholder={t(translationPath(lang.placeholder.dateInput).path)}
						value={
							formik.values && formik.values[name]
								? moment(formik.values[name])
								: null
						}
						format={"DD. MM. YYYY"}
						locale={
							language === "cs-CZ"
								? localeCZ
								: language === "de-DE"
								? localeDE
								: localeEN
						}
						disabled={disabled}
						onBlur={handleBlur}
						onFocus={handleFocus}
						suffixIcon={<></>}
					/>
					{!disabled && (
						<>
							<Delete icon={faTimes as IconProp} onClick={handleRemove} />
							<Line />
							<Toggle icon={faCalendar as IconProp} onClick={handleToggle} />
						</>
					)}
				</ConfigProvider>
			</Row>
		</Wrapper>
	);
};

const Row = styled(ContentRow)`
	border-bottom: 1px solid ${(props) => props.theme.colors.forms.border};

	svg {
		color: ${(props) => props.theme.colors.forms.border};
	}
`;

const Delete = styled(FontAwesomeIcon)`
	cursor: pointer;
`;

const Toggle = styled(FontAwesomeIcon)`
	cursor: pointer;
`;

const Line = styled(LineOutlined)`
	transform: rotate(90deg);
	svg {
		background-color: ${(props) => props.theme.colors.background.content};
	}
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	margin: 8px 0;
	width: 100%;

	svg {
		color: ${(props) => props.theme.colors.forms.border};
	}

	.ant-picker {
		width: 100%;
		border: 0;
		background-color: ${(props) => props.theme.colors.background.content};
	}

	> *:first-child {
		flex-grow: 1;
		margin-bottom: -1px;
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
			border: 0;
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
