import * as React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface IOwnProps {
  icon: any;
  size?: number;
}

const Index = (props: IOwnProps) => {
  const { icon } = props;
  return (
    <div>
      <Icon icon={icon as IconProp} size={props.size ? props.size : 12} />
    </div>
  );
};

export const Icon = styled(FontAwesomeIcon)`
  color: ${(props) => props.theme.colors.primary.default} !important;
  font-size: ${(props) => props.size}px;
`;

export default Index;
