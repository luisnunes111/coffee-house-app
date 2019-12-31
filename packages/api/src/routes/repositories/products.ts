import {getManager} from "typeorm";
import {Product} from "../../entity/Product";
import {IProductCreateRequest, IProductUpdateRequest} from "../types/products/request";

async function getAll() {
	const productRepository = getManager().getRepository(Product);
	return await productRepository.find();
}

async function getOne(id: string) {
	try {
		const productRepository = getManager().getRepository(Product);
		const product = await productRepository.findOne(id);

		return product;
	} catch (error) {
		return null;
	}
}

async function createOne(item: IProductCreateRequest) {
	try {
		const productRepository = getManager().getRepository(Product);
		const newPost = productRepository.create(item);

		await productRepository.save(newPost);
		return newPost;
	} catch (error) {
		return null;
	}
}

async function deleteOne(id: string) {
	try {
		const productRepository = getManager().getRepository(Product);
		const result = await productRepository.delete(id);
		if (result.affected == 1) {
			return true;
		}
	} catch (error) {
		console.log(error);
	}
	return false;
}

async function updateOne(id: string, item: IProductUpdateRequest) {
	try {
		const productRepository = getManager().getRepository(Product);

		const newProduct = new Product(item);
		console.log(newProduct, item);
		const result = await productRepository.update(id, newProduct);
		if (result.affected === 1) {
			return await getOne(id);
		}
	} catch (error) {
		console.log(error);
	}
	return null;
}

export default {
	getAll,
	getOne,
	createOne,
	deleteOne,
	updateOne,
};
