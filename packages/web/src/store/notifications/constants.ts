import {INotificationsState} from "./types";

export const notificationsInitialState: INotificationsState = {
	items: null,
	loading: false,
	error: null,
};

export const SET_NOTIFICATIONS_ACTION = "SET_NOTIFICATIONS_ACTION";
export const SET_NOTIFICATIONS_ERROR_ACTION = "SET_NOTIFICATIONS_ERROR_ACTION";
export const SET_NOTIFICATIONS_LOADING_ACTION = "SET_NOTIFICATIONS_LOADING_ACTION";
