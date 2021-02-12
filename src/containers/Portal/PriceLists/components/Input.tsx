import React from 'react';
import styled from 'styled-components';
import { useDebounce } from '../../../../utils/useDebounce';

interface Input {
	onChange: (newValue: string | number) => void;
	type: string;
	value: string | number;
	onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
	onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
	valid?: boolean;
	disabled?: boolean;
}
export const Input = ({
	onChange,
	type,
	value,
	onFocus,
	onBlur,
	valid,
	disabled,
}: Input) => {
	const [text, setText] = React.useState(value);
	const debouncedText = useDebounce(text, 500);
	React.useEffect(() => {
		if (text !== value) {
			onChange(text);
		}
	}, [debouncedText]);

	React.useEffect(() => {
		setText(value);
	}, [value]);
	return (
		<Wrapper>
			<SInput
				type={type}
				onChange={(e) => {
					setText(e.target.value);
				}}
				value={text}
				onFocus={onFocus}
				onBlur={onBlur}
				disabled={disabled}
			/>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	width: 100%;
	min-width: 80px;
`;

const SInput = styled.input`
	position: relative;
	background-color: ${(props) => props.theme.colors.background.content};
	width: 100%;
	height: 100%;
	border: 0;
`;
