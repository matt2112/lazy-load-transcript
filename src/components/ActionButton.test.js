import React from 'react';
import { shallow } from 'enzyme';

import ActionButton from './ActionButton';

it('should render without exploding', () => {
  const wrapper = shallow(<ActionButton />);
  expect(wrapper).toMatchSnapshot();
});

it('should send event to onClick prop when clicked', () => {});
