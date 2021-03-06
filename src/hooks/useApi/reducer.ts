import {
  Action,
  Actions,
  State,
  FetchStatus,
  RequestSuccessAction,
  RequestErrorAction,
  FetchError,
  RequestLoadingAction,
  SuccessState,
  ClearStateAction,
} from './types';

export const initialState: SuccessState<any> = {
  response: null,
  status: FetchStatus.SUCCESS,
};

export const clearState = (): ClearStateAction => ({
  type: Actions.CLEAR_STATE,
});

export const requestLoading = (): RequestLoadingAction => ({
  type: Actions.REQUEST_LOADING,
});

export const requestError = (error: FetchError): RequestErrorAction => ({
  payload: error,
  type: Actions.REQUEST_ERROR,
});

export const requestSuccess = <ApiResponse>(
  data: ApiResponse
): RequestSuccessAction<ApiResponse> => ({
  payload: data,
  type: Actions.REQUEST_SUCCESS,
});

const reducer = <ApiResponse>(
  state: State<ApiResponse> = initialState,
  action: Action<ApiResponse>
): State<ApiResponse> => {
  switch (action.type) {
    case Actions.CLEAR_STATE: {
      return initialState;
    }
    case Actions.REQUEST_ERROR: {
      return {
        ...state,
        response: action.payload,
        status: FetchStatus.ERROR,
      };
    }
    case Actions.REQUEST_LOADING: {
      return {
        ...state,
        status: FetchStatus.PENDING,
      };
    }
    case Actions.REQUEST_SUCCESS: {
      return {
        ...state,
        response: action.payload,
        status: FetchStatus.SUCCESS,
      };
    }
    default:
      return state;
  }
};

export default reducer;
