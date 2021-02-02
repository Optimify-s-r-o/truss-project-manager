import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/pro-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { PriceList } from '../_types';

interface NavigationProps {
	items: ItemDefinition[];
	title?: string;
	priceList?: PriceList;
	justify?: string;
	priceLists: PriceList[];
	setSelected: React.Dispatch<React.SetStateAction<string>>;
	selected: string;
}

interface ItemDefinition {
	id: string;
	text: string;
	icon?: IconDefinition;
	isAction?: boolean;
	onClick?: any;
}

const Navigation = ({
	title,
	items,
	priceList,
	justify,
	priceLists,
	setSelected,
	selected,
}: NavigationProps) => {
	useEffect(() => {
		if (
			priceLists &&
			(!selected || !priceLists.find((p) => p.Id === selected))
		) {
			const firstPriceList = _.first(priceLists)?.Id;
			setSelected(firstPriceList);
		}
	}, [priceLists]);

	const handleChange = (item) => (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		item.onClick();
		setSelected(item.id);
	};
	return (
		<NavigationWrapper justify={justify}>
			{title && <Title>{title}</Title>}
			{items?.map((item: ItemDefinition) => {
				const active = selected === item?.id;
				return (
					<Item key={item.text} onClick={handleChange(item)}>
						<NavigationItem active={active ? 1 : 0} isAction={item.isAction}>
							{item.icon ? (
								<FontAwesomeIcon icon={item.icon as IconProp} />
							) : (
								""
							)}
							{item.text}
						</NavigationItem>
					</Item>
				);
			})}
		</NavigationWrapper>
	);
};

export default Navigation;

const Item = styled.div``;

const Title = styled.div`
	padding: 8px 24px;

	color: ${(props) => props.theme.colors.background.content};
`;

const NavigationItem = styled.div<{ active: boolean; isAction?: boolean }>`
	cursor: pointer;
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

const NavigationWrapper = styled.div<{
	justify?: string;
	active?: boolean;
	isAction?: boolean;
}>`
	display: flex;
	flex-direction: row;
	justify-content: ${(props) => (props.justify ? props.justify : "flex-start")};
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
