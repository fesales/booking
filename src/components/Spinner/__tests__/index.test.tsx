import React from 'react';
import { shallow } from 'enzyme';
import Spinner from '..';

describe('Spinner', () => {
  it('should render component', () => {
    const wrapper = shallow(<Spinner />);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.spinner')).toHaveLength(1);
  });
});
