import React from 'react';
import styled from 'styled-components';

interface Box {
  children: React.ReactNode;
  title: string;
}

export const Box = ({ children, title }: Box) => {
  return (
    <Wrapper>
      <Header>{title}</Header>
      <Body>{children}</Body>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  box-sizing: border-box;

  height: 100%;

  margin-top: 16px;

  background-color: ${(props) => props.theme.colors.background.content};
  border-radius: 8px;
  box-shadow: ${(props) => props.theme.boxShadow};
  color: ${(props) => props.theme.colors.contentText};
`;

const Header = styled.div`
  background-color: ${(props) => props.theme.colors.primary.default};
  border-radius: 8px 8px 0 0;
  padding: 8px 16px;
  color: #fff;
`;

const Body = styled.div`
  padding: 8px 16px;
`;
