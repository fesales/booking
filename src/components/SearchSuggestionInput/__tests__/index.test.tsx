import React from 'react';
import { shallow } from 'enzyme';
import SearchSuggestionsInput from '..';
import { PlaceType } from '../../../types/search';

describe('SearchSuggestionsInput', () => {
  const defaultProps = {
    label: 'input label',
    placeholder: 'placeholder',
    onSearchTermChanged: () => {},
    searchResults: [
      {
        city: 'Manchester',
        country: 'UK',
        name: 'pick up location',
        region: 'region',
        placeType: PlaceType.AIRPORT,
      },
    ],
  };

  it('should render component', () => {
    const wrapper = shallow(<SearchSuggestionsInput {...defaultProps} />);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('div')).toHaveLength(2);
    expect(wrapper.find('input')).toHaveLength(1);
    expect(wrapper.find('input').prop('placeholder')).toEqual(defaultProps.placeholder);
    expect(wrapper.find('label')).toHaveLength(1);
    expect(wrapper.find('label').text()).toEqual(defaultProps.label);
    expect(wrapper.find('SuggestionsList')).toHaveLength(1);
    expect(wrapper.find('SuggestionsList').prop('suggestions')).toEqual(defaultProps.searchResults);
  });

  it('should render loading spinner if loading flag is true', () => {
    const props = {
      ...defaultProps,
      isLoading: true,
    };

    const wrapper = shallow(<SearchSuggestionsInput {...props} />);

    expect(wrapper.find('Spinner')).toHaveLength(1);
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
