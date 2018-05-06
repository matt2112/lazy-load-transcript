import React from 'react';
import { mount, shallow } from 'enzyme';

import App from './App';

it('should mount without exploding', () => {
  const wrapper = mount(<App />);
  expect(wrapper).toMatchSnapshot();
});

it('should retrieve data on initial render', () => {
  const wrapper = shallow(<App />);
  const spy = jest.spyOn(wrapper.instance(), 'retrieveData');
  wrapper.instance().componentDidMount();
  expect(spy).toHaveBeenCalledTimes(1);
});

it('should change page in state when changePage method is called', () => {});

it('should make a call to the Google API when translate button is clicked', () => {});

it('should only show translate button when translated text is stored in state', () => {});

it('should switch view when the language is switched from English to French and back', () => {});
