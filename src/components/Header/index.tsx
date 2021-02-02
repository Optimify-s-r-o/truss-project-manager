import * as React from 'react';
import styled from 'styled-components';
import { ContentRow, ContentSpaceBetween } from '../../constants/globalStyles';
import { WithTranslation, withTranslation } from '../../translation/i18n';

const currentWindow = require("electron").remote.getCurrentWindow();

interface OwnProps {
	showDropdown?: boolean;
	title?: string;
	mode?: "light" | "dark" | "primary";
}

export const Home = (props: OwnProps & WithTranslation) => {
	const { title } = props;
	const [maximized, setMaximized] = React.useState<boolean>(
		!currentWindow.isMaximized()
	);

	const close = (_event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		currentWindow.close();
	};

	const maximize = (_event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (currentWindow.isMaximized()) {
			currentWindow.unmaximize();
			setMaximized(true);
		} else {
			currentWindow.maximize();
			setMaximized(false);
		}
	};

	const minimize = (_event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		currentWindow.minimize();
	};

	return (
		<HeaderContent mode={props.mode ? props.mode : "primary"}>
			<HeaderDrag className="drag">
				<TitleRow>
					{title ? (
						<>
							<Logo />
							<Title>{title}</Title>
						</>
					) : (
						<>
							<Logo />
							<Title>Truss Project Manager</Title>
						</>
					)}
				</TitleRow>
				<Buttons>
					<ContentRow>
						<Img
							onClick={minimize}
							src={
								props.mode === "light"
									? "./img/icons/menu/minimize_black.png"
									: "./img/icons/menu/minimize.png"
							}
						/>
						{maximized ? (
							<Img
								onClick={maximize}
								src={
									props.mode === "light"
										? "./img/icons/menu/maximize_black.png"
										: "./img/icons/menu/maximize.png"
								}
							/>
						) : (
							<Img
								onClick={maximize}
								src={
									props.mode === "light"
										? "./img/icons/menu/maximized_black.png"
										: "./img/icons/menu/maximized.png"
								}
							/>
						)}
						<Img
							onClick={close}
							src={
								props.mode === "light"
									? "./img/icons/menu/close_black.png"
									: "./img/icons/menu/close.png"
							}
							hoverColor="./img/icons/menu/close.png"
						/>
					</ContentRow>
				</Buttons>
			</HeaderDrag>
		</HeaderContent>
	);
};

export const HeaderContent = styled.div<{ mode: string }>`
	flex: 0 1 30px;

	width: 100%;

	padding: 2px 2px 0;

	background-color: ${(props) =>
		props.mode === "primary"
			? props.theme.colors.primary.default
			: props.theme.colors.background.content};

	color: ${(props) =>
		props.mode === "primary"
			? props.theme.colors.background.content
			: props.theme.colors.contentText};
`;

export const HeaderDrag = styled(ContentSpaceBetween)`
	width: 100%;
`;

export const Logo = styled.div`
	width: 25px;
	height: 25px;
	margin-left: 4px;
	background-image: url("./img/Truss-Servant.ico");
	background-repeat: no-repeat;
	background-size: 80%;
	background-position: center;
`;

const TitleRow = styled(ContentRow)`
	margin: -2px 0 0 -2px;
`;

const Title = styled.div`
	margin-left: 4px;

	font-family: "Segoe UI", roboto-regular;
	font-size: 12px;
`;

const Buttons = styled.div`
	margin: -2px -2px 0 0;
`;

export const Img = styled.div<{ src: string; hoverColor?: string }>`
	width: 46px;
	height: 30px;

	background-image: url(${(props) => props.src});
	background-position-x: center;
	background-position-y: 57%;
	background-repeat: no-repeat;

	transition: background-color 0.2s ease-out;

	-webkit-app-region: none;

	&:hover {
		background-color: ${(props) => props.hover};
	}

	&:hover {
		background-color: ${(props) =>
			props.hoverColor ? "#ff2020" : "rgba(0, 0, 0, .1)"};
		${(props) =>
			props.hoverColor && `background-image: url(${props.hoverColor});`}
	}
`;

export default withTranslation()(Home);
