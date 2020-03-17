export enum PlaceType {
  AIRPORT = 'A',
  CITY = 'C',
  STATION = 'T',
}

export interface PickUpLocation {
  city: string;
  country: string;
  name: string;
  region: string;
  placeType: PlaceType;
}

export interface SearchApiResponse {
  results: {
    isGooglePowered: boolean;
    docs: PickUpLocation[];
    numFound: number;
  };
}
