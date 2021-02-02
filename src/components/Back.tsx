import React from 'react';
import styled from 'styled-components';
import { PlainButton } from './Optimify/Button';

interface IOwnProps {
  history: any;
  label: string;
}

const Index = (props: IOwnProps) => {
  const { label, history } = props;

  const back = (_event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    history.goBack();
  };

  return (
    <Button type="button" level={1} onClick={back}>
      {label}
    </Button>
  );
};

export const Button = styled(PlainButton)`
  margin: 1px;
`;

export default Index;
