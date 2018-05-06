import React from 'react';
import { shallow } from 'enzyme';

import TabButton from './TabButton';

it('should render without exploding', () => {
  const wrapper = shallow(<TabButton />);
  expect(wrapper).toMatchSnapshot();
});

it('should send event to onClick prop when clicked', () => {});
