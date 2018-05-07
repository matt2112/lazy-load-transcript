// @flow
import * as React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  height: ${props => (props.size === 'small' ? '40px' : '60px')};
  width: ${props => (props.size === 'small' ? '40%' : '100%')};
  margin-bottom: ${props => (props.size === 'small' ? 0 : '10px')};
  font-size: ${props => (props.size === 'small' ? '1em' : '1.5em')};
  color: ${props => (props.active ? 'white' : 'black')};
  background-color: ${props => (props.active ? '#333' : '#eee')};
  cursor: pointer;
  @media (min-width: 720px) {
    height: ${props => (props.size === 'small' ? '50px' : '70px')};
    width: ${props => (props.size === 'small' ? '20%' : '30%')};
    margin-bottom: 0;
  }
`;

type Props = {
  children: React.Node,
  size: string,
  onClick?: () => void,
  active: boolean
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
