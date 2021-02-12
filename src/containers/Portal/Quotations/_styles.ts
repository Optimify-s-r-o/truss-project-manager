import styled from 'styled-components';
import { Button } from '../../../components/Optimify/Button';
import { ContentCard, ContentRow } from '../../../constants/globalStyles';

export const ContentTemplate = styled.div`
	position: absolute;

	height: 100%;
	width: 100%;

	overflow: auto;
`;

export const TemplateContent = styled.div`
	display: flex;
	flex-direction: row;

	flex-grow: 1;
	font-size: 0.8em;
	> *:first-child {
		flex-grow: 1;
	}
`;

export const Main = styled.div`
	position: relative;
	flex-grow: 1;
`;

export const AddSectionButton = styled.button`
	margin: 0.25rem 0.5rem;
	padding: 0.5rem 1rem;

	background: transparent;
	border: none;
	border-radius: 3px;
	color: green;

	cursor: pointer;
	transition: all 0.2s ease-out;

	svg {
		margin: 0 0.5rem -2px 0;

		font-size: 1.25rem;
	}

	&:hover {
		background: ${(props) => props.theme.colors.background.content};
		box-shadow: ${(props) => props.theme.boxShadow};
	}
`;

export const Variables = styled.div``;

export const VariableLine = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	padding: 0.8rem 1rem;
`;

export const VariableTitle = styled.div`
	width: 10%;
	min-width: 230px;
	margin: 10px 0;
	text-align: left;
	color: ${(props) => props.theme.colors.secondaryText.default} !important;
`;

export const GlobalVariableContainer = styled.div`
	padding: 0.5rem 1rem;
`;

export const VariableTitleContainer = styled.div<{ visible: boolean }>`
	display: ${(props) => (props.visible ? "block" : "none")};
`;

export const VariableAdd = styled.button`
	padding: 5px;

	background: transparent;
	border: none;
	color: green;

	cursor: pointer;

	svg {
		margin-right: 0.5rem;
		margin-bottom: -2px;

		font-size: 1.25rem;
	}
`;

export const VariableValue = styled.div`
	flex-grow: 1;
	width: 100%;
`;

export const VariableActionIcon = styled(VariableAdd)`
	color: ${(props) => props.theme.colors.secondaryText.default};

	svg {
		margin-right: 5px;
		margin-bottom: 0;

		font-size: 1rem;
	}
`;

export const VariableTitleText = styled.span`
	margin-left: 0.5rem;
`;

export const VariableTitleEditContainer = styled.div<{ visible: boolean }>`
	display: ${(props) => (props.visible ? "flex" : "none")};

	width: 100%;
`;

export const VariableTitleInput = styled.input`
	flex-grow: 1;

	width: 100%;

	margin: -0.5rem 0.5rem -0.5rem 0;
	padding: 0.75rem 0.4rem;

	box-shadow: 0 2px 10px -2px rgba(0, 0, 0, 0.2);
	border: 0;
	border-radius: 3px;
`;

export const SButton = styled(Button)`
	padding: 10px;
	margin: 0 0 0.5rem 10px;
`;

export const VariablesBarWrapper = styled.div`
	height: 100%;

	background-color: ${(props) => props.theme.colors.background.content};
`;

export const VariablesTitle = styled.div`
	padding: 1rem 1.5rem;

	font-size: 1.2rem;
	font-weight: 600;
`;

export const VariablesDescriptionIcon = styled.span`
	margin-left: 0.5rem;

	color: ${(props) => props.theme.colors.secondaryText.default};
	font-size: 1rem;
	font-weight: 400;
`;

export const SectionWrapper = styled.div`
	padding: 10px 0 2px 0;
	border-bottom: 1px solid ${(props) => props.theme.colors.sectionsDivider};
`;

export const SectionHeader = styled.div`
	display: flex;

	padding: 0.75rem 1.5rem;

	color: ${(props) => props.theme.colors.primary.default};
	font-size: 0.9rem;
	font-weight: 600;

	cursor: pointer;

	span {
		flex-grow: 1;
	}
`;

export const CollapseArrow = styled.div<{ isOpen: boolean }>`
	${(props) => (props.isOpen ? "transform: rotate(180deg)" : "")};

	transition: transform 0.2s ease-out;
`;

export const VariablesWrapper = styled.div``;

export const VariableBox = styled.div`
	margin: 0.25rem 0rem;
	padding: 0.75rem 0;

	border-radius: 3px;
	color: ${(props) => props.theme.colors.primary.active};
	font-size: 0.9rem;
	font-weight: 400;

	cursor: grab;
	transition: all 0.2s ease-out;

	&:hover {
		box-shadow: 0 2px 10px -2px rgba(0, 0, 0, 0.2);
	}
`;

export const IconExpression = styled.div`
	position: absolute;
	right: 40px;
	top: 8px;
`;

export const IconPrice = styled.div`
	position: absolute;
	right: 10px;
	top: 8px;
`;

export const Icon = styled.div`
	width: 35px;
	position: absolute;
	right: 10px;
	top: 8px;
`;

export const RelativeRow = styled(ContentRow)`
	position: relative;
	width: 100%;
`;

export const Row = styled(ContentRow)``;

export const SContentCard = styled(ContentCard)`
	position: relative;
	width: 100%;
`;

export const PageTitle = styled.h1`
	display: flex;
	justify-content: flex-start;
	flex-direction: row;
	align-items: center;
	margin: 0;
	padding: 12px 24px;
	color: ${(props) => props.theme.colors.secondaryText.white};
	font-size: 1.5rem;
	font-weight: 500;

	> svg {
		margin-right: 16px;
	}
`;
