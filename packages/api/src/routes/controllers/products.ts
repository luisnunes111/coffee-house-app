import {Request, Response} from "express";
import {errors} from "../../utils/serverErrors";
import productValidation from "../../utils/validations/product";
import productRepository from "../repositories/products";
import {IProductCreateRequest} from "../types/products/request";

async function getAll(_: Request, res: Response) {
	try {
		const products = await productRepository.getAll();
		res.send(products);
	} catch (error) {
		res.status(500);
		res.send({success: false, error: errors.generic500});
	}
}

async function getOne(req: Request, res: Response) {
	try {
		const {id} = req.params;
		const product = await productRepository.getOne(id);

		if (!product) {
			res.status(404);
			res.send({success: false, error: errors.generic404});
			return;
		}

		res.send(product);
	} catch (error) {
		res.status(500);
		res.send({success: false, error: errors.generic500});
	}
}

async function createOne(req: Request, res: Response) {
	try {
		let isValid = await productValidation.isValid(req.body as IProductCreateRequest);

		if (!isValid) {
			res.status(400);
			res.send({success: false, error: errors.generic400});
			return;
		}

		const newPost = await productRepository.createOne(req.body as IProductCreateRequest);
		res.send(newPost);
	} catch (error) {
		res.status(500);
		res.send({success: false, error: errors.generic500});
	}
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
