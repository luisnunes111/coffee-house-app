import {UserActionTypes, IUserState} from "./types";
import {userInitialState, SET_USER_ACTION, SET_USER_LOADING_ACTION, LOGOUT_USER_ACTION, SET_USER_ERROR_ACTION} from "./constants";

export default (state = userInitialState, action: UserActionTypes): IUserState => {
	switch (action.type) {
		case SET_USER_ACTION: {
			return {...state, data: action.payload.data, error: null};
		}
		case SET_USER_LOADING_ACTION: {
			return {...state, loading: action.payload};
		}
		case SET_USER_ERROR_ACTION: {
			return {...state, data: null, error: action.payload};
		}
		case LOGOUT_USER_ACTION: {
			return userInitialState;
		}
		default:
			return state;
	}
};
