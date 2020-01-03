import {
	notificationsInitialState,
	SET_NOTIFICATIONS_ACTION,
	SET_NOTIFICATIONS_ERROR_ACTION,
	SET_NOTIFICATIONS_LOADING_ACTION,
} from "./constants";
import {NotificationsActionTypes, INotificationsState} from "./types";

export default (state = notificationsInitialState, action: NotificationsActionTypes): INotificationsState => {
	switch (action.type) {
		case SET_NOTIFICATIONS_ACTION: {
			return {...state, items: action.payload.data, error: null};
		}
		case SET_NOTIFICATIONS_LOADING_ACTION: {
			return {...state, loading: action.payload};
		}
		case SET_NOTIFICATIONS_ERROR_ACTION: {
			return {...state, error: action.payload};
		}
		default:
			return state;
	}
};
