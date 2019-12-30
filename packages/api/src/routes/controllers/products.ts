import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Product} from "../../entity/Product";

async function getAll(req: Request, res: Response) {
	const productRepository = getManager().getRepository(Product);
	const products = await productRepository.find();
	res.send(products);
}

async function getOne(req: Request, res: Response) {
	const {id} = req.params;

	const productRepository = getManager().getRepository(Product);
	const product = await productRepository.findOne(id);

	if (!product) {
		res.status(404);
		res.end();
		return;
	}

	res.send(product);
}

async function createOne(req: Request, res: Response) {
	const productRepository = getManager().getRepository(Product);

	const newPost = productRepository.create(req.body);

	await productRepository.save(newPost);

	res.send(newPost);
}

function deleteOne(req: Request, res: Response) {}

function updateOne(req: Request, res: Response) {}

export default {
	getAll,
	getOne,
	createOne,
	deleteOne,
	updateOne,
};
