import {Request, Response} from "express";
import {msgs} from "../../utils/responseMsgs";
import productValidation from "../../utils/validations/product";
import productRepository from "../repositories/products";
import {IProductCreateRequest, IProductUpdateRequest} from "../types/products/request";
import business from "../business/products";
import {RequestWithIdentity} from "../middlewares/isAuth";
import {ITokenPayload} from "../../services/auth";

async function getAll(_: Request, res: Response) {
	try {
		const products = await productRepository.getAll();
		res.send({success: true, data: products});
	} catch (error) {
		res.status(500).send({success: false, error: msgs.generic500});
	}
}

async function getOne(req: Request, res: Response) {
	try {
		const {id} = req.params;
		const product = await productRepository.getOne(id);

		if (id == null || id === "") {
			res.status(400).send({success: false, error: msgs.generic400});
			return;
		}

		if (!product) {
			res.status(404).send({success: false, error: msgs.generic404});
			return;
		}

		res.send({success: true, data: product});
	} catch (error) {
		res.status(500).send({success: false, error: msgs.generic500});
	}
}

async function createOne(req: Request, res: Response) {
	try {
		let isValid = await productValidation.isValid(req.body as IProductCreateRequest);

		if (!isValid) {
			res.status(400).send({success: false, error: msgs.generic400});
			return;
		}

		const newPost = await productRepository.createOne(req.body as IProductCreateRequest);
		res.status(201).send({success: true, data: newPost});
	} catch (error) {
		res.status(500).send({success: false, error: msgs.generic500});
	}
}

async function deleteOne(req: Request, res: Response) {
	try {
		const {id} = req.params;

		if (id == null || id === "") {
			res.status(400).send({success: false, error: msgs.generic400});
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
	res.status(500).send({success: false, error: msgs.generic500});
}

async function updateOne(req: Request, res: Response) {
	try {
		const {id} = req.params;
		const {userId} = (req as RequestWithIdentity<ITokenPayload>).identity;

		if (id == null || id === "") {
			return res.status(400).send({success: false, error: msgs.generic400});
		}

		let isValid = await productValidation.isValid(req.body as IProductUpdateRequest);

		if (!isValid) {
			return res.status(400).send({success: false, error: msgs.generic400});
		}

		const currentProduct = await productRepository.getOne(id);

		if (!currentProduct) {
			return res.status(404).send({success: false, error: msgs.generic404});
		}

		const result = await productRepository.updateOne(id, req.body as IProductUpdateRequest);

		if (result) {
			business.notifyUsers(result, currentProduct.quantity, userId);
			return res.send({success: true, data: result});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).send({success: false, error: msgs.generic500});
	}
	return res.status(500).send({success: false});
}

//todo
export function exportList(req: Request, res: Response) {
	try {
	} catch (error) {
		console.log(error);
	}
	res.status(500).send({success: false, error: msgs.generic500});
}

export default {
	getAll,
	getOne,
	createOne,
	deleteOne,
	updateOne,
	exportList,
};
