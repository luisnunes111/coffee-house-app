import {getManager} from "typeorm";
import {Product, ProductType} from "../../entity/Product";
import {IProductCreateRequest, IProductUpdateRequest} from "../types/products/request";

async function getAll() {
	try {
		const productsRepository = getManager().getRepository(Product);
		return await productsRepository.find({order: {created_at: "DESC"}});
	} catch (error) {
		return [];
	}
}

async function getAllByTypeCount(type: ProductType) {
	try {
		const res = await getManager()
			.getRepository(Product)
			.createQueryBuilder("product")
			.select("SUM(quantity)", "sum")
			.where("type = :type", {type: type})
			.getRawOne();
		// .reduce((acc: any, cur:any) => console.log(cur),0)
		return parseInt((res as any).sum);
	} catch (error) {
		return 0;
	}
}

async function getOne(id: string) {
	try {
		const productsRepository = getManager().getRepository(Product);
		const product = await productsRepository.findOne(id);

		return product;
	} catch (error) {
		return null;
	}
}

async function createOne(item: IProductCreateRequest) {
	try {
		const productsRepository = getManager().getRepository(Product);
		const newPost = productsRepository.create(item);

		await productsRepository.save(newPost);
		return newPost;
	} catch (error) {
		return null;
	}
}

async function deleteOne(id: string) {
	try {
		const productsRepository = getManager().getRepository(Product);
		const result = await productsRepository.delete(id);
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
		const productsRepository = getManager().getRepository(Product);

		const newProduct = new Product(item);
		const result = await productsRepository.update(id, newProduct);
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
	getAllByTypeCount,
	createOne,
	deleteOne,
	updateOne,
};
