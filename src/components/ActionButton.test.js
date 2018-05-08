import React from 'react';
import { shallow } from 'enzyme';

import ActionButton from './ActionButton';

it('should render without exploding', () => {
  const wrapper = shallow(<ActionButton />);
  expect(wrapper).toMatchSnapshot();
});

it('should send event to onClick prop when clicked', () => {
  const mockFunc = jest.fn();
  const wrapper = shallow(<ActionButton onClick={mockFunc} />);
  expect(mockFunc).toHaveBeenCalledTimes(0);
  wrapper.simulate('click');
  expect(mockFunc).toHaveBeenCalledTimes(1);
});
