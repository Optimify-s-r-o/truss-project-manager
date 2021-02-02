import styled from 'styled-components';
import { Button } from '../../../components/Optimify/Button';
import { ContentRow } from '../../../constants/globalStyles';

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
    background: white;
    box-shadow: ${(props) => props.theme.boxShadow};
    color: ${(props) => props.theme.colors.primary.hover};
  }
`;

export const Variables = styled.div``;

export const VariableLine = styled.div`
  display: flex;
  flex-direction: row;

  padding: 0.5rem 1rem;
`;

export const VariableTitle = styled.div`
  width: 19%;
  min-width: 300px;

  margin: 0 0 0.5rem;
  padding: 0.5rem 1.5rem;

  text-align: right;
`;

export const GlobalVariableContainer = styled.div`
  padding: 0.5rem 1rem;
`;

export const VariableTitleContainer = styled.div<{ visible: boolean }>`
  display: ${(props) => (props.visible ? 'block' : 'none')};
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

  &:hover {
    color: ${(props) =>
      !props.disabled
        ? props.theme.colors.primary.hover
        : props.theme.colors.secondaryText.default};
  }
`;

export const VariableValue = styled.div`
  flex-grow: 1;
`;

export const VariableActionIcon = styled(VariableAdd)`
  margin: 0 0.25rem;

  color: ${(props) => props.theme.colors.secondaryText.default};

  svg {
    margin-right: 0;
    margin-bottom: 0;

    font-size: 1rem;
  }
`;

export const VariableTitleText = styled.span`
  margin-left: 0.5rem;
`;

export const VariableTitleEditContainer = styled.div<{ visible: boolean }>`
  display: ${(props) => (props.visible ? 'flex' : 'none')};

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

export const Row = styled(ContentRow)`
  width: 100%;
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
  ${(props) => (props.isOpen ? 'transform: rotate(180deg)' : '')};

  transition: transform 0.2s ease-out;
`;

export const VariablesWrapper = styled.div``;

export const VariableBox = styled.div`
  margin: 0.25rem 1.5rem;
  padding: 0.75rem 1.5rem;

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

export const Icon = styled.div`
  position: absolute;
  right: 10px;
  top: 8px;
`;

export const RelativeRow = styled(ContentRow)`
  position: relative;
  width: 100%;
`;
