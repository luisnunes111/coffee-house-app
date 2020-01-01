import {APIClient} from "..";

/**
 * Get products List
 */
const getAll = async (): Promise<Utils.ApiResponse<Models.IProductsList>> => {
	return await APIClient.request<Models.IProductsList>("/products");
};

export default {
	getAll: getAll,
};
