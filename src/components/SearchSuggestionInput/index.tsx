import React, { useCallback } from 'react';
import './index.css';
import { PickUpLocation } from '../../types/search';
import SuggestionsList from '../SuggestionsList';

interface Props {
  label: string;
  placeholder: string;
  onSearchTermChanged: (searchTerm: string) => void;
  searchResults: PickUpLocation[] | null;
}

const SearchSuggestionsInput: React.FunctionComponent<Props> = ({
  label,
  onSearchTermChanged,
  placeholder,
  searchResults,
}: Props) => {
  const onInputChanged = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => onSearchTermChanged(event.target.value),
    []
  );

  return (
    <div>
      <label className="search-input-label" htmlFor="search-input">
        {label}
      </label>
      <input
        className="search-input"
        name="search-input"
        type="text"
        onChange={onInputChanged}
        placeholder={placeholder}
      />
      {searchResults && <SuggestionsList suggestions={searchResults} />}
    </div>
  );
};

export default SearchSuggestionsInput;
