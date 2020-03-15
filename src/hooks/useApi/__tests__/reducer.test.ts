import reducer, { initialState, requestSuccess, requestError, requestLoading } from '../reducer';
import { FetchStatus } from '../types';

describe('reducer', () => {
  it('should set status as pending when loading action is dispatched', () => {
    const action = requestLoading();

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      status: FetchStatus.PENDING,
    });
  });

  it('should set data when success action is dispatched', () => {
    const data = [{ item: '' }];
    const action = requestSuccess(data);

    expect(reducer(initialState, action)).toEqual({
      response: data,
      status: FetchStatus.SUCCESS,
    });
  });

  it('should set error when action is dispatched', () => {
    const error = { message: 'error message' };
    const action = requestError(error);

    expect(reducer(initialState, action)).toEqual({
      response: error,
      status: FetchStatus.ERROR,
    });
  });
});
