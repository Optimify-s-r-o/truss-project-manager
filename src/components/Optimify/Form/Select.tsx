import * as React from 'react';
import ReactSelect, { OptionTypeBase } from 'react-select';
import styled from 'styled-components';
import { faChevronDown, faSearch } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface SelectProps {
	defaultValue?: any;
	id?: string;
	isLoading?: boolean;
	isOpen?: boolean;
	name?: string;
	onChange?: (value: any, actionMeta: any) => void;
	options?: any;
	placeholder?: string;
	value?: any;
	noMargin?: boolean;
	align?: "left" | "center" | "right";
	direction?: SelectDirection;
	disabled?: boolean;
}

export type SelectDirection =
	| "down"
	| "up"
	| "right"
	| "right-up"
	| "right-down"
	| "left"
	| "left-up"
	| "left-down";

export interface OptionType extends OptionTypeBase {
	label: string | number | object;
	value: string | number;
}

export const SearchableSelect = (props: SelectProps) => {
	const [isOpen, setOpen] = React.useState(false);
	const ref = React.useRef(null);

	React.useEffect(() => {
		function handleClickOutside(e) {
			//@ts-ignore
			if (isOpen && ref?.current && !ref?.current?.contains(e.target))
				setOpen(false);
		}

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen]);

	const handleChange = (value: any, _actionMeta: any) => {
		setOpen(false);
		props.onChange &&
			props.onChange(value, { id: props.id, name: props.name } as any);
	};

	return (
		<Wrapper
			isOpen={isOpen}
			noMargin={props.noMargin}
			ref={ref}
			direction={props.direction ? props.direction : "down"}
		>
			<FakeInput
				hasValue={props.value}
				disabled={props.disabled}
				onClick={() => {
					if (props.disabled) return;
					setOpen(!isOpen);
				}}
			>
				<FakeInputContent align={props.align ? props.align : "left"}>
					{props.value ? (props.value as OptionType).label : props.placeholder}
				</FakeInputContent>
				<FontAwesomeIcon icon={faChevronDown as IconProp} />
			</FakeInput>
			<Dropdown isOpen={isOpen}>
				<ReactSelect
					isDisabled={props.disabled}
					autoFocus
					backspaceRemovesValue={false}
					components={{
						DropdownIndicator: SearchIcon,
						IndicatorSeparator: null,
					}}
					controlShouldRenderValue={false}
					hideSelectedOptions={false}
					isClearable={false}
					tabSelectsValue={false}
					menuIsOpen
					name={props.name}
					placeholder={props.placeholder}
					options={props.options}
					defaultValue={props.defaultValue}
					value={props.value}
					onChange={handleChange}
					className="react-select"
					classNamePrefix="react-select"
					id={props.id}
				/>
			</Dropdown>
		</Wrapper>
	);
};

export const Select = (props: SelectProps) => {
	return (
		<NoSearchWrapper>
			<SearchableSelect {...props} />
		</NoSearchWrapper>
	);
};

const NoSearchWrapper = styled.div`
	position: relative;

	width: 100%;

	.react-select__control {
		display: none !important;
	}
`;

const SearchIcon = () => <FontAwesomeIcon icon={faSearch as IconProp} />;

