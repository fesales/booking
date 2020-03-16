import React from 'react';
import { shallow } from 'enzyme';
import SearchSuggestionsInput from '..';

describe('SearchSuggestionsInput', () => {
  const defaultProps = {
    label: 'input label',
    placeholder: 'placeholder',
    onSearchTermChanged: () => {},
  };

  it('should render component', () => {
    const wrapper = shallow(<SearchSuggestionsInput {...defaultProps} />);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('form')).toHaveLength(1);
    expect(wrapper.find('input')).toHaveLength(1);
    expect(wrapper.find('input').prop('placeholder')).toEqual(defaultProps.placeholder);
    expect(wrapper.find('label')).toHaveLength(1);
    expect(wrapper.find('label').text()).toEqual(defaultProps.label);
  });

  it('should trigger search term changed with input value', () => {
    const props = {
      ...defaultProps,
      onSearchTermChanged: jest.fn(),
    };
    const mockedEvent = {
      target: {
        value: 'search term',
      },
    };

    const wrapper = shallow(<SearchSuggestionsInput {...props} />);

    wrapper.find('input').simulate('change', mockedEvent);

    expect(props.onSearchTermChanged).toHaveBeenCalledTimes(1);
    expect(props.onSearchTermChanged).toHaveBeenCalledWith(mockedEvent.target.value);
  });
});
