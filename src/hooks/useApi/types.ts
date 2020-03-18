export enum FetchStatus {
  ERROR = 'ERROR',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
}

export interface FetchError {
  message: string;
}

interface PendingState<ApiResponse> {
  response: ApiResponse | FetchError | null;
  status: FetchStatus.PENDING;
}

export interface SuccessState<ApiResponse> {
  response: ApiResponse | null;
  status: FetchStatus.SUCCESS;
}

interface ErrorState {
  response: FetchError;
  status: FetchStatus.ERROR;
}

export type State<ApiResponse> = PendingState<ApiResponse> | SuccessState<ApiResponse> | ErrorState;

export enum Actions {
  CLEAR_STATE = 'CLEAR_STATE',
  REQUEST_LOADING = 'REQUEST_LOADING',
  REQUEST_SUCCESS = 'REQUEST_SUCCESS',
  REQUEST_ERROR = 'REQUEST_ERROR',
}

export interface ClearStateAction {
  type: Actions.CLEAR_STATE;
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
  | ClearStateAction
  | RequestErrorAction
  | RequestSuccessAction<ApiResponse>
  | RequestLoadingAction;
