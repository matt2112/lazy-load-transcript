// @flow
import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import ActionButton from './components/ActionButton';
import TranscriptView from './components/TranscriptView';

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  padding-bottom: 50px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 70%;
`;

const Header = styled.h1`
  text-align: center;
  font-size: 2em;
`;

const TabButtonWrapper = styled.div`
  display: flex;
`;

const ActionButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 30px;
`;

type Props = {};

type State = {
  words: Array<{
    name: string,
    para: string
  }>
};

class App extends Component<Props, State> {
  state = {
    words: []
  };

  componentDidMount() {
    this.retrieveData();
  }

  retrieveData = () => {
    axios
      .get('https://vnsp2998o9.execute-api.eu-west-2.amazonaws.com/dev/')
      .then((res) => {
        this.setState({
          words: res.data.transcript.words
        });
      })
      .catch(err => console.log('ERROR:', err));
  };

  render() {
    return (
      <Wrapper>
        <Container>
          <Header>Lazy Load Transcript</Header>
          <TabButtonWrapper>
            <ActionButton size="small">English</ActionButton>
            <ActionButton size="small">French</ActionButton>
          </TabButtonWrapper>
          <TranscriptView />
          <ActionButtonWrapper>
            <ActionButton size="large">Next Page</ActionButton>
            <ActionButton size="large">Translate</ActionButton>
          </ActionButtonWrapper>
        </Container>
      </Wrapper>
    );
  }
}

export default App;
