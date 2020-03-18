import { renderHook, act } from '@testing-library/react-hooks';
import useApi from '..';
import { initialState } from '../reducer';
import { FetchStatus } from '../types';

describe('useApi', () => {
  const endpoint = 'some-endpoint/queryParam1={queryParam1}&queryParam2={queryParam2}';
  const mockedResponse = [{ item: '' }];

  jest.spyOn(window, 'fetch').mockReturnValue(
    Promise.resolve({
      json: () => Promise.resolve(mockedResponse),
    }) as any
  );

  beforeEach(() => jest.clearAllMocks());

  it('should return initial state and make request function', () => {
    const { result } = renderHook(() => useApi(endpoint));

    expect(result.current).toEqual([
      initialState,
      { clearRequest: expect.any(Function), makeRequest: expect.any(Function) },
    ]);
  });

  describe('make request', () => {
    it('should make request to correct endpoint with query params', async () => {
      const queryParams = {
        queryParam1: 'one',
        queryParam2: 'two',
      };

      const { result } = renderHook(() => useApi(endpoint));
      const [_, { makeRequest }] = result.current;

      await act(async () => {
        makeRequest(queryParams);
      });

      const [state] = result.current;

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith('some-endpoint/queryParam1=one&queryParam2=two');
      expect(state).toEqual({
        response: mockedResponse,
        status: FetchStatus.SUCCESS,
      });
    });

    it('should make request with initial endpoint when there are no query params', async () => {
      const { result } = renderHook(() => useApi('some-endpoint'));
      const [_, { makeRequest }] = result.current;

      await act(async () => {
        makeRequest();
      });

      const [state] = result.current;

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith('some-endpoint');
      expect(state).toEqual({
        response: mockedResponse,
        status: FetchStatus.SUCCESS,
      });
    });

    it('should set error when request fails', async () => {
      const error = new Error('some error');
      (fetch as jest.Mock).mockReturnValueOnce(Promise.reject(error));

      const { result } = renderHook(() => useApi('some-endpoint'));
      const [_, { makeRequest }] = result.current;

      await act(async () => {
        makeRequest();
      });

      const [state] = result.current;

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith('some-endpoint');
      expect(state).toEqual({
        response: error,
        status: FetchStatus.ERROR,
      });
    });
  });

  describe('clear request', () => {
    it('should clear request', async () => {
      const { result } = renderHook(() => useApi(endpoint));
      const [_, { clearRequest }] = result.current;

      await act(async () => {
        clearRequest();
      });

      const [state] = result.current;

      expect(state).toEqual(initialState);
    });
  });
});
