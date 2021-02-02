import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/pro-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Link } from 'react-router-dom';

interface NavigationProps {
	items: ItemDefinition[];
	title?: string;
}

interface ItemDefinition {
	to: any;
	active: boolean;
	text: string;
	icon?: IconDefinition;
	isAction?: boolean;
}

const Navigation = (props: NavigationProps) => {
	return (
		<NavigationWrapper>
			{props.title && <Title>{props.title}</Title>}
			{props.items?.map((item: ItemDefinition) => {
				return (
					<Link to={item.to} key={item.text}>
						<NavigationItem
							active={item.active ? 1 : 0}
							isAction={item.isAction}
						>
							{item.icon ? (
								<FontAwesomeIcon icon={item.icon as IconProp} />
							) : (
								""
							)}
							{item.text}
						</NavigationItem>
					</Link>
				);
			})}
		</NavigationWrapper>
	);
};

export default Navigation;

const Title = styled.div`
	padding: 8px 24px;

	color: ${(props) => props.theme.colors.background.content};
`;

const NavigationItem = styled.div<{ active: boolean; isAction: boolean }>`
	padding: ${(props) => (props.active ? "10px" : "8px")} 24px
		${(props) => (props.active ? "10px" : "")};

	background-color: ${(props) =>
		props.active
			? props.theme.colors.background.contentSecondary + " !important"
			: props.isAction
			? "transparent !important"
			: props.theme.colors.background.menu};
	color: ${(props) =>
		props.active
			? props.theme.colors.primary.default
			: props.isAction
			? props.theme.colors.background.content
			: props.theme.colors.secondaryText.default};

	svg {
		margin-right: 4px;
		color: ${(props) =>
			props.active
				? props.theme.colors.primary.default
				: props.theme.colors.background.darker};
	}

	&:hover {
		background-color: ${(props) =>
			props.active
				? props.theme.colors.background.contentSecondary
				: props.isAction
				? "rgba(255, 255, 255, 0.05)"
				: props.theme.colors.background.content} !important;
		color: ${(props) =>
			props.active
				? props.theme.colors.primary.default
				: props.isAction
				? props.theme.colors.background.content
				: props.theme.colors.secondaryText.hover};

		svg {
			color: ${(props) =>
				props.active
					? props.theme.colors.primary.default
					: props.isAction
					? props.theme.colors.background.content
					: props.theme.colors.secondaryText.default};
		}
	}
`;

const NavigationWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: flex-end;

	padding: 0 8px;

	background-color: ${(props) => props.theme.colors.background.primary.primary};

	> a {
		text-decoration: none;

		&:nth-child(even) ${NavigationItem} {
			background-color: ${(props) =>
				props.active
					? props.theme.colors.background.contentSecondary
					: props.isAction
					? "transparent"
					: props.theme.colors.background.secondaryMenu};
		}
	}
`;
