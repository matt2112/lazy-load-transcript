// @flow
import * as React from 'react';
import styled from 'styled-components';
import LazyLoad from 'react-lazy-load';
import uniqueId from 'lodash/uniqueId';
import Entities from 'html-entities';

import { FRENCH } from '../constants';

const entities = new Entities.AllHtmlEntities();

const Container = styled.div`
  flex: 1;
  border: 1px solid black;
  overflow: auto;
  padding: 20px;
`;

const Paragraph = styled(LazyLoad)`
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
`;

type Props = {
  text?: Array<string>,
  loadingData: boolean,
  translating: boolean,
  currentLanguage: string
};

const TranscriptView = (props: Props) => (
  <Container>
    {props.loadingData && (
      <Paragraph>
        <div>Loading data...</div>
      </Paragraph>
    )}
    {props.translating &&
      props.currentLanguage === FRENCH && (
        <Paragraph>
          <div>Translating...</div>
        </Paragraph>
      )}
    {props.currentLanguage === FRENCH &&
      props.text.length === 0 &&
      !props.translating && (
        <Paragraph>
          <div>Click the translate button below to translate the English text to French!</div>
        </Paragraph>
      )}
    {props.text.map(para => (
      <Paragraph key={uniqueId('paragraph')} offsetVertical={50}>
        <div>{entities.decode(para)}</div>
      </Paragraph>
    ))}
  </Container>
);

TranscriptView.defaultProps = {
  text: []
};

export default TranscriptView;
