import {SET_PRODUCTS_ACTION, SET_PRODUCTS_ERROR_ACTION, SET_PRODUCTS_LOADING_ACTION} from "./constants";

export interface IProductsState {
	items: Models.IProductsList | null;
	loading: boolean;
	error?: string | null;
}

interface SetProductsAction {
	type: typeof SET_PRODUCTS_ACTION;
	payload: {data: Models.IProductsList};
}
interface SetProductsErrorAction {
	type: typeof SET_PRODUCTS_ERROR_ACTION;
	payload: string;
}

interface SetProductsLoadingAction {
	type: typeof SET_PRODUCTS_LOADING_ACTION;
	payload: boolean;
}

export type ProductsActionTypes = SetProductsAction | SetProductsLoadingAction | SetProductsErrorAction;
