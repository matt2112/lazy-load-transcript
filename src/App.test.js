import React from 'react';
import { shallow } from 'enzyme';

import App from './App';

import { NEXT, ENGLISH, FRENCH } from './constants';

// Full mount would be better but still need to figure out best way to
// mock axios call on mount.
it('should render without exploding', () => {
  const wrapper = shallow(<App />);
  expect(wrapper).toMatchSnapshot();
});

it('should retrieve data on initial render', () => {
  const wrapper = shallow(<App />);
  const spy = jest.spyOn(wrapper.instance(), 'retrieveData');
  wrapper.instance().componentDidMount();
  expect(spy).toHaveBeenCalledTimes(1);
});

it('should change page in state when changePage method is called', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.state().currentPage).toBe(0);
  wrapper.instance().changePage(NEXT);
  expect(wrapper.state().currentPage).toBe(0);
  wrapper.setState({
    pages: {
      english: [['one two three'], ['one two three']],
      french: []
    }
  });
  wrapper.instance().changePage(NEXT);
  expect(wrapper.state().currentPage).toBe(1);
});

it('should switch view when the language is switched from English to French and back', () => {
  const wrapper = shallow(<App />);
  wrapper.setState({
    pages: {
      english: [['one two three'], ['one two three']],
      french: [['un deux trois'], ['un deux trois']]
    }
  });
  expect(wrapper.state().currentLanguage).toBe(ENGLISH);
  expect(wrapper).toMatchSnapshot();
  wrapper.instance().changeLanguage(FRENCH);
  expect(wrapper.state().currentLanguage).toBe(FRENCH);
  expect(wrapper).toMatchSnapshot();
});
