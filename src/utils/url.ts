export interface RequestQueryParams {
  [k: string]: string | number;
}

export const getUrlWithQueryParams = (endpoint: string, queryParams: RequestQueryParams) => {
  return Object.keys(queryParams).reduce(
    (acc: string, paramKey: string) =>
      acc.replace(`{${paramKey}}`, queryParams[paramKey].toString()),
    endpoint
  );
};
