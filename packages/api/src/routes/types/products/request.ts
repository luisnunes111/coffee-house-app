import {ProductType} from "../../../entity/Product";

export interface IProductCreateRequest {
	name: string;
	description?: string;
	quantity: number;
	type: ProductType;
}
