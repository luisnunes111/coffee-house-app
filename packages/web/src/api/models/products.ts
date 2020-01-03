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
 * Get product info
 */
const details = async (id: string): Promise<Utils.ApiResponse<Models.IProductListItem>> => {
	return await APIClient.request<Models.IProductListItem>("/product/" + id);
};

/**
 * Updates a product
 */
const update = async (data: IProductFormValues, id: string): Promise<Utils.ApiResponse<Models.IProductListItem>> => {
	return await APIClient.request<Models.IProductListItem>("/product/" + id, {method: "put", data: data});
};

/**
 * Deletes a product
 */
const deleteIt = async (id: string): Promise<Utils.ApiResponse<null>> => {
	return await APIClient.request<null>("/product/" + id, {method: "delete"});
};

/**
 * Export list of products (TODO)
 */
const exportFile = async (): Promise<Utils.ApiResponse<null>> => {
	return await APIClient.request<null>("/products/exports");
};

export default {
	getAll,
	create,
	update,
	details,
	deleteIt,
	exportFile,
};
