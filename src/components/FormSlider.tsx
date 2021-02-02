import * as React from 'react';
import FormikBox from './Optimify/Form/FormikCheckbox';
import styled from 'styled-components';
import { fixed } from '../utils/formating';
import { getStep } from '../containers/Portal/Lists/_service';
import { Slider } from 'antd';
import { WithTranslation, withTranslation } from '../translation/i18n';
import {
	FilterContentSection,
	SpaceBetweenFullWidth,
} from "../containers/Portal/Lists/components/_styles";

export interface OwnProps {
	formik: any;
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
		formik,
		label,
		name,
		settingsFrom,
		settingsTo,
		step,
		to,
		round,
	} = props;

	const rangeChange = (name: any) => (value: [number, number]) => {
		formik.setFieldValue(name, {
			From: value && value[0],
			To: value && value[1],
			Active: true,
		});
	};
	const defaultColor = "#17785e";

	return (
		<>
			{settingsFrom !== settingsTo ? (
				<FilterContentSection>
					<FormikBox
						checked={true}
						name={name}
						formik={formik}
						label={<FilterTitle>{label}</FilterTitle>}
					/>
					<SSlider
						trackStyle={[{ backgroundColor: defaultColor }]}
						handleStyle={{ borderColor: defaultColor }}
						range
						defaultValue={[settingsFrom, settingsTo]}
						value={[from, to]}
						onChange={rangeChange(name)}
						min={settingsFrom}
						max={settingsTo}
						step={step ? step : getStep(settingsFrom, settingsTo)}
					/>
					<SpaceBetweenFullWidth>
						<span>{fixed(from, round ? round : round === 0 ? 0 : 2)}</span>
						<span>{fixed(to, round ? round : round === 0 ? 0 : 2)}</span>
					</SpaceBetweenFullWidth>
				</FilterContentSection>
			) : (
				""
			)}
		</>
	);
};

export default withTranslation()(React.memo(Index));

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
`;
