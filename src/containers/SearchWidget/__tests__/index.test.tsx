import React from 'react';
import { shallow } from 'enzyme';
import SearchWidget, { SEARCH_INPUT_PLACEHOLDER, MAX_RESULTS } from '..';
import useApi from '../../../hooks/useApi';
import { FetchStatus } from '../../../hooks/useApi/types';

jest.mock('../../../hooks/useApi', () => jest.fn(() => [{}]));
jest.mock('lodash.debounce', () => (func: () => void) => func);

describe('Search widget', () => {
  it('should render component', () => {
    const wrapper = shallow(<SearchWidget />);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('SearchSuggestionsInput')).toHaveLength(1);
    expect(wrapper.find('SearchSuggestionsInput').prop('placeholder')).toEqual(
      SEARCH_INPUT_PLACEHOLDER
    );
  });

  describe('search results', () => {
    const mockedState = {
      response: {
        results: {
          docs: [{ city: '' }],
        },
      },
      status: FetchStatus.SUCCESS,
    };

    it('should pass search results when it is not a success status', () => {
      (useApi as jest.Mock).mockReturnValueOnce([mockedState]);

      const wrapper = shallow(<SearchWidget />);

      expect(wrapper.find('SearchSuggestionsInput').prop('searchResults')).toEqual(
        mockedState.response.results.docs
      );
    });

    it('should pass null to search results when it is not a success status', () => {
      const state = {
        ...mockedState,
        status: FetchStatus.ERROR,
      };

      (useApi as jest.Mock).mockReturnValueOnce([state]);

      const wrapper = shallow(<SearchWidget />);

      expect(wrapper.find('SearchSuggestionsInput').prop('searchResults')).toBeNull();
    });
  });

  describe('search input changed', () => {
    it('should make new request when search term length is greater than 2', () => {
      const makeRequest = jest.fn();
      const searchTerm = 'test';

      (useApi as jest.Mock).mockReturnValueOnce([{}, makeRequest]);

      const wrapper = shallow(<SearchWidget />);

      wrapper.find('SearchSuggestionsInput').simulate('searchTermChanged', searchTerm);

      expect(makeRequest).toHaveBeenCalledTimes(1);
      expect(makeRequest).toHaveBeenCalledWith({
        number_of_results_required: MAX_RESULTS,
        search_term: searchTerm,
      });
    });

    it('should not make new request when search term length is less than 2', () => {
      const makeRequest = jest.fn();
      const searchTerm = 't';

      (useApi as jest.Mock).mockReturnValueOnce([{}, makeRequest]);

      const wrapper = shallow(<SearchWidget />);

      wrapper.find('SearchSuggestionsInput').simulate('searchTermChanged', searchTerm);

      expect(makeRequest).toHaveBeenCalledTimes(0);
    });
  });
});
