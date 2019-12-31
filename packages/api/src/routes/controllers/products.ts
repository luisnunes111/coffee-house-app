import {Request, Response} from "express";
import {errors} from "../../utils/serverErrors";
import productValidation from "../../utils/validations/product";
import productRepository from "../repositories/products";
import {IProductCreateRequest, IProductUpdateRequest} from "../types/products/request";

async function getAll(_: Request, res: Response) {
	try {
		const products = await productRepository.getAll();
		res.send({success: true, data: products});
	} catch (error) {
		res.status(500).send({success: false, error: errors.generic500});
	}
}

async function getOne(req: Request, res: Response) {
	try {
		const {id} = req.params;
		const product = await productRepository.getOne(id);

		if (id == null || id === "") {
			res.status(400).send({success: false, error: errors.generic400});
			return;
		}

		if (!product) {
			res.status(404).send({success: false, error: errors.generic404});
			return;
		}

		res.send({success: true, data: product});
	} catch (error) {
		res.status(500).send({success: false, error: errors.generic500});
	}
}

async function createOne(req: Request, res: Response) {
	try {
		let isValid = await productValidation.isValid(req.body as IProductCreateRequest);

		if (!isValid) {
			res.status(400).send({success: false, error: errors.generic400});
			return;
		}

		const newPost = await productRepository.createOne(req.body as IProductCreateRequest);
		res.status(201).send({success: true, data: newPost});
	} catch (error) {
		res.status(500).send({success: false, error: errors.generic500});
	}
}

async function deleteOne(req: Request, res: Response) {
	try {
		const {id} = req.params;

		if (id == null || id === "") {
			res.status(400).send({success: false, error: errors.generic400});
			return;
		}

		const result = await productRepository.deleteOne(id);
		if (result) {
			res.send({success: true});
			return;
		}
	} catch (error) {
		console.log(error);
	}
	res.status(500).send({success: false, error: errors.generic500});
}

async function updateOne(req: Request, res: Response) {
	try {
		const {id} = req.params;

		if (id == null || id === "") {
			res.status(400).send({success: false, error: errors.generic400});
			return;
		}

		let isValid = await productValidation.isValid(req.body as IProductUpdateRequest);

		if (!isValid) {
			res.status(400).send({success: false, error: errors.generic400});
			return;
		}

		const result = await productRepository.updateOne(id, req.body as IProductUpdateRequest);
		if (result) {
			res.send({success: true, data: result});
			return;
		}
	} catch (error) {
		console.log(error);
	}
	res.status(500).send({success: false, error: errors.generic500});
}

export default {
	getAll,
	getOne,
	createOne,
	deleteOne,
	updateOne,
};
