import {Dispatch} from "redux";
import {AppState} from "../../configurations/redux";
import {SET_PRODUCTS_ACTION, SET_PRODUCTS_ERROR_ACTION, SET_PRODUCTS_LOADING_ACTION} from "./constants";
import {ProductsActionTypes} from "./types";
import API from "../../api";

export const loadProductsAction = () => {
	return async (dispatch: Dispatch<ProductsActionTypes>, _: () => AppState) => {
		dispatch({type: SET_PRODUCTS_LOADING_ACTION, payload: true});

		const result = await API.products.getAll();
		if (result.success) {
			dispatch({
				type: SET_PRODUCTS_ACTION,
				payload: {data: result.data},
			});
		} else {
			dispatch({
				type: SET_PRODUCTS_ERROR_ACTION,
				payload: result.error,
			});
		}
		dispatch({type: SET_PRODUCTS_LOADING_ACTION, payload: false});
	};
};
