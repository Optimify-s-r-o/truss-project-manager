import * as React from 'react';
import styled from 'styled-components';
import {
	Content,
	Input,
	Label,
	StyledBox
	} from './CheckBox';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface IOwnProps {
	checked: boolean;
	label?: string | JSX.Element;
	name: string;
	property: string;
	values: any;
	setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
	erase?: string;
}

const CheckBox = (props: IOwnProps) => {
	const {
		values,
		setFieldValue,
		checked,
		label,
		name,
		property,
		erase,
	} = props;

	let object = values && values[name];
	const active = object && object[property];

	React.useEffect(() => {
		if (
			values &&
			values[name] &&
			values[name][property] &&
			erase &&
			values[name][erase]
		) {
			setFieldValue(name, { ...object, IncludeNotSet: !active });
		}
	}, [values && values[name]]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		let newValue = { ...object, IncludeNotSet: event.target.checked };
		if (!active === true && erase) {
			newValue = {
				...object,
				IncludeNotSet: event.target.checked,
				Active: event.target.checked,
				[erase]: null,
			};
		}
		setFieldValue(name, newValue);
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
				<StyledBox checked={active}>
					{active && <FontAwesomeIcon icon={faCheck as IconProp} />}
				</StyledBox>
				{label && <Title>{label}</Title>}
			</Label>
		</Content>
	);
};

export default CheckBox;

export const Title = styled.span`
	margin-left: 7px;
`;
