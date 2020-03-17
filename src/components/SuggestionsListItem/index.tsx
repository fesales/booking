import React, { useMemo } from 'react';
import classnames from 'classnames';
import './index.css';
import { PickUpLocation, PlaceType } from '../../types/search';
import PLACE_TYPES_NAMES from '../../constants/place-type';

const SuggestionsListItem = ({ city, country, name, placeType }: PickUpLocation) => {
  const locationInfo = useMemo(() => {
    return city ? `${city || ''}${country ? `, ${country}` : ''}` : country;
  }, [city, country]);

  const placeTypeClass = classnames({
    'suggestion-list-item-place': true,
    'suggestion-list-item-place--A': placeType === PlaceType.AIRPORT,
    'suggestion-list-item-place--C': placeType === PlaceType.CITY,
    'suggestion-list-item-place--T': placeType === PlaceType.STATION,
  });

  return (
    <li className="suggestions-list-item">
      <div className="suggestions-list-item-place-wrapper">
        <span className={placeTypeClass}>{PLACE_TYPES_NAMES[placeType]}</span>
      </div>
      <div>
        <span className="suggestions-list-item-name">{name}</span>
        <span className="suggestions-list-item-info">{locationInfo}</span>
      </div>
    </li>
  );
};

export default SuggestionsListItem;