const Wrapper = styled.div`
	position: relative;

	width: 100%;
	height: 32px;

	margin: ${(props) => (props.noMargin ? "0" : "8px")} 0;

	&:after {
		content: "";

		position: absolute;

		right: 100%;
		bottom: 0;
		left: 0;

		height: 2px;

		background-color: transparent;

		transition: all 0.2s ease-out;
	}

	> *:first-child > svg {
		transform: ${(props) =>
			(props.direction === "down" ? "rotateX(0deg)" : "rotateX(180deg)") +
			(props.direction.includes("right")
				? " rotateZ(270deg)"
				: props.direction.includes("left")
				? " rotateZ(90deg)"
				: "")};
	}

	${(props) =>
		props.isOpen
			? `
        &:after {
          right: 0;

          background-color: ${props.theme.colors.primary.default};
        }

        > *:first-child > svg {
          color: ${props.theme.colors.primary.default};

          transform: ${
						props.direction === "down"
							? "rotateX(180deg)"
							: props.direction === "up"
							? "rotateX(0deg)"
							: props.direction.includes("right")
							? "rotateY(180deg) rotateZ(270deg)"
							: props.direction.includes("left")
							? "rotateY(180deg) rotateZ(90deg)"
							: ""
					};
        }
      `
			: ""}

	.react-select {
		position: absolute;

		width: 100%;

		${(props) =>
			props.direction === "down"
				? `top: 40px;`
				: props.direction === "up"
				? `bottom: 40px;`
				: props.direction === "right"
				? `
          left: calc(100% + 10px);
          transform: translateY(-50%);
        `
				: props.direction === "right-up"
				? `
          left: calc(100% + 10px);
          bottom: 0;
        `
				: props.direction === "right-down"
				? `
          left: calc(100% + 10px);
          top: 0;
        `
				: props.direction === "left"
				? `
          right: calc(100% + 10px);
          transform: translateY(-50%);
        `
				: props.direction === "left-up"
				? `
          right: calc(100% + 10px);
          bottom: 0;
        `
				: props.direction === "left-down"
				? `
          right: calc(100% + 10px);
          top: 0;
        `
				: ``}

		background-color: ${(props) => props.theme.colors.background.content};
		border-radius: 3px;
		box-shadow: ${(props) => props.theme.boxShadow};
		color: ${(props) => props.theme.colors.contentText};

		overflow: hidden;

		z-index: 999999999999;
	}

	.react-select__control {
		width: 100%;
		height: 43px;
		min-height: initial;

		padding: 0;

		background: transparent;
		border: 0;
		border-bottom: 1px solid ${(props) => props.theme.colors.forms.border};
		border-radius: 0;
		box-shadow: none;
		font-size: 16px;

		transition: all 0.2s ease-out;
	}

	.react-select__control:hover {
		border-color: ${(props) => props.theme.colors.primary.default};
	}

	.react-select__value-container {
		padding: 8px 12px;
		cursor: text;
	}

	.react-select__indicators {
		margin: 0 8px;

		color: ${(props) => props.theme.colors.forms.border};
	}

	.react-select__menu {
		position: relative;

		margin: 0;

		background: ${(props) => props.theme.colors.background.content};
		border: 0;
		border-radius: initial;
		box-shadow: none;
	}

	.react-select__menu-list {
		padding: 0;
		max-height: 160px;
	}

	.react-select__option--is-selected {
		background-color: ${(props) => props.theme.colors.primary.default};
		color: ${(props) => props.theme.colors.background.content};
	}

	.react-select__option--is-selected:hover {
		background-color: ${(props) => props.theme.colors.primary.hover};
		color: ${(props) => props.theme.colors.background.content};
	}

	.react-select__option--is-selected:active {
		background-color: ${(props) => props.theme.colors.primary.active};
		color: ${(props) => props.theme.colors.background.content};
	}

	.react-select__option--is-focused:not(.react-select__option--is-selected) {
		background-color: ${(props) => props.theme.colors.background.primary.hover};
	}

	.react-select__option:active:not(.react-select__option--is-selected) {
		background-color: ${(props) =>
			props.theme.colors.background.primary.active};
	}
`;

const FakeInput = styled.div<{ disabled: boolean }>`
	display: flex;
	align-items: center;

	width: 100%;
	height: 32px;
	color: ${(props) => props.theme.colors.contentText};

	border-bottom: 1px solid ${(props) => props.theme.colors.forms.border};

	transition: all 0.2s ease-out;

	background-color: ${(props) =>
		props.disabled ? props.theme.colors.background.lightGray : "transparent"};

	cursor: ${(props) => (props.disabled ? "normal" : "pointer")};

	&:hover {
		border-bottom-color: ${(props) =>
			props.disabled
				? props.theme.colors.forms.border
				: props.theme.colors.primary.default};
	}

	> svg {
		margin: 0 8px;

		color: ${(props) => props.theme.colors.forms.border};

		transition: all 0.2s ease-out;
	}
`;

const FakeInputContent = styled.div`
	flex-grow: 1;
	white-space: nowrap;
	text-align: ${(props) => props.align};
`;

const Dropdown = (props: any) => (props.isOpen ? <>{props.children}</> : <></>);
