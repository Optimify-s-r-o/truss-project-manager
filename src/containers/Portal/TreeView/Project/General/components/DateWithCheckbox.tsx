import DateInput from '../../../../../../components/Optimify/Form/DateInput';
import React from 'react';
import styled from 'styled-components';
import { ContentColumn } from '../../../../../../constants/globalStyles';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormikProps } from 'formik';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { StyledBox } from '../../../../../../components/Optimify/Form/CheckBox';
import { Title } from '../../../../../../components/Optimify/Form/FormRow';

interface Date {
	name: string;
	checkboxName: string;
	formik: FormikProps<any>;
	title: string;
}

const id = Math.random().toString(36).substr(2, 16);

export const DateWithCheckbox = ({
	name,
	checkboxName,

	formik,
	title,
}: Date) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		formik.setFieldValue(checkboxName, e.target.checked);
	};

	return (
		<ContentColumn>
			<Row>
				<Title htmlFor={id} width={40}>
					{title}
				</Title>
				<Value width={60} active={formik.values && formik.values[checkboxName]}>
					<Label>
						<Input
							defaultChecked={formik.values && formik.values[checkboxName]}
							name={name}
							onChange={handleChange}
							type="checkbox"
						/>
						<StyledBox checked={formik.values && formik.values[checkboxName]}>
							{formik.values && formik.values[checkboxName] && (
								<FontAwesomeIcon icon={faCheck as IconProp} />
							)}
						</StyledBox>
					</Label>
					<DateInput
						name={name}
						formik={formik}
						disabled={formik.values && !formik.values[checkboxName]}
						format={"DD. MM. YYYY"}
						value={formik.values && formik.values[name]}
					/>
				</Value>
			</Row>
		</ContentColumn>
	);
};

export const Input = styled.input`
	position: fixed;
	top: -50px;
	left: -50px;
	cursor: pointer;
`;

export const Label = styled.label`
	display: flex;
	flex-direction: row;
	align-items: center;

	margin: 7px 0;
	padding-right: 7px;
	border-bottom: 1px solid ${(props) => props.theme.colors.forms.border};
`;

export const Value = styled.div<{ active: boolean }>`
	display: flex;
	flex-direction: row;
	width: ${(props) => props.width}%;

	${(props) =>
		props.active &&
		`
    .ant-picker {
      background-color: ${props.theme.colors.background.table.heading};
      margin-right: 4px;
    }
  	
    .ant-picker-input > input:-ms-input-placeholder {
      color: ${props.theme.colors.primaryText.default};
    }
    .ant-picker-input > input::placeholder {
      color: ${props.theme.colors.primaryText.default};
    }
  `}

	.svg-inline--fa {
		font-size: 0.9em;
	}
`;

export const Row = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;

	width: 100%;
`;
