// @flow
import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import uniqueId from 'lodash/uniqueId';

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

const Paragraph = styled.div`
  margin-bottom: 20px;
`;

type Props = {};

type State = {
  words: Array<{
    name: string,
    para: string
  }>,
  pages: Array<Array<typeof Paragraph>>,
  currentPage: number
};

class App extends Component<Props, State> {
  state = {
    words: [],
    pages: [],
    currentPage: 0
  };

  componentDidMount() {
    this.retrieveData();
  }

  retrieveData = () => {
    axios
      .get('https://vnsp2998o9.execute-api.eu-west-2.amazonaws.com/dev/')
      .then((res) => {
        this.setState(
          {
            words: res.data.transcript.words
          },
          () => this.parseData()
        );
      })
      .catch(err => console.log('ERROR:', err));
  };

  parseData = () => {
    const pages = [];
    let currentPageNum = 0;
    let currentPage = [];
    this.state.words.forEach((word) => {
      const pageNum = parseInt(word.para.match(/\d+(?=-)/)[0], 10);
      if (pageNum !== currentPageNum) {
        if (currentPage.length > 0) {
          pages.push(currentPage);
        }
        currentPage = [word];
        currentPageNum = pageNum;
      } else {
        currentPage.push(word);
      }
    });
    pages.push(currentPage);
    const paragraphedPages = pages.map((page) => {
      const paras = [];
      let currentParaNum = 0;
      let currentPara = [];
      page.forEach((word) => {
        const paraNum = parseInt(word.para.split('-')[1], 10);
        if (paraNum !== currentParaNum) {
          if (currentPara.length > 0) {
            paras.push(<Paragraph key={uniqueId()}>{currentPara.join(' ')}</Paragraph>);
          }
          currentPara = [word.name];
          currentParaNum = paraNum;
        } else {
          currentPara.push(word.name);
        }
      });
      paras.push(<Paragraph key={uniqueId()}>{currentPara.join(' ')}</Paragraph>);
      return paras;
    });
    this.setState({
      pages: paragraphedPages
    });
  };

  nextPage = () => {
    this.setState((prevState) => {
      if (prevState.currentPage < prevState.pages.length - 1) {
        return {
          currentPage: prevState.currentPage + 1
        };
      }
      return {};
    });
  };

  render() {
    const { pages, currentPage } = this.state;
    return (
      <Wrapper>
        <Container>
          <Header>Lazy Load Transcript</Header>
          <TabButtonWrapper>
            <ActionButton size="small">English</ActionButton>
            <ActionButton size="small">French</ActionButton>
          </TabButtonWrapper>
          <TranscriptView>{pages[currentPage]}</TranscriptView>
          <ActionButtonWrapper>
            <ActionButton size="large" onClick={this.nextPage}>
              Next Page
            </ActionButton>
            <ActionButton size="large">Translate</ActionButton>
          </ActionButtonWrapper>
        </Container>
      </Wrapper>
    );
  }
}

export default App;
