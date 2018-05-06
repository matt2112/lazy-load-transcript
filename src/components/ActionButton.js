// @flow
import * as React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  height: ${props => (props.size === 'small' ? '50px' : '70px')};
  width: ${props => (props.size === 'small' ? '20%' : '40%')};
  font-size: ${props => (props.size === 'small' ? '1em' : '1.5em')};
`;

type Props = {
  children: React.Node,
  size: string,
  onClick?: () => void
};

const ActionButton = (props: Props) => (
  <Button onClick={props.onClick} {...props}>
    {props.children}
  </Button>
);

ActionButton.defaultProps = {
  onClick: val => val
};

export default ActionButton;
