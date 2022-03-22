import styled from 'styled-components';
import { fixed } from './formating';
import { Unit } from '../components/Data/Unit';
import { UnitType } from 'src/components/Data/Unit';
import {Currency} from "../components/Data/Currency";

export const formatCurrency = (value: any, unit?: UnitType) => {
	if (value === null) return "-";
	const amount = value
		? fixed(value, 2)
				.toString()
				.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")
		: 0;
	return (
		<>
			{amount}
			<Span>{unit ? <Unit unit={unit} /> : <Currency/>}</Span>
		</>
	);
};

const Span = styled.span`
	padding-left: 4px;
`;
