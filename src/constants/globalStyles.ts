import FilterList from '@material-ui/icons/FilterList';
import Paper from '@material-ui/core/Paper';
import styled, { keyframes } from 'styled-components';
import { Alert, Spin } from 'antd';
import { device } from './theme';
import { Link } from 'react-router-dom';

export const SAlert = styled(Alert)`
	svg {
		background-color: transparent;
	}
	margin-bottom: 8px;
`;
export const SSpin = styled(Spin)`
	.ant-spin-dot-item {
		background: ${(props) => props.theme.colors.primary.default};
	}
`;
/* TYPOGRAPHY */
export const Header1 = styled.h1`
	box-sizing: border-box;
	font-size: 1.2rem;
	font-weight: 600;
	margin: 8px 0 16px;
	color: ${(props) => props.theme.colors.contentText};
`;

export const Header2 = styled.h4`
	box-sizing: border-box;
	padding-bottom: 8px;
	margin: 0;
	&:not(:first-child) {
		margin-top: 24px;
	}
`;

/* GRID */
export const GridRow = styled.div<{ columns?: number }>`
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	align-items: stretch;
	justify-content: flex-start;
	flex-wrap: wrap;
	color: ${(props) => props.theme.colors.contentText};

	& > * {
		width: ${(props) => 100 / props.columns}%;

		@media ${device.large} {
			${(props) => (props.columns > 2 ? `width: 50%;` : `width: 100%`)}
		}

		@media ${device.medium} {
			${(props) => props.columns > 2 && `width: 100%;`}
		}
	}
	& + & {
		margin-top: 0;
	}
`;

export const GridColumn = styled.div<{ columns?: number }>`
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	align-items: stretch;
	justify-content: flex-start;
	flex-wrap: wrap;
	color: ${(props) => props.theme.colors.contentText};

	& > * {
		width: ${(props) => 100 / props.columns}%;

		@media ${device.large} {
			${(props) => (props.columns > 2 ? `width: 50%;` : `width: 100%`)}
		}

		@media ${device.medium} {
			${(props) => props.columns > 2 && `width: 100%;`}
		}
	}
	& + & {
		margin-top: 0;
	}
`;

export const GridRowCenter = styled.div<{ columns?: number }>`
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	align-items: stretch;
	justify-content: center;
	flex-wrap: wrap;
	color: ${(props) => props.theme.colors.contentText};

	& > * {
		width: ${(props) => 100 / props.columns}%;

		@media ${device.large} {
			${(props) => (props.columns > 2 ? `width: 50%;` : `width: 100%`)}
		}

		@media ${device.medium} {
			${(props) => props.columns > 2 && `width: 100%;`}
		}
	}
	& + & {
		margin-top: 0;
	}
`;

export const GridRowFillContent = styled(GridRow)`
	height: 100%;
`;

export const GridItem = styled.div<{ fill?: boolean }>`
	box-sizing: border-box;
	padding: 8px;

	${(props) =>
		props.hasOwnProperty("alignSelf") && `align-self: ${props.alignSelf};`}

	${(props) => props.padding === false && `padding: 0;`}

  ${(props) => props.fill && `flex-grow: 1;`}


  @media ${device.large} {
		${(props) => props.smallerDisplayHide && `display: none;`}
	}
`;

export const GridItemHalfHeight = styled(GridItem)`
	height: 50%;
`;

export const ButtonsRow = styled.div`
	margin-top: 16px;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	padding: 8px;
`;

export const Fixed = styled.div`
	background-color: ${(props) => props.theme.colors.background.content};
	border-top: 2px solid ${(props) => props.theme.colors.background.menu};
`;

export const MainContent = styled.div`
	color: ${(props) => props.theme.colors.contentText};
	background-color: ${(props) =>
		props.theme.colors.background.contentSecondary};
	padding: 10px;
`;

