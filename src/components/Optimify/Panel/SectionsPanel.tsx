import React from 'react';
import ResizablePanel, { ResizablePanelProps } from './ResizablePanel';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Tooltip } from 'antd';

interface Section {
	icon: IconProp;
	tooltip: string | React.ReactNode;
	callback: (e: React.MouseEvent<HTMLElement>) => void;
	isActive: boolean;
	disableHidding?: boolean;
}

interface OwnProps {
	sections?: Array<Section>;
	defaultHidden?: boolean;
	hideThreshold?: number;
	header?: IconProp;
	activeFilter?: boolean;
}

const SectionsPanel = (props: OwnProps & ResizablePanelProps) => {
	const { sections, ...resizablePanelProps } = props;
	const direction = props.direction ? props.direction : "right";
	const [isHidden, setHidden] = React.useState<boolean>(
		props.defaultHidden ? props.defaultHidden : false
	);

	resizablePanelProps.afterResize = (
		newSize: number,
		sizeOnCursor: number,
		e: MouseEvent
	) => {
		if (props.hideThreshold) {
			if (props.hideThreshold && sizeOnCursor < props.hideThreshold)
				setHidden(true);
		}

		if (props.afterResize) props.afterResize(newSize, sizeOnCursor, e);

		if (props.hideThreshold && sizeOnCursor < props.hideThreshold) return true;
	};

	return (
		<Wrapper direction={direction} activeFilter={props.activeFilter}>
			{sections && (
				<Sections direction={direction}>
					{props?.header && (
						<>
							<HeaderWrapper>
								<Icon direction={direction}>
									<FontAwesomeIcon icon={props.header} />
								</Icon>
							</HeaderWrapper>
							<HeaderDivider direction={direction} />
						</>
					)}
					{sections?.map((section, key) => {
						return (
							<SectionWrapper
								key={key}
								onClick={(e: React.MouseEvent<HTMLElement>) => {
									if (!section.disableHidding && isHidden) setHidden(false);
									else if (!section.disableHidding && section.isActive)
										setHidden(false);
									section.callback(e);
								}}
								isActive={isHidden ? false : section.isActive}
								direction={direction}
							>
								<Icon direction={direction}>
									<Tooltip
										title={section.tooltip}
										placement={
											direction === "right"
												? "right"
												: direction === "left"
												? "left"
												: direction === "down"
												? "bottom"
												: "top"
										}
									>
										<FontAwesomeIcon icon={section.icon} />
									</Tooltip>
								</Icon>
							</SectionWrapper>
						);
					})}
				</Sections>
			)}
			<ContentWrapper isHidden={isHidden}>
				<ResizablePanel {...resizablePanelProps}></ResizablePanel>
			</ContentWrapper>
		</Wrapper>
	);
};

export default SectionsPanel;

const Wrapper = styled.div`
	display: ${(props) => (props.activeFilter ? "flex" : "none")};
	flex-direction: ${(props) =>
		props.direction === "right"
			? "row"
			: props.direction === "left"
			? "row-reverse"
			: props.direction === "down"
			? "column"
			: "column-reverse"};
	& > div:last-child {
		flex-grow: 1;

		width: ${(props) =>
			props.direction === "down" || props.direction === "up" ? "100%" : "auto"};
		height: ${(props) =>
			props.direction === "right" || props.direction === "left"
				? "100%"
				: "auto"};

		> div {
			width: ${(props) =>
				props.direction === "down" || props.direction === "up"
					? "100%"
					: "auto"};
			height: ${(props) =>
				props.direction === "right" || props.direction === "left"
					? "100%"
					: "auto"};
		}
	}
`;

const Sections = styled.div`
	display: flex;
	flex-direction: ${(props) =>
		props.direction === "right" || props.direction === "left"
			? "column"
			: "row"};

	width: ${(props) =>
		props.direction === "right" || props.direction === "left"
			? "48px"
			: "100%"};
	height: ${(props) =>
		props.direction === "down" || props.direction === "up" ? "48px" : "100%"};

	background-color: ${(props) => props.theme.colors.background.secondaryMenu};
`;

const HeaderWrapper = styled.div`
	position: relative;

	width: 48px;
	height: 48px;

	svg {
		color: ${(props) => props.theme.colors.secondaryText.default};
		font-size: 20px;
	}
`;

const HeaderDivider = styled.div`
	${(props) =>
		props.direction === "right" || props.direction === "left"
			? `height: 1px; margin: 2px 8px;`
			: `width: 1px; margin: 8px 2px;`}

	background-color: ${(props) => props.theme.colors.background.darker};
`;

const SectionWrapper = styled.div`
	position: relative;

	width: 48px;
	height: 48px;

	${(props) => `
    border-${
			props.direction === "right"
				? "left"
				: props.direction === "left"
				? "right"
				: props.direction === "down"
				? "top"
				: "bottom"
		}: ${
		props.isActive ? "3px solid " + props.theme.colors.primary.default : "0"
	}
`}

	cursor: pointer;

	&:hover {
		svg {
			color: ${(props) =>
				props.isActive
					? props.theme.colors.primary.defaultHover
					: props.theme.colors.secondaryText.active};
		}
	}

	svg {
		color: ${(props) =>
			props.isActive
				? props.theme.colors.primary.default
				: props.theme.colors.secondaryText.default};
		font-size: 20px;

		transition: all 0.2s ease-out;
	}

	&:not(:first-child) {
		margin-top: ${(props) =>
			props.direction === "right" || props.direction === "left" ? "4px" : "0"};
		margin-left: ${(props) =>
			props.direction === "down" || props.direction === "up" ? "4px" : "0"};
	}
`;

const Icon = styled.div`
	position: absolute;

	display: flex;
	justify-content: center;
	align-items: center;

	${(props) =>
		props.direction === "right"
			? `right: 0;`
			: props.direction === "left"
			? `left: 0;`
			: props.direction === "down"
			? `bottom: 0;`
			: `top: 0;`}

	width: 48px;
	height: 48px;
`;

const ContentWrapper = styled.div`
	display: ${(props) => (props.isHidden ? "none" : "block")};
`;
