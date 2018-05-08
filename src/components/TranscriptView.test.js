import React from 'react';
import { shallow } from 'enzyme';
import { toMatchDiffSnapshot } from 'snapshot-diff';

import ActionButton from './ActionButton';

expect.extend({ toMatchDiffSnapshot });

it('should render without exploding', () => {
  const wrapper = shallow(<ActionButton />);
  expect(wrapper).toMatchSnapshot();
});

it('should render some text when words stored in state and passed in as props', () => {
  const wrapperOne = shallow(<ActionButton />);
  const wrapperTwo = shallow(<ActionButton text={['one two three', 'four five six']} />);
  expect(wrapperOne).toMatchDiffSnapshot(wrapperTwo);
});
