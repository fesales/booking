import { useReducer, Reducer, useCallback } from 'react';
import reducer, {
  clearState,
  initialState,
  requestSuccess,
  requestLoading,
  requestError,
} from './reducer';
import { Action, State } from './types';
import { getUrlWithQueryParams, RequestQueryParams } from '../../utils/url';

export type UseApiReturnType<ApiResponse> = [
  State<ApiResponse>,
  {
    clearRequest: () => void;
    makeRequest: (requestQueryParams?: RequestQueryParams) => void;
  }
];

const useApi = <ApiResponse>(endpoint: string): UseApiReturnType<ApiResponse> => {
  const [state, dispatch] = useReducer<Reducer<State<ApiResponse>, Action<ApiResponse>>>(
    reducer,
    initialState
  );

  const makeRequest = useCallback(
    async (requestQueryParams?: RequestQueryParams) => {
      dispatch(requestLoading());

      const requestEndpoint = requestQueryParams
        ? getUrlWithQueryParams(endpoint, requestQueryParams)
        : endpoint;

      try {
        const response = await fetch(requestEndpoint);
        dispatch(requestSuccess(await response.json()));
      } catch (error) {
        dispatch(requestError(error));
      }
    },
    [endpoint]
  );

  const clearRequest = useCallback(() => {
    dispatch(clearState());
  }, []);

  return [state, { clearRequest, makeRequest }];
};

export default useApi;
