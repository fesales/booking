import React, { useMemo } from 'react';
import './index.css';
import debounce from 'lodash.debounce';
import SearchSuggestionsInput from '../../components/SearchSuggestionInput';
import useApi from '../../hooks/useApi';
import config from '../../config/dev';
import { SearchApiResponse, PickUpLocation } from '../../types/search';
import { FetchStatus } from '../../hooks/useApi/types';

export const SEARCH_INPUT_PLACEHOLDER = 'city, airport, station, region and district...';
export const MAX_RESULTS = 6;

const SearchWidget = () => {
  const [{ response, status }, makeRequest] = useApi<SearchApiResponse>(config.endpoints.search);

  const onSearchInputChanged = (searchTerm: string) => {
    if (searchTerm.length > 1) {
      makeRequest({
        number_of_results_required: MAX_RESULTS,
        search_term: searchTerm,
      });
    }
  };

  const debouncedSearchInputChanged = useMemo(() => debounce(onSearchInputChanged, 500), []);

  const searchResults: PickUpLocation[] | null = useMemo(() => {
    return status === FetchStatus.SUCCESS && response
      ? (response as SearchApiResponse).results.docs
      : null;
  }, [response, status]);

  return (
    <section className="search-widget">
      <h3 className="search-widget-title">Where are you going?</h3>
      <SearchSuggestionsInput
        label="Pick up location"
        onSearchTermChanged={debouncedSearchInputChanged}
        placeholder={SEARCH_INPUT_PLACEHOLDER}
        searchResults={searchResults}
      />
    </section>
  );
};

export default SearchWidget;
