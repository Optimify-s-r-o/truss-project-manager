import styled from 'styled-components';

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;

  > :first-child {
    flex-grow: 1;
  }
`;
