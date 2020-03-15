export enum FetchStatus {
  ERROR = 'ERROR',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
}

export interface FetchError {
  message: string;
}

export interface State<ApiResponse> {
  response: ApiResponse | FetchError | null;
  status: FetchStatus;
}

export enum Actions {
  REQUEST_LOADING = 'REQUEST_LOADING',
  REQUEST_SUCCESS = 'REQUEST_SUCCESS',
  REQUEST_ERROR = 'REQUEST_ERROR',
}

export interface RequestLoadingAction {
  type: Actions.REQUEST_LOADING;
}

export interface RequestSuccessAction<ApiResponse> {
  payload: ApiResponse;
  type: Actions.REQUEST_SUCCESS;
}

export interface RequestErrorAction {
  payload: FetchError;
  type: Actions.REQUEST_ERROR;
}

export type Action<ApiResponse> =
  | RequestErrorAction
  | RequestSuccessAction<ApiResponse>
  | RequestLoadingAction;
