import {SET_NOTIFICATIONS_ACTION, SET_NOTIFICATIONS_ERROR_ACTION, SET_NOTIFICATIONS_LOADING_ACTION} from "./constants";

export interface INotificationsState {
	items: Models.INotificationsList | null;
	loading: boolean;
	error?: string | null;
}

interface SetNotificationsAction {
	type: typeof SET_NOTIFICATIONS_ACTION;
	payload: {data: Models.INotificationsList};
}

interface SetNotificationsErrorAction {
	type: typeof SET_NOTIFICATIONS_ERROR_ACTION;
	payload: string;
}

interface SetNotificationsLoadingAction {
	type: typeof SET_NOTIFICATIONS_LOADING_ACTION;
	payload: boolean;
}

export type NotificationsActionTypes = SetNotificationsAction | SetNotificationsLoadingAction | SetNotificationsErrorAction;
