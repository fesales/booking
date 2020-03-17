import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

describe('App', () => {
  it('should render component', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.find('SearchWidget')).toHaveLength(1);
  });
});
