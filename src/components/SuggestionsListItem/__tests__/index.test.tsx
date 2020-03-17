import React from 'react';
import { shallow } from 'enzyme';
import SuggestionsListItem from '..';
import { PlaceType, PickUpLocation } from '../../../types/search';

describe('SuggestionsListItem', () => {
  const defaultProps: PickUpLocation = {
    city: 'Manchester',
    country: 'United Kingdom',
    name: 'pick up location',
    placeType: PlaceType.AIRPORT,
    region: '',
  };

  it('should render component', () => {
    const wrapper = shallow(<SuggestionsListItem {...defaultProps} />);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.suggestions-list-item-name').text()).toEqual(defaultProps.name);
    expect(wrapper.find('.suggestion-list-item-place--A').text()).toEqual('Airport');
    expect(wrapper.find('.suggestions-list-item-info').text()).toEqual(
      'Manchester, United Kingdom'
    );
  });

  describe('location class name', () => {
    it('should add airport class', () => {
      const wrapper = shallow(<SuggestionsListItem {...defaultProps} />);

      expect(wrapper.find('.suggestion-list-item-place--A').text()).toEqual('Airport');
    });

    it('should add city class', () => {
      const props = {
        ...defaultProps,
        placeType: PlaceType.CITY,
      };

      const wrapper = shallow(<SuggestionsListItem {...props} />);

      expect(wrapper.find('.suggestion-list-item-place--C').text()).toEqual('City');
    });

    it('should add station class', () => {
      const props = {
        ...defaultProps,
        placeType: PlaceType.STATION,
      };

      const wrapper = shallow(<SuggestionsListItem {...props} />);

      expect(wrapper.find('.suggestion-list-item-place--T').text()).toEqual('Station');
    });
  });
});
