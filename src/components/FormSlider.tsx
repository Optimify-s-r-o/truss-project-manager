import { InputNumber, Slider } from "antd";
import * as React from "react";
import { fixed } from "src/utils/formating";
import styled from "styled-components";
import {
	FilterContentSection,
	SpaceBetweenFullWidth,
} from "../containers/Portal/Lists/components/_styles";
import { getStep } from "../containers/Portal/Lists/_services";
import { WithTranslation, withTranslation } from "../translation/i18n";
import FormikBox from "./Optimify/Form/FormikCheckbox";

export interface OwnProps {
	values: any;
	setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
	from: number;
	min?: number;
	max?: number;
	name: (string | number | symbol)[];
	label: string;
	settingsTo?: number;
	step?: number;
	settingsFrom?: number;
	to: number;
	round?: number;
}

const Index = (props: OwnProps & WithTranslation) => {
	const {
		from,
		setFieldValue,
		values,
		label,
		name,
		settingsFrom,
		settingsTo,
		step,
		to,
		round,
	} = props;

	const rangeChange = (name: any) => (value: [number, number]) => {
		setFieldValue(name, {
			From: value && value[0],
			To: value && value[1],
			Active: true,
		});
	};

	const rangeChangeFrom = (name: any) => (value: number) => {
		setFieldValue(name, {
			From: value < settingsFrom ? settingsFrom : value,
			To: to,
			Active: true,
		});
	};

	const rangeChangeTo = (name: any) => (value: number) => {
		setFieldValue(name, {
			From: from,
			To: value > settingsTo ? settingsTo : value,
			Active: true,
		});
	};
	const defaultColor = "#17785e";

	return (
		<>
			{settingsFrom !== settingsTo ? (
				<FilterContentSection>
					<>
						<FormikBox
							checked={true}
							name={name}
							values={values}
							setFieldValue={setFieldValue}
							label={<FilterTitle>{label}</FilterTitle>}
						/>
						<SSlider
							trackStyle={[{ backgroundColor: defaultColor }]}
							handleStyle={{ borderColor: defaultColor }}
							range={{ draggableTrack: true }}
							defaultValue={[settingsFrom, settingsTo]}
							value={[from, to]}
							onChange={rangeChange(name)}
							min={settingsFrom}
							max={settingsTo}
							step={step ? step : getStep(settingsFrom, settingsTo)}
						/>

						<SpaceBetweenFullWidth>
							<span>
								<Input
									min={settingsFrom}
									max={settingsTo}
									style={{ width: 100 }}
									value={fixed(from, round ? round : round === 0 ? 0 : 2)}
									onChange={rangeChangeFrom(name)}
									step={step ? step : getStep(settingsFrom, settingsTo)}
								/>
							</span>
							<span>
								<Input
									min={settingsFrom}
									max={settingsTo}
									style={{ width: 100 }}
									value={fixed(to, round ? round : round === 0 ? 0 : 2)}
									onChange={rangeChangeTo(name)}
									step={step ? step : getStep(settingsFrom, settingsTo)}
								/>
							</span>
						</SpaceBetweenFullWidth>
					</>
				</FilterContentSection>
			) : (
				""
			)}
		</>
	);
};

export default withTranslation()(React.memo(Index));

export const Input = styled(InputNumber)`
	background-color: ${(props) => props.theme.colors.background.content};
	color: ${(props) => props.theme.colors.contentText};
`;

export const FilterTitle = styled.div`
	color: ${(props) => props.theme.colors.primary.active};
	font-weight: 400;
	font-size: 0.9rem;
	width: 100%;
`;

const SSlider = styled(Slider)`
	.ant-slider:hover .ant-slider-handle:not(.ant-tooltip-open) {
		border-color: ${(props) => props.theme.colors.primary.default} !important;
	}
	.ant-slider-handle,
	.ant-slider-handle:hover {
		border: 2px solid ${(props) => props.theme.colors.primary.default};
	}

	.ant-slider-rail {
		background-color: ${(props) => props.theme.colors.forms.slider} !important;
	}
`;
