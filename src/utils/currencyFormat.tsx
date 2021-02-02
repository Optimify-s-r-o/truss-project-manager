import CurrencyFormat from 'react-currency-format';
import styled from 'styled-components';
import { fixed } from './formating';
import { Unit } from '../components/Data/Unit';
import { UnitType } from 'src/components/Data/Unit';

export const formatCurrency = (value: any, unit?: UnitType) => {
	if (value === null) return "x";
	return (
		<>
			<CurrencyFormat
				value={fixed(value, 2)}
				displayType={"text"}
				thousandSeparator={true}
			/>
			<Span>{unit ? <Unit unit={unit} /> : "Kč"}</Span>
		</>
	);
};

const Span = styled.span`
	padding-left: 4px;
`;
