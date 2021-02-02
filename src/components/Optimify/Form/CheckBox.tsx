import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Center } from '../../../constants/globalStyles';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface IOwnProps {
	checked: boolean;
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	label?: string | JSX.Element;
	name: string;
	value?: string[] | string;
}

const CheckBox = (props: IOwnProps) => {
	const { checked, handleChange, label, name } = props;
	const [isChecked, setChecked] = React.useState(checked);

	useEffect(() => {
		if (props.value && props.value?.length === 0) {
			setChecked(false);
		}
	}, [props.value]);

	return (
		<Content>
			<Label>
				<Input
					defaultChecked={checked}
					name={name}
					onChange={(e) => {
						setChecked(e.target.checked);
						handleChange(e);
					}}
					type="checkbox"
				/>
				<StyledBox checked={isChecked}>
					{isChecked && <FontAwesomeIcon icon={faCheck as IconProp} />}
				</StyledBox>
				{label && <Title>{label}</Title>}
			</Label>
		</Content>
	);
};

export default CheckBox;

export const Content = styled.div`
	margin: 0 0 4px 0;
`;

export const Title = styled.span`
	margin-left: 7px;
`;

export const Label = styled.label`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

export const Input = styled.input`
	position: fixed;
	top: -50px;
	left: -50px;
`;

export const StyledBox = styled(Center)`
	position: relative;

	width: 15px;
	height: 15px;

	background-color: ${(props) =>
		props.checked ? props.theme.colors.primary.default : "transparent"};
	border: 1px solid
		${(props) =>
			props.checked
				? props.theme.colors.primary.default
				: props.theme.colors.forms.border};
	border-radius: 3px;

	transition: all 0.1s ease-out;

	&:hover {
		background-color: ${(props) =>
			props.checked ? props.theme.colors.primary.hover : "transparent"};
		border-color: ${(props) =>
			props.checked
				? props.theme.colors.primary.hover
				: props.theme.colors.primary.default};
	}

	svg {
		position: absolute;

		top: 1px;
		right: 1px;

		color: ${(props) => props.theme.colors.background.content};
		font-size: 11px !important;
	}
`;
