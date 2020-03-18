import React, { useCallback, useState, useMemo } from 'react';
import './index.css';
import { PickUpLocation } from '../../types/search';
import SuggestionsList from '../SuggestionsList';
import Spinner from '../Spinner';

interface Props {
  isLoading?: boolean;
  label: string;
  placeholder: string;
  onSearchTermChanged: (searchTerm: string) => void;
  searchResults: PickUpLocation[] | null;
}

const SearchSuggestionsInput: React.FunctionComponent<Props> = ({
  isLoading,
  label,
  onSearchTermChanged,
  placeholder,
  searchResults,
}: Props) => {
  const [isInputFocused, setInputFocused] = useState(false);

  const onInputChanged = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => onSearchTermChanged(event.target.value),
    []
  );

  const onBlur = useCallback(() => setInputFocused(false), []);
  const onFocus = useCallback(() => setInputFocused(true), []);

  const showSuggestionsList = useMemo(
    () => isInputFocused && searchResults && searchResults.length > 0,
    [isInputFocused, searchResults]
  );

  return (
    <div>
      <label className="search-input-label" htmlFor="search-input">
        {label}
      </label>
      <div className="search-input-wrapper">
        {isLoading && <Spinner />}
        <input
          className="search-input"
          name="search-input"
          type="text"
          onBlur={onBlur}
          onChange={onInputChanged}
          onFocus={onFocus}
          placeholder={placeholder}
        />
      </div>
      {showSuggestionsList && <SuggestionsList suggestions={searchResults!} />}
    </div>
  );
};

export default SearchSuggestionsInput;
