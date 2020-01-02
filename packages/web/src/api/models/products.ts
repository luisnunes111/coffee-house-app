import {APIClient} from "..";
import {IProductFormValues} from "../../pages/products/components/Form";

/**
 * Get products List
 */
const getAll = async (): Promise<Utils.ApiResponse<Models.IProductsList>> => {
	return await APIClient.request<Models.IProductsList>("/products");
};

/**
 * Creates a product
 */
const create = async (data: IProductFormValues): Promise<Utils.ApiResponse<Models.IProductListItem>> => {
	return await APIClient.request<Models.IProductListItem>("/product", {method: "post", data: data});
};

/**
 * Updates a product
 */
const update = async (data: IProductFormValues, id: string): Promise<Utils.ApiResponse<Models.IProductListItem>> => {
	return await APIClient.request<Models.IProductListItem>("/product/" + id, {method: "put", data: data});
};

export default {
	getAll,
	create,
	update,
};
