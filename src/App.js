// @flow
import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import cloneDeep from 'lodash/cloneDeep';

import ActionButton from './components/ActionButton';
import TranscriptView from './components/TranscriptView';

import { ENGLISH, FRENCH, NEXT, PREVIOUS } from './constants';

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  @media (min-width: 720px) {
    padding-bottom: 50px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 90%;
  @media (min-width: 720px) {
    width: 70%;
    max-width: 1200px;
  }
`;

const Header = styled.h1`
  text-align: center;
  font-size: 2em;
`;

const TopBarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TabButtonWrapper = styled.div`
  display: flex;
  flex-grow: 1;
`;

const PageNumber = styled.h3`
  margin: 0;
`;

const ActionButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 30px;
  @media (min-width: 720px) {
    flex-direction: row;
  }
`;

type Props = {};

type State = {
  words: Array<{
    name: string,
    para: string
  }>,
  pages: {
    english: Array<Array<string>>,
    french: Array<Array<string>>
  },
  currentPage: number,
  currentLanguage: string,
  loadingData: boolean,
  translating: boolean
};

class App extends Component<Props, State> {
  state = {
    words: [],
    pages: {
      english: [],
      french: []
    },
    currentPage: 0,
    currentLanguage: ENGLISH,
    loadingData: false,
    translating: false
  };

  componentDidMount() {
    this.retrieveData();
  }

  retrieveData = () => {
    this.setState({
      loadingData: true
    });
    axios
      .get('https://vnsp2998o9.execute-api.eu-west-2.amazonaws.com/dev/transcript')
      .then((res) => {
        this.setState(
          {
            loadingData: false,
            words: res.data.transcript.words
          },
          () => this.parseData()
        );
      })
      .catch((err) => {
        console.log('ERROR:', err);
        this.setState({
          loadingData: false
        });
      });
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
            paras.push(currentPara.join(' '));
          }
          currentPara = [word.name];
          currentParaNum = paraNum;
        } else {
          currentPara.push(word.name);
        }
      });
      paras.push(currentPara.join(' '));
      return paras;
    });
    this.setState({
      pages: {
        english: paragraphedPages,
        french: []
      }
    });
  };

  changePage = (type) => {
    this.setState((prevState) => {
      if (type === NEXT && prevState.currentPage < prevState.pages.english.length - 1) {
        return {
          currentPage: prevState.currentPage + 1
        };
      } else if (type === PREVIOUS && prevState.currentPage > 0) {
        return {
          currentPage: prevState.currentPage - 1
        };
      }
      return {};
    });
  };

  translate = () => {
    const currentPage = this.state.pages.english[this.state.currentPage];
    // Unlikely edge case where currentPage is undefined.
    if (currentPage) {
      this.setState({
        translating: true,
        currentLanguage: FRENCH
      });
      currentPage.forEach((para, idx) => {
        axios
          .post('https://vnsp2998o9.execute-api.eu-west-2.amazonaws.com/dev/translate', {
            text: para
          })
          .then((res) => {
            this.setState((prevState) => {
              const pages = cloneDeep(prevState.pages);
              pages.french[this.state.currentPage] = pages.french[this.state.currentPage] || [];
              pages.french[this.state.currentPage][idx] = res.data;
              return {
                pages,
                // Technically other paragraphs could still be being translated, but message is only
                // there to explain why transcript view could be empty while viewing French tab so
                // don't need to wait for all paragraphs to be finished.
                translating: false
              };
            });
          })
          .catch((err) => {
            console.log('ERR!', err);
            this.setState({
              translating: false
            });
          });
      });
    }
  };

  changeLanguage = (lang) => {
    this.setState({
      currentLanguage: lang
    });
  };

  render() {
    const {
      pages, currentLanguage, currentPage, loadingData, translating
    } = this.state;
    return (
      <Wrapper>
        <Container>
          <Header>Lazy Load Transcript</Header>
          <TopBarWrapper>
            <TabButtonWrapper>
              <ActionButton
                size="small"
                onClick={() => this.changeLanguage(ENGLISH)}
                active={currentLanguage === ENGLISH}
              >
                English
              </ActionButton>
              <ActionButton
                size="small"
                onClick={() => this.changeLanguage(FRENCH)}
                active={currentLanguage === FRENCH}
              >
                French
              </ActionButton>
            </TabButtonWrapper>
            <PageNumber>Page {currentPage + 1}</PageNumber>
          </TopBarWrapper>
          <TranscriptView
            text={pages[currentLanguage][currentPage]}
            loadingData={loadingData}
            translating={translating}
            currentLanguage={currentLanguage}
          />
          <ActionButtonWrapper>
            <ActionButton size="large" onClick={() => this.changePage(PREVIOUS)}>
              Previous Page
            </ActionButton>
            <ActionButton size="large" onClick={() => this.changePage(NEXT)}>
              Next Page
            </ActionButton>
            <ActionButton size="large" onClick={this.translate}>
              Translate
            </ActionButton>
          </ActionButtonWrapper>
        </Container>
      </Wrapper>
    );
  }
}

export default App;
