// @flow
import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

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
    axios
      .get('https://vnsp2998o9.execute-api.eu-west-2.amazonaws.com/dev/')
      .then((res) => {
        this.setState({
          words: res.data.transcript.words
        });
      })
      .catch(err => console.log('ERROR:', err));
  }

  render() {
    return (
      <div className="App">
        <h1>Lazy Load Transcript</h1>
      </div>
    );
  }
}

export default App;
