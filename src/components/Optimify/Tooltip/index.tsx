import * as React from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';

interface OwnProps {
	children: React.ReactNode;
	title: string | React.ReactNode;
	placement: "top" | "right" | "bottom" | "left";
	highlight?: boolean;
	fillParent?: boolean;
	sideMargin?: boolean;
	disabled?: boolean;
}

const Tooltip = (props: OwnProps) => {
	const randomId = props.title?.toString() + Math.random().toString();
	let offset = {};

	switch (props.placement) {
		case "right":
			offset["left"] = 3;
			break;
		case "left":
			offset["left"] = -3;
			break;
		case "top":
			offset["top"] = -3;
			break;
		case "bottom":
			offset["top"] = 3;
			break;
	}
	if (!props.disabled) {
		return <>{props.children}</>;
	}

	return (
		<TooltipWrapper
			data-tip
			data-for={randomId}
			fillParent={props.fillParent}
			highlight={props.highlight}
			sideMargin={props.sideMargin}
		>
			{props.children}
			<ReactTooltip
				place={props.placement}
				type={"dark"}
				effect={"solid"}
				id={randomId}
				offset={offset}
			>
				{props.title}
			</ReactTooltip>
		</TooltipWrapper>
	);
};

export default Tooltip;

const TooltipWrapper = styled.span<{
	sideMargin: boolean;
	fillParent: boolean;
	highlight: boolean;
}>`
	> *:first-child {
		${(props) => (props.sideMargin ? `margin: 0 4px;` : "")}
	}

	${(props) =>
		props.fillParent
			? `
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    `
			: ""}

	${(props) =>
		props.highlight
			? `
    text-decoration: underline dashed;
    `
			: ""}
`;
