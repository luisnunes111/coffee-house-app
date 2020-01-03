import {combineReducers} from "redux";

import productsReducer from "./products/reducer";
import notificationsReducer from "./notifications/reducer";
import userReducer from "./user/reducer";

export default combineReducers({
	products: productsReducer,
	notifications: notificationsReducer,
	user: userReducer,
});
