import * as React from 'react';
import styled from 'styled-components';

interface IOwnProps {
	checked: boolean;
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	leftLabel?: string | JSX.Element;
	rightLabel?: string | JSX.Element;
	name: string;
}

const Switch = (props: IOwnProps) => {
	const { checked, handleChange, leftLabel, rightLabel, name } = props;
	const [isChecked, setChecked] = React.useState(checked);

	React.useEffect(() => {
		setChecked(checked);
	}, [checked]);

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
				{leftLabel}
				<Container checked={isChecked}>
					<Position checked={isChecked} />
				</Container>
				{rightLabel}
			</Label>
		</Content>
	);
};

export default Switch;

const Content = styled.div`
	margin: 2px 0;
`;

const Label = styled.label`
	display: flex;
	flex-direction: row;
	align-items: center;

	color: ${(props) => props.theme.colors.secondaryText.active};
	font-size: 12px;

	svg {
		color: ${(props) => props.theme.colors.secondaryText.active};
	}
`;

const Input = styled.input`
	position: fixed;
	top: -50px;
	left: -50px;
`;

const Container = styled.div`
	position: relative;

	width: 32px;
	height: 16px;

	margin: 0 6px;

	background-color: ${(props) => props.theme.colors.background.darker};
	border-radius: 8px;

	cursor: pointer;
`;

const Position = styled.div`
	position: absolute;

	top: 4px;
	bottom: 4px;
	left: ${(props) => (props.checked ? 20 : 4)}px;

	width: 8px;
	height: 8px;

	background-color: ${(props) => props.theme.colors.primary.default};
	border-radius: 6px;

	transition: all 0.2s ease-out;
`;
