import {IUserState} from "./types";

export const userInitialState: IUserState = {
	data: null,
	loading: false,
	error: null,
};

export const SET_USER_ACTION = "SET_USER_ACTION";
export const SET_USER_LOADING_ACTION = "SET_USER_LOADING_ACTION";
export const SET_USER_ERROR_ACTION = "SET_USER_ERROR_ACTION";
export const LOGOUT_USER_ACTION = "LOGOUT_USER_ACTION";
