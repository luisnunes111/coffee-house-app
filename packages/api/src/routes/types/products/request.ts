import {ProductType} from "../../../entity/Product";

export interface IProductCreateRequest {
	name: string;
	description?: string;
	quantity: number;
	type: ProductType;
}

export interface IProductUpdateRequest {
	name: string;
	description?: string;
	quantity: number;
	type: ProductType;
}
