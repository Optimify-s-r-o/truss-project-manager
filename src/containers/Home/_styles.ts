import styled from 'styled-components';
import { device } from '../../constants/theme';
import { MenuItem } from '@material-ui/core';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	box-sizing: border-box;

	width: 100%;
	height: 100%;

	padding: 2em 4em;
`;

export const CarouselContainer = styled.div`
	width: 100%;
	height: calc(100% - 31px);

	@media ${device.medium} {
		.control-arrow {
			display: none;
		}
	}
`;

export const LoginContainer = styled.div`
	position: absolute;
	top: calc(30px + 50% - 190px);
	right: 10%;
	bottom: 40%;

	display: flex;
	flex-direction: column;

	width: 500px;
	height: 380px;

	background-color: #f7f7f7 !important;
	border-radius: 0 0 3px 3px;
	box-sizing: border-box;
	box-shadow: ${(props) => props.theme.boxShadow};

	@media ${device.medium} {
		top: calc(30px + 50%);
		right: 50%;

		margin-top: -190px;
		margin-right: -250px;
	}

	@media (max-width: 550px) {
		width: auto;
		min-width: 200px;

		margin-right: 0;

		right: 1em;
		left: 1em;

		.xsHide {
			display: none;
		}
	}
`;

export const Login = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	height: 100%;
	box-sizing: border-box;
	position: relative;
`;

export const Navigation = styled.div`
	position: relative;

	align-self: flex-start;
	line-height: 18px;
	width: 100%;

	> div {
		width: 100%;

		margin-top: -34px;
		padding: 0;

		background-color: transparent !important;

		> div {
			width: 100%;

			> div:last-child {
				margin-left: auto;
				> * {
					margin-right: 0;
				}
			}
		}
	}
`;

export const MenuItemStyled = styled(MenuItem)`
	background-color: ${(props) => props.theme.colors.background.content};
	-webkit-app-region: no-drag;
	cursor: pointer;
`;

export const Actions = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	flex-direction: row;
	-webkit-app-region: no-drag;
`;
