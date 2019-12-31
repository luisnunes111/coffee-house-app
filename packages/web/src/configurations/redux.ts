import {applyMiddleware, createStore, Middleware} from "redux";
import thunk from "redux-thunk";
import rootReducer from "../store";

let middleWares = [thunk] as Middleware<any>[];

if (process.env.NODE_ENV === "development") {
	const createLogger = require("redux-logger").createLogger;
	middleWares = [...middleWares, createLogger()];
}

export const configureStore = () => {
	return createStore(rootReducer, applyMiddleware(...middleWares));
};

export type AppState = ReturnType<typeof rootReducer>;