/* CONTENT */
export const ContentCard = styled.div<{ fullSize?: boolean }>`
	box-sizing: border-box;

	height: ${(props) => (props.fullSize ? "100%" : "auto")};

	margin-top: ${(props) => (props.topMargin ? "16px" : "inherit")};
	padding: ${(props) => (props.noPadding ? "0px" : "8px 16px")};

	background-color: ${(props) => props.theme.colors.background.content};
	border-radius: 3px;
	box-shadow: ${(props) => props.theme.boxShadow};
	color: ${(props) => props.theme.colors.contentText};
`;

export const FlexColumn = styled.div`
	display: flex;
	flex-direction: column;
	align-items: stretch;
	height: 100%;
`;

export const FlexRow = styled.div`
	display: flex;
	flex-direction: row;
	align-items: stretch;
	width: 100%;
`;

export const InputRow = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
`;

export const CardMiddleTableWrapper = styled.div`
	flex-grow: 1;
	margin: 0 -16px -8px -16px;
	border-radius: 0 0 3px 3px;
`;

export const CardEndTableWrapper = styled(CardMiddleTableWrapper)`
	table tr {
		box-shadow: none !important;
	}
`;

export const FullCardEndTableWrapper = styled(CardEndTableWrapper)`
	height: calc(100% - 28px);
`;

/* FORMS */
export const Form = styled.form`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
`;

/* NAV */
export const PageHeader = styled.div`
	display: flex;
	flex-direction: column;
	align-items: stretch;

	background-color: ${(props) => props.theme.colors.background.primary.primary};
`;

export const PageTitle = styled.h1`
	display: flex;
	justify-content: space-between;
	flex-direction: row;
	align-items: center;
	margin: 0;
	padding: 12px 24px;

	color: ${(props) => props.theme.colors.background.content};
	font-size: 1.5rem;
	font-weight: 500;

	> svg {
		margin-right: 16px;
	}
`;

export const PageTitleActions = styled.div`
	float: right;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: -2px;
	margin-bottom: -1px;

	font-size: 1rem;
`;

export const NavBar = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: ${(props) => props.theme.colors.primary.default};
	padding: 4px;
	padding-bottom: 0;
`;

export const NavItems = styled.div`
	display: flex;
	justify-content: flex-start;
	flex-direction: row;
	align-items: center;
`;

export const Href = styled(Link)`
	color: ${(props) => props.theme.colors.primary.default};
	text-decoration: none;
`;

export const LinkMain = styled(Link)`
	position: relative;
	z-index: 1;

	width: ${(props) => (props.fullWidth ? "100%" : "auto")};

	padding: 6px 12px;

	box-shadow: ${(props) => props.theme.boxShadowSharp};
	border: 0;
	border-radius: 3px;
	background-color: ${(props) => props.theme.colors.primary.default};
	color: white;
	font-family: Arial;
	font-size: 14px;
	font-weight: 500;
	text-transform: uppercase;
	overflow: hidden;
	text-decoration: none;

	transition: all 0.2s ease-in-out;

	> div {
		display: inline-block;
		position: relative;
		top: -4px;
		width: 24px;
		height: 24px;
		margin: -8px 0;
	}

	&:before {
		content: "";
		position: absolute;
		z-index: -1;

		top: 0;
		right: 50%;
		bottom: 0;
		left: 50%;

		background-color: rgba(0, 0, 0, 0.1);

		transition: all 0.1s ease-out;
	}

	&:hover {
		cursor: pointer;
		box-shadow: ${(props) => props.theme.boxShadowSharpHover};

		&:before {
			left: 0;
			right: 0;
		}
	}

	&:active {
		background-color: ${(props) => props.theme.colors.primary.active};
		box-shadow: ${(props) => props.theme.boxShadowSharpActive};
	}
`;

export const LinkPlain = styled(LinkMain)`
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
`;

export const NavLink = styled(Link)`
	position: relative;
	display: block;
	border-radius: 3px 3px 0 0;
	color: ${(props) => props.theme.colors.background.content};
	margin-bottom: 0;
	padding: 8px 24px;
	text-decoration: none;
	&:hover {
		background-color: ${(props) => props.theme.colors.background.secondaryMenu};
		color: black;
	}

	${(props) =>
		props.active &&
		`
    color: black;
    background-color: ${props.theme.colors.background.menu};

    &:hover {
      background-color: ${props.theme.colors.background.secondaryMenu};
    }
  `}
`;

