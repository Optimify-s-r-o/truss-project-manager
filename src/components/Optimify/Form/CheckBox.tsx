import React, { useEffect } from 'react';
import styled from 'styled-components';
import Tooltip from '../../Optimify/Tooltip';
import { Center, ContentRow } from '../../../constants/globalStyles';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { lang, t } from '../../../translation/i18n';
import { translationPath } from '../../../utils/getPath';
interface IOwnProps {
	checked: boolean;
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	label?: string | JSX.Element;
	name: string;
	value?: string[] | string;
	disabled?: boolean;
}

const CheckBox = ({
	value,
	disabled,
	checked,
	handleChange,
	label,
	name,
}: IOwnProps) => {
	const [isChecked, setChecked] = React.useState(checked);

	useEffect(() => {
		if (value && value?.length === 0) {
			setChecked(false);
		}
	}, [value]);

	useEffect(() => {
		setChecked(checked);
	}, [checked]);

	return (
		<Content>
			<Label>
				<Input
					defaultChecked={checked}
					name={name}
					disabled={disabled}
					onChange={(e) => {
						setChecked(e.target.checked);
						handleChange(e);
					}}
					type="checkbox"
				/>
				<Tooltip
					title={t(translationPath(lang.common.tooltip.columnSelectorDisabled))}
					placement={"right"}
				>
					<ContentRow>
						<StyledBox checked={isChecked} disabled={disabled}>
							{isChecked && <FontAwesomeIcon icon={faCheck as IconProp} />}
						</StyledBox>
						{label && <Title disabled={disabled}>{label}</Title>}
					</ContentRow>
				</Tooltip>
			</Label>
		</Content>
	);
};

export default CheckBox;

export const Content = styled.div`
	margin: 0 0 4px 0;
`;

export const Title = styled.span<{ disabled?: boolean }>`
	margin-left: 7px;
	color: ${(props) =>
		props.disabled
			? props.theme.colors.background.darker
			: props.theme.colors.contentText};
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

export const StyledBox = styled(Center)<{
	disabled?: boolean;
	checked?: boolean;
}>`
	position: relative;

	width: 15px;
	height: 15px;

	background-color: ${(props) =>
		props.disabled
			? props.theme.colors.background.darker
			: props.checked
			? props.theme.colors.primary.default
			: "transparent"};
	border: 1px solid
		${(props) =>
			props.disabled
				? props.theme.colors.background.darker
				: props.checked
				? props.theme.colors.primary.default
				: props.theme.colors.forms.border};
	border-radius: 3px;

	transition: all 0.1s ease-out;

	&:hover {
		background-color: ${(props) =>
			props.disabled
				? props.theme.colors.background.darker
				: props.checked
				? props.theme.colors.primary.hover
				: "transparent"};
		border-color: ${(props) =>
			props.disabled
				? props.theme.colors.background.darker
				: props.checked
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
