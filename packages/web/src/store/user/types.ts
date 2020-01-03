import {SET_USER_LOADING_ACTION, SET_USER_ACTION, LOGOUT_USER_ACTION, SET_USER_ERROR_ACTION} from "./constants";

export interface IUserState {
	data: Models.IUserLogin | null;
	loading: boolean;
	error: string | null;
}

interface SetUserAction {
	type: typeof SET_USER_ACTION;
	payload: {data: Models.IUserLogin};
}

interface SetUserLoadingAction {
	type: typeof SET_USER_LOADING_ACTION;
	payload: boolean;
}

interface LogoutUserAction {
	type: typeof LOGOUT_USER_ACTION;
}

interface SetUserErrorAction {
	type: typeof SET_USER_ERROR_ACTION;
	payload: string;
}

export type UserActionTypes = SetUserAction | SetUserLoadingAction | LogoutUserAction | SetUserErrorAction;
