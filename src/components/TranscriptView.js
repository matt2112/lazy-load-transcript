// @flow
import * as React from 'react';
import styled from 'styled-components';
import LazyLoad from 'react-lazy-load';
import uniqueId from 'lodash/uniqueId';

const Container = styled.div`
  flex: 1;
  border: 1px solid black;
  overflow: auto;
  padding: 20px;
`;

const Paragraph = styled(LazyLoad)`
  margin-bottom: 20px;
`;

type Props = {
  text?: Array<string>
};

const TranscriptView = (props: Props) => (
  <Container>
    {props.text.map(para => (
      <Paragraph key={uniqueId('paragraph')} offsetVertical={50}>
        <div>{para}</div>
      </Paragraph>
    ))}
  </Container>
);

TranscriptView.defaultProps = {
  text: []
};

export default TranscriptView;
