import {getManager} from "typeorm";
import {Product} from "../../entity/Product";
import {IProductCreateRequest} from "../types/products/request";

async function getAll() {
	const productRepository = getManager().getRepository(Product);
	return await productRepository.find();
}

async function getOne(id: string) {
	const productRepository = getManager().getRepository(Product);
	const product = await productRepository.findOne(id);

	return product;
}

async function createOne(product: IProductCreateRequest) {
	try {
		const productRepository = getManager().getRepository(Product);
		const newPost = productRepository.create(product);

		await productRepository.save(newPost);
		return newPost;
	} catch (error) {
		return null;
	}
}

function deleteOne() {}

function updateOne() {}

export default {
	getAll,
	getOne,
	createOne,
	deleteOne,
	updateOne,
};
