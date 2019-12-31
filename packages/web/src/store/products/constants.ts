import {IProductsState} from "./types";

export const productsInitialState: IProductsState = {
	items: null,
	loading: false,
	error: null,
};

export const SET_PRODUCTS_ACTION = "SET_PRODUCTS_ACTION";
export const SET_PRODUCTS_ERROR_ACTION = "SET_PRODUCTS_ERROR_ACTION";
export const SET_PRODUCTS_LOADING_ACTION = "SET_PRODUCTS_LOADING_ACTION";
