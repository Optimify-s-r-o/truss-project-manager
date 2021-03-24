import * as React from 'react';
import Loader from '../Loader';
import Modal from '../Modal';
import styled from 'styled-components';
interface OwnProps {
	closeModal?: boolean;
	button?: string;
	level?: ButtonLevel;
	children: React.ReactNode;
	loading?: any;
	modal?: boolean;
	modalChildren?: any;
	modalButton?: string;
	modalTitle?: string;
	modalDescription?: string;
	onClick?: (_event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	fullWidth?: boolean;
	iconOnly?: boolean;
	noMargin?: boolean;
	noLeftMargin?: boolean;
	type?: string;
	update?: boolean;
	handleSync?: (_event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	disabled?: boolean;
}

type ButtonLevel = 1 | 2 | 3;

const getPadding = (props: OwnProps) => {
	switch (props.level) {
		case 1:
			return "14px 24px";
		case 2:
			return "8px 16px";
		case 3:
		default:
			return "6px 12px";
	}
};

const ButtonContent = (props: OwnProps) => {
	const { children, iconOnly, loading } = props;
	return (
		<>
			<ChildrenWrapper hide={loading && iconOnly}>{children}</ChildrenWrapper>
			{loading && (
				<LoaderWrapper iconOnly={iconOnly}>
					<Loader size={24} />
				</LoaderWrapper>
			)}
		</>
	);
};

export const Button = (props: OwnProps) => {
	const { children, type, ...elementProps } = props;
	return (
		<ButtonElement {...elementProps} type={type ? type : "submit"}>
			{ButtonContent(props)}
		</ButtonElement>
	);
};

export const PlainButton = (props: OwnProps) => {
	const { children, type, ...elementProps } = props;
	return (
		<PlainButtonElement {...elementProps} type={type ? type : "submit"}>
			{ButtonContent(props)}
		</PlainButtonElement>
	);
};

export const RoundButton = (props: OwnProps) => {
	const { children, type, ...elementProps } = props;
	return (
		<RoundButtonElement {...elementProps} type={type ? type : "submit"}>
			{ButtonContent(props)}
		</RoundButtonElement>
	);
};

export const IconButton = (props: OwnProps) => {
	const {
		children,
		type,
		modalTitle,
		modalDescription,
		modal,
		...elementProps
	} = props;

	if (modal) {
		return <ModalButton {...props} />;
	}

	return (
		<IcondButtonElement {...elementProps} type={type ? type : "submit"}>
			{ButtonContent(props)}
		</IcondButtonElement>
	);
};

export const OutlinedButton = (props: OwnProps) => {
	const {
		children,
		type,
		modalTitle,
		modalDescription,
		modal,
		...elementProps
	} = props;

	if (modal) {
		return <ModalButton {...props} />;
	}

	return (
		<OutlinedButtonElement {...elementProps} type={type ? type : "submit"}>
			{ButtonContent(props)}
		</OutlinedButtonElement>
	);
};

export const ModalButton = (props: OwnProps) => {
	const [open, setOpen] = React.useState(false);

	const {
		update,
		button,
		children,
		type,
		closeModal,
		onClick,
		modalChildren,
		modalTitle,
		modalDescription,
		modal,
		handleSync,
		...elementProps
	} = props;

	const handleClick = (_event: React.MouseEvent<HTMLElement, MouseEvent>) => {
		setOpen(true);
	};

	const confirm = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
		if (closeModal) close();
		onClick && onClick(event);
	};

	const close = () => {
		setOpen(false);
	};

	const sync = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
		handleSync && handleSync(event);
		close();
	};

	return (
		<>
			<OutlinedButton
				onClick={handleClick}
				{...elementProps}
				type={type ? type : "submit"}
			>
				{ButtonContent(props)}
			</OutlinedButton>
			<Modal
				confirm={confirm}
				open={open}
				title={modalTitle}
				description={modalDescription}
				closeModal={close}
				button={button}
				modalChildren={modalChildren}
				update={update}
				sync={sync}
			/>
		</>
	);
};

export const ModalTextButton = (props: OwnProps) => {
	const [open, setOpen] = React.useState(false);

	const {
		button,
		children,
		type,
		onClick,
		modalChildren,
		modalTitle,
		modalDescription,
		modal,
		handleSync,
		update,
		...elementProps
	} = props;

	const handleClick = (_event: React.MouseEvent<HTMLElement, MouseEvent>) => {
		setOpen(true);
	};

	const confirm = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
		onClick && onClick(event);
	};

	const closeModal = () => {
		setOpen(false);
	};

	const sync = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
		handleSync && handleSync(event);
		closeModal();
	};

	return (
		<>
			<TrussOutlinedButtonElement
				onClick={handleClick}
				{...elementProps}
				type={type ? type : "submit"}
			>
				{ButtonContent(props)}
			</TrussOutlinedButtonElement>
			<Modal
				confirm={confirm}
				open={open}
				title={modalTitle}
				description={modalDescription}
				closeModal={closeModal}
				button={button}
				modalChildren={modalChildren}
				update={update}
				sync={sync}
			/>
		</>
	);
};

