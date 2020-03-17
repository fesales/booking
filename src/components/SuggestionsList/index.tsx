import React from 'react';
import './index.css';
import { PickUpLocation } from '../../types/search';
import SuggestionsListItem from '../SuggestionsListItem';

interface Props {
  suggestions: PickUpLocation[];
}

const SuggestionsList: React.FunctionComponent<Props> = ({ suggestions }: Props) => {
  return (
    <ul className="suggestions-list">
      {suggestions.map(suggestion => (
        <SuggestionsListItem key={suggestion.name} {...suggestion} />
      ))}
    </ul>
  );
};

export default SuggestionsList;
