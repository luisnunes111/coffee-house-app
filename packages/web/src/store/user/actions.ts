import {Dispatch} from "redux";
import {AppState} from "../../configurations/redux";
import {UserActionTypes} from "./types";
import API, {APIClient} from "../../api";
import {SET_USER_ERROR_ACTION, SET_USER_ACTION, SET_USER_LOADING_ACTION, LOGOUT_USER_ACTION} from "./constants";
import {ILoginFormValues} from "../../pages/Login";
import {loadNotificationsAction} from "../notifications/actions";
import {NotificationsActionTypes} from "../notifications/types";

export const loginAction = (data: ILoginFormValues) => {
	return async (dispatch: Dispatch<UserActionTypes>, _: () => AppState) => {
		dispatch({type: SET_USER_LOADING_ACTION, payload: true});

		const result = await API.user.login(data);
		if (result.success) {
			APIClient.addAuthHeader(result.data.accessToken);
			dispatch({
				type: SET_USER_ACTION,
				payload: {data: result.data.user},
			});
		} else {
			dispatch({
				type: SET_USER_ERROR_ACTION,
				payload: result.error,
			});
		}
		dispatch({type: SET_USER_LOADING_ACTION, payload: false});
		dispatch<any>(loadNotificationsAction());
	};
};

export const logoutAction = () => {
	return async (dispatch: Dispatch<UserActionTypes>, _: () => AppState) => {
		dispatch({type: SET_USER_LOADING_ACTION, payload: true});

		const result = await API.user.logout();
		if (result.success) {
			APIClient.removeAuthHeader();
			dispatch({
				type: LOGOUT_USER_ACTION,
			});
		} else {
			dispatch({
				type: SET_USER_ERROR_ACTION,
				payload: result.error,
			});
		}
		dispatch({type: SET_USER_LOADING_ACTION, payload: false});
	};
};
