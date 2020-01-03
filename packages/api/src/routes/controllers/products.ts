import {Request, Response} from "express";
import {msgs} from "../../utils/responseMsgs";
import productValidation from "../../utils/validations/product";
import productRepository from "../repositories/products";
import {IProductCreateRequest, IProductUpdateRequest} from "../types/products/request";
import business from "../business/products";
import {RequestWithIdentity} from "../middlewares/isAuth";
import {ITokenPayload} from "../../services/auth";
import {ProductType, getTypeName} from "../../entity/Product";
import {AsyncParser, parse, parseAsync} from "json2csv";
import stream from "stream";

async function getAll(_: Request, res: Response) {
	try {
		const products = await productRepository.getAll();
		return res.send({success: true, data: products});
	} catch (error) {
		return res.status(500).send({success: false, error: msgs.generic500});
	}
}

async function getOne(req: Request, res: Response) {
	try {
		const {id} = req.params;
		const product = await productRepository.getOne(id);

		if (id == null || id === "") {
			return res.status(400).send({success: false, error: msgs.generic400});
		}

		if (!product) {
			return res.status(404).send({success: false, error: msgs.generic404});
		}

		return res.send({success: true, data: product});
	} catch (error) {
		return res.status(500).send({success: false, error: msgs.generic500});
	}
}

async function createOne(req: Request, res: Response) {
	try {
		let isValid = await productValidation.isValid(req.body as IProductCreateRequest);

		if (!isValid) {
			return res.status(400).send({success: false, error: msgs.generic400});
		}
		const limits = await business.checkStockLimits(req.body.type, req.body.quantity);
		if (limits.ok === false) {
			return res.status(406).send({
				success: false,
				error: `The store house can't store that quantity for ${getTypeName(
					req.body.type,
				)} packets. The limit was exceeded by ${Math.abs(limits.overflow!)}.`,
			});
		}

		const newPost = await productRepository.createOne(req.body as IProductCreateRequest);
		return res.status(201).send({success: true, data: newPost});
	} catch (error) {
		return res.status(500).send({success: false, error: msgs.generic500});
	}
}

async function deleteOne(req: Request, res: Response) {
	try {
		const {id} = req.params;

		if (id == null || id === "") {
			return res.status(400).send({success: false, error: msgs.generic400});
		}

		const result = await productRepository.deleteOne(id);
		if (result) {
			return res.send({success: true});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).send({success: false, error: msgs.generic500});
	}
	return res.status(500).send({success: false});
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

		const limits = await business.checkStockLimits(currentProduct.type, req.body.quantity, currentProduct.quantity);
		if (limits.ok === false) {
			return res.status(406).send({
				success: false,
				error: `The store house can't store that quantity for ${getTypeName(
					currentProduct.type,
				)} packets. The limit was exceeded by ${Math.abs(limits.overflow!)}.`,
			});
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

async function exportList(req: Request, res: Response) {
	try {
		const fields = ["id", "name", "description", "quantity", "type", "created_at", "updated_at"];
		const opts = {fields};

		const products = await productRepository.getAll();
		// const csv = parse(products, opts);
		let csv;
		try {
			csv = await parseAsync(products, opts);
		} catch (error) {
			console.log(error);
			// return res.status(500).end();
			return;
		}

		// res.attachment("csv" + Date.now() + ".csv");
		// res.setHeader("Content-Type", "text/csv");
		res.setHeader("Content-Type", "application/octet-stream");
		res.setHeader("Content-disposition", "attachment; filename=data.csv");
		res.status(200).send(csv);

		console.log("csv", csv);
	} catch (error) {
		console.log(error);
	}
}

export default {
	getAll,
	getOne,
	createOne,
	deleteOne,
	updateOne,
	exportList,
};
