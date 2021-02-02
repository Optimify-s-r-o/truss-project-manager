import * as React from 'react';
import {
	Content,
	Input,
	Label,
	StyledBox,
	Title
	} from './CheckBox';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { get } from 'lodash';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface IOwnProps {
	checked: boolean;
	label?: string | JSX.Element;
	name: any;
	formik: any;
}

const CheckBox = (props: IOwnProps) => {
	const { formik, checked, label, name } = props;

	const value = get(formik.values, name);

	const handleChange = (_event: React.ChangeEvent<HTMLInputElement>) => {
		formik.setFieldValue(name, { ...value, Active: !value?.Active });
	};

	return (
		<Content>
			<Label>
				<Input
					defaultChecked={checked}
					name={name}
					onChange={handleChange}
					type="checkbox"
				/>
				<StyledBox checked={value?.Active}>
					{value?.Active && <FontAwesomeIcon icon={faCheck as IconProp} />}
				</StyledBox>
				<Title>{label}</Title>
			</Label>
		</Content>
	);
};

export default CheckBox;
