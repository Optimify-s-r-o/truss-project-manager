import styled from "styled-components";
import truss2dCreate from "../../../../../img/addTruss2D.png";
import truss2dEdit from "../../../../../img/editTruss2D.png";
import truss3dCreate from "../../../../../img/addTruss3D.png";
import truss3dEdit from "../../../../../img/editTruss3D.png";
import { BoxTree } from "../../../../../constants/globalStyles";
import { TrussAction, TrussExe } from "../../../../../types/_types";

export const LogElement = styled.div`
	a {
		color: ${(props) => props.theme.colors.primary.default};
		text-decoration: none;

		&:hover {
			color: ${(props) => props.theme.colors.primary.hover};
		}

		&:active {
			color: ${(props) => props.theme.colors.primary.active};
			text-decoration: underline;
		}
	}
`;

export const Open = styled.div<{ action: TrussAction; truss: TrussExe }>`
	position: relative;
	top: 0px;
	bottom: -2px;
	background-size: cover;
	background-position: center;
	background-image: ${(props) =>
		props.action === TrussAction.EDIT
			? props.truss === TrussExe.TRUSS_3D
				? `url(${truss3dEdit})`
				: `url(${truss2dEdit})`
			: props.truss === TrussExe.TRUSS_3D
			? `url(${truss3dCreate})`
			: `url(${truss2dCreate})`};
	cursor: pointer;
	margin-right: 1px;
	width: 33px;
	height: 33px;
	z-index: 1;
`;

export const NameColumn = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;

	> :first-child {
		flex-grow: 1;
	}
`;

export const StatusBox = styled(BoxTree)<{ status: string }>`
	height: 0;
`;

export const Action = styled.div`
	color: ${(props) => props.theme.colors.primary.default};

	&:hover {
		cursor: pointer;
	}
`;

export const LogSeparator = styled.div`
	width: 100%;
	height: 1px;

	margin: 6px 0;

	background-color: ${(props) => props.theme.colors.background.primary.hover};
`;

export const LogDetail = styled.div`
	margin-top: 4px;

	color: ${(props) => props.theme.colors.secondaryText.hover};
	font-size: 0.7rem;
`;

export const ChangeArrowWrapper = styled.span`
	display: inline-block;

	margin: 0 6px;

	color: ${(props) => props.theme.colors.secondaryText.default};
	font-size: 0.6rem;
`;

export const VerticalScroll = styled.div`
	overflow-x: auto;

	margin-top: -80px;
	padding-top: 80px;

	input[type="text"] {
		min-width: 120px;
	}
`;
