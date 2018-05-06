// @flow
import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  flex: 1;
  border: 1px solid black;
  overflow: auto;
`;

type Props = {
  children: React.Node
};

const TranscriptView = (props: Props) => <Container>{props.children}</Container>;

export default TranscriptView;