export const NavButton = styled.div`
	position: relative;
	border-radius: 3px 3px 0 0;
	background-color: ${(props) => props.theme.colors.background.menu};
	color: #282828;
	margin: 1px;
	margin-bottom: 0;
	padding: ${(props) => (props.slim ? "8px" : "8px 24px")};
	text-decoration: none;
	cursor: pointer;

	&:hover {
		background-color: ${(props) => props.theme.colors.background.secondaryMenu};
	}

	${(props) =>
		props.active &&
		`
    background-color: ${props.theme.colors.background.secondaryMenu};
    -webkit-box-shadow: inset 0px 30px 15px -15px rgba(255,255,255,1);
    box-shadow: inset 0px 30px 15px -15px rgba(255,255,255,1);

    &:hover {
      background-color: ${props.theme.colors.background.secondaryMenu};
    }
  `}
`;

/* OLD STYLES */

export const Center = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
`;

export const SpaceBetween = styled.div`
	padding: 5px;
`;

export const Main = styled.div`
	position: relative;

	min-height: 100%;

	background-color: ${(props) =>
		props.theme.colors.background.contentSecondary};
	padding: 0;
`;

export const Content = styled.div`
	padding: 16px;
	height: ${(props) => (props.fullSize ? "100%" : "auto")};
`;

export const ContentFilter = styled.div`
	position: absolute;

	height: 100%;
	width: 100%;

	padding: 16px;

	overflow: auto;
`;

export const ContentFillParent = styled(Content)`
	position: absolute;

	height: calc(100% - 92px);
	width: 100%;
`;

export const ContentInline = styled.div`
	display: flex;
	flex-direction: row;
	height: 100%;
`;

export const ContentSpaceBetween = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: row;

	width: 100%;
`;

export const ButtonsSpaceBetweenRow = styled(ContentSpaceBetween)`
	margin-top: 16px;
	padding: 8px;
`;

export const ContentSpaceBetweenWithPadding = styled(ContentSpaceBetween)`
	padding-right: ${(props) => props.theme.padding};
`;

export const Title = styled.div`
	font-size: 1.2rem;
	font-weight: 600;
	margin: 20px 16px 10px;

	&:first-child {
		margin: 5px 16px 10px;
	}
	> svg {
		font-size: 0.8em;
	}
`;

export const TitleQuotation = styled.div`
	color: #292929;
	font-size: 1.2rem;
	font-weight: 600;
	margin: 20px 16px 10px;

	&:first-child {
		margin: 5px 14px 10px;
	}
	> svg {
		font-size: 0.8em;
	}
`;

export const TextArea = styled.div`
	overflow-y: auto;
	display: flex;
	flex-direction: column;
	font-size: 0.8rem;
	height: 250px;
	border: 1px solid ${(props) => props.theme.colors.forms.border};
`;

export const TextAreaFull = styled.div`
	display: flex;
	flex-direction: column;
	font-size: 0.8rem;
	border: 1px solid ${(props) => props.theme.colors.forms.border};
`;

export const Row = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	border-bottom: 1px solid ${(props) => props.theme.colors.forms.border};
`;

export const ContentRow = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
`;

export const RowEnd = styled.div`
	display: flex;
	flex-direction: row;
	align-items: flex-end;
	justify-content: flex-start;
`;

export const ContentRowEnd = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-end;
`;

export const ContentColumn = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
	width: 100%;
`;

export const FilterColumn = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

export const ContentColumnMargin = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
	width: 100%;
	margin-bottom: ${(props) => props.theme.margin};
`;

export const ContentColumnCheckboxMargin = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
	width: 100%;
	margin: ${(props) => props.theme.margin} 0;
`;

export const Column = styled.div`
	width: 45%;
	margin-right: 5%;
	display: flex;
	flex-direction: column;
`;

export const Name = styled.div`
	color: ${(props) => props.theme.colors.secondaryText.default};
	padding: 7px 25px;
	width: 60%;
`;