const ChildrenWrapper = styled.div`
	display: inline-block;
	visibility: ${(props) => (props.hide ? "hidden" : "visible")};
`;

export const LoaderWrapper = styled.div`
	display: inline-block;
	position: relative;
	top: -5px;
	width: 24px;
	height: 24px;
	margin: -8px 0;

	${(props) =>
		props.iconOnly &&
		`
  position: absolute;
  top: 11px;
  left: -6px
  `}
`;

const ButtonElement = styled.button`
	position: relative;

	width: ${(props) => (props.fullWidth ? "100%" : "auto")};

	margin: ${(props) =>
		props.noMargin ? "0" : props.noLeftMargin ? "8px 0" : "8px 0 8px 8px"};
	padding: ${(props) => getPadding(props)};

	box-shadow: ${(props) => props.theme.boxShadowSharp};
	border: 0;
	border-radius: 3px;
	background-color: ${(props) =>
		props.disabled
			? props.theme.colors.background.darker
			: props.theme.colors.primary.default};

	color: white;
	font-family: Arial;
	font-size: 14px;
	font-weight: 500;
	text-transform: uppercase;
	overflow: hidden;

	transition: all 0.2s ease-in-out;

	&:before {
		content: "";
		position: absolute;
		z-index: -1;

		top: -1px;
		right: 50%;
		bottom: -1px;
		left: 50%;

		background-color: rgba(0, 0, 0, 0.1);

		transition: all 0.1s ease-out;
	}

	&:hover {
		cursor: ${(props) => (props.disabled ? "normal" : "pointer")};
		box-shadow: ${(props) => props.theme.boxShadowSharpHover};

		&:before {
			left: -2px;
			right: -2px;
		}
	}

	&:active {
		background-color: ${(props) => props.theme.colors.primary.defaultActive};
		box-shadow: ${(props) => props.theme.boxShadowSharpActive};
	}
`;

const PlainButtonElement = styled(ButtonElement)`
	background-color: transparent;
	box-shadow: none;
	color: ${(props) => props.theme.colors.primary.default};

	&:before {
		background-color: transparent;
	}

	&:after {
		content: "";
		position: absolute;

		right: 50%;
		bottom: 0;
		left: 50%;

		height: 1px;

		background-color: ${(props) => props.theme.colors.primary.default};
		opacity: 0.15;

		transition: all 0.1s ease-out;
	}

	&:hover {
		background-color: rgba(0, 0, 0, 0.05);
		box-shadow: none;

		&:after {
			left: 0;
			right: 0;
		}
	}

	&:active {
		background-color: rgba(0, 0, 0, 0.25);
		box-shadow: none;
	}

	&:disabled {
		color: ${(props) => props.theme.colors.secondaryText.default};

		&:hover {
			background-color: transparent;

			&:after {
				right: 50%;
				left: 50%;
			}

			cursor: default;
		}
	}
`;

const OutlinedButtonElement = styled(ButtonElement)`
	background-color: transparent;
	border: 1px solid ${(props) => props.theme.colors.primary.default};
	box-shadow: none;
	color: ${(props) => props.theme.colors.primary.default};

	.loaderWrapper > div:after {
		background: ${(props) => props.theme.colors.primary.default};
	}

	&:before {
		background-color: transparent;
	}

	&:hover {
		box-shadow: none;
		border: 1px solid ${(props) => props.theme.colors.primary.default};

		&:before {
			background-color: ${(props) => props.theme.colors.primary.default};
		}

		.loaderWrapper > div:after {
			background: #fff;
		}
	}

	&:active {
		box-shadow: ${(props) => props.theme.boxShadowSharp};

		&:before {
			background-color: ${(props) => props.theme.colors.primary.defaultActive};
		}
	}
`;

const IcondButtonElement = styled(ButtonElement)`
	padding: 6px 9px;
	border-radius: 8px;
	margin: 0 0 0 5px;
	background-color: #f9f2d0;
	border: 2px solid #c57c0e;
	box-shadow: none;
	color: ${(props) => props.theme.colors.primary.default};
	min-width: 38px;
	.loaderWrapper > div:after {
		background: ${(props) => props.theme.colors.primary.default};
	}

	&:before {
		background-color: transparent;
	}

	&:hover {
		box-shadow: none;

		&:before {
			background-color: #f9efc8;
		}
	}

	&:active {
		box-shadow: ${(props) => props.theme.boxShadowSharp};

		&:before {
			background-color: ${(props) => props.theme.colors.primary.defaultActive};
		}
	}
`;

const RoundButtonElement = styled(ButtonElement)`
	background-color: ${(props) => props.theme.white};
	border: 3px solid ${(props) => props.theme.fineColor};
	border-radius: 30px;
	box-shadow: none;
	color: ${(props) => props.theme.fineColor};

	&:hover {
		cursor: pointer;
		color: ${(props) => props.theme.white};
		background: ${(props) => props.theme.fineColor};
		box-shadow: none;
	}
`;

const TrussOutlinedButtonElement = styled(OutlinedButtonElement)`
	padding: 5px 11px 6px;
`;
