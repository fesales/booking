import React, { useCallback } from 'react';
import './index.css';

interface Props {
  label: string;
  placeholder: string;
  onSearchTermChanged: (searchTerm: string) => void;
}

const SearchSuggestionsInput: React.FunctionComponent<Props> = ({
  label,
  onSearchTermChanged,
  placeholder,
}: Props) => {
  const onInputChanged = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => onSearchTermChanged(event.target.value),
    []
  );

  return (
    <form>
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
    </form>
  );
};

export default SearchSuggestionsInput;
