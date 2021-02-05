import * as React from "react";
import styled from "styled-components";
import { lightTheme } from "../../../constants/theme";
import Loader from "../Loader";

interface IOwnProps {
	children: React.ReactNode;
	pending: boolean;
	text: string;
	margin?: boolean;
}

const Index = (props: IOwnProps) => {
	if (!props.pending) return <>{props.children}</>;
	return (
		<Wrapper margin={props.margin ? props.margin : false}>
			<LoaderWrapper>
				<Loader color={lightTheme.colors.primary.default} block />
			</LoaderWrapper>
			<Text>{props.text}</Text>
		</Wrapper>
	);
};

export default Index;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	width: 100%;

	margin: ${(props) => (props.margin ? "64px" : "0")} 0;
`;

const LoaderWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const Text = styled.div`
	margin-top: -64px;
	color: ${(props) => props.theme.colors.primaryText.default} !important;
`;
