import React from 'react';
import { shallow } from 'enzyme';
import SuggestionsList from '..';
import { PlaceType } from '../../../types/search';

describe('SuggestionsList', () => {
  it('should render component', () => {
    const props = {
      suggestions: [
        {
          city: 'Manchester',
          country: 'UK',
          name: 'pick up location',
          region: 'region',
          placeType: PlaceType.AIRPORT,
        },
      ],
    };

    const wrapper = shallow(<SuggestionsList {...props} />);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('SuggestionsListItem')).toHaveLength(1);
  });
});
