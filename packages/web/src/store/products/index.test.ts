import reducer from "./reducer";
import API from "../../api";
import {SET_PRODUCTS_ACTION, SET_PRODUCTS_LOADING_ACTION, productsInitialState} from "./constants";
import {IProductsState} from "./types";

describe("Redux", () => {
	describe("Applications Reducer", () => {
		test("loads list", () => {
			const result = API.products.getAll();

			expect(result?.success).toBe(true);

			if (result?.success) {
				const newState = reducer(productsInitialState, {
					type: SET_PRODUCTS_ACTION,
					payload: {data: result?.data},
				});
				expect(newState).toEqual({...productsInitialState, ...result.data} as IProductsState);
			}
		});

		test("loading updates", () => {
			let newState = reducer(productsInitialState, {
				type: SET_PRODUCTS_LOADING_ACTION,
				payload: true,
			});
			expect(newState).toEqual({...productsInitialState, loading: true} as IProductsState);

			newState = reducer(productsInitialState, {
				type: SET_PRODUCTS_LOADING_ACTION,
				payload: false,
			});
			expect(newState).toEqual({...productsInitialState, loading: false} as IProductsState);
		});
	});
});
