import {productsInitialState, SET_PRODUCTS_ACTION, SET_PRODUCTS_ERROR_ACTION, SET_PRODUCTS_LOADING_ACTION} from "./constants";
import {ApplicationsActionTypes, IProductsState} from "./types";

export default (state = productsInitialState, action: ApplicationsActionTypes): IProductsState => {
	switch (action.type) {
		case SET_PRODUCTS_ACTION: {
			return {...state, ...action.payload.data, error: null};
		}
		case SET_PRODUCTS_LOADING_ACTION: {
			return {...state, loading: action.payload};
		}
		case SET_PRODUCTS_ERROR_ACTION: {
			return {...state, error: action.payload};
		}
		default:
			return state;
	}
};
