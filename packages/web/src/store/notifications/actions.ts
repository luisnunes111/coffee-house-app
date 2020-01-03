import {Dispatch} from "redux";
import {AppState} from "../../configurations/redux";
import {SET_NOTIFICATIONS_ACTION, SET_NOTIFICATIONS_ERROR_ACTION, SET_NOTIFICATIONS_LOADING_ACTION} from "./constants";
import {NotificationsActionTypes} from "./types";
import API from "../../api";

export const loadNotificationsAction = () => {
	return async (dispatch: Dispatch<NotificationsActionTypes>, _: () => AppState) => {
		dispatch({type: SET_NOTIFICATIONS_LOADING_ACTION, payload: true});

		const result = await API.notifications.getAll();
		if (result.success) {
			dispatch({
				type: SET_NOTIFICATIONS_ACTION,
				payload: {data: result.data},
			});
		} else {
			dispatch({
				type: SET_NOTIFICATIONS_ERROR_ACTION,
				payload: result.error,
			});
		}
		dispatch({type: SET_NOTIFICATIONS_LOADING_ACTION, payload: false});
	};
};