export const Value = styled.div`
	color: ${(props) => props.theme.colors.secondaryText.default};
	padding: 7px 25px;
	width: 40%;
`;

export const Item = styled(Paper)`
	width: auto;
	box-sizing: border-box;
	border: 1px solid ${(props) => props.theme.colors.forms.border};
	margin: ${(props) => props.theme.margin};

	${(props) =>
		props.sameWidth &&
		`
          flex: 1 1 0px
         `}
`;

export const Start = styled.div`
	width: ${(props) => 100 / props.box}%;
	display: flex;
	justify-content: flex-start;
	flex-direction: row;
	align-items: center;
	padding: 0px 20px;
	color: ${(props) => props.theme.colors.contentText};
`;

export const End = styled(Center)`
	display: flex;
	justify-content: flex-end;
`;

export const Space = styled.div`
	width: 10px;
`;

export const ContentSpace = styled(ContentInline)`
	padding: ${(props) => props.theme.padding};
	justify-content: center;
	align-items: center;
	width: 100%;
`;

export const InlineTable = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 8px 0;
	color: black;
	border-bottom: 1px solid ${(props) => props.theme.colors.forms.border};
	&:hover {
		background-color: ${(props) => props.theme.colors.forms.labelBorder};
	}
`;

export const BoxTree = styled.div<{ status: string }>`
	display: inline-block;
	height: 0;
	background-color: ${(props) => props.theme.colors.status[props.status]};
	border-radius: 10px;
	color: white;
	font-size: 0.8rem;
	font-weight: 400;
	padding: 6px;
	margin-left: 8px;
	height: 10px;
	width: 10px;
`;

export const Td = styled(Center)`
	display: ${(props) => (props.active ? "block" : "none")};
	width: ${(props) => 100 / props.box}%;
`;

export const Cursor = styled(Center)`
	cursor: pointer;
`;

export const FilterIcon = styled(FilterList)`
	margin: ${(props) => props.theme.margin};
`;

/*TABLE*/
export const TableInline = styled(ContentInline)`
	width: 100%;
	padding: 1rem 0;
`;

export const TableHead = styled(TableInline)`
	border-bottom: 1px solid ${(props) => props.theme.colors.forms.border};
`;

export const TableRow = styled(ContentColumn)`
	width: 100%;
	margin: 1rem 0rem;
`;

export const FullWidth = styled.div`
	width: 100%;
`;

export const Body = styled.tbody`
	height: 100%;
	width: 100%;
	vertical-align: top;
`;

export const Tr = styled.tr`
	height: 100%;
`;

export const CursorPinter = styled.div`
	cursor: pointer;
`;

const shine = keyframes`
  0%{
    transform: translate3d(-100%, 0, 0);
  }
  100%{
    transform: translate3d(100%, 0, 0);
  } `;

export const Sceleton = styled.div`
	position: relative;
	overflow: hidden;
	height: 346.5px;
	background: #ccc;

	&::after {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, #ccc, #eaeaea, #ccc);
		animation: ${shine} 1s ease-in-out infinite;
	}
`;

//NEW WINDOWS

export const Wrapper = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
`;

export const ContentWrapper = styled(ContentCard)`
	flex-grow: 2;
	width: 100%;

	padding: 16px;

	box-shadow: none;
	border: 1px solid #ccc;
	border-radius: 0 0 20px 20px;
	background: ${(props) => props.theme.white};
`;

export const ButtonWrapper = styled(Center)`
	flex-grow: 2;
`;

export const ButtonCenter = styled(Center)`
	margin: 10px 0;
`;

export const Br = styled.br``;

export const RowBorder = styled.div`
	border-bottom: 1px solid ${(props) => props.theme.colors.background.menu};
`;

export const TitleSection = styled.span`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: row;
`;

export const TitleName = styled.div`
	margin: 0 2px 0 8px;
`;

export const MaterialTitleSection = styled(ContentSpaceBetween)`
	padding: 3px 0 10px 0;
`;

export const QuotationColumn = styled(ContentColumn)`
	padding-top: 4em;
	align-items: center;
	justify-content: center;
`;
