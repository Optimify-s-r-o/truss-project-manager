import styled from 'styled-components';

export const IconTableCell = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  > svg {
    margin: 0 8px 0 0;
    color: ${props => props.theme.colors.primary.default};
  }

  > *:not(:first-child) {
    flex-grow: 1;
  }
`;
