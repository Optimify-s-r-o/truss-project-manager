import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => props.theme.colors.primary.default};
  border-style: dashed;
  background: ${props => props.theme.colors.background.menu};
  color: ${props => props.theme.colors.primary.default};
  outline: none;
  transition: border 0.24s ease-in-out;
`;

export const Li = styled.li`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
  padding: 0px 15px;
  background-color: ${props => props.theme.colors.background.content};
  box-shadow: ${props => props.theme.boxShadowHalf};

  &:hover {
    box-shadow: ${props => props.theme.boxShadow};
  }
`;

export const Section = styled.section`
  margin: 0;
  width: 100%;
`;

export const FileDetails = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;

  padding: ${props => props.theme.padding} 0;
`;

export const FileData = styled.div`
  flex-grow: 1;

  min-width: 0;

  padding-left: ${props => props.theme.padding};
`;

export const FileName = styled.div`
  font-size: 0.85rem;
  color: ${props => props.theme.colors.secondaryText.default};
`;

export const FileInfo = styled.div`
  font-size: 0.7rem;
  color: ${props => props.theme.colors.secondaryText.default};
  padding-top: ${props => props.theme.padding};
`;

export const FileList = styled.ul`
  margin-top: 16px;

  > li + li {
    margin-top: 8px;
  }
`;
